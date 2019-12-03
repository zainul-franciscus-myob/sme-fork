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
export const getEmployeePayModalContext = ({ transactionId, employeeName, state }) => ({
  transactionId,
  employeeName,
  businessId: getBusinessId(state),
  region: state.region,
});
export const getSelectedEmployeesToEmail = state => state.emailTab.employees
  .filter(e => e.isSelected)
  .map(employee => ({
    id: employee.id,
    name: employee.name,
    email: employee.email,
    transactionId: employee.transactionId,
  }));
export const getEmailSettings = state => state.emailSettings;
export const getEmailPaySlipModalContext = ({ state, employees, emailSettings }) => ({
  businessId: getBusinessId(state),
  employees,
  emailSettings,
});
