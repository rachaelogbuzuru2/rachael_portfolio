// ============================================
// PARTICLES ANIMATION
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);

        // Recreate particle after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
            setTimeout(() => {
                if (document.body.contains(particlesContainer)) {
                    initParticles();
                }
            }, 100);
        });
    }
}

// Initialize particles on load
window.addEventListener('DOMContentLoaded', initParticles);

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
        updateActiveNavLink(link);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLinkOnScroll();
});

function updateActiveNavLink(link) {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                updateActiveNavLink(link);
            }
        }
    });
}

// ============================================
// TYPING ANIMATION
// ============================================
function typeWriter() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = 'OMONZEJELE RACHAEL ESEOHE';
    let index = 0;
    typingElement.textContent = '';

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            entry.target.style.animation = 'revealAnimation 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, etc.
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .stat-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
});

// ============================================
// IMAGE GALLERY/CAROUSEL
// ============================================
function nextImage(button) {
    const gallery = button.closest('.project-image-container').querySelector('.project-gallery');
    const images = gallery.querySelectorAll('.project-img');
    const dots = button.closest('.project-image-container').querySelectorAll('.dot');
    
    let currentIndex = -1;
    for (let i = 0; i < images.length; i++) {
        if (images[i].classList.contains('active')) {
            currentIndex = i;
            break;
        }
    }
    
    const nextIndex = (currentIndex + 1) % images.length;
    updateGallery(images, dots, nextIndex);
}

function prevImage(button) {
    const gallery = button.closest('.project-image-container').querySelector('.project-gallery');
    const images = gallery.querySelectorAll('.project-img');
    const dots = button.closest('.project-image-container').querySelectorAll('.dot');
    
    let currentIndex = 0;
    for (let i = 0; i < images.length; i++) {
        if (images[i].classList.contains('active')) {
            currentIndex = i;
            break;
        }
    }
    
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery(images, dots, prevIndex);
}

function goToImage(dot) {
    const container = dot.closest('.gallery-dots');
    const dots = container.querySelectorAll('.dot');
    const gallery = dot.closest('.project-image-container').querySelector('.project-gallery');
    const images = gallery.querySelectorAll('.project-img');
    
    let index = 0;
    for (let i = 0; i < dots.length; i++) {
        if (dots[i] === dot) {
            index = i;
            break;
        }
    }
    
    updateGallery(images, dots, index);
}

function updateGallery(images, dots, index) {
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        this.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
        
        console.log('Form submitted with:', { name, email, subject, message });
    });
}

// ============================================
// DOWNLOAD CV BUTTON
// ============================================
const downloadCvBtn = document.getElementById('downloadCv');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function() {
        // Trigger CV file download
        const cvLink = document.createElement('a');
        cvLink.href = 'Rachael_Eseohe_CV.docx';
        cvLink.download = 'Rachael_Eseohe_CV.docx';
        document.body.appendChild(cvLink);
        cvLink.click();
        document.body.removeChild(cvLink);
    });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(statNumber, number);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
});

// ============================================
// INITIALIZATION
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeWriter, 500);
    
    // Initialize particles
    initParticles();
    
    // Set initial active nav link
    updateActiveNavLinkOnScroll();
});

// ============================================
// MOBILE MENU STYLING
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('navMenu');
    
    // Mobile menu styles
    if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.gap = '1rem';
        navMenu.style.padding = '2rem';
        navMenu.style.background = 'rgba(15, 23, 42, 0.95)';
        navMenu.style.borderTop = '1px solid rgba(0, 217, 255, 0.2)';
    }
});

window.addEventListener('resize', () => {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'relative';
        navMenu.style.top = 'auto';
        navMenu.style.left = 'auto';
        navMenu.style.right = 'auto';
        navMenu.style.background = 'transparent';
        navMenu.style.borderTop = 'none';
        navMenu.style.padding = '0';
        hamburger.classList.remove('active');
    } else {
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
    }
});

// ============================================
// SOCIAL LINKS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // You can add real social media links here
    const socialLinks = document.querySelectorAll('.social-links a');
    const socialPlatforms = [
        { icon: 'fa-linkedin', url: 'https://linkedin.com/in/rachael-eseohe' },
        { icon: 'fa-twitter', url: 'https://twitter.com/rachaeltech' },
        { icon: 'fa-github', url: 'https://github.com/rachaeltech' },
        { icon: 'fa-envelope', url: 'mailto:omonzejelerachael@gmail.com' }
    ];
    
    socialLinks.forEach((link, index) => {
        if (socialPlatforms[index]) {
            link.href = socialPlatforms[index].url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
});

// ============================================
// PROJECT LINKS
// ============================================
// Project links are now implemented as proper anchor tags
// No additional event listeners needed

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// MOUSE CURSOR EFFECTS
// ============================================
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Optional: Add custom cursor effects here
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeInPage 1s ease-out';
});

// Add fade in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInPage {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    body {
        opacity: 0;
    }
`;
document.head.appendChild(style);
