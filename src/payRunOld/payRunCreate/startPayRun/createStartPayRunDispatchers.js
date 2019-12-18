import { LOAD_EMPLOYEE_PAYS, SET_PAY_PERIOD_DETAILS } from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createStartPayRunDispatchers = store => ({
  ...createPayRunDispatchers(store),

  loadEmployeePays: (employeePays) => {
    store.dispatch({ intent: LOAD_EMPLOYEE_PAYS, employeePays });
  },

  setPayPeriodDetails: ({ key, value }) => {
    store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value });
  },
});

export default createStartPayRunDispatchers;
