import customSelect from './index';

if (typeof jQuery === 'undefined') {
  throw new Error('Custom Select jQuery requires jQuery');
}

(function customSelectJQueryAdaptor(jQuery) {
  var $ = jQuery;

  $.fn.customSelect = function builderwrap(opt, ...nextArgs) {
    var ret;
    this.each(function builder() {
      var select = $(this);
      var instance = select.data('customSelect');

      // create plugin instance and save it in data
      if (!instance) {
        select.data('customSelect', customSelect(this, opt)[0]);
        ret = this;

      // if instance already created call method
      } else if (typeof opt === 'string') {
        if (typeof instance[opt] === 'function') {
          ret = instance[opt](...nextArgs);
          if (opt === 'destroy') {
            select.removeData('customSelect');
          }
        } else if (nextArgs.length) {
          instance[opt] = nextArgs[0];
          ret = this;
        } else {
          ret = (opt === 'container'
            || opt === 'opener'
            || opt === 'select'
            || opt === 'panel'
          ) ? $(instance[opt]) : instance[opt];
        }
      }
    });
    return ret;
  };
}(jQuery));
