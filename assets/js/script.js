(function () {
  'use strict';

  var root = document.documentElement;
  var projects = document.querySelectorAll('.project');

  // Some styles (editorial) set --collapsible: 1 so projects behave as expandable rows.
  // Every other style shows all projects open.
  function collapsible() {
    return getComputedStyle(root).getPropertyValue('--collapsible').trim() === '1';
  }

  function setupProjects() {
    var on = collapsible();
    projects.forEach(function (d, i) {
      var summary = d.querySelector('summary');
      if (on) {
        summary.removeAttribute('tabindex');
        d.open = i === 0;
      } else {
        summary.setAttribute('tabindex', '-1');
        d.open = true;
      }
      summary.addEventListener('click', function (e) {
        if (!collapsible()) e.preventDefault();
      });
    });
  }

  // Run after the stylesheet (and its custom properties) has applied.
  if (document.readyState === 'complete') setupProjects();
  else window.addEventListener('load', setupProjects);

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
