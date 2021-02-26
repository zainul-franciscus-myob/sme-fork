import {
  CLOSE_MODAL,
  LOAD_TAX_COMBINE,
  OPEN_MODAL,
  SET_ALERT,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  UPDATE_COMBINE_FIELD,
} from '../TaxIntents';

const { RESET_STATE, SET_INITIAL_STATE } = require('../../../SystemIntents');

const createTaxCombineDispatcher = (store) => ({
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
  loadTaxCombine: (content) => {
    store.dispatch({
      intent: LOAD_TAX_COMBINE,
      content,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  setIsSubmitting: (isSubmitting) => {
    store.dispatch({
      intent: SET_IS_SUBMITTING,
      isSubmitting,
    });
  },
  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },
  dismissAlert: () =>
    store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    }),
  openModal: () => {
    store.dispatch({ intent: OPEN_MODAL });
  },
  closeModal: () => {
    store.dispatch({ intent: CLOSE_MODAL });
  },
  updateCombineField: (key, value) => {
    store.dispatch({
      intent: UPDATE_COMBINE_FIELD,
      key,
      value,
    });
  },
});

export default createTaxCombineDispatcher;
