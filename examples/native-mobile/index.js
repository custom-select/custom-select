if (typeof require !== "undefined") {
  var customSelect = require("custom-select")
    .default;
  require("./node_modules/custom-select/build/custom-select.css");
}

/*
  * In this example we use native select on touch devices only.
  * You could combine touch detection and media query for a better result or you could detect the the specific OS
  * for decide when to use customSelect panel and when to use native select.
  * Modernizer could be a good choice in this way.
  */
if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
  document.documentElement.classList.add('is-touch');
}

var mySelects = customSelect('select');
console.log(mySelects);