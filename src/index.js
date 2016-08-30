/**
 * full-select
 * A lightweight JS script for custom select creation.
 * Needs no dependencies.
 *
 * v0.0.1
 * (https://github.com/gionatan-lombardi/full-select)
 *
 * Copyright (c) 2016 Gionatan Lombardi & Marco Nucara
 * MIT License
 */

const defaultParams = {
  containerClass: 'full-select-container',
  openerClass: 'full-select-opener',
  panelClass: 'full-select-panel',
  optionClass: 'full-select-option',
  optgroupClass: 'full-select-optgroup',
  scrollToSelected: true,
};

function builder(el, builderParams) {
  var isOpen = false;
  const containerClass = 'fullSelect';
  const isSelectedClass = 'is-selected';
  const hasFocusClass = 'has-focus';
  const isDisabledClass = 'is-disabled';
  const isActiveClass = 'is-active';
  const isOpenClass = 'is-open';
  var select = el;
  var container;
  var opener;
  var focusedElement;
  var selectedElement;
  var panel;

  var resetSearchTimeout;
  var searchKey = '';

  //
  // Inner Functions
  //

  // Sets the focused element with the neccessary classes substitutions
  function setFocusedElement(cstOption) {
    focusedElement.classList.remove(hasFocusClass);
    focusedElement = cstOption;
    focusedElement.classList.add(hasFocusClass);
  }

  // Reassigns the focused and selected custom option
  // Updates the opener text
  // IMPORTANT: the setSelectedElement function doesn't change the select value!
  function setSelectedElement(cstOption) {
    focusedElement.classList.remove(hasFocusClass);
    selectedElement.classList.remove(isSelectedClass);
    cstOption.classList.add(isSelectedClass, hasFocusClass);
    selectedElement = focusedElement = cstOption;
    opener.children[0].textContent = selectedElement.fullSelectOriginalOption.text;
  }

  function setValue(value) {
    // Gets the option with the provided value
    var toSelect = select.querySelector(`option[value='${value}']`);
    // If no option has the provided value get the first
    if (!toSelect) {
      toSelect = select.options[0];
    }
    // The option with the provided value becomes the selected one
    // And changes the select current value
    toSelect.selected = true;
    // Sets the 1:1 corrisponding .full-select-option as the selected one
    setSelectedElement(toSelect.fullSelectCstOption);
  }

  function moveFocuesedElement(direction) {
    // Get all the .full-select-options
    const optionsList = panel.getElementsByClassName(builderParams.optionClass);
    // Get the index of the current focused one
    const currentFocusedIndex = [].indexOf.call(optionsList, focusedElement);
    // If the next or prev custom option exist
    // Sets it as the new focused one
    if (optionsList[currentFocusedIndex + direction]) {
      setFocusedElement(optionsList[currentFocusedIndex + direction]);
    }
  }

  function open() {
    // If present closes an opened instance of the plugin
    // Only one at time can be open
    var openedFullSelect = document.querySelector(`.${containerClass} .${isOpenClass}`);
    if (openedFullSelect) {
      openedFullSelect.parentNode.fullSelect.close();
    }

    // Opens only the clicked one
    opener.classList.add(isActiveClass);
    panel.classList.add(isOpenClass);

    // Sets the global state
    isOpen = true;
  }

  function close() {
    opener.classList.remove(isActiveClass);
    panel.classList.remove(isOpenClass);
    // When closing the panel the focused custom option must be the selected one
    setFocusedElement(selectedElement);

    // Sets the global state
    isOpen = false;
  }

  function clickEvent(e) {
    // Opener click
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        close();
      } else {
        open();
      }
    // Custom Option click
    } else if (e.target.classList.contains(builderParams.optionClass) && panel.contains(e.target)) {
      setSelectedElement(e.target);
      // Sets the corrisponding select's option to selected updating the select's value too
      selectedElement.fullSelectOriginalOption.selected = true;
      close();
    // Click outside the container closes the panel
    } else if (isOpen) {
      close();
    }
  }

  function mouseoverEvent(e) {
    // On mouse move over and options it bacames the focused one
    if (e.target.classList.contains(builderParams.optionClass)) {
      setFocusedElement(e.target);
    }
  }

  function keydownEvent(e) {
    if (!isOpen) {
      // On "Arrow down", "Arrow up" and "Space" keys opens the panel
      if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 32) {
        open();
      }
    } else {
      switch (e.keyCode) {
        case 13:
        case 32:
          // On "Enter" or "Space" selects the focused element as the selected one
          setSelectedElement(focusedElement);
          // Sets the corrisponding select's option to selected updating the select's value too
          selectedElement.fullSelectOriginalOption.selected = true;
          close();
          break;
        case 27:
          // On "Escape" closes the panel
          close();
          break;

        case 38:
          // On "Arrow up" set focus to the prev option if present
          moveFocuesedElement(-1);
          break;
        case 40:
          // On "Arrow down" set focus to the next option if present
          moveFocuesedElement(+1);
          break;
        default:
          // search in panel (autocomplete)
          if (e.keyCode >= 48 && e.keyCode <= 90) {
            // clear existing reset timeout
            if (resetSearchTimeout) {
              clearTimeout(resetSearchTimeout);
            }

            // reset timeout for empty search key
            resetSearchTimeout = setTimeout(() => {
              searchKey = '';
            }, 1500);

            // update search keyword appending the current key
            searchKey += e.key || String.fromCharCode(e.keyCode);

            // search the element
            for (let options = panel.getElementsByClassName(builderParams.optionClass), i = 0,
              l = options.length; i < l; i++) {
              // removed cause not supported by IE:
              // if (options[i].text.startsWith(searchKey))
              if (options[i].textContent.toLowerCase().substr(0, searchKey.length) === searchKey) {
                setFocusedElement(options[i]);
                break;
              }
            }
          }
          break;
      }
    }
  }

  function changeEvent() {
    setSelectedElement(select.options[select.selectedIndex].fullSelectCstOption);
  }

  function addEvents() {
    document.addEventListener('click', clickEvent);
    panel.addEventListener('mouseover', mouseoverEvent);
    select.addEventListener('change', changeEvent);
    container.addEventListener('keydown', keydownEvent);
  }

  function removeEvents() {
    document.removeEventListener('click', clickEvent);
    panel.removeEventListener('mouseover', mouseoverEvent);
    select.removeEventListener('change', changeEvent);
    container.removeEventListener('keydown', keydownEvent);
  }

  function enable() {
    if (select.disabled) {
      container.classList.remove(isDisabledClass);
      select.disabled = false;
      addEvents();
    }
  }

  function disable() {
    if (!select.disabled) {
      container.classList.add(isDisabledClass);
      select.disabled = true;
      removeEvents();
    }
  }

  //
  // Custom Select DOM tree creation
  //

  // Creates the container/wrapper
  container = document.createElement('div');
  container.classList.add(builderParams.containerClass, containerClass);

  // Creates the opener
  opener = document.createElement('span');
  opener.className = builderParams.openerClass;
  opener.setAttribute('tabindex', '0');
  opener.innerHTML = `<span>
   ${(select.selectedIndex !== -1 ? select.options[select.selectedIndex].text : '')}
   </span>`;

  // Creates the panel
  // and injects the markup of the select inside
  // with some tag and attributes replacement
  panel = document.createElement('div');
  panel.className = builderParams.panelClass;

  // With a recursive IIFE loops through the select's DOM tree (options and optgroup)
  // And creates the custom panel's DOM tree (divs with different classes and attributes)
  const panelContent = (function parseSelect(currentNode) {
    const node = currentNode;
    const cstList = [];

    for (let i = 0, li = node.children.length; i < li; i++) {
      if (node.children[i].tagName.toUpperCase() === 'OPTGROUP') {
        const cstOptgroup = document.createElement('div');
        cstOptgroup.classList.add(builderParams.optgroupClass);
        cstOptgroup.dataset.label = node.children[i].label;

        const subNodes = parseSelect(node.children[i]);
        for (let j = 0, lj = subNodes.length; j < lj; j++) {
          cstOptgroup.appendChild(subNodes[j]);
        }

        cstList.push(cstOptgroup);
      } else if (node.children[i].tagName.toUpperCase() === 'OPTION') {
        const cstOption = document.createElement('div');
        cstOption.classList.add(builderParams.optionClass);
        cstOption.textContent = node.children[i].text;
        cstOption.dataset.value = node.children[i].value;
        // IMPORTANT: Stores in a property of the created custom option
        // a hook to the the corrisponding select's option
        cstOption.fullSelectOriginalOption = node.children[i];
        // IMPORTANT: Stores in a property of select's option
        // a hook to the created custom option
        node.children[i].fullSelectCstOption = cstOption;
        // If the select's option is selected
        if (node.children[i].selected) {
          cstOption.classList.add(isSelectedClass, hasFocusClass);
          selectedElement = focusedElement = cstOption;
        }
        cstList.push(cstOption);
      }
    }
    return cstList;
  }(select));

  // Injects the created DOM content in the panel
  for (let i = 0, l = panelContent.length; i < l; i++) {
    panel.appendChild(panelContent[i]);
  }

  // Injects the container in the original DOM position of the select
  container.appendChild(opener);
  select.parentNode.replaceChild(container, select);
  container.appendChild(select);
  container.appendChild(panel);

  // Event Init
  if (select.disabled) {
    container.classList.add(isDisabledClass);
  } else {
    addEvents();
  }

  // Stores the plugin public exposed methods an properties directly in the container HTMLElement
  container.fullSelect = {
    getOptions: () => builderParams,
    open,
    close,
    enable,
    disable,
    get value() { return select.value; },
    set value(val) {
      setValue(val);
    },
    get isDisabled() { return select.disabled; },
    get isOpen() { return isOpen; },
  };

  // Returns the plugin instance, with the public exposed methods and properties
  return container.fullSelect;
}

