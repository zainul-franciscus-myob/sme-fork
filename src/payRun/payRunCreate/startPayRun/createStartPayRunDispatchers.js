import { LOAD_EMPLOYEE_PAYS, SET_PAY_PERIOD_DETAILS } from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createStartPayRunDispatchers = store => ({
  ...createPayRunDispatchers(store),
  loadEmployeePays: (employeePays) => {
    const intent = LOAD_EMPLOYEE_PAYS;
    store.dispatch({ intent, employeePays });
  },

  setPayPeriodDetails: ({ key, value }) => {
    const intent = SET_PAY_PERIOD_DETAILS;
    store.dispatch({ intent, key, value });
  },
});

export default createStartPayRunDispatchers;
