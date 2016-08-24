import test from 'tape';
import fullSelect from './../';

test('Custom options extend check', assert => {
  document.body.innerHTML = '';
  var select = document.createElement("select");
  document.body.appendChild(select);

  var actual = fullSelect('select', { scrollToSelected: false, newOption: 123 })[0].getOptions();
  var expected = {
    panelClass: 'full-select-panel',
    optionClass: 'full-select-option',
    openerClass: 'full-select-opener',
    containerClass: 'full-select-container',
    optgroupClass: 'full-select-optgroup',
    scrollToSelected: false,
    newOption: 123
  };

  assert.deepEqual(actual, expected,
    'should return true');

  assert.end();
});