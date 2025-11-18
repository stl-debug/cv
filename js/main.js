// Modern Portfolio JavaScript
class PortfolioApp {
    constructor() {
        this.initScrollAnimations();
        this.initNavigation();
        this.initThemeToggle();
        this.initProjectFiltering();
        this.initSmoothScrolling();
        this.initContactAnimations();
    }

    // Scroll reveal animations
    initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe skill items for staggered animation
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Observe project cards for staggered animation
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Navigation functionality
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Animate hamburger bars
                const bars = navToggle.querySelectorAll('.bar');
                if (navToggle.classList.contains('active')) {
                    bars[0].style.transform = 'translateY(7px) rotate(45deg)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
                } else {
                    bars[0].style.transform = '';
                    bars[1].style.opacity = '';
                    bars[2].style.transform = '';
                }
            });
        }

        // Active navigation highlight
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Close mobile menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars[0].style.transform = '';
                bars[1].style.opacity = '';
                bars[2].style.transform = '';
            });
        });
    }

    // Theme toggle functionality
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        
        if (savedTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            if (newTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
            
            // Add transition effect
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }

    // Project filtering
    initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Smooth scrolling for internal links
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Contact link animations
    initContactAnimations() {
        const contactLinks = document.querySelectorAll('.hero-contact a, .footer-contact a');
        
        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
                link.style.transition = 'all 0.3s ease';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });

        // Bounce effect for primary CTA buttons
        const ctaButtons = document.querySelectorAll('.btn-primary');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.animation = 'pulse 0.5s ease-in-out';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.animation = '';
            });
        });
    }
}

// Utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait, immediate) {
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
    },

    // Type writer effect for hero title
    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    },

    // Number counter animation
    animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
};

// Custom animations using CSS keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .skill-item {
        animation: fadeInUp 0.6s ease forwards;
        animation-fill-mode: both;
    }
    
    .project-card {
        animation: fadeInUp 0.6s ease forwards;
        animation-fill-mode: both;
    }
`;
document.head.appendChild(style);

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    
    // Initialize number counters for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const text = entry.target.textContent;
                const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                
                if (!isNaN(number)) {
                    Utils.animateNumber(entry.target, number);
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Performance optimization: Preload critical images
const preloadImages = () => {
    const images = [
        'images/IMG_1856.jpg',
        'images/recipe.png',
        'images/itunes.png',
        'images/C4.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Call preload on page load
window.addEventListener('load', preloadImages);
