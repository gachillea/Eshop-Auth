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
      <div class="shop-img">
        <img src="${product.image}" alt="${product.name}" onclick="toggleLike('${product.id}')">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <span class="like-count">
            <i class="fa-solid fa-heart" style="color: ${user.likes.includes(product.id) ? 'red' : 'gray'}"></i> ${product.likes}
          </span>
          <button class="add-to-cart" onclick="addToCart('${product.id}')">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

// Toggle like για ένα προϊόν
async function toggleLike(productId) {
  const user = JSON.parse(localStorage.getItem("user"));

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
