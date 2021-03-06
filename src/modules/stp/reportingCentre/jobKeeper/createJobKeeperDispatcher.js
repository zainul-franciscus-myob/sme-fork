import {
  DISMISS_INITIAL_WARNING,
  RESET_DIRTY_FLAG,
  SELECT_ALL_EMPLOYEES,
  SELECT_EMPLOYEE,
  SET_ALERT_MESSAGE,
  SET_FILTERED_EMPLOYEES,
  SET_INITIAL_STATE,
  SET_INLINE_ALERT_MESSAGE,
  SET_JOB_KEEPER_INITIAL,
  SET_LOADING_STATE,
  SET_NEW_EVENT_ID,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SORTED_EMPLOYEES,
  SET_TABLE_LOADING_STATE,
  SET_UNSAVED_CHANGES_MODAL,
  SORT_JOB_KEEPER_EMPLOYEES,
  TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL,
  UPDATE_EMPLOYEE_ROW,
} from './JobKeeperIntents';

const createJobKeeperDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setInitialJobKeeper: (response) => {
    store.dispatch({
      intent: SET_JOB_KEEPER_INITIAL,
      response,
    });
  },

  setSelectedPayrollYear: (selectedPayrollYear) => {
    store.dispatch({
      intent: SET_SELECTED_PAYROLL_YEAR,
      selectedPayrollYear,
    });
  },

  clearEmployees: () => {
    store.dispatch({
      intent: SET_FILTERED_EMPLOYEES,
      response: { employees: [] },
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  setSortedEmployees: (response) => {
    store.dispatch({
      intent: SET_SORTED_EMPLOYEES,
      response,
    });
  },

  setFilteredEmployees: (response) => {
    store.dispatch({
      intent: SET_FILTERED_EMPLOYEES,
      response,
    });
  },

  setSort: ({ orderBy, sortOrder }) => {
    store.dispatch({
      intent: SORT_JOB_KEEPER_EMPLOYEES,
      orderBy,
      sortOrder,
    });
  },

  updateEmployeeRow: ({ key, value, rowId }) => {
    store.dispatch({
      intent: UPDATE_EMPLOYEE_ROW,
      key,
      value,
      rowId,
    });
  },

  setNewEventId: () => {
    store.dispatch({
      intent: SET_NEW_EVENT_ID,
    });
  },

  setUnsavedChangesModal: (isOpen) => {
    store.dispatch({
      intent: SET_UNSAVED_CHANGES_MODAL,
      isOpen,
    });
  },

  resetDirtyFlag: () => {
    store.dispatch({
      intent: RESET_DIRTY_FLAG,
    });
  },

  dismissInitWarning: () => {
    store.dispatch({
      intent: DISMISS_INITIAL_WARNING,
    });
  },

  showEmployeeBenefitReportModal: () => {
    store.dispatch({
      intent: TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL,
      isEmployeeBenefitReportModalOpen: true,
    });
  },

  hideEmployeeBenefitReportModal: () => {
    store.dispatch({
      intent: TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL,
      isEmployeeBenefitReportModalOpen: false,
    });
  },

  selectEmployee: (item, value) => {
    store.dispatch({
      intent: SELECT_EMPLOYEE,
      item,
      value,
    });
  },

  selectAllEmployees: (isSelected) => {
    store.dispatch({
      intent: SELECT_ALL_EMPLOYEES,
      isSelected,
    });
  },

  setAlertMessage: (alertMessage) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage,
    });
  },

  setInlineErrors: (inlineErrors) => {
    store.dispatch({
      intent: SET_INLINE_ALERT_MESSAGE,
      inlineErrors,
    });
  },
});

export default createJobKeeperDispatcher;
