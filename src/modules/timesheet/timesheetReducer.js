import {
  ADD_ROW,
  CLEAR_TIMESHEET_ROWS,
  LOAD_CONTEXT,
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_INITIAL_TIMESHEET,
  LOAD_TIMESHEET,
  REMOVE_ROW,
  SET_LOADING_STATE,
  SET_SELECTED_EMPLOYEE,
  SET_TIMESHEET_CELL,
  TOGGLE_DISPLAY_START_STOP_TIMES,
} from './timesheetIntents';
import { RESET_STATE } from '../../SystemIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING_SUCCESS,
  businessId: null,
  region: null,
  isLoading: false,
  isTimesheetSetUp: false,
  weekStartDate: null,
  weekDayLabels: [],
  employeeList: [],
  payItems: [],
  displayStartStopTimes: false,
  selectedEmployeeId: null,
  timesheetRows: [],
});

const loadInitialTimesheet = (state, { response }) => ({
  ...state,
  ...response,
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
    payItemId: row.payItemId,
    notes: row.notes,
    startStopDescription: row.startStopDescription,
    day1: { hours: row.days[0].hours },
    day2: { hours: row.days[1].hours },
    day3: { hours: row.days[2].hours },
    day4: { hours: row.days[3].hours },
    day5: { hours: row.days[4].hours },
    day6: { hours: row.days[5].hours },
    day7: { hours: row.days[6].hours },
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
        [name]: { hours: Number(value) },
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
      day1: { hours: rowData.day1 ? Number(rowData.day1) : 0 },
      day2: { hours: rowData.day2 ? Number(rowData.day2) : 0 },
      day3: { hours: rowData.day3 ? Number(rowData.day3) : 0 },
      day4: { hours: rowData.day4 ? Number(rowData.day4) : 0 },
      day5: { hours: rowData.day5 ? Number(rowData.day5) : 0 },
      day6: { hours: rowData.day6 ? Number(rowData.day6) : 0 },
      day7: { hours: rowData.day7 ? Number(rowData.day7) : 0 },
    },
  ],
});

const toggleDisplayStartStopTimes = state => ({
  ...state,
  displayStartStopTimes: !state.displayStartStopTimes,
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
});

export default timesheetReducer;
