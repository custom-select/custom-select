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

import jvg from 'jvg';

const defaultOptions = {
  panelClass: 'full-select-panel',
  optionClass: 'full-select-option',
  openerClass: 'full-select-opener',
  containerClass: 'full-select-container',
  scrollToSelected: true
}

export default function fullSelect(element, customOptions) {

  const options = jvg.extend(defaultOptions, customOptions);
  const selects = document.querySelectorAll(element);

  return ( function init() {
    
    // Public Exposed Methods
    return {
      getOptions: () => {
        return options;
      }
    };
  })()

}