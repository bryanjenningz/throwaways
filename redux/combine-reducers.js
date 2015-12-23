// Applies the old state and dispatched action to each reducer and returns
// the next state without mutating the previous state.
var combineReducers = (reducers) => {
  return (state, action) => {
    state = state === undefined ? {} : state;
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
