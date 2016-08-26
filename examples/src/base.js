import fullSelect from "./../../build/"

const mySelect = fullSelect('select', {
  scrollToSelected: false,
  newOption: 123
});

console.log(mySelect);
mySelect[0].getOptions();

// window.fullSelect = fullSelect;