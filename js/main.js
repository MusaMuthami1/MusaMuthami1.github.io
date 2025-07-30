// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

// Initialize
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Button hover effects
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Submit to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success
                    showFormStatus('success', 'Message sent! Thank you for reaching out. I\'ll get back to you soon!');
                    contactForm.reset();
                } else {
                    // Error
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            showFormStatus('error', 'Oops! There was a problem submitting your form: ' + data.errors.map(error => error.message).join(', '));
                        } else {
                            showFormStatus('error', 'Oops! There was a problem submitting your form. Please try again.');
                        }
                    });
                }
            }).catch(error => {
                // Network error
                showFormStatus('error', 'There was a network error. Please check your connection and try again.');
            }).finally(() => {
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Hide status after 8 seconds for success, 10 seconds for error
        const hideDelay = type === 'success' ? 8000 : 10000;
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, hideDelay);
    }
});

// Password Manager Project Interactions
document.querySelectorAll('.tech-pill').forEach(pill => {
    pill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 4px 8px rgba(100, 255, 218, 0.3)';
    });
    pill.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});
