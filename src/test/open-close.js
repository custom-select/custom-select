import test from 'tape';
import fullSelect from './../';

var options;
var select1;
var select2;

test('With the public provided method opens the panel', assert => {
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

  const cstSelect = fullSelect('select');
  options = cstSelect[0].pluginOptions;

  select1.parentNode.fullSelect.open();

  const actual = select1.parentNode.fullSelect.isOpen;
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('With the public provided method opens the second select and closes the first...', assert => {
  select2 = document.createElement('select');
  select2.innerHTML = `
    <option value="">Select...</option>
    <option value="zizz">Zizz</option>
    <option value="frizz">Frizz</option>`;
  document.body.appendChild(select2);

  fullSelect(select2);

  document.querySelectorAll('.fullSelect')[1].fullSelect.open();

  const actual = select1.parentNode.fullSelect.isOpen;
  const expected = false;

  assert.deepEqual(actual, expected,
    'should return false');
  assert.end();
});

test('... and checks if the second is currently open', assert => {
  const actual = document.getElementsByClassName(options.panelClass)[1]
    .classList.contains('is-open');
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});
