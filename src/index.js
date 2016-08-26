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
  var focusedElement;
  var selectedElement;
  var panel = document.createElement("div");
  panel.className = cstOptions.panelClass;

  let panelContent = (function parseSelect(node){
    
    let cstList = [];

    for (let i=0, l=node.children.length; i<l; i++) {
      if (node.children[i].tagName.toUpperCase() === "OPTGROUP") {
        let cstOptgroup = document.createElement("div");
        cstOptgroup.classList.add(cstOptions.optgroupClass);
        cstOptgroup.dataset.label = node.children[i].label;
        
        let subNodes = parseSelect(node.children[i]);
        for (let j=0, l=subNodes.length; j<l; j++) {
          cstOptgroup.appendChild(subNodes[j]);
        }

        cstList.push(cstOptgroup);
      } else if (node.children[i].tagName.toUpperCase() === "OPTION") {
        var cstOption = document.createElement("div");
        cstOption.classList.add(cstOptions.optionClass);
        cstOption.textContent = node.children[i].text;
        cstOption.dataset.value = node.children[i].value;
        cstOption.fullSelectOriginalOption = node.children[i];
        if (node.children[i].selected){
          cstOption.classList.add('is-selected', 'has-focus');
          selectedElement = focusedElement = cstOption;
        }
        cstList.push(cstOption);
      }
    }

    return cstList;

  })(select);

  for (let i=0, l=panelContent.length; i<l; i++){
    panel.appendChild(panelContent[i]);
  }

  // Injects the container in the original DOM position of the select
  container.appendChild(opener);
  select.parentNode.replaceChild(container, select);
  container.appendChild(select);
  container.appendChild(panel);

  // Event Init
  
  document.addEventListener('click', clickEvent);
  panel.addEventListener('mouseover', mouseoverEvent);

  // Private Fuctions

  function clickEvent(e) {
    
    // Opener click
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        close();
      } else {
        open();
      }
    // Option click
    } else if (e.target.classList.contains(cstOptions.optionClass) && panel.contains(e.target)) {
      focusedElement.classList.remove('has-focus');
      selectedElement.classList.remove('is-selected');
      e.target.classList.add('is-selected', 'has-focus');
      selectedElement = focusedElement = e.target;

      close();
    } else {
      if (isOpen) {
        close();
      }
    }

  }

  function mouseoverEvent(e){

    if (e.target.classList.contains(cstOptions.optionClass)) {
      focusedElement.classList.remove('has-focus');
      e.target.classList.add('has-focus');
      focusedElement = e.target;
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