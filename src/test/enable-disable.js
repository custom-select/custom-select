import test from 'tape';
import customSelect from './../';

var select1;
var select2;
var eventMessage;

test('With the public provided method disable the select', assert => {
  document.body.innerHTML = '';

  select1 = document.createElement('select');
  select1.innerHTML = `
    <option value="">Select...</option>
    <optgroup label="Cips">
      <option value="zizz">Zizz</option>
    </optgroup>
    <optgroup label="Lips">
      <option value="frizz">Frizz</option>
    </optgroup>`;
  document.body.appendChild(select1);

  customSelect('select');

  select1.parentNode.addEventListener('custom-select:disabled',
    () => { eventMessage = 'First select is disabled!'; });

  select1.parentNode.customSelect.disabled = true;

  const actual = select1.disabled;
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('... and dispatches the custom event disabled ', assert => {
  assert.equal(eventMessage, 'First select is disabled!',
    'should return false "First select is disabled!"');
  assert.end();
});

test('Init a second disabled select', assert => {
  select2 = document.createElement('select');
  select2.disabled = true;
  select2.innerHTML = `
    <option value="">Select...</option>
    <option value="zizz">Zizz</option>
    <option value="frizz">Frizz</option>`;
  document.body.appendChild(select2);

  customSelect(select2);

  const actual = select2.parentNode.customSelect.disabled;
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('With the public provided method enable the first select', assert => {
  select1.parentNode.addEventListener('custom-select:enabled',
    () => { eventMessage = 'First select is enabled!'; });

  // Pass a falsy value instad of false
  select1.parentNode.customSelect.disabled = 0;

  const actual = select1.parentNode.classList.contains('is-disabled');
  const expected = false;

  assert.deepEqual(actual, expected,
    'should return false');
  assert.end();
});

test('... and dispatches the custom event enabled ', assert => {
  assert.equal(eventMessage, 'First select is enabled!',
    'should return false "First select is enabled!"');
  assert.end();
});
