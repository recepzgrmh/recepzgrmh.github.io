/**
 * scroll.js — Native scroll + progress bar
 * Lenis kaldırıldı. Tarayıcının kendi scroll'u kullanılıyor.
 * Hiç gecikme yok, anlık tepki var.
 */

(function () {
  'use strict';

  /* ─── 1. SCROLL PROGRESS BAR ─────────────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.width = (progress * 100) + '%';
  }, { passive: true });

  /* ─── 2. ANCHOR LİNKLER ──────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();