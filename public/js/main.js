/* =============================================
   main.js — Shared logic across all pages
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Mobile Menu Toggle ─────────────────────────
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    }


    // ─── Header Scroll Effect ───────────────────────
    const header = document.getElementById('header');

    if (header && !header.classList.contains('scrolled')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    // ─── Hero Slider (Homepage) ─────────────────────
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progressBar = document.getElementById('progressBar');

    if (slides.length > 0) {
        let slideNumber = 0;
        const numberOfSlides = slides.length;
        let autoPlayTimer = null;
        const AUTO_PLAY_INTERVAL = 5000;

        function goToSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            slides[index].classList.add('active');
            resetProgress();
        }

        function nextSlide() {
            slideNumber = (slideNumber + 1) % numberOfSlides;
            goToSlide(slideNumber);
        }

        function prevSlide() {
            slideNumber = (slideNumber - 1 + numberOfSlides) % numberOfSlides;
            goToSlide(slideNumber);
        }

        function resetProgress() {
            if (progressBar) {
                progressBar.classList.remove('running');
                // Force reflow to restart animation
                void progressBar.offsetWidth;
                progressBar.classList.add('running');
            }
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
            resetProgress();
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
                startAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                startAutoPlay();
            }
        });

        // Touch / swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        const banner = document.querySelector('.banner');

        if (banner) {
            banner.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            banner.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    startAutoPlay();
                }
            }, { passive: true });
        }

        // Start auto-play
        startAutoPlay();
    }


    // ─── Scroll Animations (Intersection Observer) ──
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animations
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }


    // ─── FAQ Accordion ──────────────────────────────
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });


    // ─── Newsletter Form ────────────────────────────
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                showToast('success', 'Subscribed!', `We'll send updates to ${email}.`);
                newsletterForm.reset();
            }
        });
    }


    // ─── Smooth scroll to hash on page load ─────────
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 80;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }, 300);
    }

});


/* =============================================
   TOAST NOTIFICATION SYSTEM
   ============================================= */
function showToast(type, title, message, duration = 5000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconClass = type === 'success' ? 'bx bx-check-circle' : 'bx bx-error-circle';

    toast.innerHTML = `
        <i class="${iconClass} toast-icon"></i>
        <div class="toast-content">
            <h5>${title}</h5>
            <p>${message}</p>
        </div>
        <i class="bx bx-x toast-close"></i>
    `;

    container.appendChild(toast);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));

    // Auto-remove
    setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
    if (toast.classList.contains('removing')) return;
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
}
