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
  