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

function customSelect(el, cstOptions) {

  var isOpen = false;

  // Custom Select Markup
  
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

  container.appendChild(opener);
  el.parentNode.replaceChild(container, el);
  container.appendChild(el);
  container.appendChild(panel);

  // Event Init
  
  document.addEventListener('click', handleEvent)

  // Private Fuctions

  function handleEvent(e) {
    
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        closePanel();
      } else {
        openPanel();
      }
    } else {
      closePanel();
    }

  }

  function openPanel() { 

        // Opens only the clicked one
        opener.classList.add('is-active');
        panel.classList.add('is-open');

        // TODO: Sets the selected option

        isOpen = true;

  }

  function closePanel() {

    opener.classList.remove('is-active');
    panel.classList.remove('is-open');
    
    // TODO: remove focus
    // panel.querySelector('.has-focus').classList.remove('has-focus');
    
    isOpen = false;

  }

  // Public Exposed Methods
  return {
    getOptions: () => {
      return cstOptions;
    }
  };

}

export default function fullSelect(element, options) {

  var options = Object.assign(defaultOptions, options);
  var nodeList = [];
  var selects = []

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
      selects.push(customSelect(nodeList[i], options));
    }

    // Returns all instances with methods
    return selects;

  })()

}