import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_LOADING_STATE, SET_MODAL_STATE } from './stpGetStartedIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING_SUCCESS,
  isModalOpen: false,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setModalState = (state, { isModalOpen }) => ({
  ...state,
  isModalOpen,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_MODAL_STATE]: setModalState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
};

const stpGetStartedReducer = createReducer(getDefaultState(), handlers);

export default stpGetStartedReducer;
