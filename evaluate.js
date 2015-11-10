var operators = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b
};

// expression is an expression string, for example: '(1+2)*3'
// i is the integer that keeps track of the index we're currently at
// parse('(1+2)*3') // -> [[1, '+', 2], '*', 3]
var parse = function(expression, i) {
  i = i || 0;
  var stack = [];

  while (i < expression.length) {
    var ch = expression[i];
    if (/\d/.test(ch)) {
      var number = /^\d+/.exec(expression.slice(i))[0];
      stack.push(Number(number));
      i += number.length;
    } else if (operators[ch]) {
      stack.push(ch);
      i += 1;
    } else if (ch === '(') {
      var inner = parse(expression, i + 1);
      stack.push(inner.stack);
      i = inner.i;
    } else if (ch === ')') {
      return { stack: stack, i: i + 1 };
    } else {
      i += 1;
    }
  }
  return stack;
};

var evaluate = function(array) {
  var deepToShallow = function(array, callback) {
    return array.reduce(function(result, value) {
      if (Array.isArray(value)) {
        var result = deepToShallow(value, callback);
        return result.value || result;
      } else {
        return callback(result, value);
      }
    }, {});
  };

  var evaluateElement = function(result, value) {
    if (operators[value]) {
      return { value: result.value, operator: operators[value] };
    } else {
      if (result.value) {
        return { value: result.operator(Number(result.value), Number(value)) };
      } else {
        return { value: Number(value) };
      }
    }
  };

  var result = deepToShallow(array, evaluateElement);
  return result.value || result;
};
