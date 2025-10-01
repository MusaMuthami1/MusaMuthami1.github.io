// Enhanced smooth scrolling for navigation with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Enhanced scroll animations with intersection observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Enhanced button hover effects with ripple
const addRippleEffect = (button) => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
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
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
};

// Apply ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .submit-button').forEach(addRippleEffect);

// Enhanced tech pill interactions
document.querySelectorAll('.tech-pill').forEach(pill => {
    pill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.boxShadow = '0 8px 25px rgba(100, 255, 218, 0.4)';
        this.style.background = 'linear-gradient(45deg, rgba(0, 163, 255, 0.2), rgba(100, 255, 218, 0.2))';
    });
    pill.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.background = '';
    });
});

// Portfolio Enhancement Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio effects after DOM is loaded
    console.log('Portfolio JavaScript loaded successfully');
    
    // Initialize contact form functionality
    initContactForm();
    
    // Initialize Amazon-style dropdowns
    initAmazonStyleDropdowns();
    initLocationDropdown();
});

// Amazon-Style Custom Dropdowns
function initAmazonStyleDropdowns() {
    // Initialize all custom dropdowns
    const dropdowns = document.querySelectorAll('.custom-dropdown');
    
    dropdowns.forEach(dropdown => {
        const selected = dropdown.querySelector('.dropdown-selected');
        const options = dropdown.querySelector('.dropdown-options');
        const searchInput = dropdown.querySelector('.dropdown-search-input');
        const optionsList = dropdown.querySelectorAll('.dropdown-option');
        const hiddenInput = dropdown.parentElement.querySelector('input[type="hidden"]') || 
                           document.querySelector('#countryCode');
        
        // Handle dropdown click
        selected.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close other dropdowns
            document.querySelectorAll('.custom-dropdown .dropdown-options.show').forEach(opt => {
                if (opt !== options) {
                    opt.classList.remove('show');
                    opt.parentElement.querySelector('.dropdown-selected').classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            options.classList.toggle('show');
            selected.classList.toggle('active');
            
            // Focus search input when opened
            if (options.classList.contains('show') && searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });
        
        // Handle option selection
        optionsList.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Remove previous selections
                optionsList.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                this.classList.add('selected');
                
                // Update displayed text
                const text = this.textContent;
                const value = this.getAttribute('data-value');
                
                selected.querySelector('.dropdown-text').textContent = text;
                
                // Update hidden input value
                if (hiddenInput) {
                    hiddenInput.value = value;
                }
                
                // Close dropdown with animation
                options.classList.remove('show');
                selected.classList.remove('active');
                
                // Clear search
                if (searchInput) {
                    searchInput.value = '';
                    filterOptions(dropdown, '');
                }
                
                // Add selection animation
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Handle search functionality
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                filterOptions(dropdown, searchTerm);
            });
            
            // Prevent dropdown from closing when clicking search
            searchInput.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.custom-dropdown .dropdown-options.show').forEach(options => {
            options.classList.remove('show');
            options.parentElement.querySelector('.dropdown-selected').classList.remove('active');
        });
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeDropdown = document.querySelector('.custom-dropdown .dropdown-options.show');
        if (!activeDropdown) return;
        
        const options = activeDropdown.querySelectorAll('.dropdown-option:not([style*="display: none"])');
        const currentSelected = activeDropdown.querySelector('.dropdown-option.keyboard-selected') || 
                               activeDropdown.querySelector('.dropdown-option.selected');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateOptions(options, currentSelected, 'down');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateOptions(options, currentSelected, 'up');
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const keyboardSelected = activeDropdown.querySelector('.dropdown-option.keyboard-selected');
            if (keyboardSelected) {
                keyboardSelected.click();
            }
        } else if (e.key === 'Escape') {
            activeDropdown.classList.remove('show');
            activeDropdown.parentElement.querySelector('.dropdown-selected').classList.remove('active');
        }
    });
}

function filterOptions(dropdown, searchTerm) {
    const options = dropdown.querySelectorAll('.dropdown-option');
    const optgroups = dropdown.querySelectorAll('.dropdown-optgroup');
    let hasVisibleOptions = false;
    
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        const value = option.getAttribute('data-value').toLowerCase();
        
        if (text.includes(searchTerm) || value.includes(searchTerm)) {
            option.style.display = '';
            hasVisibleOptions = true;
        } else {
            option.style.display = 'none';
        }
    });
    
    // Handle optgroups visibility
    optgroups.forEach(optgroup => {
        const groupOptions = optgroup.nextElementSibling;
        const visibleInGroup = Array.from(groupOptions.children).some(opt => 
            opt.style.display !== 'none'
        );
        optgroup.style.display = visibleInGroup ? '' : 'none';
    });
    
    // Show/hide no results message
    let noResultsMsg = dropdown.querySelector('.dropdown-no-results');
    if (!hasVisibleOptions && searchTerm) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'dropdown-no-results';
            noResultsMsg.textContent = `No results found for "${searchTerm}"`;
            dropdown.querySelector('.dropdown-list').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

