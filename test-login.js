// Test Login API
const testLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        csrfToken: 'dummy',
        callbackUrl: 'http://localhost:3000/dashboard',
        json: true
      })
    });

    console.log('Login Response Status:', response.status);
    console.log('Login Response Headers:', Object.fromEntries(response.headers));
    
    if (response.redirected) {
      console.log('✅ Login successful! Redirected to:', response.url);
    } else {
      const result = await response.text();
      console.log('Login Response:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

testLogin();
