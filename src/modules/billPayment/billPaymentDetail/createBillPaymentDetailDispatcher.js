import {
  CHANGE_BANK_STATEMENT_TEXT,
  CHANGE_REFERENCE_ID,
  CLOSE_MODAL,
  LOAD_BILL_LIST,
  LOAD_SUPPLIER_STATEMENT_TEXT,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERENCE_ID,
  UPDATE_TABLE_INPUT_FIELD,
} from '../BillPaymentIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getLoadBillPaymentIntent } from './BillPaymentDetailSelectors';

const createBillPaymentDetailDispatcher = (store) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },
  openModal: (modalType) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType,
    });
  },
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },
  updateHeaderOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_HEADER_OPTION,
      key,
      value,
    });
  },
  changeBankStatementText: (bankStatementText) => {
    store.dispatch({
      intent: CHANGE_BANK_STATEMENT_TEXT,
      bankStatementText,
    });
  },
  updateBankStatementText: (bankStatementText) => {
    store.dispatch({
      intent: UPDATE_BANK_STATEMENT_TEXT,
      bankStatementText,
    });
  },
  setAlertMessage: (alertMessage) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage,
    });
  },
  changeReferenceId: ({ value }) => {
    store.dispatch({
      intent: CHANGE_REFERENCE_ID,
      referenceId: value,
    });
  },
  updateReferenceId: (referenceId) => {
    store.dispatch({
      intent: UPDATE_REFERENCE_ID,
      referenceId,
    });
  },
  loadSupplierStatementText: (supplierStatementText) => {
    store.dispatch({
      intent: LOAD_SUPPLIER_STATEMENT_TEXT,
      supplierStatementText,
    });
  },
  loadBillList: ({ entries }) => {
    store.dispatch({
      intent: LOAD_BILL_LIST,
      entries,
    });
  },
  updateTableInputField: ({ key, value, index }) => {
    store.dispatch({
      intent: UPDATE_TABLE_INPUT_FIELD,
      key,
      value,
      index,
    });
  },
  loadBillPayment: (response) => {
    const state = store.getState();
    store.dispatch({
      intent: getLoadBillPaymentIntent(state),
      ...response,
    });
  },
  setRedirectUrl: (redirectUrl) => {
    store.dispatch({
      intent: SET_REDIRECT_URL,
      redirectUrl,
    });
  },
});

export default createBillPaymentDetailDispatcher;
