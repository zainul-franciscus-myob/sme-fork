export const getBusinessId = state => state.businessId;
export const getPaySlipEmailDefaultsUrlParams = state => ({
  businessId: getBusinessId(state),
});
export const getLoadingState = state => state.paySlipEmailDefaults.loadingState;
export const getSubject = state => state.paySlipEmailDefaults.subject;
export const getMessage = state => state.paySlipEmailDefaults.message;
export const getPaySlipEmailDefaultsContent = state => ({
  subject: getSubject(state),
  message: getMessage(state),
});
