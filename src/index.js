/**
 * full-select
 * A lightweight JS script for custom select creation.
 * 
 * v0.0.1
 * (https://github.com/gionatan-lombardi/full-select)
 * 
 * Copyright (c) 2016 Gionatan Lombardi
 * MIT License
 */

const defaultOptions = {
  panelClass: 'full-select-panel',
  optionClass: 'full-select-option',
  openerClass: 'full-select-opener',
  containerClass: 'full-select-container',
  scrollToSelected: true
}

export default function fullSelect(element, customOptions) {

  const options = Object.assign(defaultOptions, customOptions);
  var nodeList = [];
  var selects = []

  function createSelect(el, options) {

    // Public Exposed Methods
    return {
      getOptions: () => {
        return options;
      }
    };

  }

  return ( function init() {

    if (element && element instanceof HTMLElement && element.tagName.toUpperCase() === "SELECT") {
      nodeList.push(element)
    } else if (element && typeof element === 'string') { 
      let elementsList = document.querySelectorAll(element);
      for (let i = 0, l = elementsList.length; i < l; ++i) {
        if (elementsList[i] instanceof HTMLElement && elementsList[i].tagName.toUpperCase() === "SELECT") {
          nodeList.push(elementsList[i]);
        }
      }
    } else if (element && element.length) {
      for (let i = 0, l = element.length; i < l; ++i) {
        if (element[i] instanceof HTMLElement && element[i].tagName.toUpperCase() === "SELECT")
          nodeList.push(element[i]);
      }
    }

    for (let i = 0, l = nodeList.length; i < l; ++i) {
      selects.push(createSelect(nodeList[i], options));
    }

    // Returns all instances with methods
    return selects;

  })()

}