import * as intents from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const employeeDetailNzDispatcher = ({ store }) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setAlert: ({ type, message }) => {
    const intent = intents.SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = intents.DISMISS_ALERT;
    store.dispatch({ intent });
  },

  loadEmployeeDetails: (response) => {
    const intent = intents.LOAD_EMPLOYEE_DETAIL;
    store.dispatch({ intent, payload: response });
  },

  setLoadingState: (loadingState) => {
    const intent = intents.SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  updateEmployeeDetails: (response) => {
    const intent = intents.UPDATE_EMPLOYEE;
    store.dispatch({ intent, ...response });
  },

  updateEmployeeFailed: (message) => {
    const intent = intents.UPDATE_EMPLOYEE_FAILED;
    store.dispatch({ intent, message });
  },

  openModal: ({ type, url }) => {
    const intent = intents.OPEN_MODAL;
    store.dispatch({ intent, modal: { type, url } });
  },

  closeModal: () => {
    const intent = intents.CLOSE_MODAL;
    store.dispatch({ intent });
  },

  setIsSubmitting: (isSubmitting) => {
    const intent = intents.SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  setSavingState: () => {
    const intent = intents.SET_SAVING_STATE;
    store.dispatch({ intent });
  },

  setMainTab: (mainTab) => {
    const intent = intents.SET_MAIN_TAB;
    store.dispatch({ intent, mainTab });
  },

  setSubTab: (mainTab, subTab) => store.dispatch({
    intent: intents.SET_SUB_TAB,
    mainTab,
    subTab,
  }),
});

export default employeeDetailNzDispatcher;
