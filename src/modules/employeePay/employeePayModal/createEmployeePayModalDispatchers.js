import {
  LOAD_EMPLOYEE_PAY_MODAL,
  SEND_EMPLOYEE_PAY_REVERSAL_MODAL,
  SET_ALERT,
  SET_DELETE_POPOVER_IS_OPEN,
  SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL,
  SET_INITIAL_MODAL_STATE,
  SET_IS_MODAL_LOADING,
  SET_MODAL_IS_OPEN,
} from './EmployeePayModalIntents';
import { RESET_STATE } from '../../../SystemIntents';

const createEmployeePayModalDispatchers = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_MODAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setIsModalLoading: (loadingState) => {
    store.dispatch({
      intent: SET_IS_MODAL_LOADING,
      loadingState,
    });
  },

  setIsOpen: (isOpen) => {
    store.dispatch({
      intent: SET_MODAL_IS_OPEN,
      isOpen,
    });
  },

  setEmployeePayDetails: (response) => {
    store.dispatch({
      intent: LOAD_EMPLOYEE_PAY_MODAL,
      response,
    });
  },

  setEmployeePayReversalDetails: (response) => {
    store.dispatch({
      intent: SET_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL,
      response,
    });
  },

  sendReversalEmployeePay: (response) => {
    store.dispatch({
      intent: SEND_EMPLOYEE_PAY_REVERSAL_MODAL,
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

  openDeletePopover: () => {
    store.dispatch({
      intent: SET_DELETE_POPOVER_IS_OPEN,
      deletePopoverIsOpen: true,
    });
  },

  closeDeletePopover: () => {
    store.dispatch({
      intent: SET_DELETE_POPOVER_IS_OPEN,
      deletePopoverIsOpen: false,
    });
  },
});

export default createEmployeePayModalDispatchers;
