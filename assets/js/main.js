/**
 * main.js — Global JS: nav toggle, scroll behaviour, active link highlighting
 * Pick-One Initiative
 */

(function () {
  'use strict';

  // ── NAV SCROLL BEHAVIOUR ─────────────────────────────────────
  const header = document.querySelector('.site-header');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── HAMBURGER MENU ────────────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ── ACTIVE LINK HIGHLIGHTING ──────────────────────────────────
  function highlightActiveLinks() {
    const page = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (link) {
      const href = link.getAttribute('href') || '';
      const linkPage = href.split('/').pop();
      const isHome = (page === '' || page === 'index.html') && (linkPage === '' || linkPage === 'index.html');
      const isMatch = linkPage === page;

      link.classList.toggle('active', isHome || isMatch);
    });
  }

  highlightActiveLinks();

  // Export so components.js can call after partial injection
  window.pickone = window.pickone || {};
  window.pickone.highlightActiveLinks = highlightActiveLinks;
  window.pickone.onScroll = onScroll;
})();
