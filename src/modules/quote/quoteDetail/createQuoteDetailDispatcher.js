import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_QUOTE_LINE,
  CACHE_ITEM_SELLING_DETAILS,
  CALCULATE_LINE_AMOUNTS,
  CHANGE_EXPORT_PDF_TEMPLATE,
  CLOSE_MODAL,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_JOB_AFTER_CREATE,
  LOAD_QUOTE_DETAIL,
  OPEN_MODAL,
  RELOAD_QUOTE_DETAIL,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_QUOTE_LINE,
  RESET_EMAIL_QUOTE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  RESET_QUOTE_TOTALS,
  SET_ACCOUNT_LOADING_STATE,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_JOB_LOADING_STATE,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  SET_QUOTE_CALCULATED_LINES,
  SET_QUOTE_LINE_DIRTY,
  SET_QUOTE_SUBMITTING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_QUOTE_DETAIL,
  UPDATE_LAYOUT,
  UPDATE_QUOTE_DETAIL_HEADER_OPTIONS,
  UPDATE_QUOTE_ID_AFTER_CREATE,
  UPDATE_QUOTE_LINE,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createQuoteDetailDispatcher = (store) => ({
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

  setAlert: ({ type, message }) =>
    store.dispatch({ intent: SET_ALERT, alert: { type, message } }),

  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),

  openModal: ({ type, url }) =>
    store.dispatch({ intent: OPEN_MODAL, modal: { type, url } }),

  closeModal: () => store.dispatch({ intent: CLOSE_MODAL }),

  setModalSubmittingState: (isModalSubmitting) =>
    store.dispatch({
      intent: SET_MODAL_SUBMITTING_STATE,
      isModalSubmitting,
    }),

  setModalAlert: ({ type, message }) =>
    store.dispatch({
      intent: SET_MODAL_ALERT,
      modalAlert: { type, message },
    }),

  dismissModalAlert: () => store.dispatch({ intent: SET_MODAL_ALERT }),

  loadQuote: (payload) =>
    store.dispatch({ intent: LOAD_QUOTE_DETAIL, ...payload }),

  reloadQuote: (payload) =>
    store.dispatch({ intent: RELOAD_QUOTE_DETAIL, ...payload }),

  updateQuoteIdAfterCreate: (quoteId) =>
    store.dispatch({
      intent: UPDATE_QUOTE_ID_AFTER_CREATE,
      quoteId,
    }),

  setDuplicateId: (duplicateId) =>
    store.dispatch({
      intent: SET_DUPLICATE_ID,
      duplicateId,
    }),

  updateQuoteDetailHeaderOptions: (key, value) =>
    store.dispatch({
      intent: UPDATE_QUOTE_DETAIL_HEADER_OPTIONS,
      key,
      value,
    }),

  updateLayout: ({ value }) =>
    store.dispatch({
      intent: UPDATE_LAYOUT,
      value,
    }),

  addQuoteLine: (line) => store.dispatch({ intent: ADD_QUOTE_LINE, line }),

  updateQuoteLine: (index, key, value) =>
    store.dispatch({
      intent: UPDATE_QUOTE_LINE,
      index,
      key,
      value,
    }),

  removeQuoteLine: (index) =>
    store.dispatch({
      intent: REMOVE_QUOTE_LINE,
      index,
    }),

  resetQuoteTotals: () => store.dispatch({ intent: RESET_QUOTE_TOTALS }),

  setQuoteSubmittingState: (isCalculating) =>
    store.dispatch({
      intent: SET_QUOTE_SUBMITTING_STATE,
      isCalculating,
    }),

  setQuoteLineDirty: (isLineAmountInputDirty) =>
    store.dispatch({
      intent: SET_QUOTE_LINE_DIRTY,
      isLineAmountInputDirty,
    }),

  setQuoteCalculatedLines: ({ lines, totals }, isSwitchingTaxInclusive) =>
    store.dispatch({
      intent: SET_QUOTE_CALCULATED_LINES,
      lines,
      totals,
      isSwitchingTaxInclusive,
    }),

  loadContactAddress: (address) =>
    store.dispatch({ intent: LOAD_CONTACT_ADDRESS, address }),

  loadContactAfterCreate: (contactId, payload) =>
    store.dispatch({
      intent: LOAD_CONTACT_AFTER_CREATE,
      contactId,
      ...payload,
    }),

  loadJobAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_JOB_AFTER_CREATE,
      ...payload,
    }),

  setContactLoadingState: (isContactLoading) =>
    store.dispatch({
      intent: SET_CONTACT_LOADING_STATE,
      isContactLoading,
    }),

  loadAccountAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      ...payload,
    }),

  setAccountLoadingState: (isAccountLoading) =>
    store.dispatch({
      intent: SET_ACCOUNT_LOADING_STATE,
      isAccountLoading,
    }),

  setJobLoadingState: (isJobLoading) =>
    store.dispatch({
      intent: SET_JOB_LOADING_STATE,
      isJobLoading,
    }),

  loadItemAfterCreate: (response) =>
    store.dispatch({
      intent: LOAD_ITEM_AFTER_CREATE,
      response,
    }),

  updateEmailQuoteDetail: ({ key, value }) =>
    store.dispatch({
      intent: UPDATE_EMAIL_QUOTE_DETAIL,
      key,
      value,
    }),

  resetEmailQuoteDetail: () =>
    store.dispatch({ intent: RESET_EMAIL_QUOTE_DETAIL }),

  resetOpenSendEmail: () => store.dispatch({ intent: RESET_OPEN_SEND_EMAIL }),

  addEmailAttachments: (files) =>
    store.dispatch({ intent: ADD_EMAIL_ATTACHMENTS, files }),

  uploadEmailAttachment: (response, file) =>
    store.dispatch({
      intent: UPLOAD_EMAIL_ATTACHMENT,
      ...response,
      file,
    }),

  uploadEmailAttachmentFailed: (message, file) =>
    store.dispatch({
      intent: UPLOAD_EMAIL_ATTACHMENT_FAILED,
      message,
      file,
    }),

  uploadEmailAttachmentUploadProgress: (uploadProgress, file) =>
    store.dispatch({
      intent: UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
      uploadProgress,
      file,
    }),

  removeEmailAttachment: (index) =>
    store.dispatch({ intent: REMOVE_EMAIL_ATTACHMENT, index }),

  changeExportPdfTemplate: ({ value }) =>
    store.dispatch({
      intent: CHANGE_EXPORT_PDF_TEMPLATE,
      template: value,
    }),

  calculateLineAmounts: (index, key) =>
    store.dispatch({
      intent: CALCULATE_LINE_AMOUNTS,
      key,
      index,
    }),

  loadItemSellingDetails: ({ index, itemSellingDetails }) =>
    store.dispatch({
      intent: LOAD_ITEM_SELLING_DETAILS,
      index,
      itemSellingDetails,
    }),

  cacheItemSellingDetails: ({ itemId, itemSellingDetails }) =>
    store.dispatch({
      intent: CACHE_ITEM_SELLING_DETAILS,
      itemId,
      itemSellingDetails,
    }),
});

export default createQuoteDetailDispatcher;
