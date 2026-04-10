// ============================================================
// CAKE CLUB COLOMBO — Script
// ============================================================

// ---------- NAV: scroll class + hamburger ----------
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ---------- SMOOTH SCROLL for nav links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---------- INTERSECTION OBSERVER: fade-in animations ----------
const fadeEls = document.querySelectorAll(
  '.menu-card, .testi-card, .step, .flavour-pill, .about__text, .about__visual, .gallery__item'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => observer.observe(el));

// ---------- ORDER FORM: WhatsApp redirect ----------
const orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name     = document.getElementById('name').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const occasion = document.getElementById('occasion').value;
  const date     = document.getElementById('date').value;
  const message  = document.getElementById('message').value.trim();

  const text = encodeURIComponent(
    `Hi Cake Club Colombo! 🎂\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Occasion:* ${occasion}\n` +
    `*Date:* ${date}\n` +
    `*Details:* ${message || 'N/A'}`
  );

  // Open Instagram DM as fallback (WhatsApp number placeholder)
  window.open(`https://www.instagram.com/cakeclubcolombo`, '_blank');
  orderForm.reset();
  showToast('Redirecting you to Instagram to send your enquiry! 🎂');
});

// ---------- TOAST NOTIFICATION ----------
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #4a2c2a;
    color: #fff;
    padding: 14px 28px;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: .92rem;
    font-weight: 500;
    box-shadow: 0 8px 32px rgba(74,44,42,.35);
    z-index: 999;
    opacity: 0;
    transition: opacity .35s ease, transform .35s ease;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ---------- GALLERY: lazy load hint ----------
// Gallery items link directly to Instagram — no extra JS needed.

// ---------- ACTIVE NAV LINK on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });
