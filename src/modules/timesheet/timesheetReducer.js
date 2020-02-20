import {
  ADD_ROW,
  CLEAR_TIMESHEET_ROWS,
  CLOSE_UNSAVED_CHANGES_MODAL,
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
import ModalType from './ModalType';
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
  timesheetIsDirty: false,
  modal: null,
  modalAction: null,
  employeeAllowedPayItems: [],
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

const loadEmployeeTimesheet = (state, { timesheetRows, allowedPayItems }) => ({
  ...state,
  timesheetIsDirty: false,
  timesheetRows: timesheetRows.map(row => ({
    ...row,
    day1: {
      hours: getFormattedHours(row.day1.hours),
      hoursPaid: row.day1.hoursPaid,
      readonly: row.day1.readonly,
    },
    day2: {
      hours: getFormattedHours(row.day2.hours),
      hoursPaid: row.day2.hoursPaid,
      readonly: row.day2.readonly,
    },
    day3: {
      hours: getFormattedHours(row.day3.hours),
      hoursPaid: row.day3.hoursPaid,
      readonly: row.day3.readonly,
    },
    day4: {
      hours: getFormattedHours(row.day4.hours),
      hoursPaid: row.day4.hoursPaid,
      readonly: row.day4.readonly,
    },
    day5: {
      hours: getFormattedHours(row.day5.hours),
      hoursPaid: row.day5.hoursPaid,
      readonly: row.day5.readonly,
    },
    day6: {
      hours: getFormattedHours(row.day6.hours),
      hoursPaid: row.day6.hoursPaid,
      readonly: row.day6.readonly,
    },
    day7: {
      hours: getFormattedHours(row.day7.hours),
      hoursPaid: row.day7.hoursPaid,
      readonly: row.day7.readonly,
    },
  })),
  employeeAllowedPayItems: allowedPayItems.map(payItem => String(payItem)),
});

const clearTimesheetRows = state => ({
  ...state,
  timesheetIsDirty: false,
  timesheetRows: [],
});

const isWeekDayField = name => name.startsWith('day');

const isUpdatingRow = (targetIndex, index) => (
  targetIndex === index
);

const isCellChanged = (row, { name, value }) => {
  if (!row) return false;
  if (isWeekDayField(name)) {
    return row[name].hours !== value;
  }

  return row[name] !== value;
};

const setTimesheetCell = (state, { index, name, value }) => ({
  ...state,
  timesheetIsDirty: state.timesheetIsDirty
    || isCellChanged(state.timesheetRows[index], { name, value }),
  timesheetRows: state.timesheetRows.map((row, i) => {
    if (!isUpdatingRow(index, i)) { return row; }

    if (isWeekDayField(name)) {
      return {
        ...row,
        [name]: {
          ...row[name],
          hours: value,
        },
      };
    }

    return {
      ...row,
      [name]: value,
    };
  }),
});

const rowHasReadonlyCell = timesheetRow => (
  timesheetRow.day1.readonly
  || timesheetRow.day2.readonly
  || timesheetRow.day3.readonly
  || timesheetRow.day4.readonly
  || timesheetRow.day5.readonly
  || timesheetRow.day6.readonly
  || timesheetRow.day7.readonly
);

const removeRow = (state, { rowIndex }) => {
  if (state.timesheetRows[rowIndex] && rowHasReadonlyCell(state.timesheetRows[rowIndex])) {
    return state;
  }

  return {
    ...state,
    timesheetIsDirty: true,
    timesheetRows: state.timesheetRows.filter((row, index) => index !== rowIndex),
  };
};

const addRow = (state, { rowData }) => ({
  ...state,
  timesheetIsDirty: true,
  timesheetRows: [
    ...state.timesheetRows,
    {
      id: rowData.id,
      payItemId: rowData.payItemId ? rowData.payItemId : '',
      notes: rowData.notes ? rowData.notes : '',
      startStopDescription: rowData.startStopDescription ? rowData.startStopDescription : '',
      day1: { hours: rowData.day1 ? rowData.day1 : '', readonly: false },
      day2: { hours: rowData.day2 ? rowData.day2 : '', readonly: false },
      day3: { hours: rowData.day3 ? rowData.day3 : '', readonly: false },
      day4: { hours: rowData.day4 ? rowData.day4 : '', readonly: false },
      day5: { hours: rowData.day5 ? rowData.day5 : '', readonly: false },
      day6: { hours: rowData.day6 ? rowData.day6 : '', readonly: false },
      day7: { hours: rowData.day7 ? rowData.day7 : '', readonly: false },
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

const setModal = (state, action) => {
  if (action.modal === ModalType.UNSAVED) {
    return {
      ...state,
      modal: action.modal,
      modalAction: action.action,
    };
  }

  return {
    ...state,
    modal: action.modal,
  };
};

const closeUnsavedChangesModal = state => ({
  ...state,
  modal: null,
  modalAction: null,
});

const timesheetReducer = createReducer(getDefaultState(), {
  [LOAD_INITIAL_TIMESHEET]: loadInitialTimesheet,
  [LOAD_TIMESHEET]: loadTimesheet,
  [LOAD_CONTEXT]: loadContext,
  [RESET_STATE]: resetState,
  [SET_SELECTED_EMPLOYEE]: setSelectedEmployeeId,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_EMPLOYEE_TIMESHEET]: loadEmployeeTimesheet,
  [SET_TIMESHEET_CELL]: setTimesheetCell,
  [REMOVE_ROW]: removeRow,
  [ADD_ROW]: addRow,
  [TOGGLE_DISPLAY_START_STOP_TIMES]: toggleDisplayStartStopTimes,
  [CLEAR_TIMESHEET_ROWS]: clearTimesheetRows,
  [SET_SELECTED_DATE]: setSelectedDate,
  [SET_ALERT]: setAlert,
  [SET_MODAL]: setModal,
  [CLOSE_UNSAVED_CHANGES_MODAL]: closeUnsavedChangesModal,
});

export default timesheetReducer;
