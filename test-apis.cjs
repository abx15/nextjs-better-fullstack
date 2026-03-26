#!/usr/bin/env node

/**
 * SarkariSaathi API Testing Script
 * Run this script to test all APIs automatically
 * Usage: node test-apis.js
 */

const BASE_URL = 'http://localhost:3000/api';

// Test data
const testUser = {
  name: 'टेस्ट यूजर',
  phone: `9876543${String(Date.now()).slice(-4)}`, // Unique phone number
  email: `testuser${Date.now()}@example.com`,
  password: 'password123'
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, colors.blue);
  log(`  ${title}`, colors.blue);
  log(`${'='.repeat(60)}\n`, colors.blue);
}

function logTest(name, status, details = '') {
  const icon = status ? '✅' : '❌';
  const color = status ? colors.green : colors.red;
  log(`${icon} ${name}`, color);
  if (details) {
    log(`   ${details}`, colors.yellow);
  }
}

// Global variables for session
let sessionCookies = '';

async function makeRequest(method, endpoint, data = null, headers = {}) {
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    // Add session cookies for authenticated requests
    if (sessionCookies) {
      config.headers.Cookie = sessionCookies;
    }

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const responseData = await response.json().catch(() => ({}));

    // Extract and store session cookies
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      sessionCookies = setCookieHeader.split(';')[0];
    }

    return {
      status: response.status,
      ok: response.ok,
      data: responseData,
      headers: response.headers
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      data: { error: error.message },
      headers: {}
    };
  }
}

async function testRegisterAPI() {
  logSection('🔐 Testing Register API');
  
  const result = await makeRequest('POST', '/auth/register', testUser);
  
  if (result.status === 201) {
    logTest('User Registration', true, `User ID: ${result.data.userId}`);
    return { success: true, userId: result.data.userId };
  } else {
    logTest('User Registration', false, result.data.error || 'Unknown error');
    return { success: false };
  }
}

async function testAuthProviders() {
  logSection('🔑 Getting Auth Providers (CSRF Token)');
  
  const result = await makeRequest('GET', '/auth/providers');
  
  if (result.status === 200) {
    logTest('Auth Providers', true, 'CSRF token obtained');
    return { success: true, csrfToken: result.data.csrfToken };
  } else {
    logTest('Auth Providers', false, 'Failed to get CSRF token');
    return { success: false };
  }
}

async function testLoginAPI(csrfToken) {
  logSection('🔓 Testing Login API');
  
  const loginData = {
    email: testUser.email,
    password: testUser.password,
    csrfToken: csrfToken,
    callbackUrl: 'http://localhost:3000/dashboard',
    json: true
  };

  const result = await makeRequest('POST', '/auth/callback/credentials', loginData);
  
  if (result.status === 302 || result.status === 200) {
    logTest('User Login', true, 'Login successful');
    return { success: true };
  } else {
    logTest('User Login', false, result.data.error || 'Login failed');
    return { success: false };
  }
}

async function testSessionAPI() {
  logSection('👤 Testing Session API');
  
  const result = await makeRequest('GET', '/auth/session');
  
  if (result.status === 200) {
    const data = result.data;
    if (data && data.user) {
      logTest('Session Check', true, `User: ${data.user.name || data.user.email}`);
      return { success: true, user: data.user };
    } else {
      logTest('Session Check', false, 'No active session (user not logged in)');
      return { success: false };
    }
  } else {
    logTest('Session Check', false, 'Failed to check session');
    return { success: false };
  }
}

async function testDashboardAPI() {
  logSection('📊 Testing Dashboard API');
  
  const result = await makeRequest('GET', '/dashboard?lang=hi');
  
  if (result.status === 200) {
    const data = result.data;
    logTest('Dashboard Data', true, `Found ${data.topSchemes?.length || 0} schemes`);
    
    if (data.stats) {
      log('   📈 Stats:', colors.yellow);
      log(`      Total Schemes: ${data.stats.total}`, colors.yellow);
      log(`      Applied: ${data.stats.applied}`, colors.yellow);
      log(`      Approved: ${data.stats.approved}`, colors.yellow);
      log(`      Pending: ${data.stats.pending}`, colors.yellow);
      log(`      Saved: ${data.stats.saved}`, colors.yellow);
    }
    
    return { success: true, data };
  } else {
    logTest('Dashboard Data', false, result.data.error || 'Failed to load dashboard');
    return { success: false };
  }
}

