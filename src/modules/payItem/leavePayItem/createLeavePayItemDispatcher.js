import {
  ADD_EMPLOYEE,
  ADD_EXEMPTION,
  ADD_LINKED_WAGE,
  CLOSE_MODAL,
  LOAD_LEAVE_PAY_ITEM,
  OPEN_MODAL,
  REMOVE_EMPLOYEE,
  REMOVE_EXEMPTION,
  REMOVE_LINKED_WAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_CALCULATION_BASIS,
  UPDATE_NAME,
} from './LeavePayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createLeavePayItemDispatcher = (store) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setAlert: ({ type, message }) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: undefined });
  },

  openModal: (modalType) => {
    const intent = OPEN_MODAL;
    store.dispatch({ intent, modalType });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({ intent });
  },

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  loadLeavePayItem: (payload) => {
    const intent = LOAD_LEAVE_PAY_ITEM;
    store.dispatch({ intent, ...payload });
  },

  addEmployee: (employee) => {
    const intent = ADD_EMPLOYEE;
    store.dispatch({ intent, ...employee });
  },

  removeEmployee: (id) => {
    const intent = REMOVE_EMPLOYEE;
    store.dispatch({ intent, id });
  },

  addExemption: (exemption) => {
    const intent = ADD_EXEMPTION;
    store.dispatch({ intent, ...exemption });
  },

  removeExemption: (id) => {
    const intent = REMOVE_EXEMPTION;
    store.dispatch({ intent, id });
  },

  addLinkedWage: (linkedWage) => {
    const intent = ADD_LINKED_WAGE;
    store.dispatch({ intent, ...linkedWage });
  },

  removeLinkedWage: (id) => {
    const intent = REMOVE_LINKED_WAGE;
    store.dispatch({ intent, id });
  },

  updateCalculationBasis: ({ key, value }) => {
    const intent = UPDATE_CALCULATION_BASIS;
    store.dispatch({ intent, key, value });
  },

  updateName: ({ value }) => {
    const intent = UPDATE_NAME;
    store.dispatch({ intent, value });
  },
});

export default createLeavePayItemDispatcher;
