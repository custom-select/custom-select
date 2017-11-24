if (typeof require !== 'undefined') {
  var customSelect = require("custom-select").default;
  require("./node_modules/custom-select/build/custom-select.css");
}

customSelect('#mySelect1', {
  openerClass: 'btn btn-secondary dropdown-toggle',
  panelClass: 'dropdown-menu',
  optionClass: 'dropdown-item',
  optgroupClass: 'dropdown-optgroup',
  isOpenClass: 'open',
});

customSelect('#mySelect2', {
  openerClass: 'btn btn-primary btn-block dropdown-toggle',
  panelClass: 'dropdown-menu w-100',
  optionClass: 'dropdown-item',
  optgroupClass: 'dropdown-optgroup',
  isOpenClass: 'open',
});