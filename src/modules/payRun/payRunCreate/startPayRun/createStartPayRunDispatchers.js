import {
  EDIT_EXISTING_PAY_RUN,
  LOAD_EMPLOYEE_PAYS,
  SELECT_ALL_TIMESHEETS,
  SELECT_TIMESHEETS_ITEM,
  SET_PAY_PERIOD_DETAILS,
  SET_STP_REGISTRATION_STATUS,
  SET_UNPROCESSED_TIMESHEET_LINES,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createStartPayRunDispatchers = store => ({
  ...createPayRunDispatchers(store),

  loadEmployeePays: (employeePays) => {
    store.dispatch({ intent: LOAD_EMPLOYEE_PAYS, employeePays });
  },

  setPayPeriodDetails: ({ key, value }) => {
    store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value });
  },

  editExistingPayRun: (draftPayRun) => {
    store.dispatch({ intent: EDIT_EXISTING_PAY_RUN, draftPayRun });
  },

  setStpRegistrationStatus: (stpRegistrationStatus) => {
    store.dispatch({
      intent: SET_STP_REGISTRATION_STATUS,
      stpRegistrationStatus,
    });
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
