import {
  EDIT_EXISTING_PAY_RUN,
  LOAD_EMPLOYEE_PAYS,
  SET_PAY_PERIOD_DETAILS,
  SET_STP_REGISTRATION_STATUS,
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
});

export default createStartPayRunDispatchers;
