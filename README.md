# full-select
A lightweight JS script for custom select creation. Requires jQuery.

## How it works
Start with a simple select:
```html
<select id="mySelect">
    <option value>Select...</option>
    <option value="foo">Foo</option>
    <option value="buzz">Buzz</option>
</select>
```
**Important**: Don't nest the select inside a label, use instead the `for` attribute in the label