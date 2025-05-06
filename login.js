document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    try {
      const response = await fetch('http://127.0.0.1:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        alert(data.error || 'Login failed');
        return;
      }

      alert('Login successful!');
      localStorage.setItem('username', username);
      window.location.href = 'index.html';
      
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred while logging in.');
    }
  });
});
