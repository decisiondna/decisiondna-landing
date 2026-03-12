/* DecisionDNA — Minimal JS */

(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('active');
      toggle.setAttribute('aria-expanded', links.classList.contains('active'));
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Close mobile menu on outside click
  document.addEventListener('click', function (e) {
    if (links && links.classList.contains('active') && !e.target.closest('.nav')) {
      links.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Set active nav link based on current page
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Archetype matrix: fly-in company examples on scroll
  var matrix = document.getElementById('archetype-matrix');
  if (matrix) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(matrix);
  }

})();
