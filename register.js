document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#registerForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    try {
      const response = await fetch('http://127.0.0.1:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Registration failed');
        return;
      }

      alert('Registration successful!');
      window.location.href = 'login.html';
    } catch (err) {
      console.error('Registration error:', err);
      alert('An error occurred while registering.');
    }
  });
});
