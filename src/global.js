import fullSelect from './index';

/**
 * exportToGlobal IIFE sets the fullSelect library as an object
 * of the global scope. This is useful to use the library not as a module
 * but directly (eg. includig the js file via script tag)
 * 
 */

(function exportToGlobal(envGlobal) {
  envGlobal.fullSelect = fullSelect;
})( typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {} );