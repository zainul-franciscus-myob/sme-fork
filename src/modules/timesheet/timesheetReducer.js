import {
  ADD_ROW,
  CLEAR_TIMESHEET_ROWS,
  LOAD_CONTEXT,
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_INITIAL_TIMESHEET,
  LOAD_TIMESHEET,
  REMOVE_ROW,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL,
  SET_SELECTED_DATE,
  SET_SELECTED_EMPLOYEE,
  SET_TIMESHEET_CELL,
  TOGGLE_DISPLAY_START_STOP_TIMES,
} from './timesheetIntents';
import { RESET_STATE } from '../../SystemIntents';
import { getFormattedHours } from './timesheetSelectors';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING_SUCCESS,
  businessId: null,
  region: null,
  isLoading: false,
  isTimesheetSetUp: false,
  weekStartDate: null,
  selectedDate: null,
  weekDayLabels: [],
  employeeList: [],
  payItems: [],
  displayStartStopTimes: false,
  selectedEmployeeId: '',
  timesheetRows: [],
  modal: null,
});

const loadInitialTimesheet = (state, { response }) => ({
  ...state,
  ...response,
  selectedDate: response.weekStartDate,
});

const loadTimesheet = (state, { response }) => ({
  ...state,
  ...response,
});

const loadContext = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setSelectedEmployeeId = (state, { selectedEmployeeId }) => ({
  ...state,
  selectedEmployeeId,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setEmployeeTimesheetRows = (state, { timesheetRows }) => ({
  ...state,
  timesheetRows: timesheetRows.map(row => ({
    ...row,
    day1: {
      hours: getFormattedHours(row.day1.hours),
    },
    day2: {
      hours: getFormattedHours(row.day2.hours),
    },
    day3: {
      hours: getFormattedHours(row.day3.hours),
    },
    day4: {
      hours: getFormattedHours(row.day4.hours),
    },
    day5: {
      hours: getFormattedHours(row.day5.hours),
    },
    day6: {
      hours: getFormattedHours(row.day6.hours),
    },
    day7: {
      hours: getFormattedHours(row.day7.hours),
    },
  })),
});

const clearTimesheetRows = state => ({
  ...state,
  timesheetRows: [],
});

const isWeekDayField = name => name.startsWith('day');

const isUpdatingRow = (targetIndex, index) => (
  targetIndex === index
);

const setTimesheetCell = (state, { index, name, value }) => ({
  ...state,
  timesheetRows: state.timesheetRows.map((row, i) => {
    if (!isUpdatingRow(index, i)) { return row; }

    if (isWeekDayField(name)) {
      return {
        ...row,
        [name]: { hours: value },
      };
    }

    return {
      ...row,
      [name]: value,
    };
  }),
});

const removeRow = (state, { rowIndex }) => ({
  ...state,
  timesheetRows: state.timesheetRows.filter((row, index) => index !== rowIndex),
});

const addRow = (state, { rowData }) => ({
  ...state,
  timesheetRows: [
    ...state.timesheetRows,
    {
      payItemId: rowData.payItemId ? rowData.payItemId : '',
      notes: rowData.notes ? rowData.notes : '',
      startStopDescription: rowData.startStopDescription ? rowData.startStopDescription : '',
      day1: { hours: rowData.day1 ? rowData.day1 : '' },
      day2: { hours: rowData.day2 ? rowData.day2 : '' },
      day3: { hours: rowData.day3 ? rowData.day3 : '' },
      day4: { hours: rowData.day4 ? rowData.day4 : '' },
      day5: { hours: rowData.day5 ? rowData.day5 : '' },
      day6: { hours: rowData.day6 ? rowData.day6 : '' },
      day7: { hours: rowData.day7 ? rowData.day7 : '' },
    },
  ],
});

const toggleDisplayStartStopTimes = state => ({
  ...state,
  displayStartStopTimes: !state.displayStartStopTimes,
});

const setSelectedDate = (state, { selectedDate }) => ({
  ...state,
  selectedDate,
});

const setAlert = (state, { type, message }) => ({
  ...state,
  alert: {
    type,
    message,
  },
});

const setModal = (state, { modal }) => ({
  ...state,
  modal,
});

const timesheetReducer = createReducer(getDefaultState(), {
  [LOAD_INITIAL_TIMESHEET]: loadInitialTimesheet,
  [LOAD_TIMESHEET]: loadTimesheet,
  [LOAD_CONTEXT]: loadContext,
  [RESET_STATE]: resetState,
  [SET_SELECTED_EMPLOYEE]: setSelectedEmployeeId,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_EMPLOYEE_TIMESHEET]: setEmployeeTimesheetRows,
  [SET_TIMESHEET_CELL]: setTimesheetCell,
  [REMOVE_ROW]: removeRow,
  [ADD_ROW]: addRow,
  [TOGGLE_DISPLAY_START_STOP_TIMES]: toggleDisplayStartStopTimes,
  [CLEAR_TIMESHEET_ROWS]: clearTimesheetRows,
  [SET_SELECTED_DATE]: setSelectedDate,
  [SET_ALERT]: setAlert,
  [SET_MODAL]: setModal,
});

export default timesheetReducer;
