if (typeof require !== "undefined") {
  var customSelect = require("./node_modules/custom-select/build/jquery.custom-select.min.js")
    .default;
  require("./node_modules/custom-select/build/custom-select.css");
}

var mySelect = $("select").customSelect();

$("#mySelect2")
  .customSelect("panel")
  .css({ "max-height": "none", height: 0 });

// You can't use jQuery on() 'cause it doesn't have the useCapture feature.
// @link http://stackoverflow.com/questions/17249125/event-capturing-jquery
// The plugin already has the same listener registered on the panel that'll fires first.
// To avoid this you have to change the listening phase to capturing instead of bubbling
// #link https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow-capture-h3
$("#mySelect2")
  .customSelect("panel")
  .get(0)
  .addEventListener(
    "custom-select:focus-outside-panel",
    function(e) {
      e.stopPropagation();
      $("#mySelect2")
        .customSelect("panel")
        .animate(
          {
            scrollTop: e.target.offsetTop
          },
          333
        );
    },
    true
  );

$("#mySelect2")
  .customSelect("container")
  .on("custom-select:open", function(e) {
    $("#mySelect2")
      .customSelect("panel")
      .animate(
        {
          height: "200px"
        },
        666
      );
  });

$("#mySelect2")
  .customSelect("container")
  .on("custom-select:close", function(e) {
    $("#mySelect2")
      .customSelect("panel")
      .animate(
        {
          height: "0"
        },
        500
      );
  });
