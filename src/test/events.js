import test from 'tape';
import fullSelect from './../';

var options;

test('On click opens the panel', assert => {
  document.body.innerHTML = '';

  const select = document.createElement('select');
  select.innerHTML = `
    <option value="">Select...</option>
    <optgroup label="Cars">
      <option value="ferrari">Ferrari</option>
    </optgroup>
    <optgroup label="Motorcycles">
      <option value="honda">Honda</option>
    </optgroup>`;
  document.body.appendChild(select);

  const cstSelects = fullSelect('select');
  options = cstSelects[0].getOptions();

  document.getElementsByClassName(options.openerClass)[0].children[0].click();

  const actual = document.getElementsByClassName(options.panelClass)[0]
    .classList.contains('is-open');

  assert.true(actual,
    'should return true');
  assert.end();
});

test('On click on second select closes the first...', assert => {
  const select = document.createElement('select');
  select.innerHTML = `
    <option value="">Select...</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>;
    <option value="avocado">Avocado</option>`;
  document.body.appendChild(select);

  fullSelect(select);

  document.getElementsByClassName(options.openerClass)[1].click();

  const actual = document.getElementsByClassName(options.panelClass)[0]
    .classList.contains('is-open');

  assert.false(actual,
    'should return false');
  assert.end();
});

test('... activates the second opener', assert => {
  const actual = document.getElementsByClassName(options.openerClass)[1]
    .classList.contains('is-active');

  assert.true(actual,
    'should return true');
  assert.end();
});

test('... opens the second panel.', assert => {
  const actual = document.getElementsByClassName(options.panelClass)[1]
    .classList.contains('is-open');

  assert.true(actual,
    'should return true');
  assert.end();
});

test('On click outside the selects closes the opened one', assert => {
  document.body.click();

  const actual = document.querySelectorAll('.is-open').length;
  const expected = 0;

  assert.deepEqual(actual, expected,
    'should return 0');
  assert.end();
});

test('On click on an option sets selected class', assert => {
  // first select
  document.getElementsByClassName(options.openerClass)[1].parentNode.fullSelect.open();
  document.getElementsByClassName(options.optionClass)[2].click();

  const actual = document.querySelectorAll(`.${options.optionClass}`)[2]
    .classList.contains('is-selected');

  assert.true(actual,
    'should return true');
  assert.end();
});

test('... and focus class', assert => {
  const actual = document.getElementsByClassName(options.optionClass)[2]
    .classList.contains('has-focus');

  assert.true(actual,
    'should return true');
  assert.end();
});

test('... and closes the select', assert => {
  const actual = document.getElementsByTagName('select')[0].parentNode.fullSelect.isOpen;

  assert.false(actual,
    'should return false');
  assert.end();
});

test('... and sets the original select value', assert => {
  const actual = document.getElementsByTagName('select')[0].value;
  const expected = 'honda';

  assert.deepEqual(actual, expected,
    'should return honda');
  assert.end();
});

test('... and there is only one selected option', assert => {
  const actual = document.getElementsByTagName('select')[0]
    .parentNode.querySelectorAll('.is-selected').length;
  const expected = 1;

  assert.deepEqual(actual, expected,
    'should return 1');
  assert.end();
});

test('... and updates opener text', assert => {
  const actual = document.getElementsByTagName('select')[0]
    .parentNode.getElementsByClassName(options.openerClass)[0].children[0].textContent;
  const expected = 'Honda';

  assert.deepEqual(actual, expected,
    'should return Honda');
  assert.end();
});

