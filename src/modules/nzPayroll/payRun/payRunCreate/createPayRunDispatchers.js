import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_LOADING_STATE,
  START_NEW_PAY_RUN,
} from './PayRunIntents';

const createPayRunDispatchers = store => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  startNewPayRun: (response) => {
    const intent = START_NEW_PAY_RUN;
    store.dispatch({ intent, ...response });
  },
});

export default createPayRunDispatchers;
