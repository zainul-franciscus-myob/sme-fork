export const getBusinessContactInformationWasFound = (state) =>
  state.businessContactInformationWasFound;
export const getPayerAbn = (state) => state.payerAbn;
export const getFirstName = (state) => state.firstName;
export const getLastName = (state) => state.lastName;
export const getEmail = (state) => state.email;
export const getPhone = (state) => state.phone;
export const getAlert = (state) => state.alert;
export const getIsLoading = (state) => state.isLoading;
export const getBusinessId = (state) => state.businessId;
export const getPayerAbnWithoutSpaces = (state) =>
  state.payerAbn.replace(/ /g, '');

export const getSubmitBusinessInformationContent = (state) => ({
  payerAbn: getPayerAbnWithoutSpaces(state),
  firstName: state.firstName,
  lastName: state.lastName,
  email: state.email,
  phone: state.phone,
});
