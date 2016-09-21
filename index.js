/* global window,document */
'use strict';

const duration = 1000;

const ease = function(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b; //eslint-disable-line
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

const animate = function(startTime, start, end) {
  const time = new Date().getTime();
  const difference = end - start;
  const goingUp = difference < 0;

  if (difference === 0) {
    return;
  }

  let to = Math.round(ease(time - startTime, start, difference, duration));

  if (!goingUp && to > end) {
    to = end;
  }

  if (goingUp && to < end) {
    to = end;
  }

  window.scrollTo(0, to);

  if (to === end) {
    return;
  }

  if (to < 0) {
    return;
  }

  window.requestAnimationFrame(() => animate(startTime, start, end));
};

const scroll = function(el) {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const hash = el.getAttribute('href');
    const target = document.querySelector(hash);
    const rect = target.getBoundingClientRect();
    const offset = rect.top + window.pageYOffset;
    const startTime = new Date();
    animate(startTime.getTime(), window.pageYOffset, offset);
    window.location.hash = hash;
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

window.addEventListener('DOMContentLoaded', () => {
  init();
});
