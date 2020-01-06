import {
  GET_ACTIVITIES_LIST, SET_ACTIVE_STATE, SET_LOADING_STATE, UPDATE_ACTIVITY,
} from './ActivitiesIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isLoading: false,
  businessId: '',
  region: '',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setActiveState = (state, action) => ({
  ...state,
  isActive: action.isActive,
});

const setLoadingState = (state, action) => ({
  ...state,
  ...action.isLoading,
});

const loadActivities = (state, action) => ({
  ...state,
  activities: action.payload,
});

const updateActivity = (state, action) => {
  const { payload } = action;

  const activities = state.activities.map((activity) => {
    if (activity.id === payload.id) return { ...activity, ...payload };
    return activity;
  });

  return { ...state, activities };
};

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [GET_ACTIVITIES_LIST]: loadActivities,
  [SET_ACTIVE_STATE]: setActiveState,
  [UPDATE_ACTIVITY]: updateActivity,
};

const activitiesReducer = createReducer(getDefaultState(), handlers);

export default activitiesReducer;
