import {
  SET_PAY_PERIOD_DETAILS,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createStartPayRunDispatchers = store => ({
  ...createPayRunDispatchers(store),

  setPayPeriodDetails: ({ key, value }) => {
    store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value });
  },

});

export default createStartPayRunDispatchers;
