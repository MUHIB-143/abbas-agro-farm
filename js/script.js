// ABBAS AGRO FARM - Main JavaScript File

// Global Variables
let currentLanguage = 'en';
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const newsletterForm = document.getElementById('newsletterForm');
const contactForm = document.getElementById('contactForm');
const testimonialCarousel = document.getElementById('testimonialCarousel');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupLanguageToggle();
    setupTestimonialCarousel();
    setupForms();
    setupAnimations();
    setupIntersectionObserver();
    
    // Set initial language
    updateLanguage(currentLanguage);
    
    console.log('ABBAS AGRO FARM website initialized successfully!');
}

// Navigation Setup
function setupNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .hero-scroll a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Close mobile menu when clicking on links
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    // Active navigation highlighting
    updateActiveNavigation();
    window.addEventListener('scroll', updateActiveNavigation);
}

// Toggle mobile menu
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// Close mobile menu
function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Handle smooth scrolling
function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - (navbar ? navbar.offsetHeight : 0) - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects Setup
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleBackToTopButton();
    });
}

// Handle navbar background on scroll
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Handle back to top button visibility
function handleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Back to top functionality
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Language Toggle Setup
function setupLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            toggleLanguage(lang);
        });
    });
}

// Toggle between languages
function toggleLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    updateLanguage(lang);
    
    // Update active language button
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Store language preference
    localStorage.setItem('preferred-language', lang);
}

// Update content based on selected language
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-' + lang + ']');
    
    elements.forEach(element => {
        const content = element.getAttribute('data-' + lang);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = content;
        } else if (element.tagName === 'OPTION') {
            element.textContent = content;
        } else {
            element.textContent = content;
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Update page title based on language
    const titles = {
        'en': 'ABBAS AGRO FARM - Organic Farming in Khashkarara Union, Chuadanga',
        'bn': 'আব্বাস এগ্রো ফার্ম - খাশকররা ইউনিয়ন, চুয়াডাঙ্গায় জৈব চাষাবাদ'
    };
    
    document.title = titles[lang] || titles['en'];
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
        toggleLanguage(savedLang);
    }
}

// Testimonial Carousel Setup
function setupTestimonialCarousel() {
    if (testimonials.length > 0) {
        // Auto-play testimonials
        setInterval(nextTestimonial, 5000);
        
        // Initialize first testimonial
        showTestimonial(0);
    }
}

// Show specific testimonial
function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
}

// Next testimonial
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Previous testimonial
function prevTestimonial() {
    currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
    showTestimonial(currentTestimonial);
}

// Change testimonial (called from HTML)
function changeTestimonial(direction) {
    if (direction > 0) {
        nextTestimonial();
    } else {
        prevTestimonial();
    }
}

// Forms Setup
function setupForms() {
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const button = e.target.querySelector('button');
    
    if (validateEmail(email)) {
        // Show loading state
        const originalText = button.textContent;
        button.textContent = currentLanguage === 'bn' ? 'পাঠানো হচ্ছে...' : 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            e.target.reset();
            
            // Show success message
            showNotification(
                currentLanguage === 'bn' ? 
                'সফলভাবে সাবস্ক্রাইব হয়েছে! ধন্যবাদ।' : 
                'Successfully subscribed! Thank you.',
                'success'
            );
            
            // Reset button
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    } else {
        showNotification(
            currentLanguage === 'bn' ? 
            'অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা প্রদান করুন।' : 
            'Please provide a valid email address.',
            'error'
        );
    }
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const button = e.target.querySelector('button[type="submit"]');
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification(
            currentLanguage === 'bn' ? 
            'অনুগ্রহ করে সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন।' : 
            'Please fill in all required fields.',
            'error'
        );
        return;
    }
    
    if (!validateEmail(formData.get('email'))) {
        showNotification(
            currentLanguage === 'bn' ? 
            'অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা প্রদান করুন।' : 
            'Please provide a valid email address.',
            'error'
        );
        return;
    }
    
    // Show loading state
    const originalText = button.textContent;
    button.textContent = currentLanguage === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        e.target.reset();
        
        // Show success message
        showNotification(
            currentLanguage === 'bn' ? 
            'আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।' : 
            'Your message has been sent successfully. We will contact you soon.',
            'success'
        );
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        animation: 'slideInRight 0.3s ease-out forwards'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#4CAF50';
            break;
        case 'error':
            notification.style.background = '#f44336';
            break;
        default:
            notification.style.background = '#2196F3';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Add click to close
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Animation Setup
function setupAnimations() {
    // Add CSS for notification animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification {
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            
            .notification:hover {
                transform: translateX(-5px);
            }
        `;
        document.head.appendChild(style);
    }
}

// Intersection Observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .scale-in, ' +
        '.feature, .product-category, .service-card, .gallery-item, .blog-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Utility Functions

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Format phone number for display
function formatPhoneNumber(phone) {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Format Bangladesh phone number
    if (cleaned.length === 11 && cleaned.startsWith('01')) {
        return `+880 ${cleaned.slice(1, 3)}${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone;
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(
                currentLanguage === 'bn' ? 
                'কপি করা হয়েছে!' : 
                'Copied to clipboard!',
                'success'
            );
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification(
                currentLanguage === 'bn' ? 
                'কপি করা হয়েছে!' : 
                'Copied to clipboard!',
                'success'
            );
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }
}

// Performance monitoring
function performanceMonitor() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                console.log(`Page load time: ${loadTime}ms`);
                
                // Log slow loading if > 3 seconds
                if (loadTime > 3000) {
                    console.warn('Slow page load detected. Consider optimizing assets.');
                }
            }, 100);
        });
    }
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    
    // Don't show error notifications in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        showNotification('A JavaScript error occurred. Check console for details.', 'error');
    }
});

// Initialize performance monitoring
performanceMonitor();

// Load language preference on page load
document.addEventListener('DOMContentLoaded', () => {
    loadLanguagePreference();
});

// Expose global functions for HTML onclick handlers
window.toggleLanguage = toggleLanguage;
window.changeTestimonial = changeTestimonial;

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Additional features for enhanced user experience

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareContent(url, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy URL to clipboard
        copyToClipboard(url);
    }
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('dark-mode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode on load
document.addEventListener('DOMContentLoaded', loadDarkModePreference);

// Global functions for HTML onclick handlers
window.toggleLanguage = toggleLanguage;
window.changeTestimonial = changeTestimonial;
window.copyToClipboard = copyToClipboard;
window.shareContent = shareContent;
window.toggleDarkMode = toggleDarkMode;

console.log('ABBAS AGRO FARM JavaScript loaded successfully!');
