import { SET_ACTIVE_STATE, SET_LOADING_STATE } from './ActivitiesIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';

const createActivitiesDispatcher = store => ({
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
  setActiveState: (isActive) => {
    store.dispatch({
      intent: SET_ACTIVE_STATE,
      isActive,
    });
  },
});

export default createActivitiesDispatcher;
