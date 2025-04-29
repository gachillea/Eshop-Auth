document.addEventListener('DOMContentLoaded', async function () {
  const slider = document.querySelector('.slider');
  const newArrivalsContainer = document.querySelector('.arrivalscards-container');

  try {
      const response = await fetch("http://127.0.0.1:5000/popular-products");
      const popularProducts = await response.json();

      // -----------------------
      // Δημιουργία slider slides
      // -----------------------
      popularProducts.forEach((product, index) => {
          const slide = document.createElement('div');
          slide.className = `slide ${index === 0 ? 'active' : ''}`;
          slide.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h1>${product.name}</h1>
          `;
          slider.insertBefore(slide, slider.querySelector('.slider-controls'));
      });

      // -----------------------
      // Δημιουργία New Arrivals
      // -----------------------
      if (newArrivalsContainer) {
          newArrivalsContainer.innerHTML = popularProducts.slice(0, 5).map(product => `
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

  } catch (error) {
      console.error("Failed to fetch popular products:", error);
  }

  // -----------------------
  // Slider Navigation Logic
  // -----------------------
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

  prevBtn?.addEventListener('click', () => {
      const newIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(newIndex);
  });

  nextBtn?.addEventListener('click', () => {
      const newIndex = (currentSlide + 1) % slides.length;
      showSlide(newIndex);
  });
});
