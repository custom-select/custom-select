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
**Important**: Don't nest the select inside a label! Use instead the `for` attribute on the label.

Here's the HTML result:
```html
<div class="custom-select-container customSelect">
  <span class="custom-select-opener" tabindex="0">
    <span>Select...</span>
  </span>
  <select id="mySelect1"><option value="">Select...</option>
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
The `<select>`'ll be wrapped in a div `.customSelect`; an opener `.custom-select-opener` and a panel `.custom-select-panel`, will be created, with inside the cloned options from the original `<select>`.

That's all! Show, hide and styles will all be managed with css.

**And now have fun ✌**
