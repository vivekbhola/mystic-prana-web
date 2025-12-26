from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

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
    price_range: str
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
        
        await db.contact_inquiries.insert_one(mongo_data)
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
