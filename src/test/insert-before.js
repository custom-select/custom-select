import test from 'tape';
import customSelect from './../';

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
const customselect = customSelect('select')[0];

test('Insert an option before an optgroup', assert => {
  target = select.children[1]; // Moto optgroup
  option = document.createElement('option');
  option.value = 'mustang';
  option.text = 'Mustang';

  customselect.insertBefore(option, target);

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

  customselect.insertBefore(option, target);

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

  customselect.insertBefore(optgroup, target);

  // The new injected optgroup
  actual = select.children[1].getAttribute('label');
  expected = 'Bike';
  assert.deepEqual(actual, expected,
    'should return Bike');
  assert.end();
});

test('InsertBefore: Use a string as the target parameter', assert => {
  option = document.createElement('option');
  assert.throws(() => { select.parentNode.customSelect.insertBefore(option, 'a string'); },
   TypeError, 'should throw TypeError');
  assert.end();
});

test('InsertBefore: Use undefined as the target parameter', assert => {
  assert.throws(() => { select.parentNode.customSelect.insertBefore(option); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('InsertBefore: Use an invalid HTMLElement target parameter', assert => {
  assert.throws(() => { select.parentNode.customSelect.insertBefore(option, option); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('InsertBefore: Use undefined as the node parameter', assert => {
  assert.throws(() => { select.parentNode.customSelect.insertBefore(undefined, target); },
    TypeError, 'should throw TypeError');
  assert.end();
});
