# Smooth-scroller

A tiny, ES6 JavaScript lib to handle smooth scrolling.

## Installation

```sh
npm install smooth-scroller
```

## Usage

See the [full example](./example).

### Javascript

```js
import 'smooth-scroller';
```

### HTML

```html
<a href="#foo" data-smooth>Scroll Smoothly</a>
...some content...
<div id="foo"></div>
```

## Events

Custom events are fired on the element:

| Event                | Description          |
|----------------------|----------------------|
| `smoothscroll:start` | Smooth scroll starts |
| `smoothscroll:end`   | Smooth scroll ends   |

## Methods

Smooth-scroller exposes two methods:

### init([selector='[data-smooth]'], [offset=0])

Enables smooth-scroller on the elements matched by `selector`.

#### Parameters

`selector` - {string = `'[data-smooth]'`} - Elements that will trigger smooth-scroll call once they're clicked
`offset` - {Number = `0`} - Controls the distance (negative or positive) between the top border of the element and the top border of the window.

### scroll(target, hash, [offset=0], [silent=false])

`target` - {string|Element|NodeList} - Target element to scroll
`hash` - {string|Element|NodeList} - DOM element ID to scroll
`offset` - {Number = `0`} - Controls the distance (negative or positive) between the top border of the element and the top border of the window.
`silent` - {Boolean = `false`} - If enabled, will generate a [`history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History_API) event
