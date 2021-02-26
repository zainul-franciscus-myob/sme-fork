export const getRegion = (state) => state.region;
export const getBusinessId = (state) => state.businessId;
export const getLoadingState = (state) => state.loadingState;
export const getEmployeePay = (state) => state.employeePay;
export const getDisplayDeleteModal = (state) => state.displayDeleteConfirmation;
export const getAlert = (state) => state.alert;

export const getUrlParams = (state) => ({
  businessId: state.businessId,
  transactionId: state.transactionId,
});

export const getPageTitle = (state) => {
  const {
    employeeFirstName,
    employeeLastName,
    referenceNumber,
  } = state.employeePay;

  return `${employeeFirstName} ${employeeLastName} ${referenceNumber}`;
};
