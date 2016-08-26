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

function builder(select, cstOptions) {

  var isOpen = false;
  var containerClass = "fullSelect";

  // Custom Select Markup
  
  // Creates the container/wrapper
  var container = document.createElement("div");
  container.className = cstOptions.containerClass + " " + containerClass;

  // Creates the opener
  var opener = document.createElement("span");
  opener.className = cstOptions.openerClass;
  opener.setAttribute('tabindex', '0');
  opener.innerHTML = '<span>' + ( select.selectedIndex !== -1 ? select.options[select.selectedIndex].text : '' ) + '</span>';

  // Creates the panel
  // and injects the markup of the select inside
  // with some tag and attributes replacement
  var panel = document.createElement("div");
  panel.className = cstOptions.panelClass;
  panel.innerHTML = select.innerHTML
    .replace(/<optgroup/g, '<div class="' + cstOptions.optgroupClass + '"')
    .replace(/optgroup>/g, 'div>')
    .replace(/<option/g, '<div class="' + cstOptions.optionClass + '"')
    .replace(/option>/g, 'div>')
    .replace(/value="/g, 'data-value="')
    .replace(/value='/g, 'data-value=\'');

  // Injects the container in the original DOM position of the select
  container.appendChild(opener);
  select.parentNode.replaceChild(container, select);
  container.appendChild(select);
  container.appendChild(panel);

  // Event Init
  
  document.addEventListener('click', handleEvent)

  // Private Fuctions

  function handleEvent(e) {
    
    // On click on the opener opens/closes the panel
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        close();
      } else {
        open();
      }
    } else {
      if (isOpen) {
        close();
      }
    }

  }

  function open() { 

    // Closes all instances of plugin
    var openedFullSelect = document.querySelector("." + containerClass + " .is-open")
    if (openedFullSelect) {
      openedFullSelect.parentNode.fullSelect.close();
    }

    // Opens only the clicked one
    opener.classList.add('is-active');
    panel.classList.add('is-open');

    // TODO: Sets the selected option
    var selectedOption = ( select.selectedIndex !== -1 ? select.options[select.selectedIndex] : false )
    if (selectedOption) {
      panel.querySelector('div[data-value="' + selectedOption.value + '"]').classList.add('is-selected');
    }

    isOpen = true;

  }

  function close() {

    opener.classList.remove('is-active');
    panel.classList.remove('is-open');
    
    // TODO: remove focus
    // panel.querySelector('.has-focus').classList.remove('has-focus');
    
    isOpen = false;

  }

  // Public Exposed Methods
  // and stores the plugin in the HTMLElement
  return container.fullSelect = {
    getOptions: () => cstOptions,
    open: open,
    close: close,
    isOpen: () => isOpen
  };


}

export default function fullSelect(element, options) {

  // Overrides the default options with the ones provided by the user
  var options = Object.assign(defaultOptions, options);
  var nodeList = [];
  var selects = []

  return ( function init() {

    // The plugin is called on a single HTMLElement
    if (element && element instanceof HTMLElement && element.tagName.toUpperCase() === "SELECT") {
      nodeList.push(element)
    // The plugin is called on a selector
    } else if (element && typeof element === 'string') { 
      let elementsList = document.querySelectorAll(element);
      for (let i = 0, l = elementsList.length; i < l; ++i) {
        if (elementsList[i] instanceof HTMLElement && elementsList[i].tagName.toUpperCase() === "SELECT") {
          nodeList.push(elementsList[i]);
        }
      }
    // The plugin is called on any HTMLElements list (NodeList, HTMLCollection, Array, etc.)
    } else if (element && element.length) {
      for (let i = 0, l = element.length; i < l; ++i) {
        if (element[i] instanceof HTMLElement && element[i].tagName.toUpperCase() === "SELECT")
          nodeList.push(element[i]);
      }
    }

    // Launches the plugin over every HTMLElement
    // And stores every plugin instance
    for (let i = 0, l = nodeList.length; i < l; ++i) {
      selects.push(builder(nodeList[i], options));
    }

    // Returns all plugin instances
    return selects;

  })()

}