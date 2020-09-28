import * as intents from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import ModalTypes from './ModalTypes';

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

  loadingEmployeeDetails: () => {
    const intent = intents.LOADING_EMPLOYEE_DETAIL;
    store.dispatch({ intent });
  },

  loadEmployeeDetailsFailed: () => {
    const intent = intents.LOAD_EMPLOYEE_DETAIL_FAILED;
    store.dispatch({ intent });
  },

  updateEmployeeDetails: (response) => {
    const intent = intents.UPDATE_EMPLOYEE;
    store.dispatch({ intent, ...response });
  },

  updateEmployeeFailed: (message) => {
    const intent = intents.UPDATE_EMPLOYEE_FAILED;
    store.dispatch({ intent, message });
  },

  openUnsavedModal: (url) => {
    const intent = intents.OPEN_UNSAVED_MODAL;
    store.dispatch({ intent, modal: { type: ModalTypes.UNSAVED, url } });
  },

  openDeleteModal: (url) => {
    const intent = intents.OPEN_DELETE_MODAL;
    store.dispatch({ intent, modal: { type: ModalTypes.DELETE, url } });
  },

  closeModal: () => {
    const intent = intents.CLOSE_MODAL;
    store.dispatch({ intent });
  },

  deletingEmployee: () => {
    const intent = intents.DELETING_EMPLOYEE;
    store.dispatch({ intent });
  },

  deleteEmployeeFailed: (message) => {
    const intent = intents.DELETE_EMPLOYEE_FAILED;
    store.dispatch({ intent, message });
  },

  updatingEmployeeDetail: () => {
    const intent = intents.UPDATING_EMPLOYEE;
    store.dispatch({ intent });
  },

  setMainTab: (mainTab) => {
    const intent = intents.SET_MAIN_TAB;
    store.dispatch({ intent, mainTab });
  },

  setSubTab: (mainTab, subTab) =>
    store.dispatch({
      intent: intents.SET_SUB_TAB,
      mainTab,
      subTab,
    }),
});

export default employeeDetailNzDispatcher;
