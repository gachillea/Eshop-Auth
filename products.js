const products = [
    {
      id: 2,
      name: "Nike Air Force 1 '07",
      price: 110.00,
      image: "img/slider2.png",
      category: "Men's Shoes",
      description: "The radiance lives on in the Nike Air Force 1 '07.",
      likes:0,
      liked:false
    },
    {
      id: 3,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "img/slider3.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride.",
      likes:0,
      liked:false
    },
    {
      id: 4,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride.",
      likes:0,
      liked:false
    },
    {
      id: 5,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride.",
      likes:0,
      liked:false
    },
    {
      id: 6,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride.",
      likes:0,
      liked:false
    },
    {
      id: 7,
      name: "Nike Air Zoom Pegasus 40",
      price: 130.00,
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
      category: "Running Shoes",
      description: "Responsive cushioning provides a smooth ride.",
      likes:0,
      liked:false
    }
  ];

  // Display products function
  function displayProducts(searchTerm = '') {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';
  
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (filteredProducts.length === 0) {
      productList.innerHTML = '<p class="no-results">No products found. Try a different search.</p>';
      return;
    }
  
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'shopcard-component';
          productCard.innerHTML = `
        <div class="shop-img">
          <img src="${product.image}" alt="${product.name}" onclick="toggleLike(${product.id})">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <span class="like-count">
              <i class="fa-solid fa-heart"></i> ${product.likes}
            </span>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  }
  
  // Initialize products on page load
  window.onload = function() {
    displayProducts();
    
    document.querySelector('.search-bar button').addEventListener('click', function() {
      const searchTerm = document.getElementById('searchInput').value;
      displayProducts(searchTerm);
    });
    
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        displayProducts(this.value);
      }
    });
  };
  
  // Toggle like for a product
  function toggleLike(productId) {
    const index = products.findIndex(product => product.id === productId)
    if(!wishlist.find(product => product.id === productId) && !products[index].liked)
    {
      products[index].likes++;
      products[index].liked=true;
      addToWishlist(products[index].id);
      console.log(JSON.stringify(products[index]));
    }

    displayProducts();
  }
  