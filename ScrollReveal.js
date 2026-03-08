// ========== UgenX Hizmetler Landing Page - script.js ==========

// ===== Scroll Reveal =====
const obs = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('vis');
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.fade').forEach((el) => obs.observe(el));

// ===== Hash-based Scroll & Highlight =====
function scrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.querySelector(hash);
    if (!target) return;

    // Small delay to ensure DOM is ready and CSS transitions can fire
    setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Add highlight effect
        target.classList.add('highlight');
        setTimeout(() => {
            target.classList.remove('highlight');
        }, 2500);
    }, 300);
}

// Run on page load
window.addEventListener('DOMContentLoaded', scrollToHash);

// Run if hash changes while on the page (e.g., clicking quick-nav chips)
window.addEventListener('hashchange', scrollToHash);

// ===== Quick Nav chip click =====
document.querySelectorAll('.qn-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
        const targetId = chip.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (!target) return;

        // Update URL hash without full page reload
        history.pushState(null, '', '#' + targetId);

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Highlight
        target.classList.add('highlight');
        setTimeout(() => target.classList.remove('highlight'), 2500);
    });
});
