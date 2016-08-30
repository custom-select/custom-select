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
  scrollToSelected: true,
};

function builder(el, cstOptions) {
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

  // Private Fuctions
  function setFocusedElement(cstOption) {
    focusedElement.classList.remove(hasFocusClass);
    focusedElement = cstOption;
    focusedElement.classList.add(hasFocusClass);
  }

  function setSelectedElement(cstOption) {
    focusedElement.classList.remove(hasFocusClass);
    selectedElement.classList.remove(isSelectedClass);
    cstOption.classList.add(isSelectedClass, hasFocusClass);
    selectedElement = focusedElement = cstOption;
    opener.children[0].textContent = selectedElement.fullSelectOriginalOption.text;
  }

  function setValue(value) {
    let toSelect = select.querySelector(`option[value='${value}']`);
    if (!toSelect) {
      toSelect = select.options[0];
    }
    toSelect.selected = true;
    setSelectedElement(toSelect.fullSelectCstOption);
  }

  function moveFocuesedElement(direction) {
    const optionsList = panel.getElementsByClassName(cstOptions.optionClass);
    const currentFocusedIndex = [].indexOf.call(optionsList, focusedElement);
    if (optionsList[currentFocusedIndex + direction]) {
      setFocusedElement(optionsList[currentFocusedIndex + direction]);
    }
  }

  function open() {
    // Closes all instances of plugin
    var openedFullSelect = document.querySelector(`.${containerClass} .${isOpenClass}`);
    if (openedFullSelect) {
      openedFullSelect.parentNode.fullSelect.close();
    }

    // Opens only the clicked one
    opener.classList.add(isActiveClass);
    panel.classList.add(isOpenClass);

    isOpen = true;
  }

  function close() {
    opener.classList.remove(isActiveClass);
    panel.classList.remove(isOpenClass);

    setFocusedElement(selectedElement);

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
    // Option click
    } else if (e.target.classList.contains(cstOptions.optionClass) && panel.contains(e.target)) {
      setSelectedElement(e.target);
      selectedElement.fullSelectOriginalOption.selected = true;
      close();
    } else if (isOpen) {
      close();
    }
  }

  function mouseoverEvent(e) {
    if (e.target.classList.contains(cstOptions.optionClass)) {
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
      // On "Enter" selects the focused element
      if (e.keyCode === 13) {
        setSelectedElement(focusedElement);
        selectedElement.fullSelectOriginalOption.selected = true;

        // and close
        close();
      }

      // On "Escape"
      if (e.keyCode === 27) {
        // close
        close();
      }

      // On "Arrow down" set focues to the next option
      if (e.keyCode === 40) {
        moveFocuesedElement(+1);
      }

      if (e.keyCode === 38) {
        moveFocuesedElement(-1);
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

  // Creates the container/wrapper
  container = document.createElement('div');
  container.classList.add(cstOptions.containerClass, containerClass);

  // Creates the opener
  opener = document.createElement('span');
  opener.className = cstOptions.openerClass;
  opener.setAttribute('tabindex', '0');
  opener.innerHTML = `<span>
   ${(select.selectedIndex !== -1 ? select.options[select.selectedIndex].text : '')}
   </span>`;

  // Creates the panel
  // and injects the markup of the select inside
  // with some tag and attributes replacement
  panel = document.createElement('div');
  panel.className = cstOptions.panelClass;

  const panelContent = (function parseSelect(currentNode) {
    const node = currentNode;
    const cstList = [];

    for (let i = 0, li = node.children.length; i < li; i++) {
      if (node.children[i].tagName.toUpperCase() === 'OPTGROUP') {
        const cstOptgroup = document.createElement('div');
        cstOptgroup.classList.add(cstOptions.optgroupClass);
        cstOptgroup.dataset.label = node.children[i].label;

        const subNodes = parseSelect(node.children[i]);
        for (let j = 0, lj = subNodes.length; j < lj; j++) {
          cstOptgroup.appendChild(subNodes[j]);
        }

        cstList.push(cstOptgroup);
      } else if (node.children[i].tagName.toUpperCase() === 'OPTION') {
        const cstOption = document.createElement('div');
        cstOption.classList.add(cstOptions.optionClass);
        cstOption.textContent = node.children[i].text;
        cstOption.dataset.value = node.children[i].value;
        cstOption.fullSelectOriginalOption = node.children[i];
        node.children[i].fullSelectCstOption = cstOption;
        if (node.children[i].selected) {
          cstOption.classList.add(isSelectedClass, hasFocusClass);
          selectedElement = focusedElement = cstOption;
        }
        cstList.push(cstOption);
      }
    }

    return cstList;
  }(select));

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

  // Public Exposed Methods
  // and stores the plugin in the HTMLElement
  container.fullSelect = {
    getOptions: () => cstOptions,
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
  return container.fullSelect;
}

export default function fullSelect(element, options) {
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
      selects.push(builder(nodeList[i], Object.assign(defaultOptions, options)));
    }

    // Returns all plugin instances
    return selects;
  }());
}
