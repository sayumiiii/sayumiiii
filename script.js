/* ============================================================
   CAKE CLUB COLOMBO — script.js
   Features:
   - Sticky navbar with scroll class
   - Mobile hamburger menu
   - Active nav link highlighting
   - Scroll reveal animations (IntersectionObserver)
   ============================================================ */

(function () {
  'use strict';

  /* ---- Cached DOM references ---- */
  const header    = document.getElementById('site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  const allLinks  = navLinks.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const reveals   = document.querySelectorAll('.reveal');

  /* ====================================================
     1. STICKY NAVBAR
     Adds .scrolled to <header> when page scrolls > 60px
  ==================================================== */
  function handleNavScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load in case page is already scrolled


  /* ====================================================
     2. HAMBURGER MENU
  ==================================================== */
  function openMenu() {
    navLinks.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when any nav link is clicked
  allLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside the nav
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('nav-open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
      closeMenu();
      navToggle.focus();
    }
  });


  /* ====================================================
     3. ACTIVE NAV LINK HIGHLIGHTING
     Uses IntersectionObserver to track which section is
     currently most visible in the viewport.
  ==================================================== */
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          allLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px', // trigger when section is ~40% into view
      threshold: 0,
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });


  /* ====================================================
     4. SCROLL REVEAL ANIMATIONS
     Elements with class .reveal fade in + slide up
     when they enter the viewport.
  ==================================================== */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach(function (el, index) {
    // Stagger sibling reveals (cards in a grid)
    const parent = el.parentElement;
    const siblings = parent.querySelectorAll('.reveal');
    if (siblings.length > 1) {
      const siblingIndex = Array.from(siblings).indexOf(el);
      el.style.transitionDelay = siblingIndex * 80 + 'ms';
    }
    revealObserver.observe(el);
  });


  /* ====================================================
     5. SMOOTH SCROLL for anchor links (fallback for
     browsers that don't support CSS scroll-behavior)
  ==================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

})();
