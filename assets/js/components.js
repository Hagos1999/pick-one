/**
 * components.js — Loads and injects shared header and footer partials via fetch()
 * Pick-One Initiative
 *
 * NOTE: fetch() requires a server (http://) context.
 * On file:// protocol this will fail silently — deploy to Vercel or
 * run locally with: npx -y serve .
 */

(function () {
  'use strict';

  /**
   * Injects a partial HTML fragment into a placeholder element.
   * @param {string} placeholderId - The id of the placeholder div.
   * @param {string} partialPath   - Relative path to the partial HTML file.
   * @returns {Promise<void>}
   */
  function loadPartial(placeholderId, partialPath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return Promise.resolve();

    return fetch(partialPath)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load: ' + partialPath);
        return res.text();
      })
      .then(function (html) {
        placeholder.innerHTML = html;
      })
      .catch(function (err) {
        console.warn('[Pick-One] Partial load failed:', err.message);
        console.warn(
          '[Pick-One] Tip: run a local server (e.g. "npx serve .") to enable shared header/footer.'
        );
      });
  }

  function init() {
    // All pages live at root, so partial paths are always relative to root.
    Promise.all([
      loadPartial('header-placeholder', 'partials/header.html'),
      loadPartial('footer-placeholder', 'partials/footer.html'),
    ]).then(function () {
      // After injection, reinitialise active link highlighting
      if (window.pickone && window.pickone.highlightActiveLinks) {
        window.pickone.highlightActiveLinks();
      }
      // Reinitialise scroll handler for the new header
      if (window.pickone && window.pickone.onScroll) {
        window.pickone.onScroll();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
