import {
  EDIT_EXISTING_PAY_RUN,
  LOAD_EMPLOYEE_PAYS,
  SELECT_ALL_TIMESHEETS,
  SELECT_TIMESHEETS_ITEM,
  SET_IS_TABLE_LOADING,
  SET_PAY_PERIOD_DETAILS,
  SET_SHOW_STP_VALIDATION_ERROR_MODAL,
  SET_STP_REGISTRATION_STATUS,
  SET_UNPROCESSED_TIMESHEET_LINES,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createStartPayRunDispatchers = (store) => ({
  ...createPayRunDispatchers(store),

  loadEmployeePays: (employeePays, isAllowNegativesInPayRuns) => {
    store.dispatch({
      intent: LOAD_EMPLOYEE_PAYS,
      employeePays,
      isAllowNegativesInPayRuns,
    });
  },

  setPayPeriodDetails: ({ key, value }) => {
    store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value });
  },

  editExistingPayRun: (draftPayRun, isAllowNegativesInPayRuns) => {
    store.dispatch({
      intent: EDIT_EXISTING_PAY_RUN,
      draftPayRun,
      isAllowNegativesInPayRuns,
    });
  },

  setShowStpValidationErrorModal: (showStpValidationErrorModal) => {
    store.dispatch({
      intent: SET_SHOW_STP_VALIDATION_ERROR_MODAL,
      showStpValidationErrorModal,
    });
  },

  setStpRegistrationStatus: (stpRegistrationStatus) => {
    store.dispatch({
      intent: SET_STP_REGISTRATION_STATUS,
      stpRegistrationStatus,
    });
  },

  setIsTableLoading: (isTableLoading) => {
    const intent = SET_IS_TABLE_LOADING;
    store.dispatch({ intent, isTableLoading });
  },

  selectAllTimesheets: (isSelected) => {
    store.dispatch({
      intent: SELECT_ALL_TIMESHEETS,
      isSelected,
    });
  },

  selectTimesheetsItem: (item, isSelected) => {
    store.dispatch({
      intent: SELECT_TIMESHEETS_ITEM,
      item,
      isSelected,
    });
  },

  setUnprocessedTimesheetLines: () => {
    store.dispatch({
      intent: SET_UNPROCESSED_TIMESHEET_LINES,
    });
  },
});

export default createStartPayRunDispatchers;
