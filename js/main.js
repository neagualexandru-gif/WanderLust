'use strict';

// 1. SCROLL LIN PENTRU ANCORE (SMOOTH SCROLL)
const initSmoothScroll = () => {
    document.querySelectorAll('a.smooth-scroll, a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
};

// 2. BUTON ÎNAPOI SUS (BACK TO TOP)
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('d-none');
            } else {
                backToTopBtn.classList.add('d-none');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// 3. ANIMAȚIE LA SCROLL (FADE-IN EFFECT CU INTERSECTION OBSERVER)
const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    if (animatedElements.length === 0) return;

    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animăm o singură dată pentru performanță
                }
            });
        }, { threshold: 0.15 });

        animatedElements.forEach(el => animationObserver.observe(el));
    } else {
        // Fallback pentru browsere mai vechi
        animatedElements.forEach(el => el.classList.add('visible'));
    }
};

// 4. EVENIMENTUL CENTRALIZAT DE INIȚIALIZARE
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initBackToTop();
    initScrollAnimations();
});