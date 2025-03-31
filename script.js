document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".feedback-slider");
  const wrapper = document.createElement("div");
  wrapper.classList.add("scrolling-wrapper");

  // Duplicate feedback items for seamless looping
  wrapper.innerHTML = slider.innerHTML; // First set
  wrapper.innerHTML += slider.innerHTML; // Duplicate set

  slider.innerHTML = ""; // Clear original
  slider.appendChild(wrapper);
});



document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;
  let interval;

  // Define gradient backgrounds for each slide
  const gradients = [
    "linear-gradient(to bottom, black 0%, rgb(46, 241, 209) 50%, black 100%)",
    "linear-gradient(to bottom, black 0%, rgb(185, 196, 30) 50%, black 100%)",
    "linear-gradient(to bottom, black 0%, rgb(243, 155, 22) 50%, black 100%)"
  ];

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = 0;
      slide.style.transform = "translateX(100%)";
      slide.style.transition = "opacity 1s ease, transform 1s ease";
    });

    const activeSlide = slides[index];
    activeSlide.style.opacity = 1;
    activeSlide.style.transform = "translateX(0)";

    // Move h1 to the right
    const heading = activeSlide.querySelector("h1");
    heading.style.transform = "translateX(280px)";
    heading.style.transition = "transform 1s ease";

    // Move image slightly left
    const image = activeSlide.querySelector("img");
    image.style.transform = "translateX(-20px)";
    image.style.transition = "transform 1s ease";

    // Smooth background gradient transition
    slider.style.transition = "background 2s ease-in-out";
    slider.style.background = gradients[index];
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 7000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  nextBtn.addEventListener("click", function () {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", function () {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  // Initialize
  showSlide(currentIndex);
  startAutoSlide();
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});


document.addEventListener("DOMContentLoaded", function () {
  const numStars = 100;
  const bg = document.querySelector(".bg-animation");

  for (let i = 0; i < numStars; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.animationDelay = Math.random() * 5 + "s";
    bg.appendChild(star);
  }
});
