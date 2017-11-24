if (typeof require !== 'undefined') {
  var customSelect = require("custom-select").default;
  require("./node_modules/custom-select/build/custom-select.css");
}

const mySelects = customSelect("select");

console.log(mySelects);
