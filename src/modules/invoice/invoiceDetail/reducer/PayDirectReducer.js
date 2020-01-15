const updatePayDirectState = (state, partialPayDirect) => ({
  ...state,
  payDirect: {
    ...state.payDirect,
    ...partialPayDirect,
  },
});

export const loadPayDirect = (state, { payDirect }) => updatePayDirectState(
  state, { ...payDirect, isServiceAvailable: true },
);

export const setPayDirectLoadingState = (state, { isLoading }) => updatePayDirectState(
  state, { isLoading },
);
