/* global window,document */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var smoothScroller = function smoothScroller(el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(el.getAttribute('href'));
    var rect = target.getBoundingClientRect();
    var offset = rect.top + window.scrollY;
    window.scrollTo(0, offset);
  });
};

var init = function init(query) {
  if (!query) {
    query = document.querySelectorAll('[data-smooth]');
  }
  for (var i = 0, c = query.length; i < c; i++) {
    var el = query[i];
    smoothScroller(el);
  }
};

exports.default = init;

//# sourceMappingURL=smooth-scroller.js.map