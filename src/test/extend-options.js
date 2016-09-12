import test from 'tape';
import customSelect from './../';

test('Custom options extend check', assert => {
  document.body.innerHTML = '';
  const select = document.createElement('select');
  document.body.appendChild(select);

  const actual = customSelect('select',
    { isOpenClass: 'opened-panel', newOption: 123 })[0].pluginOptions;
  const expected = {
    panelClass: 'custom-select-panel',
    optionClass: 'custom-select-option',
    openerClass: 'custom-select-opener',
    containerClass: 'custom-select-container',
    optgroupClass: 'custom-select-optgroup',
    isSelectedClass: 'is-selected',
    hasFocusClass: 'has-focus',
    isDisabledClass: 'is-disabled',
    isOpenClass: 'opened-panel',
    newOption: 123,
  };

  assert.deepEqual(actual, expected,
    'should return true');
  assert.end();
});
