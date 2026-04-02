/**
 * home.js — Homepage-specific interactions
 * Pick-One Initiative
 */

(function () {
  'use strict';

  // Smooth scroll for anchor links on homepage
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
