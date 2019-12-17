import {
  CLOSE_MODAL,
  LOAD_ACCOUNT_DETAIL,
  OPEN_MODAL,
  PAD_ACCOUNT_NUMBER,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_ACCOUNT_CATEGORY,
  UPDATE_ACCOUNT_DETAILS,
  UPDATE_ACCOUNT_NUMBER,
  UPDATE_BANKING_DETAILS,
  UPDATE_DETAIL_ACCOUNT_TYPE,
  UPDATE_HEADER_ACCOUNT_TYPE,
} from '../AccountIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';


const createAccountDetailDispatcher = store => ({
  updateAccountNumber: ({ key, value }) => {
    const intent = UPDATE_ACCOUNT_NUMBER;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  loadAccountDetail: (payload) => {
    const intent = LOAD_ACCOUNT_DETAIL;
    store.dispatch({
      intent,
      ...payload,
    });
  },

  padAccountNumberValue: ({ key, value }) => {
    const intent = PAD_ACCOUNT_NUMBER;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  updateAccountCategory: ({ key, value }) => {
    const intent = UPDATE_ACCOUNT_CATEGORY;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  updateAccountDetails: ({ key, value }) => {
    const intent = UPDATE_ACCOUNT_DETAILS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  updateBankDetails: ({ key, value }) => {
    const intent = UPDATE_BANKING_DETAILS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  onHeaderAccountTypeChange: ({ key, value }) => {
    const intent = UPDATE_HEADER_ACCOUNT_TYPE;

    store.dispatch({
      intent,
      key,
      value,
    });
  },

  onDetailAccountTypeChange: ({ key, value }) => {
    const intent = UPDATE_DETAIL_ACCOUNT_TYPE;

    store.dispatch({
      intent,
      key,
      value,
    });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;

    store.dispatch({
      intent,
      isLoading,
    });
  },
  openCancelModal: () => {
    const intent = OPEN_MODAL;
    store.dispatch({
      intent,
      modalType: 'cancel',
    });
  },
  openDeleteModal: () => {
    const intent = OPEN_MODAL;

    store.dispatch({
      intent,
      modalType: 'delete',
    });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;

    store.dispatch({ intent });
  },

  displayAlert: (errorMessage) => {
    store.dispatch({
      intent: SET_ALERT,
      alertMessage: errorMessage,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alertMessage: '',
    });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    store.dispatch({
      intent,
      isSubmitting,
    });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  resetState() {
    const intent = RESET_STATE;
    store.dispatch({
      intent,
    });
  },

});

export default createAccountDetailDispatcher;
