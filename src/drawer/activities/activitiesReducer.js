import { SET_ACTIVE_STATE, SET_LOADING_STATE } from './ActivitiesIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  activities: [],
  businessId: '',
  loadingState: LoadingState.LOADING,
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

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ACTIVE_STATE]: setActiveState,
};

const activitiesReducer = createReducer(getDefaultState(), handlers);

export default activitiesReducer;
