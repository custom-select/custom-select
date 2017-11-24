# custom-select
A lightweight JavaScript library for custom HTML `<select>` creation and managing.
No dependencies needed.

[![Build Status](https://travis-ci.org/custom-select/custom-select.svg?branch=master)](https://travis-ci.org/custom-select/custom-select)

## Demos
[Base](https://codesandbox.io/embed/qqpnn467qw)  
[Bootstrap](https://codesandbox.io/embed/l3rxlj8qql)  
[Control buttons](https://codesandbox.io/embed/w7qq4l6zxk)  
[GSAP](https://codesandbox.io/embed/q3r133wmq6)  
[jQuery](https://codesandbox.io/embed/50qpv6z9q4)  
[Mobile Touch Devices](https://codesandbox.io/embed/lp0k307qxz)  

## Install


Install with npm (recommended)
```
$ npm install --save custom-select
```
Or download the minified build file [here](https://github.com/custom-select/custom-select/releases/latest).
(jquery version is alternative, not needed!)

## Use

With ES6 modules via the `import` statement:
```js
import customSelect from 'custom-select';
```
In CommonJs environments with the `require` function:
```js
var customSelect = require("custom-select").default;
```
**Note**: the `require().default` is necessary due to the babelify export system.  
  
In HTML with the `script` tag:
```html
<script src="index.min.js" type="text/javascript"></script>
```

## How it works
Start with a simple HTML `<select>`:
```html
<select id="mySelect">
  <option value>Select...</option>
  <option value="foo">Foo</option>
  <option value="buz">Buz</option>
</select>
```
```js
customSelect('select');
```
You can nest the select in their `label` or you can use the `for` attribute on the label.
Nested will work fine but it's formally wrong due to [label element specification](https://www.w3.org/TR/html5/forms.html#the-label-element): only a `select` element can be nested in a `label` tag.

Here's the HTML result:
```html
<div class="custom-select-container customSelect">
  <span class="custom-select-opener" tabindex="0">
    <span>Select...</span>
  </span>
  <select id="mySelect1">
    <option value>Select...</option>
    <option value="foo">Foo</option>
    <option value="buz">Buz</option>
  </select>
  <div class="custom-select-panel">
    <div class="custom-select-option is-selected has-focus" data-value="">Select...</div>
    <div class="custom-select-option" data-value="foo">Foo</div>
    <div class="custom-select-option" data-value="buz">Buz</div>
  </div>
</div>
```

Also [state classes](#state-classes) will be added and removed while plugin working.

You can use default css included in plugin [release](https://github.com/custom-select/custom-select/releases/latest) or style it by yourself.
You can also use advanced techniques for using native select on Mobile/touch devices. Check the examples for inspirations.

## Plugin init
```js
Array customSelect(elements[, pluginOptions]);
```

The *elements* parameter could be:

A DOMString selectors:
```js
customSelect('.myForm .mySelect');
```

A instance of HTMLElement, tag SELECT:
```js
customSelect(document.getElementById('mySelect'));
```

A list (NodeList, HTMLCollection, Array, etc) of instances of HTMLElement, tag SELECT:
```js
customSelect(document.querySelector('.mySelect'));
//or
customSelect(document.getElementsByClassName('mySelect'));
```


The *pluginOptions* parameter is an object that overwrites some default plugin configurations.

The default config is:
```js
{
  containerClass: 'custom-select-container',
  openerClass: 'custom-select-opener',
  panelClass: 'custom-select-panel',
  optionClass: 'custom-select-option',
  optgroupClass: 'custom-select-optgroup',
  isSelectedClass: 'is-selected',
  hasFocusClass: 'has-focus',
  isDisabledClass: 'is-disabled',
  isOpenClass: 'is-open'
}
```

The return is an Array of customSelect [instances](#how-to-get-plugin-instance), that contains all the public exposed [methods and properties](#methods--properties).

## Style Classes
All css classes can be configured using *pluginOptions*, except container secondary class `customSelect` which is only for internal use and should not be removed or used for styling purpose.

### Structure Classes

Self explained structure classes, and relative may-have status classes:

`containerClass: 'custom-select-container'` may have `isDisabledClass`, `isOpenClass`

`openerClass: 'custom-select-opener'`

`panelClass: 'custom-select-panel'`

`optionClass: 'custom-select-option'` may have `isSelectedClass`, `hasFocusClass`

`optgroupClass: 'custom-select-optgroup'`

### State Classes

`isSelectedClass: 'is-selected'` - when the custom option is selected (as native selected attribute).

`hasFocusClass: 'has-focus'` - when the custom option has current focus (mouseover, arrow navigation and keyboard autocomplete changes the focus).

`isDisabledClass: 'is-disabled'` - when the select is disabled.

`isOpenClass: 'is-open'` - when the panel is open.

## How to get Plugin instance

Init return
```js
const cstSel = customSelect('select')[0]; // return is an array of instances!
console.log(cstSel.open); // true|false
```
The DOM select
```js
customSelect('select');
const cstSel =  document.querySelector('select').customSelect
console.log(cstSel.open); // true|false
```
The DOM select container
```js
customSelect('select');
const cstSel =  document.querySelector('.customSelect').customSelect
console.log(cstSel.open); // true|false
```

## Methods & Properties

### pluginOptions `property [readonly]`
Get the plugin options.
```js
cstSel.pluginOptions;
```

### open `property`
Get/set property.
```js
cstSel.open = true; // open the custom select
console.log(cstSel.open); // true
cstSel.open = false; // close the custom select
console.log(cstSel.open); // false
```

### disabled `property`
Get/set property.
```js
cstSel.disabled = true; // disable the custom select
console.log(cstSel.disabled); // true
cstSel.disabled = false; // enable the custom select
console.log(cstSel.disabled); // false
```

### value `property`
Get/set property.  
Change both the native select and the custom select. Use it just like nativeSelect.value
```js
cstSel.value = 'foo'; // the first option with that value will be selected. If there is no option with that value the first one'll be selected.
console.log(cstSel.value); // return foo if there was an option with 'foo' value
```

### append(elements[, target]) `method`
Append an option or an optgroup to the select.
```js
const option = document.createElement('option');
option.text = 'Foo';
option.value = 'bar';
cstSel.append(option);
```

The *elements* parameter could be:

An instance of HTMLElement, tag OPTION:
```js
const toBeAppend = document.createElement('option');
```
An instance of HTMLElement, tag OPTGROUP:
```js
const toBeAppend = document.createElement('optgroup');
```
A list (NodeList, HTMLCollection, Array, etc) of instance of HTMLElement, tag OPTION/OPTGROUP:
```js
const toBeAppend = cstSel.empty();
```

The *target* parameter must be the `select` **(default)** or an optgroup that is already inside the select.

### insertBefore(elements, target) `method`
insert an option or an optgroup before the specified target.
```js
const option = document.createElement('option');
option.text = 'Foo';
option.value = 'foo';
const target = cstSel.select.options[2];
cstSel.insertBefore(option, target);
```

The *elements* parameter could be:

An instance of HTMLElement, tag OPTION:
```js
const toBeAppend = document.createElement('option');
```
An instance of HTMLElement, tag OPTGROUP:
```js
const toBeAppend = document.createElement('optgroup');
```
A list (NodeList, HTMLCollection, Array, etc) of instance of HTMLElement, tag OPTION/OPTGROUP:
```js
const toBeAppend = cstSel.empty();
```

The *target* parameter must be an `option` or an `optgroup` that is already inside the select.

### remove(node) `method`
remove an option or an optgroup
```js
cstSel.remove(cstSel.select.options[1]);
```

### empty() `method`
empty the select
```js
cstSel.empty();
```

### destroy() `method`
destroy the plugin, removing custom markup, classes, and listeners.
```js
cstSel.destroy();
```

### opener `property [readonly]`
DOM Element

### select `property [readonly]`
DOM Element

### panel `property [readonly]`
DOM Element

### container `property [readonly]`
DOM Element


## Events

### custom-select:open
Only on `container`.
```js
cstSel.container.addEventListener('custom-select:open',
  (e) => { console.log(`${e.target} is open 😊`)});
```

### custom-select:close
Only on `container`.
```js
cstSel.container.addEventListener('custom-select:close',
  (e) => { console.log(`${e.target} is closed 😔`)});
```

### custom-select:disabled
Only on `container`.
```js
cstSel.container.addEventListener('custom-select:disabled',
  (e) => { console.log(`${e.target} is disabled 👋`)});
```

### custom-select:enabled
Only on `container`.
```js
cstSel.container.addEventListener('custom-select:enabled',
  (e) => { console.log(`${e.target} is enabled 👏`)});
```

### custom-select:focus-outside-panel
Fired on custom option, recommended listener on `panel`.  

This `CustomEvent` fires when the focused option moves outside the visible part of the `panel`.  
It bubbles, so the listener can be placed on every ancestor of the custom options.  
This event is useful for custom animations on select's autocomplete-search, when the focus moves to the found option.
By default there's no animation but a simply `scrollTop` change of the `panel`.  
You can overwrite this behaviour by simply adding an `EventListener`, with `useCapture` argument set to `true` and an `e.stopPropagation()` statement inside you listener's callback-function.
```js
// Example with jQuery animate
cstSel.panel.addEventListener('custom-select:focus-outside-panel',
  (e) => {
    e.stopPropagation();
    $(cstSel.panel).animate({
      scrollTop: e.target.offsetTop,
    }, 300)
  }, true);
```

### change
Only on `select`.
```js
cstSel.select.addEventListener('change',
  (e) => { console.log(`${e.target} has changed it's value 👌`)});
```

## jQuery adaptor
If you really can't live without jQuery, an adaptor was made for you 😩: [download jQuery version here](https://github.com/custom-select/custom-select/releases/latest).

### jQuery init
```js
$('#mySelect').customSelect();
```

### jQuery property set
```js
$('#mySelect').customSelect('open', true);
```

### jQuery property get
```js
$('#mySelect').customSelect('open');
```

### jQuery methods
```js
$('#mySelect').customSelect('remove', $('#mySelect')[0].options[1]);
```

## That's all folks!
**And now have fun ✌**

## Browser support
Oh wait, I was almost forgetting:
* Chrome
* Safari 7.0
* Firefox 10 (maybe also older, but come on...)
* Android 4.0
* Mobile Safari 6.0
* Internet Explorer 10
