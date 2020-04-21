import {
  SET_JOB_KEEPER_INITIAL,
  SET_LOADING_STATE,
} from './JobKeeperIntents';

const createJobKeeperDispatcher = store => ({
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setInitialJobKeeper: (response) => {
    store.dispatch({
      intent: SET_JOB_KEEPER_INITIAL,
      response,
    });
  },

});

export default createJobKeeperDispatcher;
