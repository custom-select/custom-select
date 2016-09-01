import customSelect from "./../../build/"

const mySelect = customSelect('select', {
  scrollToSelected: false,
  newOption: 123
});

console.log(mySelect);

// window.customSelect = customSelect;
