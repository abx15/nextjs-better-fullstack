// Test Dashboard Page
fetch('http://localhost:3000/dashboard')
  .then(response => response.text())
  .then(html => {
    console.log('Dashboard loaded successfully');
  })
  .catch(error => {
    console.error('Dashboard error:', error);
  });
