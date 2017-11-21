import test from 'tape';
import customSelect from './../';

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
    <option value="audi" selected>Audi</option>
  </optgroup>`;
document.body.appendChild(select);
const customselect = customSelect('select')[0];
let removed;

test('Empty select (remove any option)', assert => {
  const expectedRemoved = Array.prototype.slice.call(customselect.select.children);
  removed = customselect.empty();

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
    actual = customselect.panel.children.length;
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

  assert.test('... and the custom select opener has no text ', q => {
    actual = customselect.opener.textContent;
    expected = '';
    q.equal(actual, expected,
      'should be ""');
    q.end();
  });

  assert.test('... and the custom select has no value ', q => {
    actual = customselect.value;
    expected = '';
    q.equal(actual, expected,
      'should be ""');
    q.end();
  });
});

test('Empty select: re-append all removed', assert => {
  customselect.append(removed);

  assert.test('... and the select contains all the options', q => {
    actual = customselect.select.options.length;
    expected = 4;
    q.deepEqual(actual, expected,
      'the elements should be 4');
    q.end();
  });

  assert.test('... and the custom select contains all the options', q => {
    actual = customselect.panel.getElementsByClassName(customselect.pluginOptions.optionClass)
      .length;
    expected = 4;
    q.deepEqual(actual, expected,
      'the elements should be 4');
    q.end();
  });

  assert.test('... and the select has the correct value', q => {
    actual = customselect.select.value;
    expected = 'audi';
    q.deepEqual(actual, expected,
      'the elements should be "audi"');
    q.end();
  });

  assert.test('... and the custom opener has the correct text', q => {
    actual = customselect.opener.textContent;
    expected = 'Audi';
    q.deepEqual(actual, expected,
      'the elements should be "Audi"');
    q.end();
  });
});
