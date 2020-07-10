const createWrapper = (namespace, func) => (state, action) => {
  const extractedState = state[namespace];
  return {
    ...state,
    [namespace]: func(extractedState, action),
  };
};

const wrapHandlers = (namespace, handlers) =>
  Object.getOwnPropertySymbols(handlers).reduce((acc, intent) => {
    const handler = handlers[intent];
    const wrappedHandler = createWrapper(namespace, handler);
    return {
      ...acc,
      [intent]: wrappedHandler,
    };
  }, {});

export default wrapHandlers;
