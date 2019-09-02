import {
  ADD_INVOICE_SERVICE_LINE,
  FORMAT_INVOICE_SERVICE_LINE,
  GET_CALCULATED_INVOICE_DETAIL_TOTALS,
  REMOVE_INVOICE_SERVICE_LINE,
  RESET_TOTALS,
  UPDATE_INVOICE_PAYMENT_AMOUNT,
  UPDATE_INVOICE_SERVICE_HEADER_OPTIONS,
  UPDATE_INVOICE_SERVICE_LINE,
} from './InvoiceServiceIntents';
import {
  LOAD_CONTACT_ADDRESS,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SET_ALERT,
  SET_MODAL_ALERT,
  SET_MODAL_TYPE,
  SET_SUBMITTING_STATE,
  UPDATE_EMAIL_INVOICE_DETAIL,
  UPDATE_INVOICE_ID_AFTER_CREATE,
} from '../../InvoiceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInvoiceServiceDispatcher = store => ({

  setInitialState: (context, payload, message) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      ...payload,
      message,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  resetTotals: () => {
    store.dispatch({
      intent: RESET_TOTALS,
    });
  },

  getCalculatedTotals: (totals) => {
    store.dispatch({
      intent: GET_CALCULATED_INVOICE_DETAIL_TOTALS,
      totals,
    });
  },

  setContactAddress: (address) => {
    store.dispatch({
      intent: LOAD_CONTACT_ADDRESS,
      address,
    });
  },

  updateHeaderOptions: (key, value) => {
    store.dispatch({
      intent: UPDATE_INVOICE_SERVICE_HEADER_OPTIONS,
      key,
      value,
    });
  },

  updateTableLine: (index, key, value) => {
    store.dispatch({
      intent: UPDATE_INVOICE_SERVICE_LINE,
      index,
      key,
      value,
    });
  },

  addTableLine: (line) => {
    store.dispatch({
      intent: ADD_INVOICE_SERVICE_LINE,
      line,
    });
  },

  formatLine: (index) => {
    store.dispatch({
      intent: FORMAT_INVOICE_SERVICE_LINE,
      index,
    });
  },

  removeTableLineAndCalculateTotals: (index) => {
    store.dispatch({
      intent: REMOVE_INVOICE_SERVICE_LINE,
      index,
    });
  },

  saveInvoiceIdForCreate: (invoiceId) => {
    store.dispatch({
      intent: UPDATE_INVOICE_ID_AFTER_CREATE,
      id: invoiceId,
    });
  },

  updateEmailInvoiceDetail: (key, value) => {
    store.dispatch({
      intent: UPDATE_EMAIL_INVOICE_DETAIL,
      key,
      value,
    });
  },

  resetEmailInvoiceDetail: () => {
    store.dispatch({
      intent: RESET_EMAIL_INVOICE_DETAIL,
    });
  },

  resetOpenSendEmailParam: () => {
    store.dispatch({
      intent: RESET_OPEN_SEND_EMAIL,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  setAlert: ({ type, message }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: { type, message },
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
    });
  },

  dismissModalAlert: () => {
    store.dispatch({
      intent: SET_MODAL_ALERT,
    });
  },

  setModalType: (modalType) => {
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  },

  updateAmountNewInvoicePaymentAmount: (amount) => {
    store.dispatch({
      intent: UPDATE_INVOICE_PAYMENT_AMOUNT,
      amount,
    });
  },
});

export default createInvoiceServiceDispatcher;
