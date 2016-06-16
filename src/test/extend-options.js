import test from 'tape';
import fullSelect from './../';

test('Custom options extend check', assert => {
  const actual = fullSelect(null, { scrollToSelected: false, newOption: 123 }).getOptions();
  const expected = {
    panelClass: 'full-select-panel',
    optionClass: 'full-select-option',
    openerClass: 'full-select-opener',
    containerClass: 'full-select-container',
    scrollToSelected: false,
    newOption: 123
  };

  assert.deepEqual(actual, expected,
    'should return true');

  assert.end();
});