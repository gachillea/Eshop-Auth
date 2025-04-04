const products = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: 150.00,
      image: "img/slider1.png",
      category: "Men's Shoes",
      description: "The Nike Air Max 270 delivers a comfortable fit and bold style."
    },
    {
      id: 2,
      name: "Nike Air Force 1 '07",
      price: 110.00,
      image: "img/slider2.png",
      category: "Men's Shoes",
      description: "The radiance lives on in the Nike Air Force 1 '07."
    },
    {
      id: 3,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "img/slider3.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride."
    },
    {
      id: 4,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride."
    },
    {
      id: 5,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride."
    },
    {
      id: 6,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride."
    },
    {
      id: 7,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride."
    }
  ];

  // Display products function
  function displayProducts(searchTerm = '') {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Clear previous results
  
    // Filter products based on search term
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (filteredProducts.length === 0) {
      productList.innerHTML = '<p class="no-results">No products found. Try a different search.</p>';
      return;
    }
  
    // Generate product cards
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'shopcard-component';
      productCard.innerHTML = `
        <div class="shop-img">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
            <button class="add-to-wishlist" onclick="addToWishlist(${product.id})">
              <i class="fa-solid fa-heart"></i> Add to Wishlist
            </button>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  }
  
  // Initialize products on page load
  window.onload = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayProducts();
    
    // Setup search button
    document.querySelector('.search-bar button').addEventListener('click', function() {
      const searchTerm = document.getElementById('searchInput').value;
      displayProducts(searchTerm);
    });
    
    // Optional: Add search on enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        displayProducts(this.value);
      }
    });
  };
  