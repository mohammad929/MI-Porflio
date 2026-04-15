document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth follower animation
    const animateFollower = () => {
        const easing = 0.1;
        followerX += (mouseX - followerX) * easing;
        followerY += (mouseY - followerY) * easing;
        
        follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;
        requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .panel, .skill-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '80px';
            follower.style.height = '80px';
            follower.style.transform = `translate3d(${followerX - 40}px, ${followerY - 40}px, 0)`;
            follower.style.backgroundColor = 'rgba(197, 160, 89, 0.1)';
            follower.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.backgroundColor = 'transparent';
            follower.style.borderColor = 'var(--accent)';
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.hero-content, .panel, .project-card, .experience-item, .skill-tag');
    
    // Add initial styles for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Define the reveal class in JS to avoid CSS bloat if not needed elsewhere
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Mobile Menu Toggle (Simplified for vanilla)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 7, 10, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    // Form Submission (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent!';
            btn.style.background = '#10b981'; // Success green
            contactForm.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'var(--accent)';
            }, 3000);
        });
    }
});
