// Test Register API
const testRegister = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        phone: '9876543215',
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const result = await response.json();
    console.log('Register Response:', result);
    
    if (result.success) {
      console.log('✅ Registration successful!');
      console.log('User ID:', result.userId);
    } else {
      console.log('❌ Registration failed:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

testRegister();
