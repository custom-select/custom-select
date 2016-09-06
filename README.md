# custom-select
A lightweight JS script for custom select creation.
No dependencies needed.

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
Array customSelect(elements[, pluginParameters]);
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


The *pluginParameters* parameter is an object for plugin configuration, default is:
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

The return is an Array of customSelect [instances](getInstance), that contains all the  [method and properties](MethodAndProperties) exposed.

## Style Classes
All classes can be configured using *pluginParameters*, but container secondary class `customSelect` that is for internal use and should not be touched or used for style.

### Structure Classes

Self explained structure classes, and relative may-have status classes

`containerClass: 'custom-select-container'` may have `isDisabledClass`

`openerClass: 'custom-select-opener'` may have `isActiveClass`

`panelClass: 'custom-select-panel'` may have `isOpenClass`

`optionClass: 'custom-select-option'` may have `isSelectedClass`, `hasFocusClass`

`optgroupClass: 'custom-select-optgroup'`

### State Classes

`isSelectedClass: 'is-selected'` means that custom option is selected (as native selected)

`hasFocusClass: 'has-focus'` means that custom option has focus (mouseover, arrow navigation and keyboard autocomplete changes focus)

`isDisabledClass: 'is-disabled'` means that the select is disabled

`isActiveClass: 'is-active'` means that the opener is active (the panel is open)

`isOpenClass: 'is-open'` means that the panel is open

## How to get Plugin instance [getInstance]

Init return
```js
const cstSel = customSelect('select');
console.log(cstSel); // true|false
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

## Methods & Properties [MethodAndProperties]

### pluginOptions
Get the init plugin options
```js
cstSel.pluginOptions();
```

### open
```js
cstSel.open = true; // open the custom select
console.log(cstSel.open); // true
cstSel.open = false; // close the custom select
console.log(cstSel.open); // false
```

### disabled
```js
cstSel.disabled = true; // disable the custom select
console.log(cstSel.disabled); // true
cstSel.disabled = false; // enable the custom select
console.log(cstSel.disabled); // false
```

### value
Set the select value, change the native select and the custom select. Use it just like nativeSelect.value
```js
cstSel.value = 'foo'; // the first option with that value will be selected. If there is no option with that value the first one will be selected.
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

A instance of HTMLElement, tag OPTION:
```js
const toBeAppend = document.createElement('option');
```
A instance of HTMLElement, tag OPTGROUP:
```js
const toBeAppend = document.createElement('optgroup');
```
A list (NodeList, HTMLCollection, Array, etc) of instance of HTMLElement, tag OPTION/OPTGROUP:
```js
const toBeAppend = cstSel.empty();
```

The *target* parameter could be the `select (default)` or an optgroup that is already inside the select.

### insertBefore(elements, target)
insert an option or an optgroup before the specified target.
```js
const option = document.createElement('option');
option.text = 'Foo';
option.value = 'bar';
const target = cstSel.select.options[2]; // or you can get it by selectors or any
cstSel.insertBefore(option, target);
```

The *elements* parameter could be:

A instance of HTMLElement, tag OPTION:
```js
const toBeAppend = document.createElement('option');
```
A instance of HTMLElement, tag OPTGROUP:
```js
const toBeAppend = document.createElement('optgroup');
```
A list (NodeList, HTMLCollection, Array, etc) of instance of HTMLElement, tag OPTION/OPTGROUP:
```js
const toBeAppend = cstSel.empty();
```

The *target* parameter could be an `option` or an `optgroup` that is already inside the select.

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


## That's all!
**And now have fun ✌**
