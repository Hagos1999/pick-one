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
  // Wrapped in a function because the header is injected asynchronously
  // via fetch() in components.js — the elements don't exist on first run.
  function initHamburger() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileNav = document.querySelector('.nav-mobile');

    if (!hamburger || !mobileNav) return;

    // Remove any existing listener to avoid double-binding on re-init
    hamburger.replaceWith(hamburger.cloneNode(true));
    const freshHamburger = document.querySelector('.nav-hamburger');

    freshHamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      freshHamburger.classList.toggle('open', isOpen);
      freshHamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on nav link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        freshHamburger.classList.remove('open');
        freshHamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !freshHamburger.contains(e.target)
      ) {
        mobileNav.classList.remove('open');
        freshHamburger.classList.remove('open');
        freshHamburger.setAttribute('aria-expanded', 'false');
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

  // Export for re-init after partial injection
  window.pickone = window.pickone || {};
  window.pickone.highlightActiveLinks = highlightActiveLinks;
  window.pickone.onScroll            = onScroll;
  window.pickone.initHamburger        = initHamburger;
})();
