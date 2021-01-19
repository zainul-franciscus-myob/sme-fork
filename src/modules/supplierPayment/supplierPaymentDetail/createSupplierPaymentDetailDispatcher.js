import {
  CHANGE_BANK_STATEMENT_TEXT,
  CHANGE_REFERENCE_ID,
  CLOSE_MODAL,
  LOAD_PURCHASE_LIST,
  LOAD_SUPPLIER_PURCHASE_LIST,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_IS_SUPPLIER_LOADING,
  SET_IS_TABLE_LOADING,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERENCE_ID,
  UPDATE_REMITTANCE_ADVICE_DETAILS,
  UPDATE_REMITTANCE_ADVICE_TYPE,
  UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
  UPDATE_SUPPLIER_PAYMENT_ID,
  UPDATE_TABLE_INPUT_FIELD,
} from '../SupplierPaymentIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getLoadSupplierPaymentIntent } from './SupplierPaymentDetailSelectors';

const createSupplierPaymentDetailDispatcher = (store) => ({
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
  setIsSupplierLoading: (isSupplierLoading) => {
    store.dispatch({
      intent: SET_IS_SUPPLIER_LOADING,
      isSupplierLoading,
    });
  },
  setIsTableLoading: (isTableLoading) => {
    store.dispatch({
      intent: SET_IS_TABLE_LOADING,
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
  updateRemittanceAdviceDetails: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_REMITTANCE_ADVICE_DETAILS,
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
  setAlertMessage: ({ message, type }) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      message,
      type,
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
  updateSupplierPaymentId: (supplierPaymentId) => {
    store.dispatch({
      intent: UPDATE_SUPPLIER_PAYMENT_ID,
      supplierPaymentId,
    });
  },
  updateShouldSendRemittanceAdvice: ({ value }) => {
    store.dispatch({
      intent: UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
      shouldSendRemittanceAdvice: value,
    });
  },
  updateRemittanceAdviceType: ({ value }) => {
    store.dispatch({
      intent: UPDATE_REMITTANCE_ADVICE_TYPE,
      remittanceAdviceType: value,
    });
  },
  loadSupplierPurchaseList: ({
    supplierStatementText,
    arePaymentDetailsComplete,
    entries,
  }) => {
    store.dispatch({
      intent: LOAD_SUPPLIER_PURCHASE_LIST,
      supplierStatementText,
      arePaymentDetailsComplete,
      entries,
    });
  },
  loadPurchaseList: ({ entries }) => {
    store.dispatch({
      intent: LOAD_PURCHASE_LIST,
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
  loadSupplierPayment: (response) => {
    const state = store.getState();
    store.dispatch({
      intent: getLoadSupplierPaymentIntent(state),
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

export default createSupplierPaymentDetailDispatcher;
