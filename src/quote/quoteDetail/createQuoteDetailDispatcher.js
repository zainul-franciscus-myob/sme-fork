import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_QUOTE_ITEM_LINE,
  ADD_QUOTE_SERVICE_LINE,
  CHANGE_EXPORT_PDF_TEMPLATE,
  CLOSE_MODAL,
  FORMAT_QUOTE_ITEM_LINE,
  FORMAT_QUOTE_SERVICE_LINE,
  GET_QUOTE_SERVICE_CALCULATED_TOTALS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  LOAD_QUOTE_DETAIL,
  OPEN_MODAL,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_QUOTE_ITEM_LINE,
  REMOVE_QUOTE_SERVICE_LINE,
  RESET_EMAIL_QUOTE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  RESET_QUOTE_SERVICE_TOTALS,
  SET_ACCOUNT_LOADING_STATE,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  SET_QUOTE_ITEM_CALCULATED_LINES,
  SET_QUOTE_ITEM_LINE_DIRTY,
  SET_QUOTE_ITEM_SUBMITTING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_QUOTE_DETAIL,
  UPDATE_QUOTE_DETAIL_HEADER_OPTIONS,
  UPDATE_QUOTE_ID_AFTER_CREATE,
  UPDATE_QUOTE_ITEM_LINE,
  UPDATE_QUOTE_SERVICE_LINE,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createQuoteDetailDispatcher = store => ({
  setInitialState: context => store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setLoadingState: isLoading => store.dispatch({ intent: SET_LOADING_STATE, isLoading }),

  setSubmittingState: isSubmitting => store.dispatch({
    intent: SET_SUBMITTING_STATE, isSubmitting,
  }),

  setAlert: ({ type, message }) => store.dispatch({ intent: SET_ALERT, alert: { type, message } }),

  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),

  openModal: modalType => store.dispatch({ intent: OPEN_MODAL, modalType }),

  closeModal: () => store.dispatch({ intent: CLOSE_MODAL }),

  setModalSubmittingState: isModalSubmitting => store.dispatch({
    intent: SET_MODAL_SUBMITTING_STATE, isModalSubmitting,
  }),

  setModalAlert: ({ type, message }) => store.dispatch({
    intent: SET_MODAL_ALERT, modalAlert: { type, message },
  }),

  dismissModalAlert: () => store.dispatch({ intent: SET_MODAL_ALERT }),

  loadQuote: (payload, message) => store.dispatch({
    intent: LOAD_QUOTE_DETAIL, ...payload, message,
  }),

  updateQuoteIdAfterCreate: quoteId => store.dispatch({
    intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId,
  }),

  updateQuoteDetailHeaderOptions: (key, value) => store.dispatch({
    intent: UPDATE_QUOTE_DETAIL_HEADER_OPTIONS, key, value,
  }),

  addQuoteServiceLine: line => store.dispatch({ intent: ADD_QUOTE_SERVICE_LINE, line }),

  removeQuoteServiceLine: index => store.dispatch({ intent: REMOVE_QUOTE_SERVICE_LINE, index }),

  updateQuoteServiceLine: (index, key, value) => store.dispatch({
    intent: UPDATE_QUOTE_SERVICE_LINE, index, key, value,
  }),

  formatQuoteServiceLine: index => store.dispatch({ intent: FORMAT_QUOTE_SERVICE_LINE, index }),

  getQuoteServiceCalculatedTotals: totals => store.dispatch({
    intent: GET_QUOTE_SERVICE_CALCULATED_TOTALS, totals,
  }),

  resetQuoteServiceTotals: () => store.dispatch({ intent: RESET_QUOTE_SERVICE_TOTALS }),

  addQuoteItemLine: row => store.dispatch({ intent: ADD_QUOTE_ITEM_LINE, row }),

  removeQuoteItemLine: index => store.dispatch({ intent: REMOVE_QUOTE_ITEM_LINE, index }),

  updateQuoteItemLine: (index, key, value) => store.dispatch({
    intent: UPDATE_QUOTE_ITEM_LINE, index, key, value,
  }),

  formatQuoteItemLine: (index, key) => store.dispatch({
    intent: FORMAT_QUOTE_ITEM_LINE, index, key,
  }),

  setQuoteItemSubmittingState: isCalculating => store.dispatch({
    intent: SET_QUOTE_ITEM_SUBMITTING_STATE, isCalculating,
  }),

  setQuoteItemLineDirty: isLineAmountInputDirty => store.dispatch({
    intent: SET_QUOTE_ITEM_LINE_DIRTY, isLineAmountInputDirty,
  }),

  setQuoteItemCalculatedLines: payload => store.dispatch({
    intent: SET_QUOTE_ITEM_CALCULATED_LINES, ...payload,
  }),

  loadContactAddress: address => store.dispatch({ intent: LOAD_CONTACT_ADDRESS, address }),

  loadContactAfterCreate: (contactId, payload) => store.dispatch({
    intent: LOAD_CONTACT_AFTER_CREATE, contactId, ...payload,
  }),

  setContactLoadingState: isContactLoading => store.dispatch({
    intent: SET_CONTACT_LOADING_STATE, isContactLoading,
  }),

  loadAccountAfterCreate: payload => store.dispatch({
    intent: LOAD_ACCOUNT_AFTER_CREATE, ...payload,
  }),

  setAccountLoadingState: isAccountLoading => store.dispatch({
    intent: SET_ACCOUNT_LOADING_STATE, isAccountLoading,
  }),

  loadItemAfterCreate: response => store.dispatch({
    intent: LOAD_ITEM_AFTER_CREATE, response,
  }),

  updateEmailQuoteDetail: ({ key, value }) => store.dispatch({
    intent: UPDATE_EMAIL_QUOTE_DETAIL, key, value,
  }),

  resetEmailQuoteDetail: () => store.dispatch({ intent: RESET_EMAIL_QUOTE_DETAIL }),

  resetOpenSendEmail: () => store.dispatch({ intent: RESET_OPEN_SEND_EMAIL }),

  addEmailAttachments: files => store.dispatch({ intent: ADD_EMAIL_ATTACHMENTS, files }),

  uploadEmailAttachment: (response, file) => store.dispatch({
    intent: UPLOAD_EMAIL_ATTACHMENT, ...response, file,
  }),

  uploadEmailAttachmentFailed: (message, file) => store.dispatch({
    intent: UPLOAD_EMAIL_ATTACHMENT_FAILED, message, file,
  }),

  uploadEmailAttachmentUploadProgress: (uploadProgress, file) => store.dispatch({
    intent: UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS, uploadProgress, file,
  }),

  removeEmailAttachment: index => store.dispatch({ intent: REMOVE_EMAIL_ATTACHMENT, index }),

  changeExportPdfTemplate: value => store.dispatch({
    intent: CHANGE_EXPORT_PDF_TEMPLATE, template: value,
  }),
});

export default createQuoteDetailDispatcher;