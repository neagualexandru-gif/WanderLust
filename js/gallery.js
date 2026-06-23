'use strict';

// ==========================================
// A. CONTOR NUMERIC ANIMAT (PENTRU STATISTICI)
// ==========================================
const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    
    const duration = 2000; // Durata totală a animației în milisecunde
    const start = 0;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Efect de easeOutQuad pentru fluiditate
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * (target - start) + start);
        
        el.innerText = currentValue + (el.getAttribute('data-suffix') || '');

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            el.innerText = target + (el.getAttribute('data-suffix') || '');
        }
    };

    requestAnimationFrame(updateNumber);
};

const initCounters = () => {
    const statsSection = document.getElementById('stats');
    const counters = document.querySelectorAll('.counter');

    if (!statsSection || counters.length === 0) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => animateCounter(counter));
                    observer.unobserve(entry.target); // Animăm o singură dată la scroll
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    } else {
        // Fallback automat
        counters.forEach(counter => animateCounter(counter));
    }
};

// ==========================================
// B. SISTEM SIMPLU LIGHTBOX PENTRU GALERIE
// ==========================================
const initLightbox = () => {
    const galleryItems = document.querySelectorAll('.lightbox-trigger');
    const lightboxModalEl = document.getElementById('lightboxModal');
    
    if (!lightboxModalEl || galleryItems.length === 0) return;
    
    const lightboxModal = new bootstrap.Modal(lightboxModalEl);
    const lightboxImg = lightboxModalEl.querySelector('.lightbox-img');
    const lightboxCaption = lightboxModalEl.querySelector('.lightbox-caption');

    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const src = this.getAttribute('src') || this.querySelector('img').getAttribute('src');
            const alt = this.getAttribute('alt') || this.querySelector('img').getAttribute('alt') || 'Imagine Galerie';
            
            lightboxImg.setAttribute('src', src);
            lightboxImg.setAttribute('alt', alt);
            lightboxCaption.innerText = alt;
            
            lightboxModal.show();
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initLightbox();
});