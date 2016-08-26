import test from 'tape';
import fullSelect from './../';

test('Custom panel replicated markup check', assert => {
  document.body.innerHTML = '';
  var select = document.createElement("select");
  select.innerHTML = `
    <option value="">Select...</option>
    <optgroup label="Cips">
      <option value="zizz">Zizz</option>
      <optgroup label="Lips">
        <option value="frizz">Frizz</option>
      </optgroup>
    </optgroup>`;
  document.body.appendChild(select);
  fullSelect('select');
  var actual = select.options.length;
  var expected = document.querySelectorAll('.full-select-option').length;
  assert.deepEqual(actual, expected,
    'should return 3');
  assert.end();
});