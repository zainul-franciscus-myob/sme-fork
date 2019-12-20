export const getIsOpen = state => state.isOpen;
export const getAuthorisationId = state => state.authorisationInfo.authorisationId;
export const getBusinessId = state => (state.businessId);
export const getCodeToAuthoriseContent = state => ({
  batchPaymentId: state.batchPaymentId,
  email: state.email,
  password: state.password,
});
export const getModalType = state => state.modalType;
export const getEmail = state => state.email;
export const getPassword = state => state.password;
export const getAuthorisationCode = state => state.authorisationInfo.authorisationCode;
export const getAlert = state => state.alert;

export const getAuthoriseWithCodeContent = state => ({
  batchPaymentId: state.batchPaymentId,
  authorisationCode: state.authorisationInfo.authorisationCode,
  authorisationId: state.authorisationInfo.authorisationId,
  authorisationEmail: state.authorisationInfo.authorisationEmail,
});