test('On keydown on the first select...', assert => {
  var actual;
  var expected;

  // first select container
  const currentContainer = document.getElementsByTagName('select')[0].parentNode;
  const e = new KeyboardEvent('keydown', {});

  currentContainer.focus();

  assert.test('... ArrowDown opens the panel', q => {
    Object.defineProperty(e, 'keyCode', { value: 40, writable: true });
    currentContainer.dispatchEvent(e);

    actual = currentContainer.fullSelect.isOpen;

    q.true(actual,
      'should return true');
    q.end();
  });

  assert.test('... with a second ArrowDown the focus remains on the last option', q => {
    currentContainer.dispatchEvent(e);

    actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
    expected = 'honda';

    q.deepEqual(actual, expected,
      'should return honda');
    q.end();
  });

  assert.test('... an ArrowUp sets the focus on the prev option', q => {
    e.keyCode = 38;

    currentContainer.dispatchEvent(e);

    actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
    expected = 'ferrari';

    q.deepEqual(actual, expected,
      'should return ferrari');
    q.end();
  });

  assert.test('... a second ArrowUp sets the focus on first option', q => {
    currentContainer.dispatchEvent(e);

    actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
    expected = '';

    q.deepEqual(actual, expected,
      'should return ""');
    q.end();
  });

  assert.test('... with a third ArrowUp the focus remains on the first option', q => {
    currentContainer.dispatchEvent(e);

    actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
    expected = '';

    q.deepEqual(actual, expected,
      'should return ""');
    q.end();
  });

  assert.end();
});

test('On keydown on the second select...', assert => {
  var actual;
  var expected;

  // Second select container
  const currentContainer = document.getElementsByTagName('select')[1].parentNode;
  const e = new KeyboardEvent('keydown', {});

  currentContainer.focus();

  assert.test('... Space opens the panel', q => {
    Object.defineProperty(e, 'keyCode', { value: 32, writable: true });
    currentContainer.dispatchEvent(e);

    actual = currentContainer.getElementsByClassName(options.panelClass)[0]
      .classList.contains('is-open');

    q.true(actual,
      'should return true');
    q.end();
  });

  assert.test('... letter "a" sets focus on the apple option', q => {
    e.keyCode = 65;
    currentContainer.dispatchEvent(e);

    actual = currentContainer.querySelector('.has-focus').textContent;
    expected = 'Apple';

    q.deepEqual(actual, expected,
      'should return Apple');
    q.end();
  });

  assert.test('... adding letter "v" sets focus on the avocado option', q => {
    e.keyCode = 86;
    currentContainer.dispatchEvent(e);

    actual = currentContainer.querySelector('.has-focus').textContent;
    expected = 'Avocado';

    q.deepEqual(actual, expected,
      'should return Avocado');
    q.end();
  });

  assert.test('... after 2 secs with letter "b" sets focus on banana option', q => {
    setTimeout(() => {
      e.keyCode = 66;
      currentContainer.dispatchEvent(e);

      actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
      expected = 'banana';

      q.deepEqual(actual, expected,
        'should return banana');
      q.end();
    }, 2000);
  });

  // assert.test('... with a second ArrowDown the focus remains on the last option', q => {
  //   currentContainer.dispatchEvent(e);
  //
  //   actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
  //   expected = 'honda';
  //
  //   q.deepEqual(actual, expected,
  //     'should return true');
  //   q.end();
  // });
  //
  // assert.test('... an ArrowUp sets the focus on the prev option', q => {
  //   e.keyCode = 38;
  //
  //   currentContainer.dispatchEvent(e);
  //
  //   actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
  //   expected = 'ferrari';
  //
  //   q.deepEqual(actual, expected,
  //     'should return true');
  //   q.end();
  // });
  //
  // assert.test('... a second ArrowUp sets the focus on first option', q => {
  //   currentContainer.dispatchEvent(e);
  //
  //   actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
  //   expected = '';
  //
  //   q.deepEqual(actual, expected,
  //     'should return true');
  //   q.end();
  // });
  //
  // assert.test('... with a third ArrowUp the focus remains on the first option', q => {
  //   currentContainer.dispatchEvent(e);
  //
  //   actual = currentContainer.querySelector('.has-focus').getAttribute('data-value');
  //   expected = '';
  //
  //   q.deepEqual(actual, expected,
  //     'should return true');
  //   q.end();
  // });

  assert.end();
});
