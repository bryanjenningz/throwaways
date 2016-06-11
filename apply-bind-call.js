var apply = (func, context, args) => {
  // Temporarily add the `func` function to the `context` object so that `context`
  // will be the `this` value when the temporary function is called because
  // `context` will be to the left of the dot when it is called like `context.tempFunc(...)`.

  context.tempFunc = func
  var result = context.tempFunc(...args)
  delete context.tempFunc

  return result
}

// Once we have `apply` defined, we can just make `bind` and `call` 1-liners that use `apply`.

var bind = (func, context, ...args) => (...moreArgs) => apply(func, context, [...args, ...moreArgs])
var call = (func, context, ...args) => apply(func, context, args)

console.assert(apply(function(a) { return a + this.b }, {b: 2}, [3]) === 5)
console.assert(call(function(a) { return a + this.b }, {b: 2}, 3) === 5)
console.assert(bind(function(a) { return a + this.b }, {b: 2})(3) === 5)
console.assert(bind(function(a) { return a + this.b }, {b: 2}, 3)() === 5)
