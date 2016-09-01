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
let removed;

test('Empty select (remove any option)', assert => {
  const expectedRemoved = [].slice.call(fullselect.select.children);
  removed = fullselect.empty();

  assert.test('... and the returned all select child', q => {
    actual = removed;
    expected = expectedRemoved;
    q.deepLooseEqual(actual, expected,
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
    expected = null;
    q.deepEqual(actual, expected,
      'should be null');
    q.end();
  });
});

test('Empty select: re-append all removed', assert => {
  fullselect.append(removed);

  assert.test('... and the select contains all the options', q => {
    actual = fullselect.select.options.length;
    expected = 4;
    q.deepEqual(actual, expected,
      'the elements should be 4');
    q.end();
  });

  assert.test('... and the custom select contains all the options', q => {
    actual = fullselect.panel.getElementsByClassName(fullselect.getOptions().optionClass).length;
    expected = 4;
    q.deepEqual(actual, expected,
      'the elements should be 4');
    q.end();
  });
});
