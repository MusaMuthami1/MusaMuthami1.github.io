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
});// Password Manager Project Interactions
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

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // Try to send email using EmailJS (if available)
            if (typeof emailjs !== 'undefined') {
                sendEmailWithEmailJS(formData);
            } else {
                // Fallback: Store in localStorage
                storeMessageLocally(formData);
            }
        });
    }
});

function sendEmailWithEmailJS(formData) {
    const formMessage = document.getElementById('formMessage');
    
    // EmailJS configuration (you would need to set up EmailJS account)
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'musamwange2@gmail.com'
    }).then(function(response) {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        document.getElementById('contactForm').reset();
    }, function(error) {
        console.error('EmailJS error:', error);
        // Fallback to localStorage if EmailJS fails
        storeMessageLocally(formData);
    });
}

function storeMessageLocally(formData) {
    const formMessage = document.getElementById('formMessage');
    
    try {
        // Get existing messages or initialize empty array
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        
        // Add new message
        existingMessages.push(formData);
        
        // Store back to localStorage
        localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
        
        showFormMessage('Thank you! Your message has been saved locally. I will respond to you via email soon.', 'success');
        document.getElementById('contactForm').reset();
        
        // Optional: Log for development
        console.log('Message stored locally:', formData);
        
    } catch (error) {
        console.error('Error storing message:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}
