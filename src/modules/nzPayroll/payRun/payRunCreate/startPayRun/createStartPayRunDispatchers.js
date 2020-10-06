import { LOAD_DRAFT_PAY_RUN, SET_PAY_PERIOD_DETAILS } from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createStartPayRunDispatchers = (store) => ({
  ...createPayRunDispatchers(store),

  setPayPeriodDetails: ({ key, value }) => {
    store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value });
  },

  loadDraftPayRun: (createdDraftPayRun) => {
    store.dispatch({ intent: LOAD_DRAFT_PAY_RUN, createdDraftPayRun });
  },
});

export default createStartPayRunDispatchers;
