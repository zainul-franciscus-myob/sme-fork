export const getUrlParams = (state) => ({
  businessId: state.businessId,
  transactionId: state.transactionId,
});
export const getLoadingState = (state) => state.loadingState;
export const getEmployeePay = (state) => state.employeePay;

export const getPageTitle = (state) => {
  const {
    employeeFirstName,
    employeeLastName,
    referenceNumber,
  } = state.employeePay;

  return `${employeeFirstName} ${employeeLastName} ${referenceNumber}`;
};
