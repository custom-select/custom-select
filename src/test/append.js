import test from 'tape';
import fullSelect from './../';

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
  const fullselect = fullSelect('select')[0];

  option = document.createElement('option');
  option.value = 'mustang';
  option.text = 'Mustang';

  fullselect.append([option]);

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
    select.parentNode.fullSelect.open();

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

  select.parentNode.fullSelect.append(option, optGroupTarget);

  actual = select.parentNode.children[2].children[2].children[2].textContent;
  expected = 'Tesla';
  assert.deepEqual(actual, expected,
    'should return Tesla');
  assert.end();
});

test('Insert an option at the end of a specified original optgroup', assert => {
  const optGroupTarget = select.children[2];

  option = document.createElement('option');
  option.value = 'mazda';
  option.text = 'Mazda';

  select.parentNode.fullSelect.append(option, optGroupTarget);

  actual = select.parentNode.children[2].children[2].children[3].textContent;
  expected = 'Mazda';
  assert.deepEqual(actual, expected,
    'should return Mazda');

  assert.end();
});


// test('Insert an optgroup at the end', assert => {
//   const optgroup = document.createElement('optgroup');
//   optgroup.setAttribute('label', 'Bike');
//
//   option = document.createElement('option');
//   option.value = 'mountain bike';
//   option.text = 'Mountain bike';
//
//   optgroup.appendChild(option);
//
//   select.parentNode.fullSelect.append(optgroup);
//   assert.test('... and the last custom option in that group is the added one', q => {
//     actual = select.parentNode.children[2].children[4].getAttribute('');
//     expected = 'Tesla';
//     q.deepEqual(actual, expected,
//       'should return Tesla');
//     q.end();
//   });
//
//   assert.end();
// });
