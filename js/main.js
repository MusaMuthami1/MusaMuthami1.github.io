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

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create mailto link
            const subject = encodeURIComponent(`Message from ${name} via Portfolio`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:musamwange2@gmail.com?subject=${subject}&body=${body}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Show success message
            const button = contactForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                contactForm.reset();
            }, 3000);
        });
        
        // Add form field animations
        const formFields = contactForm.querySelectorAll('.form-field input, .form-field textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
    }
});
