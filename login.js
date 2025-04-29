document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = form.email.value;
      const password = form.password.value;
  
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
  
        if (!response.ok) {
          const error = await response.json();
          alert(error.message || 'Login failed');
          return;
        }
  
        const data = await response.json();
        // Save token or user info if needed
        localStorage.setItem('token', data.token); // example
        alert('Login successful!');
        window.location.href = 'index.html'; // or wherever you redirect after login
  
      } catch (err) {
        console.error('Login error:', err);
        alert('An error occurred while logging in.');
      }
    });
  });
  