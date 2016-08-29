import test from 'tape';
import fullSelect from './../';

var options;

test('On click opens the panel', assert => {
  document.body.innerHTML = '';

  var select = document.createElement('select');
  select.innerHTML = `
    <option value="">Select...</option>
    <optgroup label="Cips">
      <option value="zizz">Zizz</option>
      <optgroup label="Lips">
        <option value="frizz">Frizz</option>
      </optgroup>
    </optgroup>`;
  document.body.appendChild(select);

  var cstSelects = fullSelect('select');
  options = cstSelects[0].getOptions();

  document.getElementsByClassName(options.openerClass)[0].children[0].click();

  const actual = document.getElementsByClassName(options.panelClass)[0]
    .classList.contains('is-open');
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('On click on second select closes the first...', assert => {
  var select = document.createElement('select');
  select.innerHTML = `
    <option value="">Select...</option>
    <option value="zizz">Zizz</option>
    <option value="frizz">Frizz</option>`;
  document.body.appendChild(select);

  fullSelect(select);

  document.getElementsByClassName(options.openerClass)[1].click();

  const actual = document.getElementsByClassName(options.panelClass)[0]
    .classList.contains('is-open');
  const expected = false;

  assert.deepEqual(actual, expected,
    'should return false');
  assert.end();
});

test('... activates the second opener', assert => {
  const actual = document.getElementsByClassName(options.openerClass)[1]
    .classList.contains('is-active');
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('... opens the second panel.', assert => {
  const actual = document.getElementsByClassName(options.panelClass)[1]
    .classList.contains('is-open');
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('On click outside the selects closes the opened one', assert => {
  document.body.click();

  const actual = document.querySelectorAll('.is-open').length;
  const expected = 0;

  assert.deepEqual(actual, expected,
    'should return 0');
  assert.end();
});

test('On click on an option sets selected class', assert => {
  document.getElementsByClassName(options.openerClass)[1].parentNode.fullSelect.open();
  document.getElementsByClassName(options.optionClass)[2].click();

  const actual = document.querySelectorAll(`.${options.optionClass}`)[2]
    .classList.contains('is-selected');
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('... and focus class', assert => {
  const actual = document.getElementsByClassName(options.optionClass)[2]
    .classList.contains('has-focus');
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('... and closes the select', assert => {
  const actual = document.getElementsByTagName('select')[1].parentNode.fullSelect.isOpen;
  const expected = false;

  assert.deepEqual(actual, expected,
    'should return false');
  assert.end();
});
