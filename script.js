// ============================================================
// CAKE CLUB COLOMBO — Script
// ============================================================

// ---------- NAV: scrolled class ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---------- HAMBURGER ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  });
});

// ---------- GALLERY FILTER TABS ----------
const tabs = document.querySelectorAll('.tab');
const galleryItems = document.querySelectorAll('.gallery__item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    galleryItems.forEach(item => {
      const cats = item.dataset.cat || '';
      const show = filter === 'all' || cats.includes(filter);
      item.classList.toggle('hidden', !show);
      // Reset tall on filter
      if (filter !== 'all') {
        item.classList.remove('gallery__item--tall');
      }
    });
    // Re-add tall to first visible item when showing all
    if (filter === 'all') {
      const first = document.querySelector('.gallery__item');
      if (first) first.classList.add('gallery__item--tall');
    }
  });
});

// ---------- INTERSECTION OBSERVER: fade-up ----------
const fadeEls = document.querySelectorAll(
  '.menu-card, .gallery__item, .how-step, .about__text, .about__visual, .testi-card, .dm-btn'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ---------- ORDER FORM → Instagram DM ----------
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', e => {
  e.preventDefault();
  const name     = document.getElementById('name').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const cakeType = document.getElementById('cakeType').value;
  const date     = document.getElementById('date').value;
  const message  = document.getElementById('message').value.trim();

  // Build a pre-filled message for Instagram (copy to clipboard)
  const text =
    `Hi Cake Club Colombo! 🎂\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Cake: ${cakeType}\n` +
    `Date: ${date}\n` +
    `Details: ${message || 'N/A'}`;

  navigator.clipboard.writeText(text).catch(() => {});
  window.open('https://www.instagram.com/cakeclubcolombo', '_blank');
  orderForm.reset();
  showToast('Opening Instagram — your enquiry details are copied to clipboard! 🌸');
});

// ---------- TOAST ----------
function showToast(msg) {
  document.querySelector('.toast')?.remove();
  const toast = Object.assign(document.createElement('div'), {
    className: 'toast',
    textContent: msg,
  });
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '28px',
    left: '50%',
    transform: 'translateX(-50%) translateY(16px)',
    background: '#2a1f1f',
    color: '#fff',
    padding: '13px 26px',
    borderRadius: '50px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '.88rem',
    fontWeight: '500',
    boxShadow: '0 8px 32px rgba(42,31,31,.3)',
    zIndex: '9999',
    opacity: '0',
    transition: 'opacity .3s ease, transform .3s ease',
    whiteSpace: 'nowrap',
    maxWidth: '90vw',
    textAlign: 'center',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(16px)';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// ---------- ACTIVE NAV LINK ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}, { passive: true });
