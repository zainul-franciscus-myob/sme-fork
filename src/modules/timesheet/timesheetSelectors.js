// eslint-disable-next-line import/prefer-default-export
export const getIsTimesheetSetUp = state => state.isTimesheetSetUp;
export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;

export const getPayrollSettingsUrl = (state) => {
  const region = getRegion(state);
  const businessId = getBusinessId(state);
  return `#/${region}/${businessId}/payrollSettings`;
};

export const getWeekDayLabels = state => state.weekDayLabels;
export const getLineItems = state => state.lineItems;
export const getEmployeeList = state => state.employeeList;
export const getPayItems = state => state.payItems;
export const getSelectedEmployeeId = state => state.selectedEmployeeId;
