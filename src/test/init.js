import test from 'tape';
import customSelect from './../';

var actual;
var expected;

test('Check the library instances using an HTMLElement', assert => {
  var select = document.createElement('select');
  select.setAttribute('id', 'mySelect');
  document.body.appendChild(select);
  actual = customSelect(document.getElementById('mySelect'));
  assert.deepEqual(actual.length, 1,
    'should return 1');
  assert.end();
});

test('Check the library instances using an HTMLCollection', assert => {
  document.body.innerHTML = '';
  const select1 = document.createElement('select');
  const select2 = document.createElement('select');
  document.body.appendChild(select1);
  document.body.appendChild(select2);
  actual = customSelect(document.getElementsByTagName('select'));
  assert.deepEqual(actual.length, 2,
    'should return 2');
  assert.end();
});

test('Check the library instances using a NodeList', assert => {
  document.body.innerHTML = '';
  const select1 = document.createElement('select');
  const select2 = document.createElement('select');
  document.body.appendChild(select1);
  document.body.appendChild(select2);
  actual = customSelect(document.querySelectorAll('select'));
  assert.deepEqual(actual.length, 2,
    'should return 2');
  assert.end();
});

test('Check the library instances using a selector', assert => {
  document.body.innerHTML = '';
  const select = document.createElement('select');
  document.body.appendChild(select);
  actual = customSelect('select');
  assert.deepEqual(actual.length, 1,
    'should return 1');
  assert.end();
});

test('Check the library instances using a not select selector', assert => {
  document.body.innerHTML = '';
  actual = customSelect('body');
  assert.deepEqual(actual.length, 0,
    'should return 0');
  assert.end();
});

test('Check the library instances using an array of selects', assert => {
  document.body.innerHTML = '';
  const select1 = document.createElement('select');
  const select2 = document.createElement('select');
  document.body.appendChild(select1);
  document.body.appendChild(select2);
  actual = customSelect([select1, select2]);
  assert.deepEqual(actual.length, 2,
    'should return 2');
  assert.end();
});

test('Check the library instances using a mixed array', assert => {
  document.body.innerHTML = '';
  const select = document.createElement('select');
  document.body.appendChild(select);
  actual = customSelect([1, select]);
  assert.deepEqual(actual.length, 1,
    'should return 1');
  assert.end();
});

test('Check the library instances with 10000 selects', assert => {
  document.body.innerHTML = '';
  for (let i = 0; i < 10000; ++i) {
    document.body.appendChild(document.createElement('select'));
  }
  actual = customSelect('select');
  assert.deepEqual(actual.length, 10000,
    'should return 10000');
  assert.end();
});

test('Checks correlations between the HTMLElements and the public exposed elements', assert => {
  document.body.innerHTML = '';
  const select = document.createElement('select');
  document.body.appendChild(select);
  const myNewCustomSelect = customSelect([select])[0];

  assert.test('... the opener', t => {
    actual = myNewCustomSelect.opener;
    expected = document.body.children[0].children[0];
    t.deepEqual(actual, expected,
      'the two elements should be the same');
    t.end();
  });

  assert.test('... the select', t => {
    actual = myNewCustomSelect.select;
    expected = document.getElementsByTagName('select')[0];
    t.deepEqual(actual, expected,
      'the two elements should be the same');
    t.end();
  });

  assert.test('... the panel', t => {
    actual = document.getElementsByClassName('custom-select-container')[0].customSelect.panel;
    expected = document.body.children[0].querySelector('.custom-select-panel');
    t.deepEqual(actual, expected,
      'the two elements should be the same');
    t.end();
  });

  assert.end();
});
