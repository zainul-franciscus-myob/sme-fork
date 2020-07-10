import {
  CLOSE_MODAL,
  LOAD_INVOICE_LIST,
  LOAD_INVOICE_PAYMENT_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_CUSTOMER,
  UPDATE_INVOICE_PAYMENT_DETAILS,
  UPDATE_INVOICE_PAYMENT_ENTRIES,
  UPDATE_SHOW_PAID_INVOICES,
} from '../InvoicePaymentIntent';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInvoicePaymentDetailDispatcher = (store) => ({
  setInitialState: (context) =>
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    }),
  resetState: () =>
    store.dispatch({
      intent: RESET_STATE,
    }),
  setLoadingState: (loadingState) =>
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    }),
  setSubmittingState: (isSubmitting) =>
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    }),
  displayAlert: (alertMessage) =>
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage,
    }),
  dismissAlert: () =>
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    }),
  openModal: ({ type, url }) =>
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type,
        url,
      },
    }),
  closeModal: () =>
    store.dispatch({
      intent: CLOSE_MODAL,
    }),
  setTableLoadingState: (isTableLoading) =>
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    }),
  loadInvoicePayment: (response) =>
    store.dispatch({
      intent: LOAD_INVOICE_PAYMENT_DETAIL,
      ...response,
    }),
  updateInvoicePaymentDetails: ({ key, value }) =>
    store.dispatch({
      intent: UPDATE_INVOICE_PAYMENT_DETAILS,
      key,
      value,
    }),
  updateShowPaidInvoices: (value) =>
    store.dispatch({
      intent: UPDATE_SHOW_PAID_INVOICES,
      value,
    }),
  updateCustomer: (value) =>
    store.dispatch({
      intent: UPDATE_CUSTOMER,
      value,
    }),
  updateInvoicePaymentEntries: ({ name, value, index }) =>
    store.dispatch({
      intent: UPDATE_INVOICE_PAYMENT_ENTRIES,
      name,
      value,
      index,
    }),
  loadInvoiceList: (entries) =>
    store.dispatch({
      intent: LOAD_INVOICE_LIST,
      entries,
    }),
});

export default createInvoicePaymentDetailDispatcher;
