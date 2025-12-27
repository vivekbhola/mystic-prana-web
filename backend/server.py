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

# Initialize Resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

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