async function testSchemesMatchAPI() {
  logSection('🎯 Testing Schemes Match API');
  
  const result = await makeRequest('POST', '/schemes/match', {});
  
  if (result.status === 200) {
    const schemes = result.data.schemes || [];
    logTest('Scheme Matching', true, `Found ${schemes.length} matching schemes`);
    
    if (schemes.length > 0) {
      log('   🏆 Top Match:', colors.yellow);
      log(`      ${schemes[0].nameHindi || schemes[0].nameEnglish}`, colors.yellow);
      log(`      Match: ${schemes[0].matchPercent || 0}%`, colors.yellow);
    }
    
    return { success: true, schemes };
  } else {
    logTest('Scheme Matching', false, result.data.error || 'Matching failed');
    return { success: false };
  }
}

async function testGetSchemesAPI() {
  logSection('📋 Testing Get Schemes API');
  
  const result = await makeRequest('GET', '/schemes?category=agriculture&limit=5');
  
  if (result.status === 200) {
    const schemes = result.data.schemes || [];
    logTest('Get Schemes', true, `Found ${schemes.length} agriculture schemes`);
    
    if (schemes.length > 0) {
      log('   🌾 Sample Scheme:', colors.yellow);
      log(`      ${schemes[0].nameHindi || schemes[0].nameEnglish}`, colors.yellow);
      log(`      Category: ${schemes[0].category}`, colors.yellow);
    }
    
    return { success: true, schemes };
  } else {
    logTest('Get Schemes', false, result.data.error || 'Failed to get schemes');
    return { success: false };
  }
}

async function runAllTests() {
  log('🚀 Starting SarkariSaathi API Tests...\n', colors.blue);
  
  const results = {
    register: await testRegisterAPI(),
    providers: await testAuthProviders(),
    login: null,
    session: null,
    dashboard: null,
    match: null,
    schemes: null
  };

  // Test login only if we got CSRF token
  if (results.providers.success) {
    results.login = await testLoginAPI(results.providers.csrfToken);
  }

  // Test session after login
  results.session = await testSessionAPI();

  // Test authenticated APIs
  if (results.session.success) {
    results.dashboard = await testDashboardAPI();
    results.match = await testSchemesMatchAPI();
  }

  // Test public APIs
  results.schemes = await testGetSchemesAPI();

  // Summary
  logSection('📊 Test Results Summary');
  
  const tests = [
    { name: 'User Registration', result: results.register.success },
    { name: 'Auth Providers', result: results.providers.success },
    { name: 'User Login', result: results.login?.success || false },
    { name: 'Session Check', result: results.session.success },
    { name: 'Dashboard API', result: results.dashboard?.success || false },
    { name: 'Scheme Matching', result: results.match?.success || false },
    { name: 'Get Schemes', result: results.schemes?.success || false }
  ];

  let passed = 0;
  let total = tests.length;

  tests.forEach(test => {
    logTest(test.name, test.result);
    if (test.result) passed++;
  });

  logSection('🎯 Final Results');
  log(`Passed: ${passed}/${total}`, passed === total ? colors.green : colors.yellow);
  log(`Success Rate: ${Math.round((passed / total) * 100)}%`, colors.blue);

  if (passed === total) {
    log('\n🎉 All tests passed! Your APIs are working perfectly!', colors.green);
  } else {
    log('\n⚠️  Some tests failed. Check the application status.', colors.yellow);
  }

  process.exit(passed === total ? 0 : 1);
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    log('❌ Server is not running on http://localhost:3000', colors.red);
    log('Please start the server with: pnpm run dev', colors.yellow);
    process.exit(1);
  }

  await runAllTests();
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  log(`❌ Uncaught Error: ${error.message}`, colors.red);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log(`❌ Unhandled Rejection: ${reason}`, colors.red);
  process.exit(1);
});

// Run the tests
if (require.main === module) {
  main();
}

module.exports = {
  testRegisterAPI,
  testLoginAPI,
  testSessionAPI,
  testDashboardAPI,
  testSchemesMatchAPI,
  testGetSchemesAPI,
  runAllTests
};
