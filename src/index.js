/**
 * custom-select
 * A lightweight JS script for custom select creation.
 * Needs no dependencies.
 *
 * v0.0.1
 * (https://github.com/custom-select/custom-select)
 *
 * Copyright (c) 2016 Gionatan Lombardi & Marco Nucara
 * MIT License
 */

import 'custom-event-polyfill';

const defaultParams = {
  containerClass: 'custom-select-container',
  openerClass: 'custom-select-opener',
  panelClass: 'custom-select-panel',
  optionClass: 'custom-select-option',
  optgroupClass: 'custom-select-optgroup',
  isSelectedClass: 'is-selected',
  hasFocusClass: 'has-focus',
  isDisabledClass: 'is-disabled',
  isActiveClass: 'is-active',
  isOpenClass: 'is-open',
};

function builder(el, builderParams) {
  var isOpen = false;
  const containerClass = 'customSelect';
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
    if (focusedElement) {
      focusedElement.classList.remove(builderParams.hasFocusClass);
    }
    focusedElement = cstOption;
    focusedElement.classList.add(builderParams.hasFocusClass);
    // Offset update: checks if the focused element is in the visible part of the panelClass
    // if not dispatches a custom event
    if (isOpen) {
      if (cstOption.offsetTop < cstOption.offsetParent.scrollTop
        || cstOption.offsetTop >
          (cstOption.offsetParent.scrollTop + cstOption.offsetParent.clientHeight)
          - cstOption.clientHeight) {
        cstOption.dispatchEvent(new CustomEvent('custom-select.focus-outside-panel',
        { bubbles: true }));
      }
    }
  }

  // Reassigns the focused and selected custom option
  // Updates the opener text
  // IMPORTANT: the setSelectedElement function doesn't change the select value!
  function setSelectedElement(cstOption) {
    if (selectedElement) {
      selectedElement.classList.remove(builderParams.isSelectedClass);
    }
    cstOption.classList.add(builderParams.isSelectedClass);
    selectedElement = cstOption;
    setFocusedElement(cstOption);
    opener.children[0].textContent = selectedElement.customSelectOriginalOption.text;
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

    // Triggers the native change event of the select
    select.dispatchEvent(new CustomEvent('change'));
  }

  function moveFocuesedElement(direction) {
    // Get all the .custom-select-options
    // Get the index of the current focused one
    const currentFocusedIndex =
      [].indexOf.call(select.options, focusedElement.customSelectOriginalOption);
    // If the next or prev custom option exist
    // Sets it as the new focused one
    if (select.options[currentFocusedIndex + direction]) {
      setFocusedElement(select.options[currentFocusedIndex + direction].customSelectCstOption);
    }
  }

  // Open/Close function (toggle)
  function open(bool) {
    // Open
    if (bool || typeof bool === 'undefined') {
      // If present closes an opened instance of the plugin
      // Only one at time can be open
      const openedCustomSelect = document.querySelector(`.${containerClass}
         .${builderParams.isOpenClass}`);
      if (openedCustomSelect) {
        openedCustomSelect.parentNode.customSelect.open = false;
      }

      // Opens only the clicked one
      opener.classList.add(builderParams.isActiveClass);
      panel.classList.add(builderParams.isOpenClass);

      // Updates the scrollTop position of the panel in relation with the focused option
      panel.scrollTop = panel.getElementsByClassName(builderParams.hasFocusClass)[0].offsetTop;

      // Dispatches the custom event open
      container.dispatchEvent(new CustomEvent('custom-select.open'));

      // Sets the global state
      isOpen = true;

    // Close
    } else {
      // Removes the css classes
      opener.classList.remove(builderParams.isActiveClass);
      panel.classList.remove(builderParams.isOpenClass);

      // Sets the global state
      isOpen = false;

      // When closing the panel the focused custom option must be the selected one
      setFocusedElement(selectedElement);

      // Dispatches the custom event close
      container.dispatchEvent(new CustomEvent('custom-select.close'));
    }
    return isOpen;
  }

  function clickEvent(e) {
    // Opener click
    if (e.target === opener || opener.contains(e.target)) {
      if (isOpen) {
        open(false);
      } else {
        open();
      }
    // Custom Option click
    } else if (e.target.classList.contains(builderParams.optionClass) && panel.contains(e.target)) {
      setSelectedElement(e.target);
      // Sets the corrisponding select's option to selected updating the select's value too
      selectedElement.customSelectOriginalOption.selected = true;
      open(false);
      // Triggers the native change event of the select
      select.dispatchEvent(new CustomEvent('change'));
    // Click outside the container closes the panel
    } else if (isOpen) {
      open(false);
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
          selectedElement.customSelectOriginalOption.selected = true;
          // Triggers the native change event of the select
          select.dispatchEvent(new CustomEvent('change'));
          open(false);
          break;
        case 27:
          // On "Escape" closes the panel
          open(false);
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
            searchKey += String.fromCharCode(e.keyCode);

            // search the element
            for (let i = 0, l = select.options.length; i < l; i++) {
              // removed cause not supported by IE:
              // if (options[i].text.startsWith(searchKey))
              if (select.options[i].text.toUpperCase().substr(0, searchKey.length) === searchKey) {
                setFocusedElement(select.options[i].customSelectCstOption);
                break;
              }
            }
          }
          break;
      }
    }
  }

  function changeEvent() {
    setSelectedElement(select.options[select.selectedIndex].customSelectCstOption);
  }

  // When the option is outside the visible part of the opened panel, updates the scrollTop position
  // This is the default behaviour
  // To block it the plugin user must
  // add a "custom-select.focus-outside-panel" eventListener on the panel
  // with useCapture set to true
  // and stopPropagation
  function scrollToFocused(e) {
    var currPanel = e.currentTarget;
    var currOption = e.target;
    // Up
    if (currOption.offsetTop < currPanel.scrollTop) {
      currPanel.scrollTop = currOption.offsetTop;
    // Down
    } else {
      currPanel.scrollTop = (currOption.offsetTop + currOption.clientHeight)
      - currPanel.clientHeight;
    }
  }

  function addEvents() {
    document.addEventListener('click', clickEvent);
    panel.addEventListener('mouseover', mouseoverEvent);
    panel.addEventListener('custom-select.focus-outside-panel', scrollToFocused);
    select.addEventListener('change', changeEvent);
    container.addEventListener('keydown', keydownEvent);
  }

  function removeEvents() {
    document.removeEventListener('click', clickEvent);
    panel.removeEventListener('mouseover', mouseoverEvent);
    panel.removeEventListener('custom-select.focus-outside-panel', scrollToFocused);
    select.removeEventListener('change', changeEvent);
    container.removeEventListener('keydown', keydownEvent);
  }

  function disabled(bool) {
    if (bool && !select.disabled) {
      container.classList.add(builderParams.isDisabledClass);
      select.disabled = true;
      opener.removeAttribute('tabindex');
      container.dispatchEvent(new CustomEvent('custom-select.disabled'));
      removeEvents();
    } else if (!bool && select.disabled) {
      container.classList.remove(builderParams.isDisabledClass);
      select.disabled = false;
      opener.setAttribute('tabindex', '0');
      container.dispatchEvent(new CustomEvent('custom-select.enabled'));
      addEvents();
    }
  }

  // Form a given select children DOM tree (options and optgroup),
  // Creates the corresponding custom HTMLElements list (divs with different classes and attributes)
  function parseMarkup(children) {
    const nodeList = children;
    const cstList = [];

    if (typeof nodeList.length === 'undefined') {
      throw new TypeError('Invalid Argument');
    }

    for (let i = 0, li = nodeList.length; i < li; i++) {
      if (nodeList[i] instanceof HTMLElement && nodeList[i].tagName.toUpperCase() === 'OPTGROUP') {
        const cstOptgroup = document.createElement('div');
        cstOptgroup.classList.add(builderParams.optgroupClass);
        cstOptgroup.dataset.label = nodeList[i].label;

        // IMPORTANT: Stores in a property of the created custom option group
        // a hook to the the corrisponding select's option group
        cstOptgroup.customSelectOriginalOptgroup = nodeList[i];

        // IMPORTANT: Stores in a property of select's option group
        // a hook to the created custom option group
        nodeList[i].customSelectCstOptgroup = cstOptgroup;

        const subNodes = parseMarkup(nodeList[i].children);
        for (let j = 0, lj = subNodes.length; j < lj; j++) {
          cstOptgroup.appendChild(subNodes[j]);
        }

        cstList.push(cstOptgroup);
      } else if (nodeList[i] instanceof HTMLElement
          && nodeList[i].tagName.toUpperCase() === 'OPTION') {
        const cstOption = document.createElement('div');
        cstOption.classList.add(builderParams.optionClass);
        cstOption.textContent = nodeList[i].text;
        cstOption.dataset.value = nodeList[i].value;

        // IMPORTANT: Stores in a property of the created custom option
        // a hook to the the corrisponding select's option
        cstOption.customSelectOriginalOption = nodeList[i];

        // IMPORTANT: Stores in a property of select's option
        // a hook to the created custom option
        nodeList[i].customSelectCstOption = cstOption;

        // If the select's option is selected
        if (nodeList[i].selected) {
          setSelectedElement(cstOption);
        }
        cstList.push(cstOption);
      } else {
        throw new TypeError('Invalid Argument');
      }
    }
    return cstList;
  }

  function append(nodePar, appendIntoOriginal, targetPar) {
    var target;
    if (typeof targetPar === 'undefined'
      || (targetPar === select)) {
      target = panel;
    } else if (targetPar instanceof HTMLElement
      && targetPar.tagName.toUpperCase() === 'OPTGROUP'
      && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // If the node provided is a single HTMLElement it is stored in an array
    const node = nodePar instanceof HTMLElement ? [nodePar] : nodePar;

    // The custom markup to append
    const markupToInsert = parseMarkup(node);

    // Injects the created DOM content in the panel
    for (let i = 0, l = markupToInsert.length; i < l; i++) {
      target.appendChild(markupToInsert[i]);
      if (appendIntoOriginal) {
        if (target === panel) {
          select.appendChild(node[i]);
        } else {
          target.customSelectOriginalOptgroup.appendChild(node[i]);
        }
      }
    }
    return node;
  }

  function insertBefore(node, targetPar) {
    var target;
    if (targetPar instanceof HTMLElement
      && targetPar.tagName.toUpperCase() === 'OPTION'
      && select.contains(targetPar)) {
      target = targetPar.customSelectCstOption;
    } else if (targetPar instanceof HTMLElement
      && targetPar.tagName.toUpperCase() === 'OPTGROUP'
      && select.contains(targetPar)) {
      target = targetPar.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }

    // The custom markup to append
    const markupToInsert = parseMarkup([node]);

    target.parentNode.insertBefore(markupToInsert[0], target);

    // Injects the option or optgroup node in the original select and returns the injected node
    return targetPar.parentNode.insertBefore(node, targetPar);
  }

  function remove(node) {
    var cstNode;
    if (node instanceof HTMLElement
      && node.tagName.toUpperCase() === 'OPTION'
      && select.contains(node)) {
      cstNode = node.customSelectCstOption;
    } else if (node instanceof HTMLElement
      && node.tagName.toUpperCase() === 'OPTGROUP'
      && select.contains(node)) {
      cstNode = node.customSelectCstOptgroup;
    } else {
      throw new TypeError('Invalid Argument');
    }
    cstNode.parentNode.removeChild(cstNode);
    return node.parentNode.removeChild(node);
  }

  function empty() {
    const removed = [];
    while (select.children.length) {
      panel.removeChild(panel.children[0]);
      removed.push(select.removeChild(select.children[0]));
    }
    return removed;
  }

  function destroy() {
    for (let i = 0, l = select.options.length; i < l; i++) {
      delete select.options[i].customSelectCstOption;
    }
    const optGroup = select.getElementsByTagName('optgroup');
    for (let i = 0, l = optGroup.length; i < l; i++) {
      delete optGroup.customSelectCstOptgroup;
    }

    removeEvents();

    return container.parentNode.replaceChild(select, container);
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
  opener.innerHTML = `<span>
   ${(select.selectedIndex !== -1 ? select.options[select.selectedIndex].text : '')}
   </span>`;

  // Creates the panel
  // and injects the markup of the select inside
  // with some tag and attributes replacement
  panel = document.createElement('div');
  panel.className = builderParams.panelClass;

  append(select.children, false);

  // Injects the container in the original DOM position of the select
  container.appendChild(opener);
  select.parentNode.replaceChild(container, select);
  container.appendChild(select);
  container.appendChild(panel);

  // Event Init
  if (select.disabled) {
    container.classList.add(builderParams.isDisabledClass);
  } else {
    opener.setAttribute('tabindex', '0');
    addEvents();
  }

  // Stores the plugin public exposed methods and properties, directly in the container HTMLElement
  container.customSelect = {
    get pluginOptions() { return builderParams; },
    get open() { return isOpen; },
    set open(bool) {
      open(bool);
    },
    get disabled() { return select.disabled; },
    set disabled(bool) {
      disabled(bool);
    },
    get value() { return select.value; },
    set value(val) {
      setValue(val);
    },
    append: (node, target) => append(node, true, target),
    insertBefore: (node, target) => insertBefore(node, target),
    remove,
    empty,
    destroy,
    opener,
    select,
    panel,
    container,
  };

  // Stores the plugin directly in the original select
  select.customSelect = container.customSelect;

  // Returns the plugin instance, with the public exposed methods and properties
  return container.customSelect;
}

export default function customSelect(element, customParams) {
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
      selects.push(builder(nodeList[i], Object.assign({}, defaultParams, customParams)));
    }

    // Returns all plugin instances
    return selects;
  }());
}
