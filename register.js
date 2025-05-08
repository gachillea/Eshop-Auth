document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const confirmPassword = form.confirmPassword.value;
  
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
  
        if (!response.ok) {
          const error = await response.json();
          alert(error.message || 'Registration failed');
          return;
        }
  
        const data = await response.json();
        alert('Registration successful! You can now log in.');
        window.location.href = 'login.html';
  
      } catch (err) {
        console.error('Register error:', err);
        alert('An error occurred while registering.');
      }
    });
  });
  