export default function fullSelect(element, customParams) {
  // Overrides the default options with the ones provided by the user
  var nodeList = [];
  const selects = [];

  return (function init() {
    // The plugin is called on a single HTMLElement
    if (element && element instanceof HTMLElement && element.tagName.toUpperCase() === 'SELECT') {
      nodeList.push(element);
    // The plugin is called on a selector
    } else if (element && typeof element === 'string') {
      const elementsList = document.querySelectorAll(element);
      for (let i = 0, l = elementsList.length; i < l; ++i) {
        if (elementsList[i] instanceof HTMLElement
          && elementsList[i].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(elementsList[i]);
        }
      }
    // The plugin is called on any HTMLElements list (NodeList, HTMLCollection, Array, etc.)
    } else if (element && element.length) {
      for (let i = 0, l = element.length; i < l; ++i) {
        if (element[i] instanceof HTMLElement
          && element[i].tagName.toUpperCase() === 'SELECT') {
          nodeList.push(element[i]);
        }
      }
    }

    // Launches the plugin over every HTMLElement
    // And stores every plugin instance
    for (let i = 0, l = nodeList.length; i < l; ++i) {
      selects.push(builder(nodeList[i], Object.assign(defaultParams, customParams)));
    }

    // Returns all plugin instances
    return selects;
  }());
}
