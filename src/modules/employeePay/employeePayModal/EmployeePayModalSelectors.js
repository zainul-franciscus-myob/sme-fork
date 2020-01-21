export const getUrlParams = state => ({
  businessId: state.businessId,
  transactionId: state.transactionId,
});
export const getEmployeeName = state => state.employeeName;
export const getEmployeePay = state => state.employeePay;
export const getLoadingState = state => state.loadingState;
export const getDeletePopoverIsOpen = state => state.deletePopoverIsOpen;
export const getIsModalOpen = state => state.isOpen;
export const getAlert = state => state.alert;

export const getElectronicPaymentLink = state => `/#/${state.region}/${state.businessId}/electronicPayments/${state.employeePay.parentBusinessEventId}`;
