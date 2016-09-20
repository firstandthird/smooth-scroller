/* global window,document */
'use strict';

const easeInOutQuad = function(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

const smoothScroller = function(el) {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(el.getAttribute('href'));
    const rect = target.getBoundingClientRect();
    const offset = rect.top + window.scrollY;
    window.scrollTo(0, offset);
  });
}

const init = function(query) {
  if (!query) {
    query = document.querySelectorAll('[data-smooth]');
  }
  for (let i = 0, c = query.length; i < c; i++) {
    const el = query[i];
    smoothScroller(el);
  }
};

export default init;
