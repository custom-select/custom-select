import test from 'tape';
import customSelect from './../';

let actual;
let expected;

document.body.innerHTML = '';
const select = document.createElement('select');
select.innerHTML = `
  <option value="mercedes">Mercedes</option>
`;
document.body.appendChild(select);
const customselect = customSelect('select')[0];

test('Remove last option', assert => {
    var target = select.children[0]; // Mercedes option

    const removed = customselect.remove(target);

    assert.test('... and the returned option is the same', q => {
        actual = removed;
        expected = target;
        q.deepEqual(actual, expected,
            'the two elements should be the same');
        q.end();
    });

    assert.test('... and the option is not in the select anymore', q => {
        actual = Array.prototype.indexOf.call(select.options, removed);
        expected = -1;
        q.deepEqual(actual, expected,
            'should be -1');
        q.end();
    });

    assert.test('... and the custom option is not in the panel anymore', q => {
        actual = customselect.panel.querySelectorAll(`[data-value="${removed.getAttribute('value')}"]`);
        expected = 0;
        q.deepEqual(actual.length, expected,
            'should be 0');
        q.end();
    });

    assert.test('... and the custom options are one less', q => {
        actual = customselect.panel.getElementsByClassName(customselect.pluginOptions.optionClass);
        expected = 0;
        q.deepEqual(actual.length, expected,
            'should be 0');
        q.end();
    });

    assert.test('... and the value is that of the first option', q => {
        actual = customselect.panel.getElementsByClassName(customselect.pluginOptions.optionClass);
        expected = '';
        q.equal(customselect.value, expected,
            'should be ""');
        q.end();
    });
});
