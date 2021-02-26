import {
  CLOSE_DELETE_MODAL,
  DELETE_EMPLOYEE_PAY_DETAIL_FAILED,
  DISMISS_ALERT,
  OPEN_DELETE_MODAL,
  SET_EMPLOYEE_PAY_DETAIL,
  SET_LOADING_STATE,
} from './EmployeePayDetailIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const createEmployeePayDetailDispatchers = (store) => ({
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

  displayDeleteConfirmationModal: () => {
    store.dispatch({
      intent: OPEN_DELETE_MODAL,
    });
  },

  closeDeleteConfirmationModal: () => {
    store.dispatch({
      intent: CLOSE_DELETE_MODAL,
    });
  },

  deleteEmployeeFailed: (message) => {
    store.dispatch({
      intent: DELETE_EMPLOYEE_PAY_DETAIL_FAILED,
      message,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: DISMISS_ALERT,
    });
  },
});

export default createEmployeePayDetailDispatchers;
