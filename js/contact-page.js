// Contact Page Enhanced Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS (replace with your actual keys)
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
    }

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        // Enhanced form validation and submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            // Show loading state
            setLoadingState(true);

            // Collect form data
            const formData = new FormData(this);
            const templateParams = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                company: formData.get('company') || 'Not specified',
                projectType: formData.get('projectType'),
                budget: formData.get('budget') || 'Not specified',
                timeline: formData.get('timeline') || 'Not specified',
                message: formData.get('message'),
                fullName: `${formData.get('firstName')} ${formData.get('lastName')}`,
                to_email: 'musamwange2@gmail.com'
            };

            // Simulate email sending (replace with actual EmailJS call)
            simulateEmailSending(templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response);
                    showFormStatus('🎉 Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                    clearFormFocus();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showFormStatus('❌ Failed to send message. Please try the direct email option or try again later.', 'error');
                })
                .finally(function() {
                    setLoadingState(false);
                });
        });

        // Enhanced input focus effects
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                animateInput(this, 'focus');
            });

            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.parentElement.classList.remove('focused');
                }
                animateInput(this, 'blur');
            });

            input.addEventListener('input', function() {
                validateField(this);
            });
        });
    }

    // Contact method interactions
    setupContactMethods();

    // FAQ animations
    setupFAQAnimations();

    // Smooth scrolling for internal links
    setupSmoothScrolling();
});

// Form validation
function validateForm() {
    const requiredFields = ['firstName', 'lastName', 'email', 'projectType', 'message'];
    let isValid = true;

    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;

    // Remove previous error state
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }

    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }

    // Message length validation
    if (fieldName === 'message' && value.length < 10) {
        isValid = false;
    }

    // Add error state if invalid
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    } else {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }

    return isValid;
}

// Loading state management
function setLoadingState(loading) {
    const submitBtn = document.getElementById('submitBtn');
    const btnContent = submitBtn.querySelector('.btn-content');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (loading) {
        btnContent.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
    } else {
        btnContent.style.display = 'flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
}

// Form status messages
function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    formStatus.innerHTML = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Animate in
    setTimeout(() => {
        formStatus.style.opacity = '1';
        formStatus.style.transform = 'translateY(0)';
    }, 100);
    
    // Hide after 8 seconds
    setTimeout(() => {
        formStatus.style.opacity = '0';
        formStatus.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 300);
    }, 8000);
}

// Input animations
function animateInput(input, action) {
    if (action === 'focus') {
        input.style.transform = 'scale(1.02)';
        input.style.transition = 'all 0.3s ease';
    } else {
        input.style.transform = '';
    }
}

function clearFormFocus() {
    const inputs = document.querySelectorAll('.form-group');
    inputs.forEach(group => {
        group.classList.remove('focused');
    });
}

// Contact methods setup
function setupContactMethods() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        const button = method.querySelector('.contact-btn');
        const methodType = method.getAttribute('data-method');
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    handleContactMethod(methodType);
                }, 150);
            });
        }

        // Hover effects
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        method.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Handle different contact methods
function handleContactMethod(type) {
    switch(type) {
        case 'email':
            const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=musamwange2@gmail.com&su=Project Inquiry&body=Hi Musa,%0D%0A%0D%0AI found your portfolio and would like to discuss a project.%0D%0A%0D%0ABest regards,';
            window.open(gmailUrl, '_blank');
            break;
            
        case 'phone':
            window.location.href = 'tel:+254114945842';
            break;
            
        case 'whatsapp':
            const whatsappUrl = 'https://wa.me/254114945842?text=Hi Musa! I found your portfolio and would like to discuss a project opportunity.';
            window.open(whatsappUrl, '_blank');
            break;
            
        case 'linkedin':
            window.open('https://linkedin.com/in/musamwange', '_blank');
            break;
    }
}

// FAQ animations
function setupFAQAnimations() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Simulate email sending (replace with actual EmailJS implementation)
function simulateEmailSending(templateParams) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve({ status: 200, text: 'OK' });
            } else {
                reject({ status: 500, text: 'Service temporarily unavailable' });
            }
        }, 2500); // Simulate network delay
    });
}

// Actual EmailJS implementation (uncomment when you have your keys)
/*
function sendEmailJS(templateParams) {
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
}
*/

// Page animations on load
window.addEventListener('load', function() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Animate contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            method.style.transition = 'all 0.6s ease';
            method.style.opacity = '1';
            method.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });

    // Animate form
    const formSection = document.querySelector('.contact-form-section');
    if (formSection) {
        formSection.style.opacity = '0';
        formSection.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            formSection.style.transition = 'all 0.8s ease';
            formSection.style.opacity = '1';
            formSection.style.transform = 'translateX(0)';
        }, 700);
    }
});

// Add ripple effect to buttons
function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Apply ripple effect to all buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.contact-btn, .submit-button')) {
        addRippleEffect(e.target, e);
    }
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
