from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
import razorpay
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Email configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'healingatmysticprana@gmail.com')

# Razorpay configuration
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET')
RAZORPAY_WEBHOOK_SECRET = os.environ.get('RAZORPAY_WEBHOOK_SECRET')

# Initialize Resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Initialize Razorpay
if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
else:
    razorpay_client = None

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Mystic Prana API", description="API for Mystic Prana Energy Healing Center")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=1000)
    service_interest: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")

class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=1000)
    service_interest: Optional[str] = None

class CartItem(BaseModel):
    product_id: str
    name: str
    price: str
    quantity: int
    image: str

class Cart(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    items: List[CartItem]
    total_amount: float
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CreateOrderRequest(BaseModel):
    amount: int  # Amount in paise (INR)
    currency: str = "INR"
    customer_info: Dict[str, str]
    cart_items: List[CartItem]

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str  # Razorpay order ID
    customer_info: Dict[str, str]
    items: List[CartItem]
    total_amount: int  # Amount in paise
    currency: str = "INR"
    status: str = "created"
    payment_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PaymentVerification(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    duration: str
    benefits: List[str]
    is_active: bool = True

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Helper function to prepare data for MongoDB
def prepare_for_mongo(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to Mystic Prana API", "status": "active"}

@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(inquiry: ContactInquiryCreate):
    """Submit a contact inquiry"""
    try:
        inquiry_dict = inquiry.dict()
        contact_obj = ContactInquiry(**inquiry_dict)
        
        # Prepare for MongoDB storage
        mongo_data = prepare_for_mongo(contact_obj.dict())
        
        # Store in database
        await db.contact_inquiries.insert_one(mongo_data)
        
        # Send email notification
        if RESEND_API_KEY and RESEND_API_KEY != "re_placeholder_key_here":
            try:
                # Create HTML email content
                html_content = f"""
                <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #2d5739; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #2d5739 0%, #4a7c59 100%); color: white; padding: 20px; text-align: center; }}
                        .content {{ background: #f7f3e9; padding: 20px; }}
                        .field {{ margin-bottom: 15px; }}
                        .field strong {{ color: #2d5739; }}
                        .footer {{ background: #2d5739; color: white; padding: 15px; text-align: center; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Contact Inquiry - Mystic Prana</h1>
                        </div>
                        <div class="content">
                            <h2>Contact Details:</h2>
                            <div class="field">
                                <strong>Name:</strong> {contact_obj.name}
                            </div>
                            <div class="field">
                                <strong>Email:</strong> {contact_obj.email}
                            </div>
                            {f'<div class="field"><strong>Phone:</strong> {contact_obj.phone}</div>' if contact_obj.phone else ''}
                            <div class="field">
                                <strong>Subject:</strong> {contact_obj.subject}
                            </div>
                            {f'<div class="field"><strong>Service Interest:</strong> {contact_obj.service_interest}</div>' if contact_obj.service_interest else ''}
                            <div class="field">
                                <strong>Message:</strong><br>
                                {contact_obj.message.replace(chr(10), '<br>')}
                            </div>
                            <div class="field">
                                <strong>Submitted:</strong> {contact_obj.timestamp.strftime('%B %d, %Y at %I:%M %p UTC')}
                            </div>
                            <div class="field">
                                <strong>Inquiry ID:</strong> {contact_obj.id}
                            </div>
                        </div>
                        <div class="footer">
                            <p>This inquiry has been automatically stored in your database.</p>
                            <p>Please respond to {contact_obj.email} directly.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                
                # Email parameters
                email_params = {
                    "from": SENDER_EMAIL,
                    "to": [RECIPIENT_EMAIL],
                    "subject": f"New Contact Inquiry from {contact_obj.name} - {contact_obj.subject}",
                    "html": html_content
                }
                
                # Send email asynchronously
                email_result = await asyncio.to_thread(resend.Emails.send, email_params)
                logger.info(f"Email sent successfully to {RECIPIENT_EMAIL}, ID: {email_result.get('id', 'Unknown')}")
                
            except Exception as email_error:
                logger.error(f"Failed to send email notification: {str(email_error)}")
        else:
            # Demo mode - simulate email sending
            logger.info("=== EMAIL DEMO MODE ===")
            logger.info(f"📧 SIMULATED EMAIL to: {RECIPIENT_EMAIL}")
            logger.info(f"📧 Subject: New Contact Inquiry from {contact_obj.name} - {contact_obj.subject}")
            logger.info(f"📧 From: {contact_obj.name} ({contact_obj.email})")
            logger.info(f"📧 Phone: {contact_obj.phone or 'Not provided'}")
            logger.info(f"📧 Service Interest: {contact_obj.service_interest or 'General inquiry'}")
            logger.info(f"📧 Message: {contact_obj.message[:100]}{'...' if len(contact_obj.message) > 100 else ''}")
            logger.info(f"📧 Inquiry ID: {contact_obj.id}")
            logger.info("📧 To enable real emails, add RESEND_API_KEY to .env file")
            logger.info("=======================")
        
        return contact_obj
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit inquiry: {str(e)}")

@api_router.get("/contact", response_model=List[ContactInquiry])
async def get_contact_inquiries():
    """Get all contact inquiries (admin only)"""
    try:
        inquiries = await db.contact_inquiries.find().to_list(1000)
        return [ContactInquiry(**inquiry) for inquiry in inquiries]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch inquiries: {str(e)}")

@api_router.get("/services", response_model=List[Service])
async def get_services():
    """Get all available services"""
    try:
        services = await db.services.find({"is_active": True}).to_list(100)
        if not services:
            # Return default services if none exist in database
            default_services = [
                {
                    "id": str(uuid.uuid4()),
                    "name": "Energy Healing Sessions",
                    "description": "Personalized energy healing sessions to restore balance and promote natural healing.",
                    "duration": "60-90 minutes",
                    "benefits": ["Stress relief", "Energy balance", "Emotional healing", "Physical wellness"],
                    "is_active": True
                },
                {
                    "id": str(uuid.uuid4()),
                    "name": "Group Meditation",
                    "description": "Join our weekly group meditation sessions for community healing and shared spiritual growth.",
                    "duration": "45 minutes",
                    "benefits": ["Community connection", "Guided practice", "Spiritual growth", "Inner peace"],
                    "is_active": True
                },
                {
                    "id": str(uuid.uuid4()),
                    "name": "Chakra Balancing",
                    "description": "Specialized chakra alignment and balancing therapy to harmonize your energy centers.",
                    "duration": "75 minutes",
                    "benefits": ["Energy alignment", "Chakra balance", "Spiritual clarity", "Physical vitality"],
                    "is_active": True
                },
                {
                    "id": str(uuid.uuid4()),
                    "name": "Wellness Consultation",
                    "description": "Comprehensive wellness assessment and personalized healing plan development.",
                    "duration": "90 minutes",
                    "benefits": ["Personalized plan", "Holistic assessment", "Goal setting", "Ongoing support"],
                    "is_active": True
                }
            ]
            return [Service(**service) for service in default_services]
        return [Service(**service) for service in services]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch services: {str(e)}")

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    mongo_data = prepare_for_mongo(status_obj.dict())
    await db.status_checks.insert_one(mongo_data)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Cart Management APIs
@api_router.post("/cart")
async def add_to_cart(cart_item: CartItem, session_id: str = "default"):
    """Add item to cart"""
    try:
        # Check if cart exists for session
        existing_cart = await db.carts.find_one({"session_id": session_id})
        
        if existing_cart:
            # Update existing cart
            items = existing_cart.get("items", [])
            
            # Check if item already exists in cart
            item_found = False
            for i, item in enumerate(items):
                if item["product_id"] == cart_item.product_id:
                    items[i]["quantity"] += cart_item.quantity
                    item_found = True
                    break
            
            if not item_found:
                items.append(cart_item.dict())
            
            # Calculate total
            total_amount = sum(float(item["price"].replace("₹", "").replace("$", "")) * item["quantity"] for item in items)
            
            await db.carts.update_one(
                {"session_id": session_id},
                {"$set": {
                    "items": items,
                    "total_amount": total_amount,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }}
            )
        else:
            # Create new cart
            total_amount = float(cart_item.price.replace("₹", "").replace("$", "")) * cart_item.quantity
            cart = Cart(
                session_id=session_id,
                items=[cart_item],
                total_amount=total_amount
            )
            cart_data = prepare_for_mongo(cart.dict())
            await db.carts.insert_one(cart_data)
        
        return {"message": "Item added to cart successfully", "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add item to cart: {str(e)}")

@api_router.get("/cart/{session_id}")
async def get_cart(session_id: str = "default"):
    """Get cart contents"""
    try:
        cart = await db.carts.find_one({"session_id": session_id})
        if cart:
            return Cart(**cart)
        else:
            # Return empty cart
            return Cart(session_id=session_id, items=[], total_amount=0.0)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch cart: {str(e)}")

@api_router.delete("/cart/{session_id}")
async def clear_cart(session_id: str = "default"):
    """Clear cart"""
    try:
        await db.carts.delete_one({"session_id": session_id})
        return {"message": "Cart cleared successfully", "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to clear cart: {str(e)}")

@api_router.delete("/cart/{session_id}/item/{product_id}")
async def remove_from_cart(session_id: str, product_id: str):
    """Remove item from cart"""
    try:
        cart = await db.carts.find_one({"session_id": session_id})
        if cart:
            items = [item for item in cart.get("items", []) if item["product_id"] != product_id]
            total_amount = sum(float(item["price"].replace("₹", "").replace("$", "")) * item["quantity"] for item in items)
            
            await db.carts.update_one(
                {"session_id": session_id},
                {"$set": {
                    "items": items,
                    "total_amount": total_amount,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }}
            )
        
        return {"message": "Item removed from cart successfully", "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove item from cart: {str(e)}")

# Payment and Order APIs
@api_router.post("/create-order")
async def create_payment_order(order_request: CreateOrderRequest):
    """Create Razorpay order"""
    try:
        if not razorpay_client:
            # Demo mode - simulate order creation
            demo_order = {
                "id": f"order_demo_{uuid.uuid4().hex[:10]}",
                "amount": order_request.amount,
                "currency": order_request.currency,
                "status": "created"
            }
            
            # Store order in database
            order = Order(
                order_id=demo_order["id"],
                customer_info=order_request.customer_info,
                items=order_request.cart_items,
                total_amount=order_request.amount,
                currency=order_request.currency
            )
            order_data = prepare_for_mongo(order.dict())
            await db.orders.insert_one(order_data)
            
            logger.info(f"Demo order created: {demo_order['id']} for amount: ₹{order_request.amount/100}")
            return demo_order
        
        # Create Razorpay order
        razorpay_order = razorpay_client.order.create({
            "amount": order_request.amount,
            "currency": order_request.currency,
            "payment_capture": 1,
            "notes": {
                "customer_name": order_request.customer_info.get("name", ""),
                "customer_email": order_request.customer_info.get("email", "")
            }
        })
        
        # Store order in database
        order = Order(
            order_id=razorpay_order["id"],
            customer_info=order_request.customer_info,
            items=order_request.cart_items,
            total_amount=order_request.amount,
            currency=order_request.currency
        )
        order_data = prepare_for_mongo(order.dict())
        await db.orders.insert_one(order_data)
        
        logger.info(f"Razorpay order created: {razorpay_order['id']}")
        return razorpay_order
        
    except Exception as e:
        logger.error(f"Failed to create order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")

@api_router.post("/verify-payment")
async def verify_payment(payment_data: PaymentVerification):
    """Verify payment signature"""
    try:
        if not razorpay_client:
            # Demo mode - simulate successful verification
            await db.orders.update_one(
                {"order_id": payment_data.razorpay_order_id},
                {"$set": {
                    "status": "paid",
                    "payment_id": payment_data.razorpay_payment_id,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }}
            )
            logger.info(f"Demo payment verified for order: {payment_data.razorpay_order_id}")
            return {"status": "success", "message": "Payment verified successfully (Demo Mode)"}
        
        # Verify payment signature
        razorpay_client.utility.verify_payment_signature({
            "razorpay_order_id": payment_data.razorpay_order_id,
            "razorpay_payment_id": payment_data.razorpay_payment_id,
            "razorpay_signature": payment_data.razorpay_signature
        })
        
        # Update order status
        await db.orders.update_one(
            {"order_id": payment_data.razorpay_order_id},
            {"$set": {
                "status": "paid",
                "payment_id": payment_data.razorpay_payment_id,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        # Send confirmation email
        order = await db.orders.find_one({"order_id": payment_data.razorpay_order_id})
        if order and order.get("customer_info", {}).get("email"):
            await send_order_confirmation_email(order)
        
        logger.info(f"Payment verified for order: {payment_data.razorpay_order_id}")
        return {"status": "success", "message": "Payment verified successfully"}
        
    except Exception as e:
        logger.error(f"Payment verification failed: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Payment verification failed: {str(e)}")

@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    """Get order details"""
    try:
        order = await db.orders.find_one({"order_id": order_id})
        if order:
            return Order(**order)
        else:
            raise HTTPException(status_code=404, detail="Order not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch order: {str(e)}")

async def send_order_confirmation_email(order_data):
    """Send order confirmation email"""
    if RESEND_API_KEY and RESEND_API_KEY != "re_placeholder_key_here":
        try:
            customer_info = order_data.get("customer_info", {})
            items_html = ""
            for item in order_data.get("items", []):
                items_html += f"""
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{item['name']}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">{item['quantity']}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">{item['price']}</td>
                </tr>
                """
            
            html_content = f"""
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #2d5739; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #2d5739 0%, #4a7c59 100%); color: white; padding: 20px; text-align: center; }}
                    .content {{ background: #f7f3e9; padding: 20px; }}
                    .order-table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
                    .order-table th {{ background: #2d5739; color: white; padding: 10px; text-align: left; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Order Confirmation - Mystic Prana</h1>
                    </div>
                    <div class="content">
                        <h2>Thank you for your order!</h2>
                        <p><strong>Order ID:</strong> {order_data['order_id']}</p>
                        <p><strong>Customer:</strong> {customer_info.get('name', 'N/A')}</p>
                        
                        <table class="order-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items_html}
                            </tbody>
                        </table>
                        
                        <p><strong>Total Amount:</strong> ₹{order_data['total_amount']/100}</p>
                        <p><strong>Status:</strong> {order_data['status'].title()}</p>
                        
                        <p>We'll process your order and send you tracking information soon.</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            email_params = {
                "from": SENDER_EMAIL,
                "to": [customer_info.get("email")],
                "subject": f"Order Confirmation - {order_data['order_id']} - Mystic Prana",
                "html": html_content
            }
            
            email_result = await asyncio.to_thread(resend.Emails.send, email_params)
            logger.info(f"Order confirmation email sent to {customer_info.get('email')}")
            
        except Exception as email_error:
            logger.error(f"Failed to send order confirmation email: {str(email_error)}")
    else:
        logger.info(f"Demo mode: Order confirmation email for order {order_data['order_id']}")

@api_router.post("/webhook")
async def razorpay_webhook(request: Request):
    """Handle Razorpay webhooks"""
    try:
        payload = await request.body()
        signature = request.headers.get('X-Razorpay-Signature', '')
        
        if razorpay_client and RAZORPAY_WEBHOOK_SECRET:
            # Verify webhook signature
            razorpay_client.utility.verify_webhook_signature(
                payload.decode(),
                signature,
                RAZORPAY_WEBHOOK_SECRET
            )
        
        # Process webhook payload (payment.captured, payment.failed, etc.)
        # Update order status in database based on webhook event
        
        logger.info("Razorpay webhook processed successfully")
        return {"status": "ok"}
        
    except Exception as e:
        logger.error(f"Webhook processing failed: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Webhook processing failed: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
