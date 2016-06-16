import fullSelect from "./../../build/full-select"

const mySelect = fullSelect(null, {
  scrollToSelected: false,
  newOption: 123
}).getOptions();

console.log(mySelect);