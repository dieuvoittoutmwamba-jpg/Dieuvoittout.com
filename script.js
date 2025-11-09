
// Main JavaScript file for shared functionality

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
// Hero Slider Functionality
function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides = [
    { type: 'image', src: 'assets/images/site/card1.jpg' },
    { type: 'image', src: 'assets/images/site/card2.jpg' },
    { type: 'image', src: 'assets/images/site/card3.jpg' },
    // Add more slides as needed
  ];

  // Create slide elements
  slides.forEach((slide, index) => {
    const slideElement = document.createElement('div');
    slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
    
    if (slide.type === 'image') {
      slideElement.style.backgroundImage = `url('${slide.src}')`;
    } else if (slide.type === 'video') {
      // For video slides, you would add a video element here
    }
    
    slider.appendChild(slideElement);
  });

  // Slide rotation
  let currentSlide = 0;
  const slideElements = document.querySelectorAll('.slide');

  function rotateSlides() {
    slideElements[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideElements.length;
    slideElements[currentSlide].classList.add('active');
  }

  // Change slide every 5 seconds
  setInterval(rotateSlides, 5000);
}
// Initialize feather icons
if (typeof feather !== 'undefined') {
  feather.replace();
}

// Dark mode toggle
function setupDarkModeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (!darkModeToggle) return;

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    feather.replace(); // Refresh icons after toggle
  });

  // Check for saved preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}
// Handle prayer form submission
function setupPrayerForm() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = form.querySelector('#prayer-title').value;
    const content = form.querySelector('#prayer-content').value;
    
    if (!title || !content) {
      alert('Merci de remplir tous les champs');
      return;
    }

    try {
      // Here you would typically send to a backend API
      console.log('Prayer submitted:', { title, content });
      
      // Show success message
      alert('Votre demande de prière a été envoyée avec succès !');
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Error submitting prayer:', error);
      alert('Une erreur est survenue, veuillez réessayer plus tard.');
    }
  });
}

// Verse of the day
async function fetchVerseOfTheDay() {
  try {
    const response = await fetch('https://bible-api.com/random');
    const data = await response.json();
    const verseContainer = document.getElementById('verse-of-the-day');
    if (verseContainer) {
      verseContainer.innerHTML = `
        <div class="bg-primary/10 p-4 rounded-lg mb-4 transition-all hover:scale-[1.02]">
          <p class="font-bold text-primary mb-2">Verset du jour</p>
          <p class="italic mb-1">"${data.text}"</p>
          <p class="text-right text-sm">— ${data.reference}</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching verse:', error);
  }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initHeroSlider();
  setupDarkModeToggle();
  fetchVerseOfTheDay();
  setupPrayerForm();
// Your existing smooth scrolling code...
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
});
});