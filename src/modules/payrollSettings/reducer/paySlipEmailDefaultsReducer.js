const updatePaySlipEmailDefaultsState = (state, paySlipEmailDefaultsState) => ({
  ...state,
  paySlipEmailDefaults: {
    ...state.paySlipEmailDefaults,
    ...paySlipEmailDefaultsState,
  },
});

export const setPaySlipEmailDefaultsLoadingState = (state, { loadingState }) =>
  updatePaySlipEmailDefaultsState(state, { loadingState });

export const loadPaySlipEmailDefaults = (state, { response }) =>
  updatePaySlipEmailDefaultsState(state, {
    subject: response.subject,
    message: response.message,
    fromName: response.fromName,
    replyToEmail: response.replyToEmail,
  });

export const changePaySlipEmailDefaultsField = (state, { key, value }) =>
  updatePaySlipEmailDefaultsState(state, {
    [key]: value,
  });
