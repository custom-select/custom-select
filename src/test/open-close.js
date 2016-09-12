import test from 'tape';
import customSelect from './../';

var options;
var select1;
var select2;
var eventMessage;

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

  const cstSelect = customSelect('select');
  options = cstSelect[0].pluginOptions;

  select1.parentNode.addEventListener('custom-select:open',
    () => { eventMessage = 'First select is open!'; });
  select1.parentNode.addEventListener('custom-select:close',
    () => { eventMessage = 'First select is closed!'; });

  select1.customSelect.open = true;

  const actual = select1.parentNode.customSelect.open;
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('... and dispatches the custom open event', assert => {
  assert.equal(eventMessage, 'First select is open!',
    'should return false "First select is open!"');
  assert.end();
});

test('Opens the second select and closes the first...', assert => {
  select2 = document.createElement('select');
  select2.innerHTML = `
    <option value="">Select...</option>
    <option value="zizz">Zizz</option>
    <option value="frizz">Frizz</option>`;
  document.body.appendChild(select2);

  customSelect(select2);

  document.querySelectorAll('.customSelect')[1].customSelect.open = true;

  assert.false(select1.customSelect.open,
    'should return false');
  assert.end();
});

test('... and checks if the second is currently open', assert => {
  const actual = document.getElementsByClassName(options.containerClass)[1]
    .classList.contains('is-open');
  const expected = true;

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});

test('... and dispatches the custom close event', assert => {
  assert.equal(eventMessage, 'First select is closed!',
    'should return false "First select is closed!"');
  assert.end();
});

test('With the public provided method closes the second', assert => {
  document.querySelectorAll('.customSelect')[1].customSelect.open = false;

  const actual = select2.customSelect.container.classList.contains('is-open');
  const expected = false;

  assert.deepEqual(actual, expected,
    'should return false');
  assert.end();
});
