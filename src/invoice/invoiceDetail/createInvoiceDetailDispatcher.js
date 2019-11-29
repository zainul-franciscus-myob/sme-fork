import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_INVOICE_LINE,
  CALCULATE_LINE_TOTALS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_INVOICE_DETAIL,
  LOAD_ITEM_OPTION,
  LOAD_PAY_DIRECT,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_INVOICE_LINE,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  RESET_TOTALS,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_INVOICE_ITEM_LINE_DIRTY,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_SUBMITTING_STATE,
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
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createInvoiceDetailDispatcher = store => ({
  setInitialState: context => store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setLoadingState: isLoading => store.dispatch({ intent: SET_LOADING_STATE, isLoading }),

  setSubmittingState: isSubmitting => store.dispatch({
    intent: SET_SUBMITTING_STATE, isSubmitting,
  }),

  loadAccountAfterCreate: payload => store.dispatch({
    intent: LOAD_ACCOUNT_AFTER_CREATE, ...payload,
  }),

  setAlert: ({ type, message }) => store.dispatch({ intent: SET_ALERT, alert: { type, message } }),

  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),

  setModalType: modalType => store.dispatch({ intent: SET_MODAL_TYPE, modalType }),

  setModalSubmittingState: isModalSubmitting => store.dispatch({
    intent: SET_MODAL_SUBMITTING_STATE, isModalSubmitting,
  }),

  dismissModalAlert: () => store.dispatch({ intent: SET_MODAL_ALERT }),

  displayModalAlert: ({ type, message }) => store.dispatch({
    intent: SET_MODAL_ALERT, modalAlert: { type, message },
  }),

  loadInvoice: (payload, message) => store.dispatch({
    intent: LOAD_INVOICE_DETAIL, ...payload, message,
  }),

  loadContactAddress: address => store.dispatch({ intent: LOAD_CONTACT_ADDRESS, address }),

  loadContactAfterCreate: (contactId, payload) => store.dispatch({
    intent: LOAD_CONTACT_AFTER_CREATE, contactId, ...payload,
  }),

  setContactLoadingState: isContactLoading => store.dispatch({
    intent: SET_CONTACT_LOADING_STATE, isContactLoading,
  }),

  loadPayDirect: payDirect => store.dispatch({ intent: LOAD_PAY_DIRECT, payDirect }),

  setPayDirectLoadingState: isLoading => store.dispatch({
    intent: SET_PAY_DIRECT_LOADING_STATE, isLoading,
  }),

  updateInvoiceIdAfterCreate: invoiceId => store.dispatch({
    intent: UPDATE_INVOICE_ID_AFTER_CREATE, invoiceId,
  }),

  updateHeaderOptions: (key, value) => store.dispatch({
    intent: UPDATE_INVOICE_DETAIL_HEADER_OPTIONS, key, value,
  }),

  updateInvoicePaymentAmount: amountPaid => store.dispatch({
    intent: UPDATE_INVOICE_PAYMENT_AMOUNT, amountPaid,
  }),

  addInvoiceLine: line => store.dispatch({ intent: ADD_INVOICE_LINE, line }),

  removeInvoiceLine: index => store.dispatch({ intent: REMOVE_INVOICE_LINE, index }),


  updateInvoiceLine: (index, key, value) => store.dispatch({
    intent: UPDATE_INVOICE_LINE, index, key, value,
  }),

  setInvoiceItemLineDirty: isLineAmountDirty => store.dispatch({
    intent: SET_INVOICE_ITEM_LINE_DIRTY, isLineAmountDirty,
  }),

  calculateLineTotals: response => store.dispatch({
    intent: CALCULATE_LINE_TOTALS, ...response,
  }),

  resetInvoiceItemTotals: () => store.dispatch({ intent: RESET_TOTALS }),

  updateEmailInvoiceDetail: (key, value) => store.dispatch({
    intent: UPDATE_EMAIL_INVOICE_DETAIL, key, value,
  }),

  resetEmailInvoiceDetail: () => store.dispatch({ intent: RESET_EMAIL_INVOICE_DETAIL }),

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

  resetOpenSendEmailParam: () => store.dispatch({ intent: RESET_OPEN_SEND_EMAIL }),

  updateExportPdfDetail: ({ key, value }) => store.dispatch({
    intent: UPDATE_EXPORT_PDF_DETAIL, key, value,
  }),

  loadItemOption: (response) => {
    store.dispatch({
      intent: LOAD_ITEM_OPTION,
      response,
    });
  },

  updateInvoiceLayout: (layout) => {
    store.dispatch({
      intent: UPDATE_INVOICE_LAYOUT,
      layout,
    });
  },
});

export default createInvoiceDetailDispatcher;
