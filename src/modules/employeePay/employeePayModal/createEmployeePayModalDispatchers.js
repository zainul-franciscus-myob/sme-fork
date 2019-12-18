import {
  LOAD_EMPLOYEE_PAY_MODAL,
  SET_DELETE_POPOVER_IS_OPEN,
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

  setIsModalLoading: (isLoading) => {
    store.dispatch({
      intent: SET_IS_MODAL_LOADING,
      isLoading,
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

  closeDeletePopover: () => {
    store.dispatch({
      intent: SET_DELETE_POPOVER_IS_OPEN,
      deletePopoverIsOpen: false,
    });
  },

  openDeletePopover: () => {
    store.dispatch({
      intent: SET_DELETE_POPOVER_IS_OPEN,
      deletePopoverIsOpen: true,
    });
  },
});

export default createEmployeePayModalDispatchers;
