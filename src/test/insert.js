import test from 'tape';
import fullSelect from './../';

test('Instance library and insert an option at the end', assert => {
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

  const option = document.createElement('option');
  option.value = 'mustang';
  option.text = 'Mustang';

  fullselect.insert([option], true);

  const actual = select.options[4].value;
  assert.deepEqual(actual, 'mustang',
    'should return mustang');
  assert.end();
});


// fullselect.insert([{value: 'val', text: 'text'}, {value: 'val', text: 'text ancora'}]);
// fullselect.insertAfter(option, targetOption);
// fullselect.insertBefore(option, targetOption);
