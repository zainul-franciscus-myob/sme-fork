const createReducer = (originalState, handlers) => (
  state = originalState,
  action
) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.intent)) {
    return handlers[action.intent](state, action);
  }
  return state;
};

export default createReducer;
