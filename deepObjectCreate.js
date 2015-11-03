var deepObjectCreate = function(object) {
  var keys = Array.prototype.slice.call(arguments, 1);
  var current = object;
  keys.forEach(function(key) {
    if (current[key] === undefined) current[key] = {};
    current = current[key];
  });
  return object;
};
 console.log('hello');

// Example usage:

// var object = {};
// console.log(object); // {}
// console.log(deepObjectCreate(object, 'a', 'b', 'c')); // {'a': {'b': {'c': {}}}}
// console.log(object); // {'a': {'b': {'c': {}}}}
