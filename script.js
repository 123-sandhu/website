// Improved Mobile Menu Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");
  const body = document.body;

  // Toggle mobile menu when menu icon is clicked
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event bubbling
    navLinks.classList.toggle("show");
    
    // Toggle body scroll
    body.classList.toggle("menu-open");
    
    // Change menu icon to X when menu is open
    const icon = menuIcon.querySelector("i");
    if (navLinks.classList.contains("show")) {
      icon.classList.replace("fa-bars", "fa-times");
    } else {
      icon.classList.replace("fa-times", "fa-bars");
    }
  });

  // Close menu when clicking on nav links (for better UX)
  const navLinkItems = navLinks.querySelectorAll("a");
  navLinkItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      body.classList.remove("menu-open");
      const icon = menuIcon.querySelector("i");
      icon.classList.replace("fa-times", "fa-bars");
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("show") && 
        !menuIcon.contains(e.target) && 
        !navLinks.contains(e.target)) {
      navLinks.classList.remove("show");
      body.classList.remove("menu-open");
      const icon = menuIcon.querySelector("i");
      icon.classList.replace("fa-times", "fa-bars");
    }
  });

  // Close menu on window resize (if user rotates device)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
      body.classList.remove("menu-open");
      const icon = menuIcon.querySelector("i");
      icon.classList.replace("fa-times", "fa-bars");
    }
  });
});

// New Modules Carousel - 3 Cards at a Time
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("modulesTrack");
  const dotsContainer = document.getElementById("modulesDots");
  const cards = Array.from(track.children);
  
  let currentIndex = 0;
  let cardsPerView = 3;
  let autoSlideInterval;
  
  function updateCardsPerView() {
    if (window.innerWidth <= 480) {
      cardsPerView = 1;
    } else if (window.innerWidth <= 768) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
  }
  
  function createDots() {
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(cards.length / cardsPerView);
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        resetAutoSlide();
      });
      
      dotsContainer.appendChild(dot);
    }
  }
  
  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 30;
    const translateX = -currentIndex * cardWidth * cardsPerView;
    track.style.transform = `translateX(${translateX}px)`;
    
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }, 4000);
  }
  
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  track.addEventListener('mouseleave', startAutoSlide);
  
  window.addEventListener('resize', () => {
    updateCardsPerView();
    createDots();
    currentIndex = 0;
    updateCarousel();
    resetAutoSlide();
  });
  
  updateCardsPerView();
  createDots();
  updateCarousel();
  startAutoSlide();
});
// Count-Up Animation for Satisfied Clients
document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("client-count");
  let started = false;

  function countUp() {
    let count = 0;
    const target = 3000;
    const speed = 20;

    const updateCount = setInterval(() => {
      count += Math.ceil(target / 100);
      if (count >= target) {
        counter.textContent = target;
        clearInterval(updateCount);
      } else {
        counter.textContent = count;
      }
    }, speed);
  }

  window.addEventListener("scroll", () => {
    const section = document.getElementById("satisfied");
    const sectionTop = section.getBoundingClientRect().top;

    if (!started && sectionTop < window.innerHeight - 100) {
      countUp();
      started = true;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  function animateCounter(elementId, targetValue, duration = 2000, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startValue = 0;
    const increment = targetValue / (duration / 16);
    
    const counter = setInterval(() => {
      startValue += increment;
      if (startValue >= targetValue) {
        element.textContent = targetValue;
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(startValue);
      }
    }, 16);
  }
  
  // Intersection Observer for triggering animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start counter animations
        animateCounter('years-count', 10, 2000);
        animateCounter('clients-count', 3000, 2500);
        animateCounter('verticals-count', 20, 1800);
        animateCounter('retention-count', 90, 2200);
        
        // Remove observer after animation starts
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  // Observe the statistics section
  const statsSection = document.querySelector('.statistics-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});

// industry section
function showIndustry(index) {
      // Remove active class from all tabs
      const tabs = document.querySelectorAll('.industry-tab');
      const contents = document.querySelectorAll('.industry-content');
      
      tabs.forEach(tab => tab.classList.remove('active'));
      contents.forEach(content => content.classList.remove('active'));
      
      // Add active class to selected tab and content
      tabs[index].classList.add('active');
      contents[index].classList.add('active');
    }

    // client slider// UPDATED JAVASCRIPT CODE - Add this to your script.js
    let currentGrid = 0;
    let autoAdvanceInterval;
    const grids = ['grid1', 'grid2', 'grid3'];
    const totalGrids = grids.length;

    function showGrid(index) {
      // Hide all grids
      grids.forEach(gridId => {
        const grid = document.getElementById(gridId);
        grid.style.display = 'none';
        grid.classList.remove('active');
      });

      // Remove active class from all dots
      document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.classList.remove('active');
      });

      // Show selected grid
      const selectedGrid = document.getElementById(grids[index]);
      selectedGrid.style.display = 'grid';
      selectedGrid.classList.add('active');

      // Activate corresponding dot
      document.querySelectorAll('.nav-dot')[index].classList.add('active');

      currentGrid = index;
    }

    function nextGrid() {
      currentGrid = (currentGrid + 1) % totalGrids;
      showGrid(currentGrid);
    }

    function startAutoAdvance() {
      autoAdvanceInterval = setInterval(nextGrid, 4000);
    }

    function stopAutoAdvance() {
      clearInterval(autoAdvanceInterval);
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
      startAutoAdvance();

      // Click navigation
      document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.addEventListener('click', function() {
          showGrid(index);
          stopAutoAdvance();
          startAutoAdvance(); // Restart timer
        });
      });

      // Add subtle click feedback to client cards
      document.querySelectorAll('.client-card').forEach(card => {
        card.addEventListener('click', function() {
          this.style.transform = 'translateY(-3px) scale(1.02)';
          setTimeout(() => {
            this.style.transform = '';
          }, 200);
        });
      });
    });