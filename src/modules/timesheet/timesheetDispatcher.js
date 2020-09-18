import {
  ADD_ROW,
  CLEAR_TIMESHEET_ROWS,
  CLOSE_UNSAVED_CHANGES_MODAL,
  LOAD_CONTEXT,
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_INITIAL_TIMESHEET,
  LOAD_JOB_AFTER_CREATE,
  LOAD_TIMESHEET,
  REMOVE_ROW,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL,
  SET_REDIRECT_URL,
  SET_SELECTED_DATE,
  SET_SELECTED_EMPLOYEE,
  SET_TABLE_LOADING_STATE,
  SET_TIMESHEET_CELL,
  TOGGLE_DISPLAY_START_STOP_TIMES,
} from './timesheetIntents';
import { RESET_STATE } from '../../SystemIntents';

const createTimesheetDispatcher = (store) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  loadContext: (context) => {
    store.dispatch({
      intent: LOAD_CONTEXT,
      context,
    });
  },

  setSelectedEmployee: (value) => {
    store.dispatch({
      intent: SET_SELECTED_EMPLOYEE,
      selectedEmployeeId: value,
    });
  },

  loadJobAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_JOB_AFTER_CREATE,
      ...payload,
    }),

  setTimesheetCell: (index, name, value) => {
    store.dispatch({
      intent: SET_TIMESHEET_CELL,
      index,
      name,
      value,
    });
  },

  setAlert: ({ type, message }) => {
    store.dispatch({
      intent: SET_ALERT,
      type,
      message,
    });
  },

  setModal: (modalType, action) => {
    store.dispatch({
      intent: SET_MODAL,
      modal: modalType,
      action,
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: SET_MODAL,
      modal: null,
    });
  },

  closeUnsavedChangesModal: () => {
    store.dispatch({
      intent: CLOSE_UNSAVED_CHANGES_MODAL,
    });
  },

  clearTimesheetRows: () => {
    store.dispatch({
      intent: CLEAR_TIMESHEET_ROWS,
    });
  },

  loadTimesheet: (response) => {
    store.dispatch({
      intent: LOAD_TIMESHEET,
      response,
    });
  },

  loadSelectedEmployeeTimesheet: ({ timesheetRows, allowedPayItems }) => {
    store.dispatch({
      intent: LOAD_EMPLOYEE_TIMESHEET,
      timesheetRows,
      allowedPayItems,
    });
  },

  toggleDisplayStartStopTimes: () => {
    store.dispatch({
      intent: TOGGLE_DISPLAY_START_STOP_TIMES,
    });
  },

  addRow: (rowData) => {
    store.dispatch({
      intent: ADD_ROW,
      rowData,
    });
  },

  removeRow: (rowIndex) => {
    store.dispatch({
      intent: REMOVE_ROW,
      rowIndex,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setSelectedDate: (value) => {
    store.dispatch({
      intent: SET_SELECTED_DATE,
      selectedDate: value,
    });
  },

  startBlockingTable: () => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading: true,
    });
  },

  stopBlockingTable: () => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading: false,
    });
  },

  loadInitialTimesheet: (response) => {
    store.dispatch({
      intent: LOAD_INITIAL_TIMESHEET,
      response,
    });
  },

  setRedirectUrl: (redirectUrl) => {
    store.dispatch({
      intent: SET_REDIRECT_URL,
      redirectUrl,
    });
  },
});

export default createTimesheetDispatcher;
