# Email Integration Setup Instructions

## Current Status: Demo Mode Active ✅
- Contact form submissions are **working and stored in database**
- Email notifications are **simulated** (check backend logs to see demo emails)
- All contact data is saved to MongoDB with unique IDs

## To Enable Real Email Sending

### Step 1: Get Resend API Key
1. Sign up at https://resend.com (free account available)
2. Go to Dashboard → API Keys → Create API Key
3. Copy the API key (starts with 're_...')

### Step 2: Update Environment Variables
1. Edit `/app/backend/.env` file
2. Replace `RESEND_API_KEY=re_placeholder_key_here` with your real API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

### Step 3: Restart Backend
```bash
sudo supervisorctl restart backend
```

## Email Features
- **Recipient**: healingatmysticprana@gmail.com
- **Beautiful HTML Template**: Mystic Prana branded email with all contact details
- **Automatic Database Storage**: All inquiries saved regardless of email status
- **Error Handling**: If email fails, contact is still saved to database
- **Professional Format**: Includes inquiry ID, timestamp, and full contact details

## Demo Email Log Format
Check backend logs for simulated emails:
```
=== EMAIL DEMO MODE ===
📧 SIMULATED EMAIL to: healingatmysticprana@gmail.com
📧 Subject: New Contact Inquiry from [Name] - [Subject]
📧 From: [Name] ([Email])
📧 Phone: [Phone]
📧 Service Interest: [Service]
📧 Message: [First 100 characters...]
📧 Inquiry ID: [Unique ID]
=======================
```

## Viewing Contact Inquiries
API endpoint: `GET /api/contact`
- Returns all stored contact inquiries
- Includes timestamps, unique IDs, and all customer data
- Ready for integration with admin dashboard or CRM