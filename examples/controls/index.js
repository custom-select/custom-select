if (typeof require !== 'undefined') {
  var customSelect = require("custom-select").default;
  require("./node_modules/custom-select/build/custom-select.css");
}

customSelect('select');

Array.prototype.forEach.call(document.querySelectorAll('.example-wrapper'), function(wrapper){
  var buttons = wrapper.querySelectorAll('button');
  var removed = [];
  buttons[0].addEventListener('click', function(){
    removed = removed.concat(wrapper.querySelector('select').customSelect.empty());
  });
  buttons[1].addEventListener('click', function(){
    wrapper.querySelector('select').customSelect.append(removed);
    removed = [];
  });
  buttons[2].addEventListener('click', function(){
    wrapper.querySelector('select').customSelect.disabled = !wrapper.querySelector('select').customSelect.disabled
  });
});
