import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_MODAL_OPEN_STATE,
  UPDATE_LOGIN_INFO,
} from './StsLoginIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isOpen: false,
  isLoading: false,
  alert: '',
  email: '',
  password: '',
});

const resetState = () => ({
  ...getDefaultState(),
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...getDefaultState(),
  ...context,
});

const setModalIsOpen = (state, { isOpen }) => ({
  ...state,
  isOpen,
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const updateLoginInfo = (state, { input }) => ({
  ...state,
  [input.key]: input.value,
});

const setAlertMessage = (state, { message }) => ({
  ...state,
  alert: message,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_MODAL_OPEN_STATE]: setModalIsOpen,
  [SET_LOADING_STATE]: setLoadingState,
  [UPDATE_LOGIN_INFO]: updateLoginInfo,
  [SET_ALERT_MESSAGE]: setAlertMessage,
};

const employeePayModalReducer = createReducer(getDefaultState(), handlers);

export default employeePayModalReducer;
