#smooth-scroller

A tiny, es6 javascript lib to handle smooth scrolling

##Installation

`npm install --save smooth-scroller`

##Usage

Javascript

```javascript
import smoothScroller from 'smooth-scroller'
window.addEventListener('DOMContentLoaded', () => {
  smoothScroller();
});
```

HTML
```html
<a href="#foo" data-smooth>Scroll Smoothly</a>
...some content...
<div id="foo"></div>
```
