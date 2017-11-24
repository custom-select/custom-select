if (typeof require !== "undefined") {
  var customSelect = require("custom-select").default;
  require("./node_modules/custom-select/build/custom-select.css");
}

var mySelect = customSelect("select")[0];
mySelect.panel.addEventListener(
  "custom-select:focus-outside-panel",
  function(e) {
    e.stopPropagation();

    var currPanel = e.currentTarget;
    var currOption = e.target;

    // Up
    if (currOption.offsetTop < currPanel.scrollTop) {
      console.log("up");
      TweenLite.to(currPanel, 0.333, { scrollTo: currOption.offsetTop });

      // Down
    } else {
      console.log("Down");
      TweenLite.to(currPanel, 0.333, {
        scrollTo:
          currOption.offsetTop +
          currOption.clientHeight -
          currPanel.clientHeight
      });
    }
  },
  true
);

mySelect.container.addEventListener("custom-select:open", function(e) {
  TweenLite.to(mySelect.panel, 0.666, {
    height: "10.7em",
    ease: Quart.easeOut
  });
});

mySelect.container.addEventListener("custom-select:close", function(e) {
  TweenLite.to(mySelect.panel, 0.666, { height: 0, ease: Quart.easeOut });
});
