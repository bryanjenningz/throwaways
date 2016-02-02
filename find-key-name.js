var findKeyName = (function() {
  'use strict';

  var visitedPaths = {};
  // Recursively search an object for keys that have the keyName as a subset
  var findKeyName = (object, keyName, path) => {
    if (path === undefined) { // Assumption: the first instance has an undefined path
      path = '';
      visitedPaths = {};
    }
    if (path in visitedPaths) {
      return;
    } else {
      visitedPaths[path] = true;
    }
    var keys = [];
    var isInside = typeof keyName === 'string' ? (key, keyName) => key.indexOf(keyName) >= 0 :
                   typeof keyName === 'regex' ? (key, keyName) => !!key.match(keyName) :
                   typeof keyName === 'function' ? keyName : null;
    if (isInside === null || object === null) { return keys; }
    Object.keys(object).forEach((key) => {
      if (isInside(key, keyName)) {
        keys.push({path: path, key: key});
      }
      if (typeof object[key] === 'object' && !Array.isArray(object[key]) && object[key] !== null) {
        keys = keys.concat(findKeyName(object[key], keyName, path + '/' + key));
      }
    });
    return keys;
  };

  return findKeyName;
})();
