/**
 * Animations.js
 * Handles all animation functionality for the portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initSectionAnimations();
  initSkillBars();
  initBackToTopButton();
});

/**
 * Initialize section animations using Intersection Observer
 */
function initSectionAnimations() {
  // Create observer for elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  // If no elements to animate, return
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If element is in view
      if (entry.isIntersecting) {
        // Add animate class to trigger animation
        entry.target.classList.add('animate');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Element is considered in view when 20% visible
    threshold: 0.2,
    // Start animation slightly before element comes into view
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Start observing all animated elements
  animatedElements.forEach(el => {
    observer.observe(el);
  });
  
  // Also animate section headers
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    observer.observe(header);
  });
}

/**
 * Initialize skill bars animation
 */
function initSkillBars() {
  // Get all skill sections
  const skillSection = document.querySelector('.skills-section');
  
  // If skill section doesn't exist, return
  if (!skillSection) return;
  
  // Create observer for skill section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animate class to trigger skill bar animations
        entry.target.classList.add('animate');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  observer.observe(skillSection);
}

/**
 * Initialize back to top button
 */
function initBackToTopButton() {
  // Create the back to top button if it doesn't exist
  if (!document.querySelector('.back-to-top')) {
    const button = document.createElement('a');
    button.href = '#';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);
  }
  
  const backToTop = document.querySelector('.back-to-top');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  // Smooth scroll to top when clicked
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}