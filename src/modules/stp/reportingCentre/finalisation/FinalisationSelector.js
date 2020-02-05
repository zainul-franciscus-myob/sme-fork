export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getIsTableLoading = state => state.isTableLoading;
export const getPayrollYears = state => state.payrollYears;
export const getSelectedPayrollYear = state => state.selectedPayrollYear;
export const getEmployees = state => state.employees;
export const getGrossPaymentYtd = state => state.grossPaymentYtd;
export const getReportedRfba = state => state.reportedRfba;
export const getReportedSection57aRfba = state => state.reportedSection57aRfba;
export const getPaygWithholdingYtd = state => state.paygWithholdingYtd;
export const getEmployeesCount = state => state.employeesCount;
export const getIsRFBAEnabled = state => state.isRFBAEnabled;
export const getIsRFBASubmitted = state => !!state.employees.find(
  e => e.rfbAmount || e.s57aRfbAmount,
);
export const getShouldShowFinaliseButton = state => Boolean(
  state.employees.find(employee => employee.isSelected && !employee.isFinalised),
);
export const getShouldShowRemoveFinalisationButton = state => Boolean(
  state.employees.find(employee => employee.isSelected && employee.isFinalised),
);