function navigateOptions(options, current, direction) {
    // Remove previous keyboard selection
    document.querySelectorAll('.dropdown-option.keyboard-selected').forEach(opt => {
        opt.classList.remove('keyboard-selected');
    });
    
    let index = Array.from(options).indexOf(current);
    
    if (direction === 'down') {
        index = index < options.length - 1 ? index + 1 : 0;
    } else {
        index = index > 0 ? index - 1 : options.length - 1;
    }
    
    const newSelected = options[index];
    newSelected.classList.add('keyboard-selected');
    
    // Scroll into view
    newSelected.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
    });
}

// Initialize Location Custom Dropdown (simplified version)
function initLocationDropdown() {
    const locationSelect = document.getElementById('location');
    if (!locationSelect) return;
    
    // Create custom dropdown structure
    const customDropdown = document.createElement('div');
    customDropdown.className = 'custom-dropdown';
    customDropdown.innerHTML = `
        <div class="dropdown-selected" data-placeholder="Select Your Location">
            <span class="dropdown-text">Select Your Location</span>
            <i class="fas fa-chevron-down dropdown-arrow"></i>
        </div>
        <div class="dropdown-options">
            <div class="dropdown-search">
                <input type="text" placeholder="Search locations..." class="dropdown-search-input">
            </div>
            <div class="dropdown-list">
                ${generateLocationOptions()}
            </div>
        </div>
    `;
    
    // Replace original select
    locationSelect.parentElement.insertBefore(customDropdown, locationSelect);
    locationSelect.style.display = 'none';
    
    // Initialize dropdown functionality
    initAmazonStyleDropdowns();
}

