import customSelect from './index';

/**
 * exportToGlobal IIFE sets the customSelect library as an object
 * of the global scope. This is useful to use the library not as a module
 * but directly (eg. includig the js file via script tag)
 *
 */

(function exportToGlobal(eg) {
  var envGlobal = eg;
  envGlobal.customSelect = customSelect;
}(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
