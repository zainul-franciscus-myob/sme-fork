export const getUrlParams = state => ({
  businessId: state.businessId,
  transactionId: state.transactionId,
});
export const getEmployeeName = state => state.employeeName;
export const getEmployeePay = state => state.employeePay;
export const getIsLoading = state => state.isLoading;
export const getDeletePopoverIsOpen = state => state.deletePopoverIsOpen;
export const getIsModalOpen = state => state.isOpen;
export const getElectronicPaymentLink = state => `/#/${state.region}/${state.businessId}/electronicPayments/${state.employeeDetails.referenceNumber}`;
