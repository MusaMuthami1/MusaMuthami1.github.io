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

// Contact Form Functionality with SparkPost Integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // Configuration - Update this URL when you deploy the backend
    const API_CONFIG = {
        baseUrl: 'http://localhost:3001', // Change to your deployed backend URL
        fallbackEnabled: true // Set to false to disable local storage fallback
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const messageData = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };

            // Disable submit button during processing
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                // Try to send via SparkPost backend first
                const response = await fetch(`${API_CONFIG.baseUrl}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: messageData.name,
                        email: messageData.email,
                        message: messageData.message
                    })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // Success - email sent via SparkPost
                    showFormStatus('success', result.message || 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
                    contactForm.reset();
                    
                    // Store locally as backup
                    if (API_CONFIG.fallbackEnabled) {
                        storeMessageLocally(messageData);
                    }
                } else {
                    // API error - fall back to local storage and mailto
                    throw new Error(result.error || 'Failed to send message via backend');
                }

            } catch (error) {
                console.log('Backend not available or error occurred:', error.message);
                
                // Fallback to local storage and mailto if backend fails
                if (API_CONFIG.fallbackEnabled) {
                    await handleFallbackMethod(messageData);
                } else {
                    showFormStatus('error', 'Failed to send message. Please try again or contact me directly.');
                }
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    async function handleFallbackMethod(messageData) {
        try {
            // Store message locally
            storeMessageLocally(messageData);

            // Show success message
            showFormStatus('success', 'Thank you! Your message has been received locally. I\'ll get back to you soon!');
            
            // Reset form
            contactForm.reset();

            // Create mailto link as additional fallback
            const mailtoLink = `mailto:musamwange2@gmail.com?subject=Contact from ${messageData.name}&body=From: ${messageData.name} (${messageData.email})%0A%0A${messageData.message}`;
            
            // Auto-open email client after a short delay
            setTimeout(() => {
                if (confirm('Would you like to also send this message via your email client?')) {
                    window.location.href = mailtoLink;
                }
            }, 2000);

        } catch (error) {
            console.error('Error in fallback method:', error);
            showFormStatus('error', 'There was an error saving your message. Please try again or contact me directly.');
        }
    }

    function storeMessageLocally(messageData) {
        try {
            let storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            storedMessages.push(messageData);
            localStorage.setItem('contactMessages', JSON.stringify(storedMessages));
            console.log('Message stored locally as backup');
        } catch (error) {
            console.error('Error storing message locally:', error);
            throw error;
        }
    }

    function showFormStatus(type, message) {
        if (!formStatus) return;
        
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }

    // Test backend connectivity on page load
    async function testBackendConnectivity() {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}/health`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                console.log('✅ Backend API is available');
                // Optionally show a small indicator that enhanced email features are available
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const indicator = document.createElement('div');
                    indicator.style.cssText = 'font-size: 0.8rem; color: #00A3FF; text-align: center; margin-top: 10px;';
                    indicator.textContent = '✨ Enhanced email delivery enabled';
                    contactSection.appendChild(indicator);
                }
            }
        } catch (error) {
            console.log('ℹ️ Backend API not available - using fallback method');
        }
    }

    // Test connectivity after a short delay
    setTimeout(testBackendConnectivity, 1000);
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
