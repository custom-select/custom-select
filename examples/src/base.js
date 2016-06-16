import fullSelect from "./../../build/"

const mySelect = fullSelect(null, {
  scrollToSelected: false,
  newOption: 123
}).getOptions();

console.log(mySelect);