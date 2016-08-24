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
  containerClass: 'full-select-container',
  openerClass: 'full-select-opener',
  panelClass: 'full-select-panel',
  optionClass: 'full-select-option',
  optgroupClass: 'full-select-optgroup',
  scrollToSelected: true
}

export default function fullSelect(element, options) {

  var options = Object.assign(defaultOptions, options);
  var nodeList = [];
  var selects = []

  function createSelect(el, cstOptions) {

    var container = document.createElement("div");
    container.className = cstOptions.containerClass;

    var opener = document.createElement("span");
    opener.className = cstOptions.openerClass;
    opener.setAttribute('tabindex', '0');
    opener.innerHTML = '<span>' + ( el.selectedIndex !== -1 ? el.options[el.selectedIndex].text : '' ) + '</span>';

    var panel = document.createElement("div");
    panel.className = cstOptions.panelClass;
    panel.innerHTML = el.innerHTML
      .replace(/<optgroup/g, '<div class="' + cstOptions.optgroupClass + '"')
      .replace(/optgroup>/g, 'div>')
      .replace(/<option/g, '<div class="' + cstOptions.optionClass + '"')
      .replace(/option>/g, 'div>')
      .replace(/value="/g, 'data-value="')
      .replace(/value='/g, 'data-value=\'');

    container.innerHTML = opener.outerHTML + el.outerHTML + panel.outerHTML;
    el.outerHTML = container.outerHTML;



    // Public Exposed Methods
    return {
      getOptions: () => {
        return cstOptions;
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