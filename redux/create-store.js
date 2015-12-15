// Redux.createStore
var createStore = (reducer) => {
  var state;
  var listeners = [];

  var getState = () => state;
  var dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  var subscribe = (listener) => {
    listeners.push(listener);
    return {listeners: listeners.filter(l => l !== listener)};
  };

  return {getState: getState, subscribe: subscribe};
};
