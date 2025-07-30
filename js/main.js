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

// Contact Form Functionality - Enhanced for Formspree Integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Check if Formspree endpoint is configured
            const formAction = contactForm.getAttribute('action');
            const isFormspreeConfigured = formAction && !formAction.includes('YOUR_FORMSPREE_ENDPOINT');

            if (isFormspreeConfigured) {
                // Formspree is configured - handle as AJAX to show custom success message
                e.preventDefault();
                handleFormspreeSubmission();
            } else {
                // Formspree not configured - use fallback method
                e.preventDefault();
                handleFallbackSubmission();
            }
        });
    }

    async function handleFormspreeSubmission() {
        const formData = new FormData(contactForm);
        const formAction = contactForm.getAttribute('action');
        
        try {
            // Show loading state
            showFormStatus('loading', 'Sending your message...');
            
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            showFormStatus('error', 'There was an error sending your message. Please try again or contact me directly.');
        }
    }

    function handleFallbackSubmission() {
        const formData = new FormData(contactForm);
        const messageData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Store message locally for backup
        try {
            let storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            storedMessages.push(messageData);
            localStorage.setItem('contactMessages', JSON.stringify(storedMessages));

            // Show instruction message for configuration
            showFormStatus('warning', '📧 Formspree not configured yet. Please follow the instructions in the HTML comments to set up email delivery. For now, opening your email client...');
            
            // Reset form
            contactForm.reset();

            // Create mailto link as fallback
            const mailtoLink = `mailto:musamwange2@gmail.com?subject=Contact from ${messageData.name}&body=From: ${messageData.name} (${messageData.email})%0A%0A${messageData.message}`;
            
            // Auto-open email client after a short delay
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 2000);

        } catch (error) {
            console.error('Error storing message:', error);
            showFormStatus('error', 'There was an error processing your message. Please contact me directly at musamwange2@gmail.com');
        }
    }

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Hide status after 7 seconds (longer for config message)
        const hideDelay = type === 'warning' ? 10000 : 5000;
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
