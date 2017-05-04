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

const scroll = function(target, hash, offset = 0) {
  const rect = target.getBoundingClientRect();
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const adjustedOffset = Math.round(rect.top + scrollY) + offset;
  const startTime = new Date();
  if (!target.hasAttribute('tabindex')) {
    target.tabIndex = '-1';
  }
  window.history.pushState(null, 'Scroll', hash);
  animate(startTime.getTime(), scrollY, adjustedOffset);
  target.focus();
};

const listenEvent = function(el, offset) {
  el.addEventListener('click', (e) => {
    const hash = el.getAttribute('href');
    if (hash[0] !== '#') {
      return;
    }
    e.preventDefault();

    scroll(document.querySelector(hash), hash, offset);
  });
};

const init = function({
  query = '[data-smooth]',
  offset = 0,
} = {}) {
  if (!window.requestAnimationFrame) {
    return;
  }
  const els = document.querySelectorAll(query);

  for (let i = 0, c = els.length; i < c; i++) {
    const el = els[i];
    listenEvent(el, offset);
  }
};

export { init as default, scroll };

window.addEventListener('DOMContentLoaded', () => {
  init();
});
