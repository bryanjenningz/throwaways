// Clicks any DOM element multiple times spaced apart with setTimeout.
var multiclick = function(selector, options) {
  for (var i = 0; i < options.times || 100; i++) {
    setTimeout(() => $(selector).click(), i * (options.interval || 100));
  }
};
