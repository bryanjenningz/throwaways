// Examples not using makeActionCreator
var addTodo = function(text) {
  return {
    type: 'ADD_TODO',
    text: text
  };
};
var editTodo = function(id, text) {
  return {
    type: 'EDIT_TODO',
    id: id,
    text: text
  };
};


function makeActionCreator(type) {
  var argNames = [].slice.call(arguments, 1);
  return function() {
    var args = [].slice.call(arguments);
    var action = {type: type};
    return argNames.reduce(function(action, argName, i) {
      action[argName] = args[i];
      return action;
    }, action);
  };
}


// Examples using makeActionCreator to reduce boilerplate
var addTodo = makeActionCreator('ADD_TODO', 'text');
var editTodo = makeActionCreator('EDIT_TODO', 'id', 'text');
var clearTodo = makeActionCreator('CLEAR_TODO', 'id');
var clearAllTodos = makeActionCreator('CLEAR_ALL_TODOS');
var toggleTodo = makeActionCreator('TOGGLE_TODO', 'id');

