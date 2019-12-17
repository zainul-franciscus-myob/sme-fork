import {
  ADD_SUPER_PAY_ITEM_EMPLOYEE,
  ADD_SUPER_PAY_ITEM_EXEMPTION,
  CLOSE_MODAL,
  LOAD_SUPER_PAY_ITEM,
  OPEN_MODAL,
  REMOVE_SUPER_PAY_ITEM_EMPLOYEE,
  REMOVE_SUPER_PAY_ITEM_EXEMPTION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_SUPER_PAY_ITEM,
  SET_SUPER_PAY_ITEM_DETAIL,
} from './SuperPayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createSuperPayItemDispatcher = store => ({
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

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  loadSuperPayItem: (response) => {
    const intent = LOAD_SUPER_PAY_ITEM;
    store.dispatch({ intent, ...response });
  },

  setSuperPayItem: (superPayItem) => {
    const intent = SET_SUPER_PAY_ITEM;
    store.dispatch({ intent, superPayItem });
  },

  setSuperPayItemDetail: ({ key, value }) => {
    const intent = SET_SUPER_PAY_ITEM_DETAIL;
    store.dispatch({ intent, key, value });
  },

  addSuperPayItemEmployee: (employee) => {
    const intent = ADD_SUPER_PAY_ITEM_EMPLOYEE;
    store.dispatch({ intent, ...employee });
  },

  removeSuperPayItemEmployee: (id) => {
    const intent = REMOVE_SUPER_PAY_ITEM_EMPLOYEE;
    store.dispatch({ intent, id });
  },

  addSuperPayItemExemption: (exemption) => {
    const intent = ADD_SUPER_PAY_ITEM_EXEMPTION;
    store.dispatch({ intent, ...exemption });
  },

  removeSuperPayItemExemption: (id) => {
    const intent = REMOVE_SUPER_PAY_ITEM_EXEMPTION;
    store.dispatch({ intent, id });
  },
});

export default createSuperPayItemDispatcher;
