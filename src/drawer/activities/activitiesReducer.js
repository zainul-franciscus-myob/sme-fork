import { GET_ACTIVITIES_LIST, SET_ACTIVE_STATE, SET_LOADING_STATE } from './ActivitiesIntents';
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

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [GET_ACTIVITIES_LIST]: loadActivities,
  [SET_ACTIVE_STATE]: setActiveState,
};

const activitiesReducer = createReducer(getDefaultState(), handlers);

export default activitiesReducer;
