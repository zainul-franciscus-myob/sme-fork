export const getIsOpen = state => state.isOpen;
export const getBusinessId = state => (state.businessId);
export const getAuthorisationCode = state => state.authorisationInfo.authorisationCode;
export const getAlert = state => state.alert;

export const getCodeToAuthoriseContent = state => ({
  batchPaymentId: state.batchPaymentId,
  accessToken: state.accessToken,
});

export const getAuthoriseWithCodeContent = state => ({
  batchPaymentId: state.batchPaymentId,
  authorisationCode: state.authorisationInfo.authorisationCode,
  authorisationId: state.authorisationInfo.authorisationId,
  authorisationEmail: state.authorisationInfo.authorisationEmail,
  accessToken: state.accessToken,
});
