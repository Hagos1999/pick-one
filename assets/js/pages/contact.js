/**
 * contact.js — Form validation and submit via FormSubmit (zero signup required)
 * Pick-One Initiative
 *
 * How it works:
 *  - FormSubmit.co forwards submissions to your email with no account needed.
 *  - The FIRST submission sends a one-time activation email to info@pick-one.org.
 *    Click "Confirm" in that email and all future submissions will deliver normally.
 *  - No API key, no dashboard, no billing — completely free.
 *
 * To change the destination email, update the fetch URL below.
 */

(function () {
  'use strict';

  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  // ── VALIDATION HELPERS ────────────────────────────────────────
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function showError(input, message) {
    input.classList.add('error');
    let errEl = input.parentElement.querySelector('.form-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'form-error';
      input.parentElement.appendChild(errEl);
    }
    errEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('error');
    const errEl = input.parentElement.querySelector('.form-error');
    if (errEl) errEl.textContent = '';
  }

  function validateForm() {
    const name    = form.querySelector('#contact-name');
    const email   = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');
    let valid = true;

    clearError(name);
    clearError(email);
    clearError(message);

    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
      valid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'Please enter your email address.');
      valid = false;
    } else if (!validateEmail(email.value)) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'Please enter a message.');
      valid = false;
    }

    return valid;
  }

  // ── REAL-TIME VALIDATION ──────────────────────────────────────
  form.querySelectorAll('.form-input, .form-textarea').forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.classList.contains('error')) {
        clearError(input);
      }
    });
  });

  // ── FORM SUBMIT (via FormSubmit AJAX — no API key needed) ─────
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    var submitBtn = form.querySelector('[type="submit"]');
    var originalHTML = submitBtn.innerHTML;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    var name    = form.querySelector('#contact-name').value.trim();
    var email   = form.querySelector('#contact-email').value.trim();
    var subject = form.querySelector('#contact-subject') ? form.querySelector('#contact-subject').value.trim() : '';
    var message = form.querySelector('#contact-message').value.trim();

    // FormSubmit AJAX endpoint — change the email to your real address.
    // ↓ ↓ ↓  UPDATE THIS EMAIL if your contact address ever changes  ↓ ↓ ↓
    fetch('https://formsubmit.co/ajax/info@pick-one.org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject || 'New Pick-One Enquiry',
        message: message,
        // Suppress FormSubmit's own thank-you page redirect
        _captcha: 'false'
      })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success === 'true' || data.success === true) {
          form.style.display = 'none';
          if (successMsg) {
            successMsg.classList.add('visible');
            successMsg.focus();
          }
        } else {
          // Re-enable on failure so the user can retry
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
          alert('Something went wrong. Please email us directly at info@pick-one.org');
        }
      })
      .catch(function (err) {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        console.error('[Pick-One] Form submit error:', err);
        alert('A network error occurred. Please try again or email info@pick-one.org directly.');
      });
  });
})();
