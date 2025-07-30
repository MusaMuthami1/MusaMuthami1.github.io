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

// Contact Form Functionality with EmailJS Integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // EmailJS Configuration
    // Service ID: service_mh9yc99 (Gmail API integration)
    // TODO: Replace 'YOUR_USER_ID' with your actual EmailJS User ID from dashboard
    // TODO: Replace 'YOUR_TEMPLATE_ID' with your actual EmailJS Template ID
    const EMAILJS_SERVICE_ID = 'service_mh9yc99';
    const EMAILJS_USER_ID = 'YOUR_USER_ID'; // Get this from EmailJS dashboard -> Account -> API Keys
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Create template in EmailJS dashboard -> Email Templates

    // Check if EmailJS is available and initialize
    let emailjsAvailable = false;
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_USER_ID);
            emailjsAvailable = true;
            console.log('EmailJS initialized successfully');
        }
    } catch (error) {
        console.warn('EmailJS not available, using fallback method:', error);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Prepare form data
            const formData = new FormData(contactForm);
            const templateParams = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                message: formData.get('message'),
                to_name: 'Musa Mwange', // Your name
                reply_to: formData.get('from_email')
            };

            // Try EmailJS if available, otherwise use mailto fallback
            if (emailjsAvailable && typeof emailjs !== 'undefined' && EMAILJS_USER_ID !== 'YOUR_USER_ID' && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID') {
                // Send email via EmailJS
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                    .then(function(response) {
                        console.log('EmailJS Response:', response);
                        showFormStatus('success', 'Thank you! Your message has been sent successfully via EmailJS. I\'ll get back to you soon!');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error('EmailJS Error:', error);
                        handleFallback(templateParams);
                    })
                    .finally(function() {
                        resetButton();
                    });
            } else {
                // Use mailto fallback (for configuration or when EmailJS is not available)
                console.log('Using mailto fallback - EmailJS not configured or not available');
                handleFallback(templateParams);
                resetButton();
            }

            function handleFallback(params) {
                // Create mailto link as fallback
                const mailtoLink = `mailto:musamwange2@gmail.com?subject=Contact from ${encodeURIComponent(params.from_name)}&body=From: ${encodeURIComponent(params.from_name)} (${encodeURIComponent(params.from_email)})%0A%0A${encodeURIComponent(params.message)}`;
                
                showFormStatus('success', 'Your message is ready! Click the email link that will open to send your message via your email client.');
                
                // Store message locally as backup
                try {
                    let storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                    storedMessages.push({
                        ...params,
                        timestamp: new Date().toISOString()
                    });
                    localStorage.setItem('contactMessages', JSON.stringify(storedMessages));
                } catch (error) {
                    console.warn('Could not store message locally:', error);
                }
                
                // Open email client
                setTimeout(() => {
                    window.location.href = mailtoLink;
                    contactForm.reset();
                }, 2000);
            }

            function resetButton() {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
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
