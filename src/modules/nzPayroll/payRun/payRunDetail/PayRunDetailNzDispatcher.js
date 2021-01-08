import {
  LOAD_PAY_RUN_DETAILS,
  SET_LOADING_STATE,
} from './payRunDetailNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const PayRunDetailNzDispatcher = ({ store }) => ({
  unsubscribeFromStore: () => {
    store.unsubscribeAll();
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent,
      context,
    });
  },

  loadPayRunDetail: (response) => {
    const intent = LOAD_PAY_RUN_DETAILS;
    store.dispatch({
      intent,
      response,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  resetState() {
    const intent = RESET_STATE;
    store.dispatch({
      intent,
    });
  },
});

export default PayRunDetailNzDispatcher;
