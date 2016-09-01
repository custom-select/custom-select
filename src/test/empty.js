import test from 'tape';
import fullSelect from './../';

let actual;
let expected;

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

test('Remove any option', assert => {
  const expectedRemoved = fullselect.select.children;
  const removed = fullselect.empty();

  assert.test('... and the returned all select child', q => {
    actual = removed;
    expected = expectedRemoved;
    q.deepEqual(actual, expected,
      'the elements should be the same');
    q.end();
  });

  assert.test('... and the select is empty', q => {
    actual = select.options.length;
    expected = 0;
    q.deepEqual(actual, expected,
      'should be 0');
    q.end();
  });

  assert.test('... and the custom select is empty', q => {
    actual = fullselect.panel.children.length;
    expected = 0;
    q.deepEqual(actual, expected,
      'should be 0');
    q.end();
  });

  assert.test('... and a removed root option does not have a parentNode anymore ', q => {
    actual = removed[0].parentNode;
    expected = undefined;
    q.deepEqual(actual, expected,
      'should be 3');
    q.end();
  });
});
