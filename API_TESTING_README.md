# 🧪 SarkariSaathi API Testing Setup

## 📁 Files Created

1. **`API_TESTING_GUIDE.md`** - Complete API documentation
2. **`SarkariSaathi_API_Collection.postman_collection.json`** - Postman collection
3. **`SarkariSaathi_Environment.postman_environment.json`** - Postman environment
4. **`test-apis.js`** - Command line testing script

---

## 🚀 Quick Start

### Option 1: Command Line Testing (Recommended)

```bash
# Make sure your server is running
pnpm run dev

# In another terminal, run the test script
node test-apis.js
```

This will automatically test all APIs and give you a detailed report.

### Option 2: Postman Testing

1. **Install Postman** if you haven't already
2. **Import the Collection**:
   - Open Postman
   - Click "Import" → "Select File"
   - Choose `SarkariSaathi_API_Collection.postman_collection.json`

3. **Import the Environment**:
   - Go to Environments tab
   - Click "Import"
   - Choose `SarkariSaathi_Environment.postman_environment.json`

4. **Run Tests**:
   - Select "SarkariSaathi - Local Development" environment
   - Run requests in order: Register → Login → Dashboard → Schemes

---

## 📋 Available APIs

### 🔐 Authentication APIs
- `POST /auth/register` - Register new user
- `GET /auth/providers` - Get CSRF token
- `POST /auth/callback/credentials` - Login user
- `GET /auth/session` - Get session info
- `POST /auth/signout` - Logout user

### 📊 Dashboard APIs
- `GET /dashboard` - Get dashboard data (requires auth)

### 🎯 Scheme APIs
- `POST /schemes/match` - Match schemes for user (requires auth)
- `GET /schemes` - Get all schemes (public)

---

## 🧪 Testing with Command Line

### Prerequisites
- Node.js installed
- SarkariSaathi app running on `localhost:3000`

### Run Tests
```bash
# Start the server
cd apps/web
pnpm run dev

# In another terminal, run tests
node test-apis.js
```

### Expected Output
```
🚀 Starting SarkariSaathi API Tests...

============================================================
  🔐 Testing Register API
============================================================

✅ User Registration
   User ID: user_1648234567890

============================================================
  🔑 Getting Auth Providers (CSRF Token)
============================================================

✅ Auth Providers
   CSRF token obtained

... (more tests) ...

============================================================
  🎯 Final Results
============================================================
Passed: 7/7
Success Rate: 100%

🎉 All tests passed! Your APIs are working perfectly!
```

---

## 📮 Testing with Postman

### Step 1: Setup Environment
Import the environment file and set these variables:
- `BASE_URL` - `http://localhost:3000/api`
- `testEmail` - Your test email
- `testPassword` - `password123`
- `testPhone` - `9876543210`
- `testName` - `टेस्ट यूजर`

### Step 2: Test Flow
1. **Register User** - Create a new test account
2. **Get CSRF Token** - Get authentication token
3. **Login User** - Authenticate with credentials
4. **Get Session** - Verify session is active
5. **Dashboard Data** - Get user dashboard
6. **Scheme Matching** - Get personalized schemes
7. **Get Schemes** - Browse all schemes
8. **Logout** - End session

### Step 3: Check Results
Each request has automated tests that will show:
- ✅ Pass - Request successful
- ❌ Fail - Request failed
- 📊 Response data in console

---

## 🔍 Common Issues & Solutions

### Issue: "Server is not running"
**Solution**: Start the development server
```bash
cd apps/web
pnpm run dev
```

### Issue: "CSRF token required"
**Solution**: Call `/auth/providers` first to get CSRF token

### Issue: "Session expired"
**Solution**: Login again to get fresh session

### Issue: "User already exists"
**Solution**: Use different email/phone or change timestamp in test script

### Issue: "401 Unauthorized"
**Solution**: Make sure you're logged in and session is valid

---

## 🛠️ Advanced Testing

### Custom Test Data
Edit `test-apis.js` to modify test user data:
```javascript
const testUser = {
  name: 'Custom Name',
  phone: '9876543299',
  email: `custom${Date.now()}@example.com`,
  password: 'password123'
};
```

### Add New Tests
Add new test functions in `test-apis.js`:
```javascript
async function testNewAPI() {
  logSection('🆕 Testing New API');
  
  const result = await makeRequest('GET', '/new-endpoint');
  
  if (result.status === 200) {
    logTest('New API', true, 'Working correctly');
    return { success: true };
  } else {
    logTest('New API', false, result.data.error);
    return { success: false };
  }
}
```

### Environment Variables
For different environments, update the `BASE_URL`:
- **Local**: `http://localhost:3000/api`
- **Staging**: `https://staging.sarkari-saathi.com/api`
- **Production**: `https://sarkari-saathi.com/api`

---

## 📊 Test Reports

### Command Line Report
The test script provides:
- ✅ Individual test results
- 📈 Statistics and metrics
- 🎯 Overall success rate
- 🔍 Detailed error messages

### Postman Test Results
Each request includes:
- Automatic response validation
- Status code checking
- Data structure verification
- Error handling tests

---

## 🔐 Security Testing

### Authentication Flow
1. Register → Get CSRF → Login → Access Protected APIs
2. Test without authentication (should fail)
3. Test with invalid credentials (should fail)
4. Test session expiration

### Data Validation
- Input validation testing
- SQL injection protection
- XSS protection
- Rate limiting

---

## 📞 Support

For any issues:
1. Check server logs: `pnpm run dev`
2. Verify API endpoints in code
3. Check network connectivity
4. Review error messages

---

## 🎯 Best Practices

1. **Always test in order**: Register → Login → Use APIs
2. **Clean up test data**: Delete test users after testing
3. **Use environment variables**: Don't hardcode credentials
4. **Check response codes**: Verify HTTP status codes
5. **Validate responses**: Check response structure and data

---

**Happy Testing! 🚀**

*Last Updated: March 26, 2026*
