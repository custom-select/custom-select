import test from 'tape';
import customSelect from './../';

test('Destroy the custom select', assert => {
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

  const customselect = customSelect('select')[0];

  const removed = customselect.destroy();

  assert.test('... and no more custom select exist in the DOM', q => {
    q.false(document.querySelector('.customSelect'),
      'should return null');
    q.end();
  });

  assert.test('... and the returned HTMLElement is the destroyed customSelect', q => {
    q.true(removed.classList.contains('customSelect'),
      'should return true');
    q.end();
  });

  assert.test('... and optgroup references are removed', q => {
    const optgroups = select.querySelectorAll('optgroup');
    for (let i = 0; i < optgroups.length; i++) {
      q.equal(typeof optgroups[i].customSelectCstOptgroup, 'undefined',
        'should remove reference to custom optgroup');
    }
    q.end();
  });
});
