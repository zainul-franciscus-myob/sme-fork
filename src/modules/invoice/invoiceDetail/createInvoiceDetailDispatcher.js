import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_INVOICE_LINE,
  CALCULATE_LINES,
  CALCULATE_LINE_AMOUNTS,
  CONVERT_TO_PRE_CONVERSION_INVOICE,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CUSTOMER,
  LOAD_CUSTOMER_QUOTES,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_PAY_DIRECT,
  RELOAD_INVOICE_DETAIL,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_INVOICE_LINE,
  RESET_CUSTOMER,
  RESET_CUSTOMER_QUOTE,
  RESET_EMAIL_INVOICE_DETAIL,
  SAVE_EMAIL_SETTINGS,
  SELECT_CUSTOMER_QUOTE,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_CUSTOMER_QUOTES_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_INVOICE_HISTORY_CLOSED,
  SET_INVOICE_HISTORY_LOADING,
  SET_INVOICE_HISTORY_OPEN,
  SET_INVOICE_HISTORY_UNAVAILABLE,
  SET_INVOICE_ITEM_LINE_DIRTY,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_REDIRECT_STATE,
  SET_SHOW_PRE_CONVERSION_ALERT,
  SET_SUBMITTING_STATE,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_INVOICE_DETAIL,
  UPDATE_EXPORT_PDF_DETAIL,
  UPDATE_INVOICE_DETAIL_HEADER_OPTIONS,
  UPDATE_INVOICE_ID_AFTER_CREATE,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
  UPDATE_INVOICE_PAYMENT_AMOUNT,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../InvoiceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInvoiceDetailDispatcher = (store) => ({
  setInitialState: (context) =>
    store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setLoadingState: (loadingState) =>
    store.dispatch({ intent: SET_LOADING_STATE, loadingState }),

  setSubmittingState: (isSubmitting) =>
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    }),

  loadAccountAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      ...payload,
    }),

  setAlert: ({ type, message }) =>
    store.dispatch({ intent: SET_ALERT, alert: { type, message } }),

  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),

  setModalType: (modalType) =>
    store.dispatch({ intent: SET_MODAL_TYPE, modalType }),

  setModalSubmittingState: (isModalSubmitting) =>
    store.dispatch({
      intent: SET_MODAL_SUBMITTING_STATE,
      isModalSubmitting,
    }),

  dismissModalAlert: () => store.dispatch({ intent: SET_MODAL_ALERT }),

  displayModalAlert: ({ type, message }) =>
    store.dispatch({
      intent: SET_MODAL_ALERT,
      modalAlert: { type, message },
    }),

  showUpgradeModal: (monthlyLimit) => {
    store.dispatch({
      intent: SET_UPGRADE_MODAL_SHOWING,
      isUpgradeModalShowing: true,
      monthlyLimit,
    });
  },

  hideUpgradeModal: () => {
    store.dispatch({
      intent: SET_UPGRADE_MODAL_SHOWING,
      isUpgradeModalShowing: false,
    });
  },

  loadInvoice: (payload) =>
    store.dispatch({ intent: LOAD_INVOICE_DETAIL, ...payload }),

  reloadInvoice: (payload) =>
    store.dispatch({ intent: RELOAD_INVOICE_DETAIL, ...payload }),

  loadCustomer: (payload) =>
    store.dispatch({ intent: LOAD_CUSTOMER, ...payload }),

  loadPayDirect: (payDirect) =>
    store.dispatch({ intent: LOAD_PAY_DIRECT, payDirect }),

  setPayDirectLoadingState: (isLoading) =>
    store.dispatch({
      intent: SET_PAY_DIRECT_LOADING_STATE,
      isLoading,
    }),

  updateInvoiceIdAfterCreate: (invoiceId) =>
    store.dispatch({
      intent: UPDATE_INVOICE_ID_AFTER_CREATE,
      invoiceId,
    }),

  setDuplicateId: (duplicateId) =>
    store.dispatch({
      intent: SET_DUPLICATE_ID,
      duplicateId,
    }),

  updateHeaderOptions: (key, value) =>
    store.dispatch({
      intent: UPDATE_INVOICE_DETAIL_HEADER_OPTIONS,
      key,
      value,
    }),

  updateInvoicePaymentAmount: (amountPaid) =>
    store.dispatch({
      intent: UPDATE_INVOICE_PAYMENT_AMOUNT,
      amountPaid,
    }),

  addInvoiceLine: () => store.dispatch({ intent: ADD_INVOICE_LINE }),

  removeInvoiceLine: (index) =>
    store.dispatch({ intent: REMOVE_INVOICE_LINE, index }),

  updateInvoiceLine: (index, key, value) =>
    store.dispatch({
      intent: UPDATE_INVOICE_LINE,
      index,
      key,
      value,
    }),

  setInvoiceItemLineDirty: (isLineAmountDirty) =>
    store.dispatch({
      intent: SET_INVOICE_ITEM_LINE_DIRTY,
      isLineAmountDirty,
    }),

  calculateLineAmounts: ({ key, index }) => {
    store.dispatch({
      intent: CALCULATE_LINE_AMOUNTS,
      key,
      index,
    });
  },

  calculateLines: (taxCalculations, isSwitchingTaxInclusive = false) =>
    store.dispatch({
      intent: CALCULATE_LINES,
      taxCalculations,
      isSwitchingTaxInclusive,
    }),

  saveEmailSettings: () =>
    store.dispatch({
      intent: SAVE_EMAIL_SETTINGS,
    }),

  updateEmailInvoiceDetail: (key, value) =>
    store.dispatch({
      intent: UPDATE_EMAIL_INVOICE_DETAIL,
      key,
      value,
    }),

  resetEmailInvoiceDetail: () =>
    store.dispatch({ intent: RESET_EMAIL_INVOICE_DETAIL }),

  addEmailAttachments: (files) => {
    const intent = ADD_EMAIL_ATTACHMENTS;
    store.dispatch({ intent, files });
  },

  uploadEmailAttachment: ({ response, file }) => {
    const intent = UPLOAD_EMAIL_ATTACHMENT;
    store.dispatch({ intent, ...response, file });
  },

  uploadEmailAttachmentFailed: ({ message, file }) => {
    const intent = UPLOAD_EMAIL_ATTACHMENT_FAILED;
    store.dispatch({ intent, message, file });
  },

  updateEmailAttachmentUploadProgress: ({ uploadProgress, file }) => {
    const intent = UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS;
    store.dispatch({ intent, uploadProgress, file });
  },

  removeEmailAttachment: (index) => {
    const intent = REMOVE_EMAIL_ATTACHMENT;
    store.dispatch({ intent, index });
  },

  updateExportPdfDetail: ({ key, value }) =>
    store.dispatch({
      intent: UPDATE_EXPORT_PDF_DETAIL,
      key,
      value,
    }),

  updateInvoiceLayout: (layout) => {
    store.dispatch({
      intent: UPDATE_INVOICE_LAYOUT,
      layout,
    });
  },

  setInvoiceHistoryLoading: () =>
    store.dispatch({
      intent: SET_INVOICE_HISTORY_LOADING,
    }),

  loadInvoiceHistory: (invoiceHistory) =>
    store.dispatch({
      intent: LOAD_INVOICE_HISTORY,
      invoiceHistory,
    }),

  setInvoiceHistoryUnavailable: () =>
    store.dispatch({
      intent: SET_INVOICE_HISTORY_UNAVAILABLE,
    }),

  setInvoiceHistoryClosed: () =>
    store.dispatch({
      intent: SET_INVOICE_HISTORY_CLOSED,
    }),

  setInvoiceHistoryOpen: () =>
    store.dispatch({
      intent: SET_INVOICE_HISTORY_OPEN,
    }),

  setRedirectState: ({ redirectUrl, isOpenInNewTab }) =>
    store.dispatch({
      intent: SET_REDIRECT_STATE,
      redirectUrl,
      isOpenInNewTab,
    }),

  loadItemSellingDetails: ({ index, itemSellingDetails }) =>
    store.dispatch({
      intent: LOAD_ITEM_SELLING_DETAILS,
      index,
      itemSellingDetails,
    }),

  convertToPreConversionInvoice: () =>
    store.dispatch({
      intent: CONVERT_TO_PRE_CONVERSION_INVOICE,
    }),

  setShowPreConversionAlert: (showPreConversionAlert) =>
    store.dispatch({
      intent: SET_SHOW_PRE_CONVERSION_ALERT,
      showPreConversionAlert,
    }),

  setAbnLoadingState: (isAbnLoading) => {
    store.dispatch({
      intent: SET_ABN_LOADING_STATE,
      isAbnLoading,
    });
  },

  loadAbn: (abn) => {
    store.dispatch({
      intent: LOAD_ABN_FROM_CUSTOMER,
      abn,
    });
  },

  loadCustomerQuotes: (customerQuotes) => {
    store.dispatch({
      intent: LOAD_CUSTOMER_QUOTES,
      customerQuotes,
    });
  },

  setCustomerQuotesLoadingState: (isLoadingCustomerQuotes) => {
    store.dispatch({
      intent: SET_CUSTOMER_QUOTES_LOADING_STATE,
      isLoadingCustomerQuotes,
    });
  },

  resetCustomer: () => {
    store.dispatch({ intent: RESET_CUSTOMER });
  },

  selectCustomerQuote: (quoteId) => {
    store.dispatch({ intent: SELECT_CUSTOMER_QUOTE, quoteId });
  },

  resetCustomerQuote: () => {
    store.dispatch({ intent: RESET_CUSTOMER_QUOTE });
  },
});

export default createInvoiceDetailDispatcher;