function generateLocationOptions() {
    const locations = {
        'Africa': [
            'Nairobi, Kenya', 'Mombasa, Kenya', 'Lagos, Nigeria', 'Cape Town, South Africa',
            'Cairo, Egypt', 'Accra, Ghana', 'Kampala, Uganda', 'Dar es Salaam, Tanzania'
        ],
        'Asia': [
            'Mumbai, India', 'Tokyo, Japan', 'Beijing, China', 'Singapore', 'Dubai, UAE',
            'Bangkok, Thailand', 'Seoul, South Korea', 'Hong Kong'
        ],
        'Europe': [
            'London, UK', 'Paris, France', 'Berlin, Germany', 'Madrid, Spain',
            'Amsterdam, Netherlands', 'Stockholm, Sweden', 'Rome, Italy'
        ],
        'North America': [
            'New York, USA', 'Los Angeles, USA', 'Toronto, Canada', 'Mexico City, Mexico',
            'Chicago, USA', 'San Francisco, USA', 'Vancouver, Canada'
        ],
        'South America': [
            'São Paulo, Brazil', 'Buenos Aires, Argentina', 'Bogotá, Colombia',
            'Lima, Peru', 'Santiago, Chile'
        ],
        'Oceania': [
            'Sydney, Australia', 'Melbourne, Australia', 'Auckland, New Zealand'
        ]
    };
    
    let html = '';
    
    Object.keys(locations).forEach(region => {
        html += `<div class="dropdown-optgroup">${region}</div>`;
        locations[region].forEach(city => {
            html += `<div class="dropdown-option" data-value="${city}">${city}</div>`;
        });
    });
    
    html += `<div class="dropdown-option" data-value="Other">Other (Please specify in message)</div>`;
    
    return html;
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    if (!contactForm) return;
    
    // Add enhanced input animations
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Focus effects with smooth animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'translateY(-2px) scale(1.01)';
            this.style.boxShadow = '0 8px 25px rgba(0, 163, 255, 0.15)';
        });
        
        // Blur effects
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Real-time validation with visual feedback
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
    
    // Enhanced form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showFormStatus('Please fill in all fields correctly.', 'error');
            return;
        }
        
        // Show loading state with animation
        setLoadingState(true);
        
        // Collect form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Send email using EmailJS
        sendEmail(data)
            .then(function(response) {
                console.log('SUCCESS!', response);
                showFormStatus('🎉 Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                    input.style.transform = '';
                    input.style.boxShadow = '';
                });
                
                // Add success animation
                submitBtn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    submitBtn.style.transform = '';
                }, 200);
                
                // Track conversion for analytics (if analytics available)
                if (window.gtag) {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form'
                    });
                }
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showFormStatus('❌ Failed to send message. Please try again or contact me directly.', 'error');
                
                // Track error for analytics (if analytics available)
                if (window.gtag) {
                    gtag('event', 'form_error', {
                        'event_category': 'Contact',
                        'event_label': error.message || 'Contact Form Error'
                    });
                }
            })
            .finally(function() {
                setLoadingState(false);
            });
    });
    
    // Enhanced input validation with smooth transitions
    function validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        
        // Remove previous error states
        input.parentElement.classList.remove('error');
        input.style.borderColor = '';
        
        // Validation rules
        if (!value) {
            isValid = false;
        } else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        } else if (input.name === 'message' && value.length < 10) {
            isValid = false;
        }
        
        // Apply visual feedback
        if (!isValid) {
            input.parentElement.classList.add('error');
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        } else {
            input.style.borderColor = '#22c55e';
            input.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
        }
        
        return isValid;
    }
    
    // Enhanced loading state with smooth animations
    function setLoadingState(loading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            btnText.style.opacity = '0';
            btnText.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                btnText.style.display = 'none';
                btnLoading.style.display = 'flex';
                
                setTimeout(() => {
                    btnLoading.style.opacity = '1';
                    btnLoading.style.transform = 'translateY(0)';
                }, 50);
            }, 150);
            
            submitBtn.disabled = true;
            submitBtn.style.background = 'linear-gradient(135deg, #6b7280, #9ca3af)';
        } else {
            btnLoading.style.opacity = '0';
            btnLoading.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                btnLoading.style.display = 'none';
                btnText.style.display = 'flex';
                
                setTimeout(() => {
                    btnText.style.opacity = '1';
                    btnText.style.transform = 'translateY(0)';
                }, 50);
            }, 150);
            
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(135deg, #00A3FF, #0090e0)';
        }
    }
    
    // Enhanced status messages with animations
    function showFormStatus(message, type) {
        formStatus.innerHTML = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Smooth entrance animation
        setTimeout(() => {
            formStatus.style.opacity = '1';
            formStatus.style.transform = 'translateY(0)';
        }, 100);
        
        // Auto-hide after 5 seconds with smooth exit
        setTimeout(() => {
            formStatus.style.opacity = '0';
            formStatus.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 300);
        }, 5000);
    }
    
    // Real email sending using EmailJS
    function sendEmail(data) {
        return new Promise((resolve, reject) => {
            // Check for honeypot field (spam protection)
            if (document.getElementById('honeypot').value) {
                resolve({ status: 200 }); // Silently succeed for bot submissions
                return;
            }
            
            // Replace with your EmailJS service, template, and user IDs
            const serviceID = 'service_your_emailjs_service';
            const templateID = 'template_your_emailjs_template';
            const userID = 'your_emailjs_user_id';
            
            const templateParams = {
                name: data.name,
                email: data.email,
                phone: data.phone || 'Not provided',
                message: data.message
            };
            
            // Check if emailjs is loaded
            if (window.emailjs) {
                emailjs.send(serviceID, templateID, templateParams, userID)
                    .then(response => {
                        console.log('SUCCESS!', response.status, response.text);
                        resolve({ 
                            status: 200,
                            message: 'Email sent successfully',
                            data: response
                        });
                    })
                    .catch(error => {
                        console.log('FAILED...', error);
                        reject({
                            status: 500,
                            message: 'Failed to send email. Please try again.',
                            error: error
                        });
                    });
            } else {
                // Fallback if EmailJS is not loaded
                console.log('EmailJS not loaded, using fallback');
                setTimeout(() => {
                    if (Math.random() > 0.1) {
                        resolve({ 
                            status: 200, 
                            message: 'Email sent successfully',
                            data: data 
                        });
                    } else {
                        reject({ 
                            status: 500, 
                            message: 'Service temporarily unavailable' 
                        });
                    }
                }, 1500);
            }
        });
    }
    
    // Add click animations to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add click animation to contact buttons
        const btn = card.querySelector('.contact-btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                setTimeout(() => ripple.remove(), 600);
            });
        }
    });
}

// Enhanced typing effect for hero text
function typeWriter(text, element, delay = 80) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '3px solid #00A3FF';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Initialize enhanced effects
window.addEventListener('load', function() {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // Enhanced typing effect
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => typeWriter(originalText, heroTitle, 100), 1500); // Delayed to start after preloader
    }
    
    // Add particle effect to navigation
    addParticleEffect();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Animate sections with AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Particle effect for navigation
function addParticleEffect() {
    const nav = document.querySelector('.glass-nav');
    if (!nav) return;
    
    nav.addEventListener('mouseenter', function() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #00A3FF;
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: particleFloat 2s ease-out forwards;
                `;
                this.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    });
}

// Initialize floating elements
function initFloatingElements() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
        stat.style.animation = 'float 4s ease-in-out infinite';
    });
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes particleFloat {
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
