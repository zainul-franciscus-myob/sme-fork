export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getIsTableLoading = state => state.isTableLoading;
export const getPayrollYears = state => state.payrollYears;
export const getSelectedPayrollYear = state => state.selectedPayrollYear;

const getEmployeeLink = (employeeId, state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const year = getSelectedPayrollYear(state);
  return `/#/${region}/${businessId}/stp/employeeEtp/${employeeId}?year=${year}`;
};
export const getEmployees = state => state.employees.map(employee => ({
  ...employee,
  employeeLink: getEmployeeLink(employee.id, state),
}));

export const getFilterEmployeesParams = state => ({
  year: state.selectedPayrollYear,
});

export const getStpDeclarationContext = state => ({
  businessId: getBusinessId(state),
  eventId: state.eventId,
});

export const hasTerminationDate = employee => (!!employee.terminationDate) && !employee.isDirty;

export const getTerminateEmployeesContent = state => ({
  eventId: state.eventId,
  employees: state.employees.filter(emp => emp.isDirty),
});

export const getUnterminateEmployeeContent = (state, employee) => ({
  eventId: state.eventId,
  employees: [
    {
      ...employee,
      terminationDate: null,
    },
  ],
});

export const hasEtps = etpCount => etpCount > 0;
export const getEtpCountText = (etpCount) => {
  if (etpCount === 0) {
    return 'No payments';
  }
  if (etpCount === 1) {
    return '1 payment';
  }
  return `${etpCount} payments`;
};

export const getActiveSort = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});
export const getFlipSortOrder = state => (state.sortOrder === 'desc' ? 'asc' : 'desc');
