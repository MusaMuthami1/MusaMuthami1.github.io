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
            
            // Show loading state
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Submit to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success - message sent via Formspree
                    showFormStatus('success', 'Message sent! Thank you for reaching out. I\'ll get back to you soon!');
                    contactForm.reset();
                    
                    // Store message locally as backup
                    try {
                        const messageData = {
                            name: formData.get('name'),
                            email: formData.get('email'),
                            message: formData.get('message'),
                            timestamp: new Date().toISOString(),
                            sent: true
                        };
                        let storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                        storedMessages.push(messageData);
                        localStorage.setItem('contactMessages', JSON.stringify(storedMessages));
                    } catch (storageError) {
                        console.log('Note: Could not store message locally, but email was sent successfully.');
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
                showFormStatus('error', 'There was an error sending your message. Please try again or contact me directly at musamwange2@gmail.com.');
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Hide status after 7 seconds for better user experience
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 7000);
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
