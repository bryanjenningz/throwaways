var silence = function(func) {
  return function() {
    try {
      var result = func.apply(this, arguments);
    } catch(e) {
      result = null;
    }
    return result;
  };
};

// var throwsError = function() {
//   throw {error: 'hi'};
// };

// var doesntThrowError = silence(throwsError);

// throwsError(); // Uncaught Object {error: "hi"}
// doesntThrowError(); // null
