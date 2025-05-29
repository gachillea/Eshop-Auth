document.addEventListener('DOMContentLoaded', () => {
    const orderContainer = document.getElementById('order');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!orderContainer) return;

    console.log(cart);
    // Αν δεν υπάρχει cart ή δεν είναι πίνακας, βγάζουμε μήνυμα
    if (!Array.isArray(cart) || cart.length === 0) {
      orderContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    // Δημιουργία HTML για κάθε προϊόν
    orderContainer.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <div>
          <img class="shop-img" src="${item.image || ''}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
    `).join('');

    // Προσθήκη συνολικού ποσού
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalHTML = `
      <div>
        Total: $${total.toFixed(2)}
      </div>
    `;
    orderContainer.insertAdjacentHTML('beforeend', totalHTML);
});

function sendOrder() {
    const form = document.getElementById('checkout-form');
    const inputs = form.querySelectorAll('input[required]');
    const emptyFields = [];

    // Check each required field
    inputs.forEach(input => {
        if (!input.value.trim()) {
            emptyFields.push(input.previousElementSibling.textContent); // Get label text
            input.style.borderColor = '#e74c3c'; // Red border for empty fields
            input.style.backgroundColor = '#fff5f5'; // Light red background
        } else {
            input.style.borderColor = '#e0e0e0'; // Reset border
            input.style.backgroundColor = '#fafafa'; // Reset background
        }
    });

    // If there are empty fields, show error message
    if (emptyFields.length > 0) {
        alert(`Please fill in the following fields:\n- ${emptyFields.join('\n- ')}`);
        return false; // Prevent form submission
    }

    // Basic email validation
    const emailInput = form.querySelector('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#e74c3c';
        emailInput.style.backgroundColor = '#fff5f5';
        alert('Please enter a valid email address.');
        return false;
    }

    // Basic phone validation (simple check for numbers and common characters)
    const phoneInput = form.querySelector('input[type="tel"]');
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (phoneInput && (!phoneRegex.test(phoneInput.value) || phoneInput.value.replace(/\D/g, '').length < 10)) {
        phoneInput.style.borderColor = '#e74c3c';
        phoneInput.style.backgroundColor = '#fff5f5';
        alert('Please enter a valid phone number (at least 10 digits).');
        return false;
    }

    // If all validations pass
    alert("The order was successful!\nPayment in cash when it arrives");
    return true;
}