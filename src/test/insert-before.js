import test from 'tape';
import fullSelect from './../';

let option;
let actual;
let expected;
let target;

document.body.innerHTML = '';
const select = document.createElement('select');
select.innerHTML = `
  <option value="">Select...</option>
  <optgroup label="Moto">
    <option value="suzuki">Suzuki</option>
  </optgroup>
  <optgroup label="Auto">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>`;
document.body.appendChild(select);
const fullselect = fullSelect('select')[0];

test('Insert an option before an optgroup', assert => {
  target = select.children[1]; // Moto optgroup
  option = document.createElement('option');
  option.value = 'mustang';
  option.text = 'Mustang';

  fullselect.insertBefore(option, target);

  actual = select.children[1].value;
  expected = 'mustang';
  assert.deepEqual(actual, expected,
    'should return mustang');
  assert.end();
});

test('Insert an option before an option in a optgroup', assert => {
  target = select.options[2]; // Mercedes
  option = document.createElement('option');
  option.value = 'subaru';
  option.text = 'Subaru';

  fullselect.insertBefore(option, target);

  // The new injected custom option
  actual = select.parentNode.children[2].children[2].children[0].dataset.value;
  expected = 'subaru';
  assert.deepEqual(actual, expected,
    'should return subaru');
  assert.end();
});

test('Insert an optgroup with an option before an option', assert => {
  target = select.children[1]; // Moto optgroup

  const optgroup = document.createElement('optgroup');
  optgroup.setAttribute('label', 'Bike');

  option = document.createElement('option');
  option.value = 'mountain bike';
  option.text = 'Mountain bike';

  fullselect.insertBefore(optgroup, target);

  // The new injected optgroup
  actual = select.children[1].getAttribute('label');
  expected = 'Bike';
  assert.deepEqual(actual, expected,
    'should return Bike');
  assert.end();
});

test('Use a string as the target parameter argument', assert => {
  option = document.createElement('option');
  assert.throws(() => { select.parentNode.fullSelect.insertBefore(option, 'a string'); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Use undefined as the target parameter', assert => {
  option = document.createElement('option');
  assert.throws(() => { select.parentNode.fullSelect.insertBefore(option); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Use an invalid HTMLElement target parameter', assert => {
  option = document.createElement('option');
  assert.throws(() => { select.parentNode.fullSelect.insertBefore(option, option); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Use a string as the target parameter argument', assert => {
  assert.throws(() => { select.parentNode.fullSelect.insertBefore(undefined, target); }, TypeError,
    'should throw TypeError');
  assert.end();
});
