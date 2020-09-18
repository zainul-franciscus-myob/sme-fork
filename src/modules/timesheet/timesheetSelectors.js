import formatNumberWithDecimalScaleRange from '../../common/valueFormatters/formatNumberWithDecimalScaleRange';

export const getIsTimesheetSetUp = (state) => state.isTimesheetSetUp;
export const getRegion = (state) => state.region;
export const getBusinessId = (state) => state.businessId;

export const getPayrollSettingsUrl = (state) => {
  const region = getRegion(state);
  const businessId = getBusinessId(state);
  return `#/${region}/${businessId}/payrollSettings`;
};

export const getWeekDayLabels = (state) => state.weekDayLabels;
export const getTimesheetRows = (state) => state.timesheetRows;
export const getEmployeeList = (state) => state.employeeList;
export const getPayItems = (state) =>
  state.payItems.filter((payItem) =>
    state.employeeAllowedPayItems.includes(payItem.id)
  );
export const getActiveJobOptions = (state) =>
  state.jobOptions.filter((job) => job.isActive);
export const getIsTimesheetJobColumnEnabled = (state) =>
  state.isTimesheetJobColumnEnabled;
export const getSelectedEmployeeId = (state) => state.selectedEmployeeId;
export const getLoadingState = (state) => state.loadingState;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getWeekStartDate = (state) => state.weekStartDate;
export const getSelectedDate = (state) => state.selectedDate;
export const getDisplayStartStopTimes = (state) => state.displayStartStopTimes;
export const getAlert = (state) => state.alert;
export const getModal = (state) => state.modal;
export const getFormattedHours = (hours) =>
  hours !== '' ? formatNumberWithDecimalScaleRange(hours, 2, 3) : '';

const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
const sum = (list) => list.reduce((total, value) => total + value, 0);
export const getRowHours = (row) =>
  days.map((field) => (row[field] ? Number(row[field].hours) : 0));

const getHourForDay = (row, day) => Number(row[day].hours);
const getTotalForWeekDay = (state, day) =>
  getFormattedHours(
    sum(getTimesheetRows(state).map((row) => getHourForDay(row, day)))
  );
export const getWeekDayTotals = (state) =>
  days.map((day) => getTotalForWeekDay(state, day));

export const getTimesheetTotalHours = (state) => {
  const timesheetRows = [...state.timesheetRows];
  const rowsTotalHoursArray = timesheetRows.map((row) => {
    const rowHoursArray = getRowHours(row);
    return sum(rowHoursArray);
  });
  return getFormattedHours(sum(rowsTotalHoursArray));
};

export const getSelectedEmployeeName = (state) =>
  state.selectedEmployeeId
    ? state.employeeList.find((e) => e.id === state.selectedEmployeeId).name
    : null;

export const getSaveTimesheetContent = (state) => ({
  startDate: state.weekStartDate,
  employeeName: getSelectedEmployeeName(state),
  timesheetRows: state.timesheetRows.map((row) => ({
    ...row,
    notes: row.notes || null,
    startStopDescription: row.startStopDescription || null,
    day1: {
      hours: row.day1 && row.day1.hours ? Number(row.day1.hours) : 0,
      hoursPaid:
        row.day1 && row.day1.hoursPaid ? Number(row.day1.hoursPaid) : 0,
    },
    day2: {
      hours: row.day2 && row.day2.hours ? Number(row.day2.hours) : 0,
      hoursPaid:
        row.day2 && row.day2.hoursPaid ? Number(row.day2.hoursPaid) : 0,
    },
    day3: {
      hours: row.day3 && row.day3.hours ? Number(row.day3.hours) : 0,
      hoursPaid:
        row.day3 && row.day3.hoursPaid ? Number(row.day3.hoursPaid) : 0,
    },
    day4: {
      hours: row.day4 && row.day4.hours ? Number(row.day4.hours) : 0,
      hoursPaid:
        row.day4 && row.day4.hoursPaid ? Number(row.day4.hoursPaid) : 0,
    },
    day5: {
      hours: row.day5 && row.day5.hours ? Number(row.day5.hours) : 0,
      hoursPaid:
        row.day5 && row.day5.hoursPaid ? Number(row.day5.hoursPaid) : 0,
    },
    day6: {
      hours: row.day6 && row.day6.hours ? Number(row.day6.hours) : 0,
      hoursPaid:
        row.day6 && row.day6.hoursPaid ? Number(row.day6.hoursPaid) : 0,
    },
    day7: {
      hours: row.day7 && row.day7.hours ? Number(row.day7.hours) : 0,
      hoursPaid:
        row.day7 && row.day7.hoursPaid ? Number(row.day7.hoursPaid) : 0,
    },
  })),
});

export const getDeleteTimesheetContent = (state) => ({
  weekStartDate: state.weekStartDate,
  employeeName: getSelectedEmployeeName(state),
});

export const getTimesheetIsDirty = (state) => state.timesheetIsDirty;
export const getUnsavedChangesModalAction = (state) => state.modalAction;

export const getModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getLoadAddedJobUrlParams = (state, jobId) => {
  const businessId = getBusinessId(state);
  return { businessId, jobId };
};
