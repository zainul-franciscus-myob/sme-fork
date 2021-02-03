import {
  SET_INITIAL_STATE,
  SET_JOB_MAKER_INITIAL,
  SET_LOADING_STATE,
} from './JobMakerIntents';

const createJobMakerDispatcher = (store) => ({
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

  setInitialJobMaker: (response) => {
    store.dispatch({
      intent: SET_JOB_MAKER_INITIAL,
      response,
    });
  },
});

export default createJobMakerDispatcher;
