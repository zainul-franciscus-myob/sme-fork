import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ALERT,
  SET_DELETE_MODAL_OPEN_STATE,
  SET_EMPLOYEE_PAY_DETAIL,
  SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL,
  SET_LOADING_STATE,
} from './EmployeePayDetailIntents';

const createEmployeePayDetailDispatchers = store => ({
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

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setEmployeePayDetails: (response) => {
    store.dispatch({
      intent: SET_EMPLOYEE_PAY_DETAIL,
      response,
    });
  },

  setEmployeePayReversalPreviewDetails: (response) => {
    store.dispatch({
      intent: SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL,
      response,
    });
  },

  setAlertMessage: (alertMessage) => {
    store.dispatch({
      intent: SET_ALERT,
      message: alertMessage,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      message: '',
    });
  },

  openDeleteModal: () => {
    store.dispatch({
      intent: SET_DELETE_MODAL_OPEN_STATE,
      isOpen: true,
    });
  },

  closeDeleteModal: () => {
    store.dispatch({
      intent: SET_DELETE_MODAL_OPEN_STATE,
      isOpen: false,
    });
  },
});

export default createEmployeePayDetailDispatchers;
