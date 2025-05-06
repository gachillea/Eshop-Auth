// Cart state
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartOpen = false;

// Toggle cart visibility
function toggleCart() {
  cartOpen = !cartOpen;
  const cartDropdown = document.querySelector('.cart-dropdown');
  if (cartOpen) {
    cartDropdown.classList.add('open');
  } else {
    cartDropdown.classList.remove('open');
  }
  updateCartUI();
}

// Add to cart function
async function addToCart(productId) {
  console.log("Adding product to cart:", productId);
  
  // Έλεγξε αν υπάρχει ήδη στο καλάθι
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
    updateCartUI();
    return;
  }

  try {
    // Φέρε το προϊόν από το backend
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product');

    const product = await response.json();

    // Πρόσθεσε στο καλάθι
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      likes: product.likes || 0,
      quantity: 1
    });

    updateCartUI();
  } catch (err) {
    console.error('Error adding to cart:', err);
  }
}



// Remove from cart
function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1); // αφαιρεί 1 στοιχείο από τη θέση index
    updateCartUI();
  }
}

// Update quantity
function updateQuantity(productId, newQuantity) {
  const product = cart.find(item => item.id === productId);
  if (!product) {
      console.error("Product not found in cart!");
      return;
  }
  product.quantity = newQuantity;
  if(product.quantity == 0)
    removeFromCart(product.id)
  updateCartUI();
}


// Update cart UI
function updateCartUI() {
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');

  if (!cartCount || !cartItems || !cartTotal) return;

  // Αν cart είναι undefined ή δεν είναι array, ορίζουμε κενό πίνακα
  const safeCart = Array.isArray(cart) ? cart : [];

  // Update cart count
  const totalItems = safeCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
  console.log("Cart contents:", cart.toString());

  // Update cart items list
  cartItems.innerHTML = safeCart.map(item => `
    <div class="cart-item">
      <img class="cartitem-img" src="${item.image || ''}" alt="${item.name || 'Unknown'}">
      <div class="cart-item-details">
        <h4>${item.name || 'Unknown'}</h4>
        <div class="cart-item-controls">
          <div class="cart-plusminus">
            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-item" onclick="removeFromCart('${item.id}')">
        <i class="fa-solid fa-trash"></i>
      </button>
        </div>
        <span class="cart-item-price">$${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
      </div>
      
    </div>
  `).join('');

  // Update total
  const total = safeCart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
  const cartFooter = document.querySelector('.cart-footer');

cartFooter.innerHTML = `
  <div class="cart-total">$${total.toFixed(2)}</div>
  <button class="checkout-btn">Proceed to Checkout</button>
`;

document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (totalItems > 0) {
    window.location.href = 'checkout.html';
  }
  else{
    alert("Your cart is empty");
  }
});

  localStorage.setItem('cart', JSON.stringify(cart));
  updateWishlistUI();
}