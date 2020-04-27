import {
  CLOSE_MODAL, DISMISS_ALERT, LOAD_EMPLOYEE_DETAIL, OPEN_MODAL, SET_ALERT,
  SET_LOADING_STATE, SET_MAIN_TAB, SET_SAVING_STATE,
  SET_SUBMITTING_STATE, SET_SUB_TAB, UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_FAILED,
} from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const createEmployeeDetailNzDispatcher = ({ store }) => ({

  setAlert: ({ type, message }) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = DISMISS_ALERT;
    store.dispatch({ intent });
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  loadEmployeeDetails: (response) => {
    const intent = LOAD_EMPLOYEE_DETAIL;
    store.dispatch({ intent, payload: response });
  },

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  updateEmployeeDetails: (response) => {
    const intent = UPDATE_EMPLOYEE;
    store.dispatch({ intent, ...response });
  },

  updateEmployeeFailed: (message) => {
    const intent = UPDATE_EMPLOYEE_FAILED;
    store.dispatch({ intent, message });
  },

  openModal: ({ type, url }) => {
    const intent = OPEN_MODAL;
    store.dispatch({ intent, modal: { type, url } });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({ intent });
  },

  setIsSubmitting: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  setSavingState: () => {
    const intent = SET_SAVING_STATE;
    store.dispatch({ intent });
  },

  setMainTab: (mainTab) => {
    const intent = SET_MAIN_TAB;
    store.dispatch({ intent, mainTab });
  },

  setSubTab: (mainTab, subTab) => store.dispatch({
    intent: SET_SUB_TAB,
    mainTab,
    subTab,
  }),
});

export default createEmployeeDetailNzDispatcher;
