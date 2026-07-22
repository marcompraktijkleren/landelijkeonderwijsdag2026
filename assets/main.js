/* Landelijke Onderwijsdag 2026 - interactions */
(function () {
  'use strict';

  /* Sticky header shrink */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var backdrop = document.querySelector('.nav-backdrop');
  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
    document.body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    nav.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) { closeNav(); } else { openNav(); }
    });
    var navLinks = nav.querySelectorAll('a');
    for (var n = 0; n < navLinks.length; n++) {
      navLinks[n].addEventListener('click', closeNav);
    }
  }
  if (backdrop) backdrop.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* Reveal on scroll (position-based; robust against fast flings) */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var ticking = false;
  function checkReveal() {
    ticking = false;
    var trigger = window.innerHeight * 0.92;
    for (var i = revealEls.length - 1; i >= 0; i--) {
      var el = revealEls[i];
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add('in');
        revealEls.splice(i, 1);
      }
    }
  }
  function onScrollReveal() {
    if (!ticking) { ticking = true; requestAnimationFrame(checkReveal); }
  }
  window.addEventListener('scroll', onScrollReveal, { passive: true });
  window.addEventListener('resize', onScrollReveal, { passive: true });
  window.addEventListener('load', checkReveal);
  checkReveal();
  setTimeout(function () {
    for (var i = 0; i < revealEls.length; i++) { revealEls[i].classList.add('in'); }
  }, 2500);

  /* Gallery lightbox */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var figs = document.querySelectorAll('[data-lightbox]');
    for (var g = 0; g < figs.length; g++) {
      figs[g].addEventListener('click', function () {
        var img = this.querySelector('img');
        if (!img) return;
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('close')) {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { lb.classList.remove('open'); document.body.style.overflow = ''; }
    });
  }

  /* Countdown */
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date('2026-11-24T09:00:00+01:00').getTime();
    var elD = cd.querySelector('[data-d]');
    var elH = cd.querySelector('[data-h]');
    var elM = cd.querySelector('[data-m]');
    var elS = cd.querySelector('[data-s]');
    function pad(v) { return (v < 10 ? '0' : '') + v; }
    function tick() {
      var diff = target - Date.now();
      if (diff < 0) diff = 0;
      var days = Math.floor(diff / 86400000);
      var hrs = Math.floor((diff % 86400000) / 3600000);
      var mins = Math.floor((diff % 3600000) / 60000);
      var secs = Math.floor((diff % 60000) / 1000);
      if (elD) elD.textContent = days;
      if (elH) elH.textContent = pad(hrs);
      if (elM) elM.textContent = pad(mins);
      if (elS) elS.textContent = pad(secs);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* Year in footer */
  var years = document.querySelectorAll('[data-year]');
  for (var yy = 0; yy < years.length; yy++) {
    years[yy].textContent = new Date().getFullYear();
  }
})();
