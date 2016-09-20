/* global window,document */
'use strict';

const duration = 1000;

const ease = function(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

const animate = function(startTime, start, end) {
  const time = new Date().getTime();
  let to = ease(time - startTime, start, end - start, duration);

  if (to > end) {
    to = end;
    return;
  }

  window.scrollTo(0, to);

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    return;
  }

  window.requestAnimationFrame(() => animate(startTime, start, end));
};

const scroll = function(el) {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(el.getAttribute('href'));
    const rect = target.getBoundingClientRect();
    const offset = rect.top + window.scrollY;
    const startTime = new Date();
    animate(startTime.getTime(), window.scrollY, offset);
  });
};

const init = function(query) {
  if (!query) {
    query = document.querySelectorAll('[data-smooth]');
  }
  for (let i = 0, c = query.length; i < c; i++) {
    const el = query[i];
    scroll(el);
  }
};

export default init;
