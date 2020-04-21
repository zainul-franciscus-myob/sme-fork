export const getPayrollYears = state => state.payrollYears;
export const getLoadingState = state => state.loadingState;
export const getSelectedPayrollYear = state => state.selectedPayrollYear;
export const getActiveSort = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});
export const getBusinessId = state => state.businessId;
export const getIsTableLoading = state => state.isTableLoading;
export const getEmployees = state => state.employees;
