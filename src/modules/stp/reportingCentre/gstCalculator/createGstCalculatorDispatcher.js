import {
  SET_DIRTY_FLAG,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_TURNOVER_RESULT,
  UPDATE_FORM,
} from './GstCalculatorIntents';

const createGstCalculatorDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setDirtyFlag: () => {
    store.dispatch({
      intent: SET_DIRTY_FLAG,
    });
  },

  updateFormData: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FORM,
      key,
      value,
    });
  },

  setTurnoverResult: (response) => {
    store.dispatch({
      intent: SET_TURNOVER_RESULT,
      response,
    });
  },
});

export default createGstCalculatorDispatcher;
