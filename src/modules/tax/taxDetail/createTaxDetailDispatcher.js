import { LOAD_TAX_DETAIL, SET_LOADING_STATE } from '../TaxIntents';

const { RESET_STATE, SET_INITIAL_STATE } = require('../../../SystemIntents');

const createTaxDetailDispatcher = (store) => ({
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
  loadTaxDetail: (content) => {
    store.dispatch({
      intent: LOAD_TAX_DETAIL,
      content,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
});

export default createTaxDetailDispatcher;
