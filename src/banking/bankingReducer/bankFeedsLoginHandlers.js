export const updateBankFeedsLoginDetails = (state, action) => ({
  ...state,
  loginDetails: {
    ...state.loginDetails,
    [action.key]: action.value,
  },
});

export const clearBankFeedsLoginDetails = state => ({
  ...state,
  loginDetails: {
    username: '',
    password: '',
  },
});

export const setIsFetchingTransactionsState = (state, action) => ({
  ...state,
  isFetchingTransactions: action.isFetchingTransactions,
});
