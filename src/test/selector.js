import test from 'tape';
import fullSelect from './../';

test('Check the library instances with an HTMLElement', assert => {
  var select = document.createElement("select");
  select.setAttribute("id", "mySelect");
  document.body.appendChild(select);
  const actual = fullSelect(document.getElementById('mySelect'));
  assert.deepEqual(actual.length, 1,
    'should return 1');
  assert.end();
});

test('Check the library instances with a HTMLCollection', assert => {
  document.body.innerHTML = '';
  var select1 = document.createElement("select");
  var select2 = document.createElement("select");
  document.body.appendChild(select1);
  document.body.appendChild(select2);
  const actual = fullSelect(document.getElementsByTagName('select'));
  assert.deepEqual(actual.length, 2,
    'should return 2');
  assert.end();
});

test('Check the library instances with a NodeList', assert => {
  document.body.innerHTML = '';
  var select1 = document.createElement("select");
  var select2 = document.createElement("select");
  document.body.appendChild(select1);
  document.body.appendChild(select2);
  const actual = fullSelect(document.querySelectorAll('select'));
  assert.deepEqual(actual.length, 2,
    'should return 2');
  assert.end();
});

test('Check the library instances with a selector', assert => {
  document.body.innerHTML = '';
  var select = document.createElement("select");
  document.body.appendChild(select);
  const actual = fullSelect('select');
  assert.deepEqual(actual.length, 1,
    'should return 1');
  assert.end();
});

test('Check the library instances with a not select selector', assert => {
  document.body.innerHTML = '';
  const actual = fullSelect('body');
  assert.deepEqual(actual.length, 0,
    'should return 0');
  assert.end();
});

test('Check the library instances with an array of selects', assert => {
  document.body.innerHTML = '';
  var select1 = document.createElement("select");
  var select2 = document.createElement("select");
  document.body.appendChild(select1);
  document.body.appendChild(select2);
  const actual = fullSelect([select1, select2]);
  assert.deepEqual(actual.length, 2,
    'should return 2');
  assert.end();
});

test('Check the library instances with an mixed array', assert => {
  document.body.innerHTML = '';
  var select = document.createElement("select");
  document.body.appendChild(select);
  const actual = fullSelect([1, select]);
  assert.deepEqual(actual.length, 1,
    'should return 1');
  assert.end();
});

test('Check the library instances with 10000 selects', assert => {
  document.body.innerHTML = '';
  for (let i = 0; i < 10000; ++i)
    document.body.appendChild(document.createElement("select"));
  const actual = fullSelect('select');
  assert.deepEqual(actual.length, 10000,
    'should return 10000');
  assert.end();
});