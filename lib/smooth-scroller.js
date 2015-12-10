//smooth-scroller.js

(function(window, $) {
  $.fn.smoothScroller = function(options) {
    options = $.extend({}, $.fn.smoothScroller.defaults, options);
    var el = $(this);
    var hash = el.attr('id');
    var historySupport = window.history && window.history.pushState;

    if (hash.length && historySupport) {
      window.history.pushState(null, null, '#' + hash);
    }

    $(options.scrollEl).animate({
      scrollTop: el.offset().top - $(options.scrollEl).offset().top - options.offset
    }, options.speed, options.ease, function() {
      var hash = el.attr('id');

      if(hash.length && !historySupport) {
        document.location.hash = hash;
      }

      el.trigger('smoothScrollerComplete');
    });

    return this;
  };

  $.fn.smoothScroller.defaults = {
    speed: 400,
    ease: 'swing',
    scrollEl: 'body,html',
    offset: 0
  };

  $('body').on('click', '[data-smoothscroller]', function(e) {
    e.preventDefault();
    var href = $(this).attr('href');

    if(href.indexOf('#') === 0) {
      $(href).smoothScroller();
    }
  });
}(window, jQuery));
