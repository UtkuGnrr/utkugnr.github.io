// ========== UgenX Technology - script.js (Ana Sayfa) ==========

// ===== Sector Services Data =====
// Links now point to /hizmetler/index.html#hash for the landing page
const sectorServices = {
    otelcilik: {
        title: { tr: "Otelcilik Hizmetlerimiz", en: "Hospitality Services" },
        services: [
            { tr: "WhatsApp Chatbot", en: "WhatsApp Chatbot", link: "/hizmetler/#whatsapp-chatbot" },
            { tr: "Instagram Chatbot", en: "Instagram Chatbot", link: "/hizmetler/#instagram-chatbot" },
            { tr: "Yapay Zeka Destekli Resepsiyon", en: "AI-Powered Reception", link: "/hizmetler/#ai-resepsiyon" }
        ]
    },
    hostes: {
        title: { tr: "Hostes / Karşılama Hizmetlerimiz", en: "Hostess / Greeting Services" },
        services: [
            { tr: "Yapay Zeka Destekli Hostes", en: "AI-Powered Hostess", link: "/hizmetler/#ai-hostes" }
        ]
    },
    eticaret: {
        title: { tr: "E-Ticaret Hizmetlerimiz", en: "E-Commerce Services" },
        services: [
            { tr: "WhatsApp Chatbot", en: "WhatsApp Chatbot", link: "/hizmetler/#whatsapp-chatbot" },
            { tr: "Instagram Chatbot", en: "Instagram Chatbot", link: "/hizmetler/#instagram-chatbot" },
            { tr: "Kişiselleştirilmiş Sesli Yapay Zeka", en: "Personalized Voice AI", link: "/hizmetler/#sesli-ai" },
            { tr: "Fatura Oluşturma Sistemi", en: "Invoice Generation System", link: "/hizmetler/#fatura-sistemi" }
        ]
    },
    kurumsal: {
        title: { tr: "Kurumsal Hizmetlerimiz", en: "Corporate Services" },
        services: [
            { tr: "Yapay Zeka Destekli Satış Danışmanı", en: "AI-Powered Sales Consultant", link: "/hizmetler/#satis-danismani" },
            { tr: "Fatura Oluşturma Sistemi", en: "Invoice Generation System", link: "/hizmetler/#fatura-sistemi" }
        ]
    },
    saglik: {
        title: { tr: "Sağlık Sektörü Hizmetlerimiz", en: "Healthcare Services" },
        services: [
            { tr: "Yapay Zeka Destekli Resepsiyon", en: "AI-Powered Reception", link: "/hizmetler/#ai-resepsiyon" }
        ]
    },
    restoran: {
        title: { tr: "Restoran & Cafe Hizmetlerimiz", en: "Restaurant & Cafe Services" },
        services: [
            { tr: "Kişiselleştirilmiş Sesli Yapay Zeka", en: "Personalized Voice AI", link: "/hizmetler/#sesli-ai" },
            { tr: "Fatura Sistemi", en: "Invoice System", link: "/hizmetler/#fatura-sistemi" }
        ]
    }
};

// ===== State =====
let sRef = null;
let activeSector = null;
let currentLang = 'tr';

// ===== Logo Animation =====
setTimeout(() => document.getElementById('logoTop').classList.add('show'), 400);

// ===== Scroll Reveal =====
const obs = new IntersectionObserver(
    (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('vis'); }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.fade').forEach((el) => obs.observe(el));

// ===== Scroll Top Button =====
window.addEventListener('scroll', () => {
    document.getElementById('stw').classList.toggle('show', window.scrollY > window.innerHeight);
});

// ===== Hamburger Menu =====
function toggleMenu() {
    document.getElementById('ham').classList.toggle('open');
    document.getElementById('side').classList.toggle('open');
    document.getElementById('ov').classList.toggle('show');
}

function nav(id) {
    toggleMenu();
    setTimeout(() => document.getElementById(id).scrollIntoView({ behavior: 'smooth' }), 300);
}

// ===== Language =====
function toggleLang() {
    document.getElementById('ldd').classList.toggle('show');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-btn') && !e.target.closest('.lang-dd')) {
        document.getElementById('ldd').classList.remove('show');
    }
});

function setLang(l) {
    currentLang = l;
    document.getElementById('lbl').textContent = l === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN';
    document.getElementById('ldd').classList.remove('show');

    document.querySelectorAll('[data-' + l + ']').forEach((el) => {
        const v = el.getAttribute('data-' + l);
        if (v) {
            if (el.classList.contains('ref-q')) el.innerHTML = v;
            else el.textContent = v;
        }
    });

    document.querySelectorAll('.lang-dd button').forEach((b) => b.classList.remove('act'));
    document.querySelector(".lang-dd button[onclick=\"setLang('" + l + "')\"]").classList.add('act');

    // Re-render active sector if open
    if (activeSector) renderSectorServices(activeSector);
}

// ===== References Toggle =====
function tRef(i) {
    const el = document.getElementById('r' + i);
    if (sRef === i) { el.classList.remove('open'); sRef = null; }
    else {
        document.querySelectorAll('.ref-d').forEach((d) => d.classList.remove('open'));
        el.classList.add('open');
        sRef = i;
    }
}

// ===== Sector Services Toggle =====
function toggleSector(sectorId) {
    const panel = document.getElementById('sc-panel');
    const chips = document.querySelectorAll('.sc-ch');

    if (activeSector === sectorId) {
        panel.classList.remove('open');
        chips.forEach(c => c.classList.remove('sc-active'));
        activeSector = null;
        return;
    }

    chips.forEach(c => c.classList.remove('sc-active'));
    const activeChip = document.querySelector('[data-sector="' + sectorId + '"]');
    if (activeChip) activeChip.classList.add('sc-active');

    activeSector = sectorId;
    renderSectorServices(sectorId);
    panel.classList.add('open');
}

function renderSectorServices(sectorId) {
    const panel = document.getElementById('sc-panel');
    const data = sectorServices[sectorId];
    if (!data) return;

    const lang = currentLang;
    const title = data.title[lang] || data.title.tr;

    const arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

    let html = '';
    data.services.forEach((svc) => {
        const name = svc[lang] || svc.tr;
        html += `
            <li class="sc-svc-item" onclick="window.location.href='${svc.link}'">
                <span class="sc-svc-star">*</span>
                <span class="sc-svc-text">${name}</span>
                <span class="sc-svc-arrow">${arrowSvg}</span>
            </li>`;
    });

    panel.innerHTML = `
        <div class="sc-services-inner">
            <div class="sc-services-title">
                <span class="sc-dot"></span>
                ${title}
            </div>
            <ul class="sc-svc-list">${html}</ul>
        </div>`;
}
