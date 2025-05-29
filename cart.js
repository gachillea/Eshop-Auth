let cart = [];
let cartOpen = false;

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Αν υπάρχει user, φέρε το καλάθι του από το backend
if (user && user._id) {
  fetch(`http://localhost:5000/users/cart?user_id=${user._id}`, { mode: "cors" })
    .then((res) => res.json())
    .then((products) => {
      cart = products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        likes: product.likes || 0,
        quantity: product.quantity || 1
      }));
      updateCartUI();
    })
    .catch((err) => {
      console.error("Error loading cart from backend:", err);
    });
}

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

// Add to cart
async function addToCart(productId) {
  console.log("Adding product to cart:", productId);
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    updateQuantity(productId, existingItem.quantity + 1);
    updateCartUI();
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/products/${productId}`, { mode: "cors" });
    if (!response.ok) throw new Error('Failed to fetch product');
    const product = await response.json();

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

    // Αν υπάρχει user, ενημέρωσε το backend
    if (user && user._id) {
      await fetch("http://localhost:5000/users/cart", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user._id,
          product_id: product._id
        })
      });
    }

    updateCartUI();
  } catch (err) {
    console.error('Error adding to cart:', err);
  }
}

function removeFromCart(productId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user._id) return;

  fetch("http://localhost:5000/users/cart", {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user._id,
      product_id: productId,
    }),
  })
  .then((res) => {
    if (!res.ok) throw new Error("Failed to remove item");
    // Αφαίρεσε από το cart του frontend
    const index = cart.findIndex(
      (item) => item.id === productId
    );
    if (index !== -1) {
      cart.splice(index, 1);
      updateCartUI();
    }
  })
  .catch((err) => {
    console.error("Remove error:", err);
  });
}

// Update quantity
async function updateQuantity(productId, newQuantity) {
  const product = cart.find(item => item.id === productId);
  if (!product) return;

  product.quantity = newQuantity;

  // Αν quantity <= 0, αφαίρεσέ το
  if (product.quantity <= 0) {
    removeFromCart(product.id);
  }

  updateCartUI();
  // Ενημέρωση στο backend
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user._id) {
    console.error("User not found in localStorage");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/users/cart', {
      method: 'PATCH',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user._id,
        product_id: productId,
        quantity: product.quantity
      })
    });


    if (!response.ok) {
      throw new Error('Failed to update cart on server');
    }

    console.log("Cart updated on server");
  } catch (err) {
    console.error("Error updating cart on server:", err);
  }
}

// Update cart UI
function updateCartUI() {
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');

  if (!cartCount || !cartItems || !cartTotal) return;

  const safeCart = Array.isArray(cart) ? cart : [];
  const totalItems = safeCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const total = safeCart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

  // Save cart to localStorage so checkout page can access it
  localStorage.setItem('cart', JSON.stringify(safeCart));

  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

  cartItems.innerHTML = safeCart.map(item => `
    <div class="cart-item">
      <img class="cartitem-img" src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
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
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  `).join('');

  const cartFooter = document.querySelector('.cart-footer');
  cartFooter.innerHTML = `
    <div class="cart-total">$${total.toFixed(2)}</div>
    <button class="checkout-btn">Proceed to Checkout</button>
  `;

  document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (totalItems > 0) {
      // Make sure cart is saved to localStorage before navigating
      localStorage.setItem('cart', JSON.stringify(safeCart));
      window.location.href = 'checkout.html';
    } else {
      alert("Your cart is empty");
    }
  });
}
