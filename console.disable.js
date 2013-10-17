(function() {
  var originMethods = {},
      emptyFn = function() {};

  [].concat.call(Object.keys(console), Object.keys(console.__proto__)).filter(function(prop) {
    return typeof console[prop] === "function";
  }).forEach(function(fn) {
    originMethods[fn] = console[fn].bind(console);
  });

  console.disable = console.disable || function() {
    Object.keys(originMethods).forEach(function(fn) {
      console[fn] = emptyFn;
    });
  };

  console.enable = console.enable || function() {
    Object.keys(originMethods).forEach(function(fn) {
      console[fn] = originMethods[fn];
    });
  };
})();