export const getUrlParams = state => ({
  businessId: state.businessId,
  transactionId: state.transactionId,
});
export const getIsLoading = state => state.isLoading;
export const getEmployeePay = state => state.employeePay;
export const getPageTitle = (state) => {
  const {
    employeeFirstName,
    employeeLastName,
    referenceNumber,
  } = state.employeePay;

  return `${employeeFirstName} ${employeeLastName} ${referenceNumber}`;
};
export const getElectronicPaymentLink = state => `/#/${state.region}/${state.businessId}/electronicPayments/${state.employeePay.parentBusinessEventId}`;
