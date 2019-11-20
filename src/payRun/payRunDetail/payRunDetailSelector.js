export const getSelectedTab = state => state.selectedTab;
export const getEmailTabEmployees = state => state.emailTab.employees;
export const getPrintTabEmployees = state => state.printTab.employees;
export const getPayRunListUrl = state => `/#/${state.region}/${state.businessId}/payRun`;
export const getUrlParams = state => ({
  businessId: state.businessId,
  payRunId: state.payRunId,
});
export const getPaymentPeriodStart = state => state.paymentPeriodStart;
export const getPaymentPeriodEnd = state => state.paymentPeriodEnd;
export const getPaymentDate = state => state.paymentDate;
export const getTotalNetPay = state => state.totalNetPay;
export const getIsModalLoading = state => state.isModalLoading;
export const getModalEmployeeDetails = state => state.employeeDetails;
export const getEmployeeDetailModal = state => state.modal;
export const getDeletePopoverIsOpen = state => state.deletePopoverIsOpen;
