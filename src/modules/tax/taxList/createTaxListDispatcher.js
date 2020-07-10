import { LOAD_TAX_LIST, SET_LOADING_STATE } from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createTaxListDispatcher = (store) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  loadTaxList: ({ entries }) => {
    store.dispatch({
      intent: LOAD_TAX_LIST,
      entries,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
});

export default createTaxListDispatcher;
