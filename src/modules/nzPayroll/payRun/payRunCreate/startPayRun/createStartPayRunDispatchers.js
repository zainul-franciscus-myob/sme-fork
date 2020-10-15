import {
  LOAD_DRAFT_PAY_RUN,
  SET_DRAFT_PAY_RUN_ID,
  SET_PAY_PERIOD_DETAILS,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createStartPayRunDispatchers = (store) => ({
  ...createPayRunDispatchers(store),

  setPayPeriodDetails: ({ key, value }) => {
    store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value });
  },

  loadDraftPayRun: (createdDraftPayRun) => {
    store.dispatch({ intent: LOAD_DRAFT_PAY_RUN, createdDraftPayRun });
    store.dispatch({ intent: SET_DRAFT_PAY_RUN_ID, createdDraftPayRun });
  },
});

export default createStartPayRunDispatchers;
