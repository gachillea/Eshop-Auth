document.addEventListener('DOMContentLoaded', async function() {
    const username = localStorage.getItem('username');
    const slider = document.querySelector('.slider');
    const newArrivalsContainer = document.querySelector('.arrivalscards-container');

    try {
        const response = await fetch('http://127.0.0.1:5000/products/popular-products');
        const products = await response.json();

        // Clear existing slider content and add controls
        slider.innerHTML = `
            <div class="slider-controls">
                <button class="slider-btn prev">&#10094;</button>
                <button class="slider-btn next">&#10095;</button>
            </div>
        `;

        // Create slides dynamically from API products
        products.forEach((product, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h1>${product.name}</h1>
            `;
            slider.insertBefore(slide, slider.querySelector('.slider-controls'));
        });

        // Create New Arrivals section (first 4 products)
        if (newArrivalsContainer) {
            const newArrivals = products.slice(0, 4);
            newArrivalsContainer.innerHTML = newArrivals.map(product => `
                <div class="card">
                    <img src="${product.image}" alt="${product.name}" class="card-img">
                    <div class="card-content">
                        <h1 class="card-title">${product.name}</h1>
                        <span class="card-price">$${(product.price || 99).toFixed(2)}</span>
                        <p class="card-description">${product.description}</p>
                        <a href="products.html" class="card-button">Buy Now</a>
                    </div>
                </div>
            `).join('');
        }

        // Slider navigation functionality
        let currentSlide = 0;
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');

        function showSlide(index) {
            const slides = document.querySelectorAll('.slide');
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        prevBtn.addEventListener('click', () => {
            const slides = document.querySelectorAll('.slide');
            showSlide((currentSlide - 1 + slides.length) % slides.length);
        });

        nextBtn.addEventListener('click', () => {
            const slides = document.querySelectorAll('.slide');
            showSlide((currentSlide + 1) % slides.length);
        });

        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            const slides = document.querySelectorAll('.slide');
            showSlide((currentSlide + 1) % slides.length);
        }, 5000);

    } catch (error) {
        console.error('Error loading products:', error);
    }
});
