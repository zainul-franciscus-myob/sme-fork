import {
  ADD_INVOICE_LINE,
  CALCULATE_INVOICE_LINES,
  CALCULATE_INVOICE_LINE_AMOUNTS,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CUSTOMER,
  LOAD_ITEM,
  LOAD_PAY_DIRECT,
  LOAD_RECURRING_INVOICE,
  RELOAD_RECURRING_INVOICE,
  REMOVE_INVOICE_LINE,
  RESET_CUSTOMER,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_INVOICE_ITEM_LINE_DIRTY,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_REDIRECT_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_INVOICE_HEADER_OPTIONS,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
  UPDATE_RECURRING_INVOICE_ID_AFTER_CREATE,
  UPDATE_SCHEDULE_OPTIONS,
} from './RecurringInvoiceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createRecurringInvoiceDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },

  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({ intent: SET_LOADING_STATE, loadingState });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({ intent: SET_SUBMITTING_STATE, isSubmitting });
  },

  setAlert: ({ type, message }) => {
    store.dispatch({ intent: SET_ALERT, alert: { type, message } });
  },

  dismissAlert: () => {
    store.dispatch({ intent: SET_ALERT });
  },

  setModalType: (modalType) => {
    store.dispatch({ intent: SET_MODAL_TYPE, modalType });
  },

  setRedirectState: ({ redirectUrl, isOpenInNewTab }) => {
    store.dispatch({ intent: SET_REDIRECT_STATE, redirectUrl, isOpenInNewTab });
  },

  loadRecurringInvoice: (payload) => {
    store.dispatch({ intent: LOAD_RECURRING_INVOICE, ...payload });
  },

  reloadRecurringInvoice: (payload) => {
    store.dispatch({ intent: RELOAD_RECURRING_INVOICE, ...payload });
  },

  updateInvoiceIdAfterCreate: (recurringTransactionId) => {
    store.dispatch({
      intent: UPDATE_RECURRING_INVOICE_ID_AFTER_CREATE,
      recurringTransactionId,
    });
  },

  updateScheduleOptions: ({ key, value }) => {
    store.dispatch({ intent: UPDATE_SCHEDULE_OPTIONS, key, value });
  },

  updateInvoiceHeaderOptions: (key, value) => {
    store.dispatch({ intent: UPDATE_INVOICE_HEADER_OPTIONS, key, value });
  },

  updateInvoiceLayout: (layout) => {
    store.dispatch({ intent: UPDATE_INVOICE_LAYOUT, layout });
  },

  addInvoiceLine: () => {
    store.dispatch({ intent: ADD_INVOICE_LINE });
  },

  removeInvoiceLine: (index) => {
    store.dispatch({ intent: REMOVE_INVOICE_LINE, index });
  },

  updateInvoiceLine: (index, key, value) => {
    store.dispatch({ intent: UPDATE_INVOICE_LINE, index, key, value });
  },

  calculateInvoiceLines: (taxCalculations, isSwitchingTaxInclusive = false) => {
    store.dispatch({
      intent: CALCULATE_INVOICE_LINES,
      taxCalculations,
      isSwitchingTaxInclusive,
    });
  },

  calculateLineAmounts: ({ key, index }) => {
    store.dispatch({ intent: CALCULATE_INVOICE_LINE_AMOUNTS, key, index });
  },

  setInvoiceItemLineDirty: (isLineAmountDirty) => {
    store.dispatch({ intent: SET_INVOICE_ITEM_LINE_DIRTY, isLineAmountDirty });
  },

  loadItem: ({ index, item }) => {
    store.dispatch({ intent: LOAD_ITEM, index, item });
  },

  loadAccountAfterCreate: (payload) => {
    store.dispatch({ intent: LOAD_ACCOUNT_AFTER_CREATE, ...payload });
  },

  loadCustomer: (payload) => {
    store.dispatch({ intent: LOAD_CUSTOMER, ...payload });
  },

  resetCustomer: () => {
    store.dispatch({ intent: RESET_CUSTOMER });
  },

  loadAbn: (abn) => {
    store.dispatch({ intent: LOAD_ABN_FROM_CUSTOMER, abn });
  },

  setAbnLoadingState: (isAbnLoading) => {
    store.dispatch({ intent: SET_ABN_LOADING_STATE, isAbnLoading });
  },

  loadPayDirect: (payDirect) => {
    store.dispatch({ intent: LOAD_PAY_DIRECT, payDirect });
  },

  setPayDirectLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_PAY_DIRECT_LOADING_STATE,
      isLoading,
    });
  },
});

export default createRecurringInvoiceDispatcher;
