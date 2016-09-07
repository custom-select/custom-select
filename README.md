# custom-select
A lightweight JS script for custom select creation.
No dependencies needed.


## Install
Download the minified build file [here](https://raw.githubusercontent.com/custom-select/custom-select/master/build/index.min.js).

Or install with npm:
```
$ npm install --save custom-select
```

## Use
In HTML with the `script` tag:
```html
<script src="index.min.js" type="text/javascript"></script>
```
With ES6 modules via the `import` statement:
```js
import customSelect from 'custom-select';
```
In CommonJs environments with the `require` function:
```js
var customSelect = require("custom-select").default;
```
**Note**: the `require().default` is necessary due to the babelify export system.

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
**Important**: Don't nest the select inside a label! Use instead the `for` attribute on the label.

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
You can style it by yourself via css, check the examples for inspirations.

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
  isActiveClass: 'is-active',
  isOpenClass: 'is-open'
}
```

The return is an Array of customSelect [instances](#how-to-get-plugin-instance), that contains all the public exposed [methods and properties](#methods--properties).

## Style Classes
All css classes can be configured using *pluginOptions*, but container secondary class, `customSelect`, is only for internal use and should not be removed or used for styling purpose.

### Structure Classes

Self explained structure classes, and relative may-have status classes:

`containerClass: 'custom-select-container'` may have `isDisabledClass`

`openerClass: 'custom-select-opener'` may have `isActiveClass`

`panelClass: 'custom-select-panel'` may have `isOpenClass`

`optionClass: 'custom-select-option'` may have `isSelectedClass`, `hasFocusClass`

`optgroupClass: 'custom-select-optgroup'`

### State Classes

`isSelectedClass: 'is-selected'` - when the custom option is selected (as native selected attribute).

`hasFocusClass: 'has-focus'` - when the custom option has current focus (mouseover, arrow navigation and keyboard autocomplete changes the focus).

`isDisabledClass: 'is-disabled'` - when the select is disabled.

`isActiveClass: 'is-active'` - when the opener is active (the panel is open).

`isOpenClass: 'is-open'` - when the panel is open.

## How to get Plugin instance

Init return
```js
const cstSel = customSelect('select');
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

### pluginOptions
Get the plugin options.
```js
cstSel.pluginOptions();
```

### open
Get/set property.
```js
cstSel.open = true; // open the custom select
console.log(cstSel.open); // true
cstSel.open = false; // close the custom select
console.log(cstSel.open); // false
```

### disabled
Get/set property.
```js
cstSel.disabled = true; // disable the custom select
console.log(cstSel.disabled); // true
cstSel.disabled = false; // enable the custom select
console.log(cstSel.disabled); // false
```

### value
Get/set property.  
Change both the native select and the custom select. Use it just like nativeSelect.value
```js
cstSel.value = 'foo'; // the first option with that value will be selected. If there is no option with that value the first one'll be selected.
console.log(cstSel.value); // return foo if there was an option with 'foo' value
```

### append(elements[, target])
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

### insertBefore(elements, target)
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

### remove(node)
remove an option or an optgroup
```js
cstSel.remove(cstSel.select.options[1]);
```

### empty()
empty the select
```js
cstSel.empty();
```

### destroy()
destroy the plugin, removing custom markup, classes, and listeners.
```js
cstSel.destroy();
```

### opener
DOM Element

### select
DOM Element

### panel
DOM Element

### container
DOM Element


## Events

### custom-select.open
Only on `container`.
```js
cstSel.container.addEventListener('custom-select.open',
  (e) => { console.log(`${e.target} is open 😊`)});
```

### custom-select.close
Only on `container`.
```js
cstSel.container.addEventListener('custom-select.close',
  (e) => { console.log(`${e.target} is closed 😔`)});
```

### custom-select.disabled
Only on `container`.
```js
cstSel.container.addEventListener('custom-select.disabled',
  (e) => { console.log(`${e.target} is disabled 👋`)});
```

### custom-select.enabled
Only on `container`.
```js
cstSel.container.addEventListener('custom-select.enabled',
  (e) => { console.log(`${e.target} is enabled 👏`)});
```

### custom-select.focus-outside-panel
Recommended on `panel`.  
  
This `CustomEvent` fires when the focused option moves outside the visible part of the `panel`.  
It bubbles, so the listener can be placed on every ancestor of the custom options.  
This event is useful for custom animations on select's autocomplete-search, when the focus moves to the found option.
By default there's no animation but a simply `scrollTop` change of the `panel`.  
You can overwrite this behaviour by simply adding an `EventListener`, with `useCapture` argument set to `true` and an `e.stopPropagation()` statement inside you listener's callback-function.
```js
// Example with jQuery animate
cstSel.panel.addEventListener('custom-select.focus-outside-panel',
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

## That's all!
**And now have fun ✌**
