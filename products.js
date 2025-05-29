// Fetch products από το backend με αναζήτηση
async function fetchProducts(searchTerm = '') {
  try {
    // Αν υπάρχει όρος αναζήτησης, το στέλνουμε ως query string
    const url = searchTerm ? `http://localhost:5000/products/search?query=${searchTerm}` : 'http://localhost:5000/products/search';

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();

    // Καθαρίζουμε το local array και το γεμίζουμε με τα δεδομένα από το backend
    const products = data.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
      likes: p.likes || 0
    }));

    // Προβολή προϊόντων στην οθόνη
    displayProducts(products);
  } catch (err) {
    console.error('Error loading products:', err);
  }
}

// Προβολή των προϊόντων στην οθόνη
function displayProducts(products) {
  const user = JSON.parse(localStorage.getItem("user"));
  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = '<p class="no-results">No products found. Try a different search.</p>';
    return;
  }

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'shopcard-component';
    productCard.innerHTML = `
      <a class="product-image-container" href="#">
        <img src="${product.image}" alt="${product.name}" onclick="toggleLike('${product.id}')">
        <span class="discount-badge">39% OFF</span>
      </a>
      <div class="product-details">
        <a href="#">
          <h5 class="product-title">${product.name}</h5>
        </a>
        <div class="price-rating-container">
          <p class="price-container">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            <span class="original-price">$${(product.price * 1.6393).toFixed(2)}</span>
          </p>
          <div class="rating-container">
            <span class="like-count">
            <i class="fa-solid fa-heart" style="color: ${user.likes.includes(product.id) ? 'red' : 'gray'}"></i> ${product.likes}
          </span>

          </div>
        </div>
        <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" class="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to cart
        </button>
      </div>
    `;
    productList.appendChild(productCard);
  });

}

// Toggle like για ένα προϊόν
async function toggleLike(productId) {
  const user = JSON.parse(localStorage.getItem("user"));
  const scrollPosition = window.scrollY;

  try {
    const response = await fetch('http://localhost:5000/users/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user._id,
        product_id: productId
      })
    });

    if (!response.ok) throw new Error('Failed to toggle like');

    const result = await response.json();
    console.log(result.message);

    // Refresh products to reflect like change
    fetchProducts();

    // Επαναφορά scroll μετά την ανανέωση
    window.scrollTo({ top: scrollPosition, behavior: 'auto' });

  } catch (err) {
    console.error('Error toggling like:', err);
  }
  if (!user.likes.includes(productId)) {
      user.likes.push(productId);
    } else {
      // Εάν έχει ήδη γίνει like, αφαίρεσέ το (toggle off)
      user.likes = user.likes.filter(id => id !== productId);
    }

    // Ενημέρωση στο localStorage
  localStorage.setItem("user", JSON.stringify(user));
  console.log(JSON.stringify(user));

}

// Εισαγωγή προϊόντων με βάση την αναζήτηση
window.onload = function() {
  // Κλήση για τα προϊόντα από το backend κατά την φόρτωση της σελίδας
  fetchProducts();

  // Αναζήτηση προϊόντων
  document.querySelector('.search-bar button').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value;
    fetchProducts(searchTerm);
  });

  // Ενεργοποίηση της αναζήτησης με το πλήκτρο Enter
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      fetchProducts(this.value);
    }
  });
};
