import {
  CLOSE_INTRO_MODAL, OPEN_INTRO_MODAL, SET_ACTIVE_STATE, SET_LOADING_STATE,
} from './TasksIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  loadingState: LoadingState.LOADING,
  region: '',
  introModal: {
    isOpen: false,
  },
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

const setIntroModal = (state, { introModal }) => ({
  ...state,
  introModal: {
    ...state.introModal,
    ...introModal,
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ACTIVE_STATE]: setActiveState,
  [OPEN_INTRO_MODAL]: setIntroModal,
  [CLOSE_INTRO_MODAL]: setIntroModal,
};

const tasksReducer = createReducer(getDefaultState(), handlers);

export default tasksReducer;
