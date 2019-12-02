export const getSelectedTab = state => state.selectedTab;
export const getEmailTabEmployees = state => state.emailTab.employees;
export const getPrintTabEmployees = state => state.printTab.employees;
export const getPayRunListUrl = state => `/#/${state.region}/${state.businessId}/payRun`;
export const getUrlParams = state => ({
  businessId: state.businessId,
  payRunId: state.payRunId,
});
export const getBusinessId = state => state.businessId;
export const getPayRunId = state => state.payRunId;
export const getPaymentPeriodStart = state => state.paymentPeriodStart;
export const getPaymentPeriodEnd = state => state.paymentPeriodEnd;
export const getPaymentDate = state => state.paymentDate;
export const getTotalNetPay = state => state.totalNetPay;
export const getModalContext = ({ transactionId, employeeName, state }) => ({
  transactionId,
  employeeName,
  businessId: getBusinessId(state),
});
