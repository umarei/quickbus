// frontend/js/auth.js

// Handle Signup
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
  
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        credentials: 'include', // Important for session cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        window.location.href = 'buses.html';
      } else {
        alert(data.message || data.error);
      }
    });
  }
  
  // Handle Login
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
  
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include', // Important for session cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        window.location.href = 'buses.html';
      } else {
        alert(data.message || data.error);
      }
    });
  }
   