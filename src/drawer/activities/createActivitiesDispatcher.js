import {
  GET_ACTIVITIES_LIST, GET_ACTIVITIES_LIST_FAILURE, SET_ACTIVE_STATE, SET_LOADING_STATE,
} from './ActivitiesIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';

const createActivitiesDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },
  setActiveState: (isActive) => {
    store.dispatch({
      intent: SET_ACTIVE_STATE,
      isActive,
    });
  },
  loadActivities: (payload) => {
    store.dispatch({
      intent: GET_ACTIVITIES_LIST,
      payload,
    });
  },
  loadActivitiesFailure: () => {
    store.dispatch({
      intent: GET_ACTIVITIES_LIST_FAILURE,
    });
  },
});

export default createActivitiesDispatcher;
