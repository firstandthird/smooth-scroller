/* global window,document */

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

const scroll = function(el, offset) {
  el.addEventListener('click', (e) => {
    const hash = el.getAttribute('href');
    if (hash[0] !== '#') {
      return;
    }
    e.preventDefault();
    const target = document.querySelector(hash);
    const rect = target.getBoundingClientRect();
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const adjustedOffset = Math.round(rect.top + scrollY) + offset;
    const startTime = new Date();
    animate(startTime.getTime(), scrollY, adjustedOffset);
  });
};

const init = function({
  query = false,
  offset = 0
} = {}) {
  if (!window.requestAnimationFrame) {
    return;
  }
  if (!query) {
    query = document.querySelectorAll('[data-smooth]');
  }
  for (let i = 0, c = query.length; i < c; i++) {
    const el = query[i];
    scroll(el, offset);
  }
};

export default init;

window.addEventListener('DOMContentLoaded', () => {
  init({
    offset: 100
  });
});
