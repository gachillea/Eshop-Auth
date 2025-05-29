document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#registerForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    // Basic validation
    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Registration failed');
        return;
      }

      alert('Registration successful! Welcome to Nike!');
      window.location.href = 'login.html';
    } catch (err) {
      console.error('Registration error:', err);
      alert('An error occurred while registering. Please try again.');
    }
  });
});
