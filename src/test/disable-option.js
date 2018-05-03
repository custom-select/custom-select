import test from 'tape';
import customSelect from './../';

var select1;

test('With the public provided method disable the last option', assert => {
  document.body.innerHTML = '';

  select1 = document.createElement('select');
  select1.innerHTML = `
    <option value="">Select...</option>
    <optgroup label="Cips">
      <option disabled value="zizz">Zizz</option>
    </optgroup>
    <optgroup label="Lips">
      <option value="frizz">Frizz</option>
    </optgroup>`;
  document.body.appendChild(select1);

  customSelect('select');

  select1.parentNode.customSelect.disableOption(select1.options[2]);

  assert.true(select1.options[2].disabled,
    'should be disabled');
  assert.end();
});

test('With the public provided method enable the first option', assert => {

  select1.parentNode.customSelect.disableOption(select1.options[1], false);

  assert.false(select1.options[1].disabled,
    'should not be disabled');
  assert.end();
});
