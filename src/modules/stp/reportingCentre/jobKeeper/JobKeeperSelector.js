export const getRegion = (state) => state.region;
export const getPayrollYears = (state) => state.payrollYears;
export const getLoadingState = (state) => state.loadingState;
export const getSelectedPayrollYear = (state) => state.selectedPayrollYear;
export const getActiveSort = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});
export const getBusinessId = (state) => state.businessId;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getEmployees = (state) => state.employees;
export const getFinalFortnightOptions = (state) => state.finalFortnightOptions;
export const getFirstFortnightOptions = (state) => state.firstFortnightOptions;

export const getFilterEmployeesParams = (state) => ({
  year: state.selectedPayrollYear,
});

export const getFlipSortOrder = (state) =>
  state.sortOrder === 'desc' ? 'asc' : 'desc';

export const getStpDeclarationContext = (state) => ({
  businessId: getBusinessId(state),
  eventId: state.eventId,
});

export const getUpdateJobKeeperPaymentsContent = (state) => ({
  eventId: state.eventId,
  employees: state.employees.filter((emp) => emp.isDirty),
});

export const getIsDirty = (state) => state.isDirty;
export const getUnsavedChangesModalIsOpen = (state) =>
  state.unsavedChangesModalIsOpen;

export const getStpReportTabUrl = (state) =>
  `/#/${state.region}/${state.businessId}/stp/reportingCentre?tab=reports`;
