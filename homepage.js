// Product data for slider
const sliderProducts = [
  {
    id: 2,
    name: "Nike Air Force 1 '07",
    price: 110.00,
    image: "img/slider2.png",
    category: "Men's Shoes",
    description: "The radiance lives on in the Nike Air Force 1 '07.",
    likes:0
  },
  {
    id: 3,
    name: "Nike Air Zoom Pegasus 40",
    price: 130.00,
    image: "img/slider3.png",
    category: "Running Shoes",
    description: "Responsive cushioning provides a smooth ride.",
    likes:0 },
  {
    id: 4,
    name: "Nike Air Zoom Pegasus 40",
    price: 130.00,
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
    category: "Running Shoes",
    description: "Responsive cushioning provides a smooth ride.",
    likes:0
  },
  {
    id: 5,
    name: "Nike Air Zoom Pegasus 40",
    price: 130.00,
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
    category: "Running Shoes",
    description: "Responsive cushioning provides a smooth ride.",
    likes:0
  },
  {
    id: 6,
    name: "Nike Air Zoom Pegasus 40",
    price: 130.00,
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
    category: "Running Shoes",
    description: "Responsive cushioning provides a smooth ride.",
    likes:0
  },
  {
    id: 7,
    name: "Nike Air Zoom Pegasus 40",
    price: 130.00,
    image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-zoom-pegasus-40-mens-road-running-shoes-zD8H1c.png",
    category: "Running Shoes",
    description: "Responsive cushioning provides a smooth ride.",
    likes:0
  }
];


// Initialize slider on page load
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    
    
    // Add dynamic slides
    sliderProducts.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h1>${product.name}</h1>
        `;
        slider.insertBefore(slide, slider.querySelector('.slider-controls'));
    });
    
    // Add slider navigation functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    // Dynamic New Arrivals
    const newArrivalsContainer = document.querySelector('.arrivalscards-container');
    if (newArrivalsContainer) {
        // Use first 5 products for new arrivals
        const newArrivals = sliderProducts.slice(0, 5);
        
        newArrivalsContainer.innerHTML = newArrivals.map(product => `
            <div class="card">
                <img src="${product.image}" alt="${product.name}" class="card-img">
                <div class="card-content">
                    <h1 class="card-title">${product.name}</h1>
                    <span class="card-price">$${(product.price || 0).toFixed(2)}</span>
                    <p class="card-description">${product.description}</p>
                    <a href="products.html" class="card-button">Buy Now</a>
                </div>
            </div>
        `).join('');
    }
})