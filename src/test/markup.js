import test from 'tape';
import customSelect from './../';

test('Custom panel replicated markup check', assert => {
  document.body.innerHTML = '';
  const select = document.createElement('select');
  select.innerHTML = `
    <option value="">Select...</option>
    <optgroup label="Cips">
      <option value="zizz">Zizz</option>
    </optgroup>
    <optgroup label="Lips">
      <option value="frizz">Frizz</option>
    </optgroup>`;
  document.body.appendChild(select);
  customSelect('select');
  const actual = select.options.length;
  const expected = document.querySelectorAll('.custom-select-option').length;
  assert.deepEqual(actual, expected,
    'should return 3');
  assert.end();
});
