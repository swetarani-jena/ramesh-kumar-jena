// Modern JavaScript for Glass-Morphism Design

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections with staggered animation
const animatedElements = document.querySelectorAll('.service-card, .project-card, .stat-glass-card');
animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    fadeInObserver.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration, isCurrency = false) => {
    let start = 0;
    const increment = target / (duration / 16);
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        start = Math.min((elapsed / duration) * target, target);
        
        if (isCurrency) {
            element.textContent = '₹' + Math.floor(start) + 'Cr+';
        } else if (target === 100) {
            element.textContent = Math.floor(start) + '%';
        } else {
            element.textContent = Math.floor(start) + '+';
        }
        
        if (start < target) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    requestAnimationFrame(updateCounter);
};

// Trigger counter animation when stat cards are visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text.includes('₹')) {
                animateCounter(statNumber, 12, 2000, true);
            } else if (text.includes('%')) {
                animateCounter(statNumber, 100, 2000);
            } else {
                const num = parseInt(text.replace('+', ''));
                animateCounter(statNumber, num, 2000);
            }
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-glass-card').forEach(card => {
    statObserver.observe(card);
});

// Form submission with validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success state
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Parallax effect for hero section
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            
            if (heroVisual && scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// Add hover effect to project cards with tilt
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = '#e8eaf6';
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add cursor glow effect
const createCursorGlow = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.15s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Only add cursor glow on desktop
if (window.innerWidth > 768) {
    createCursorGlow();
}

// Reveal animations for section headers
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const badge = entry.target.querySelector('.section-badge');
            const title = entry.target.querySelector('.section-title');
            const description = entry.target.querySelector('.section-description');
            
            if (badge) {
                badge.style.opacity = '0';
                badge.style.transform = 'translateY(20px)';
                badge.style.transition = 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s';
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                }, 50);
            }
            
            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(20px)';
                title.style.transition = 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s';
                setTimeout(() => {
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }, 100);
            }
            
            if (description) {
                description.style.opacity = '0';
                description.style.transform = 'translateY(20px)';
                description.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
                setTimeout(() => {
                    description.style.opacity = '1';
                    description.style.transform = 'translateY(0)';
                }, 150);
            }
            
            headerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-header').forEach(header => {
    headerObserver.observe(header);
});

// Add gradient animation to buttons
const buttons = document.querySelectorAll('.btn-primary, .submit-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.backgroundSize = '200% 200%';
        this.style.animation = 'gradientShift 2s ease infinite';
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(style);