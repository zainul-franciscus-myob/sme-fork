import { SET_INITIAL_STATE, SET_LOADING_STATE } from './JobMakerIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

export const getDefaultState = () => ({
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
};

const jobMakerReducer = createReducer(getDefaultState(), handlers);

export default jobMakerReducer;
