import test from 'tape';
import fullSelect from './../';

test('Custom options extend check', assert => {
  document.body.innerHTML = '';
  const select = document.createElement('select');
  document.body.appendChild(select);

  const actual = fullSelect('select', { scrollToSelected: false, newOption: 123 })[0].getOptions();
  const expected = {
    panelClass: 'full-select-panel',
    optionClass: 'full-select-option',
    openerClass: 'full-select-opener',
    containerClass: 'full-select-container',
    optgroupClass: 'full-select-optgroup',
    scrollToSelected: false,
    newOption: 123,
  };

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});
