import test from 'tape';
import customSelect from './../';

let select;
let option;
let actual;
let expected;

test('Instance library and append an option at the end', assert => {
  document.body.innerHTML = '';
  select = document.createElement('select');
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

  option = document.createElement('option');
  option.value = 'mustang';
  option.text = 'Mustang';

  customselect.append([option]);

  assert.test('... and the last option has the correct value', q => {
    actual = select.options[4].value;
    expected = 'mustang';
    q.deepEqual(actual, expected,
      'should return mustang');
    q.end();
  });

  assert.test('... and the last custom option has the correct text', q => {
    actual = select.parentNode.children[2].children[3].textContent;
    expected = 'Mustang';
    q.deepEqual(actual, expected,
      'should return Mustang');
    q.end();
  });


  assert.test('... and the added custom option is selectable', q => {
    select.parentNode.customSelect.open = true;
    select.parentNode.children[2].children[3].click();

    actual = select.parentNode.children[2].children[3].classList.contains('is-selected');
    q.true(actual,
      'should return true');
    q.end();
  });

  assert.test('... and the value becomes the added options value', q => {
    actual = select.value;
    expected = 'mustang';
    q.equal(actual, expected,
      'should return mustang');
    q.end();
  });
  assert.end();
});

test('Insert an option at the end of a specified custom optgroup', assert => {
  const optGroupTarget = select.parentNode.children[2].children[2];

  option = document.createElement('option');
  option.value = 'tesla';
  option.text = 'Tesla';

  assert.throws(() => select.parentNode.customSelect.append(option, optGroupTarget), TypeError,
    'should throw TypeError');
  assert.end();
});

test('Insert an option at the end of a specified original optgroup', assert => {
  const optGroupTarget = select.children[2];

  option = document.createElement('option');
  option.value = 'mazda';
  option.text = 'Mazda';

  select.customSelect.append(option, optGroupTarget);

  actual = select.parentNode.children[2].children[2].children[2].textContent;
  expected = 'Mazda';
  assert.equal(actual, expected,
    'should return Mazda');

  assert.end();
});

test('Insert two selected options', assert => {
  var option1;
  var option2;

  option1 = document.createElement('option');
  option1.value = 'man';
  option1.text = 'MAN';
  option1.selected = true;

  option2 = document.createElement('option');
  option2.value = 'tata';
  option2.text = 'Tata';
  option2.setAttribute('selected', 'selected');

  select.customSelect.append([option1, option2]);

  actual = select.value;
  expected = 'tata';
  assert.equal(actual, expected,
    'should return tata');
  assert.end();
});

test('... and the correct custom option is-selected', assert => {
  actual = select.customSelect.panel
    .getElementsByClassName(select.customSelect.pluginOptions.isSelectedClass)[0].dataset.value;
  expected = 'tata';
  assert.equal(actual, expected,
    'should return tata');
  assert.end();
});

test('Insert an optgroup at the end', assert => {
  const optgroup = document.createElement('optgroup');
  optgroup.setAttribute('label', 'Bike');

  option = document.createElement('option');
  option.value = 'mountain bike';
  option.text = 'Mountain bike';

  optgroup.appendChild(option);

  select.parentNode.customSelect.append(optgroup);

  actual = select.customSelect.panel.children[6].dataset.label;
  expected = 'Bike';
  assert.equal(actual, expected,
    'should return Bike');
  assert.end();
});

test('Use a string as a the node parameter', assert => {
  assert.throws(() => { select.parentNode.customSelect.append('a string'); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Use an object as a the target parameter', assert => {
  option = document.createElement('option');
  option.value = 'skateboard';
  option.text = 'Skateboard';

  assert.throws(() => { select.parentNode.customSelect.append(option, { foo: 'foo' }); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Use an option not contained in the select as a the target parameter', assert => {
  var invalidTarget = document.createElement('optgroup');
  assert.throws(() => { select.parentNode.customSelect.append(option, invalidTarget); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Use an invalid argument', assert => {
  assert.throws(() => { select.parentNode.customSelect.append(new RegExp()); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Use an undefined argument', assert => {
  assert.throws(() => { select.parentNode.customSelect.append(); }, TypeError,
    'should throw TypeError');
  assert.end();
});

test('Use an empty array as an argument', assert => {
  expected = [];
  actual = select.parentNode.customSelect.append(expected);
  assert.deepEqual(actual, expected,
    'should return the same empty array');
  assert.end();
});
