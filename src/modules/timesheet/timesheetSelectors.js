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
export const getTimesheetRows = state => state.timesheetRows;
export const getEmployeeList = state => state.employeeList;
export const getPayItems = state => state.payItems;
export const getSelectedEmployeeId = state => state.selectedEmployeeId;
export const getLoadingState = state => state.loadingState;
export const getWeekStartDate = state => state.weekStartDate;
export const getDisplayStartStopTimes = state => state.displayStartStopTimes;
const days = [
  'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7',
];
const sum = (list => list.reduce((total, value) => (total + value), 0));
export const getRowHours = row => days.map(field => (
  row[field] ? Number(row[field].hours) : 0
));

export const getTimesheetTotalHours = (state) => {
  const timesheetRows = [...state.timesheetRows];
  const rowsTotalHoursArray = timesheetRows.map((row) => {
    const rowHoursArray = getRowHours(row);
    return sum(rowHoursArray);
  });
  return sum(rowsTotalHoursArray);
};
