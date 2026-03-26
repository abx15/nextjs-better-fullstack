# 🧪 SarkariSaathi API Testing Guide

## 📋 Table of Contents
1. [Setup](#setup)
2. [Authentication APIs](#authentication-apis)
3. [Dashboard APIs](#dashboard-apis)
4. [Scheme APIs](#scheme-apis)
5. [Testing with Postman](#testing-with-postman)
6. [Common Error Codes](#common-error-codes)
7. [Tips & Tricks](#tips--tricks)

---

## 🛠️ Setup

### Prerequisites
- SarkariSaathi application running on `http://localhost:3000`
- Postman or any API testing tool
- Basic understanding of REST APIs

### Base URL
```
http://localhost:3000/api
```

---

## 🔐 Authentication APIs

### 1. Register New User
**Endpoint**: `POST /auth/register`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "रमेश कुमार",
  "phone": "9876543210",
  "email": "ramesh@example.com",
  "password": "password123"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "userId": "user_1648234567890",
  "message": "Registration successful!"
}
```

**Error Response (400)**:
```json
{
  "error": "यह मोबाइल नंबर पहले से registered है"
}
```

---

### 2. User Login
**Endpoint**: `POST /auth/callback/credentials`

**Headers**:
```
Content-Type: application/json
Cookie: authjs.csrf-token=your-csrf-token
```

**Request Body**:
```json
{
  "email": "ramesh@example.com",
  "password": "password123",
  "csrfToken": "your-csrf-token",
  "callbackUrl": "http://localhost:3000/dashboard",
  "json": true
}
```

**Success Response (302 Redirect)**:
- Redirects to dashboard with session cookies
- Sets authentication cookies

**Error Response (401)**:
```json
{
  "error": "Invalid credentials"
}
```

---

### 3. Get Session Info
**Endpoint**: `GET /auth/session`

**Headers**:
```
Cookie: authjs.session-token=your-session-token
```

**Success Response (200)**:
```json
{
  "user": {
    "id": "user_1648234567890",
    "name": "रमेश कुमार",
    "email": "ramesh@example.com",
    "role": "USER",
    "isActive": true
  },
  "expires": "2026-03-27T12:00:00.000Z"
}
```

---

### 4. Logout
**Endpoint**: `POST /auth/signout`

**Headers**:
```
Content-Type: application/json
Cookie: authjs.session-token=your-session-token
```

**Request Body**:
```json
{
  "csrfToken": "your-csrf-token"
}
```

**Success Response (302 Redirect)**:
- Clears session cookies
- Redirects to login page

---

## 📊 Dashboard APIs

### 1. Get Dashboard Data
**Endpoint**: `GET /dashboard`

**Headers**:
```
Cookie: authjs.session-token=your-session-token
```

**Query Parameters**:
```
lang=hi|en
```

**Success Response (200)**:
```json
{
  "stats": {
    "total": 8,
    "applied": 3,
    "approved": 2,
    "pending": 2,
    "saved": 5
  },
  "topSchemes": [
    {
      "id": "pm-kisan",
      "nameHindi": "पीएम किसान सम्मान निधि",
      "nameEnglish": "PM Kisan Samman Nidhi",
      "category": "agriculture",
      "ministry": "Ministry of Agriculture",
      "benefitAmount": "₹6,000/साल",
      "difficulty": "easy",
      "matchPercent": 85,
      "docsReady": 2,
      "docsNeeded": 1,
      "isSaved": false
    }
  ],
  "reminders": [
    {
      "id": 1,
      "title": "PM-KISAN Installment",
      "dueDate": "2026-03-31T00:00:00.000Z",
      "type": "installment",
      "icon": "💰"
    }
  ],
  "recentActivity": [
    {
      "id": 1,
      "description": "PM-KISAN में Apply किया ✅",
      "time": "2 दिन पहले",
      "icon": "📋"
    }
  ]
}
```

---

## 🎯 Scheme APIs

### 1. Match Schemes for User
**Endpoint**: `POST /schemes/match`

**Headers**:
```
Content-Type: application/json
Cookie: authjs.session-token=your-session-token
```

**Success Response (200)**:
```json
{
  "schemes": [
    {
      "slug": "pm-kisan",
      "nameEnglish": "PM Kisan Samman Nidhi",
      "nameHindi": "पीएम किसान सम्मान निधि",
      "descriptionEnglish": "Income support of ₹6,000 per year to small farmers",
      "descriptionHindi": "छोटे किसानों को प्रति वर्ष ₹6,000 की आय सहायता",
      "level": "central",
      "category": "agriculture",
      "matchPercent": 85,
      "reasoning": "आपकी पात्रता अच्छी है",
      "missingDocs": ["आधार कार्ड", "भूमि के कागजात", "बैंक खाता"]
    }
  ]
}
```

---

### 2. Get All Schemes
**Endpoint**: `GET /schemes`

**Query Parameters**:
```
category=agriculture|education|health
level=central|state
limit=10
offset=0
```

**Success Response (200)**:
```json
{
  "schemes": [
    {
      "id": "pm-kisan",
      "nameHindi": "पीएम किसान सम्मान निधि",
      "nameEnglish": "PM Kisan Samman Nidhi",
      "category": "agriculture",
      "level": "central",
      "ministry": "Ministry of Agriculture",
      "benefitAmount": "₹6,000/साल",
      "difficulty": "easy"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

---

## 📮 Testing with Postman

### Step 1: Import Collection
1. Download the Postman collection: [SarkariSaathi API Collection](postman_collection.json)
2. Open Postman
3. Click "Import" → "Select File"
4. Choose the downloaded collection file

### Step 2: Setup Environment
Create environment variables:
```
BASE_URL = http://localhost:3000/api
SESSION_TOKEN = your-session-token
CSRF_TOKEN = your-csrf-token
USER_EMAIL = test@example.com
USER_PASSWORD = password123
```

### Step 3: Authentication Flow
1. **Register User**: Use `/auth/register` endpoint
2. **Get CSRF Token**: Visit `/auth/providers` in browser
3. **Login**: Use `/auth/callback/credentials` with CSRF token
4. **Copy Session Token**: From response cookies
5. **Update Environment**: Set `SESSION_TOKEN` variable

### Step 4: Test APIs
Run requests in this order:
1. Register (if new user)
2. Login
3. Get Session
4. Dashboard Data
5. Scheme Matching
6. Logout

---

## 🚨 Common Error Codes

| Status Code | Meaning | Solution |
|-------------|---------|----------|
| 200 | Success | Request completed successfully |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request body or parameters |
| 401 | Unauthorized | Invalid credentials or missing session |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Endpoint doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal server error |

---

## 💡 Tips & Tricks

### 1. Session Management
- Always include session cookies in authenticated requests
- Session expires after 30 days of inactivity
- Use `/auth/session` to verify session validity

### 2. CSRF Protection
- Get CSRF token from `/auth/providers` endpoint
- Include CSRF token in all POST requests
- CSRF token changes with each session

### 3. Error Handling
- Always check response status codes
- Parse error messages for debugging
- Use proper HTTP methods (GET, POST, PUT, DELETE)

### 4. Performance Tips
- Use pagination for large datasets
- Cache frequently accessed data
- Implement request debouncing for search APIs

### 5. Security Best Practices
- Never expose sensitive data in URLs
- Use HTTPS in production
- Validate all input data
- Implement rate limiting

---

## 🔧 Postman Collection Example

```json
{
  "info": {
    "name": "SarkariSaathi APIs",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"रमेश कुमार\",\n  \"phone\": \"9876543210\",\n  \"email\": \"ramesh@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{BASE_URL}}/auth/register",
              "host": ["{{BASE_URL}}"],
              "path": ["auth", "register"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## 📞 Support

For any API-related issues:
1. Check server logs: `pnpm run dev`
2. Verify request format and headers
3. Ensure application is running on `localhost:3000`
4. Check network connectivity

---

**Happy Testing! 🚀**

*Last Updated: March 26, 2026*
