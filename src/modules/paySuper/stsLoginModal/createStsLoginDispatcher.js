import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_MODAL_OPEN_STATE,
  UPDATE_LOGIN_INFO,
} from './StsLoginIntents';

const createStsLoginDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setIsModalLoading: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  openModal: () => {
    store.dispatch({
      intent: SET_MODAL_OPEN_STATE,
      isOpen: true,
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: SET_MODAL_OPEN_STATE,
      isOpen: false,
    });
  },

  updateLoginInfo: (input) => {
    store.dispatch({
      intent: UPDATE_LOGIN_INFO,
      input,
    });
  },

  clearPassword: () => {
    store.dispatch({
      intent: UPDATE_LOGIN_INFO,
      input: { key: 'password', value: '' },
    });
  },

  setAlert: (message) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      message,
    });
  },

  clearAlert: () => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      message: '',
    });
  },
});

export default createStsLoginDispatcher;
