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
} from '../../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  addAttachments,
  removeEmailAttachment,
  resetEmailQuoteDetail,
  resetOpenSendEmailParam,
  updateEmailQuoteDetail,
  uploadEmailAttachment,
  uploadEmailAttachmentFailed,
  uploadEmailAttachmentUploadProgress,
} from './EmailReducer';
import {
  addQuoteItemLine,
  formatQuoteItemLine,
  removeQuoteItemLine,
  setQuoteItemCalculatedLines,
  setQuoteItemLineDirty,
  setQuoteItemSubmittingState,
  updateQuoteItemLine,
} from './ItemLayoutReducer';
import {
  addQuoteServiceLine,
  formatQuoteServiceLine,
  getQuoteServiceCalculatedTotals,
  removeQuoteServiceLine,
  resetQuoteServiceTotals,
  updateQuoteServiceLine,
} from './ServiceLayoutReducer';
import {
  getLoadQuoteDetailModalType,
  getShouldOpenEmailModal,
  getUpdatedContactOptions,
} from '../selectors/QuoteDetailSelectors';
import createReducer from '../../../store/createReducer';
import getDefaultState from './getDefaultState';

const setInitialState = (state, { context }) => ({ ...state, ...context });

const resetState = () => (getDefaultState());

const setLoadingState = (state, { isLoading }) => ({ ...state, isLoading });

const setSubmittingState = (state, { isSubmitting }) => ({ ...state, isSubmitting });

const setAlert = (state, { alert }) => ({ ...state, alert });

const openModal = (state, { modalType }) => ({ ...state, modalType });

const closeModal = state => ({ ...state, modalType: '' });

const setModalSubmittingState = (state, { isModalSubmitting }) => ({ ...state, isModalSubmitting });

const setModalAlert = (state, { modalAlert }) => ({ ...state, modalAlert });

const getLoadQuoteDetailModalAndPageAlert = (state, alertMessage) => {
  const shouldOpenEmailModal = getShouldOpenEmailModal(state);
  const alert = ({ type: 'success', message: alertMessage.content });

  return shouldOpenEmailModal ? { modalAlert: alert } : { pageAlert: alert };
};

const getLoadQuoteDetailEmailQuote = (emailQuote, quoteNumber) => (
  emailQuote
    ? {
      ...emailQuote,
      toEmail: emailQuote.toEmail.length > 0 ? emailQuote.toEmail : [''],
      ccToEmail: emailQuote.ccToEmail.length > 0 ? emailQuote.ccToEmail : [''],
      subject: emailQuote.includeQuoteNumberInEmail ? `Quote ${quoteNumber}; ${emailQuote.subject}` : emailQuote.subject,
    }
    : {}
);

const loadQuoteDetail = (state, action) => {
  const defaultState = getDefaultState();

  const modalType = getLoadQuoteDetailModalType(state, action.emailQuote);

  const { modalAlert, pageAlert } = action.message
    ? getLoadQuoteDetailModalAndPageAlert(state, action.message)
    : {};

  return ({
    ...state,
    openExportPdf: defaultState.openExportPdf,
    alert: pageAlert,
    modalType,
    modalAlert,
    pageTitle: action.pageTitle,
    quote: {
      ...state.quote,
      ...action.quote,
    },
    newLine: action.newLine,
    totals: action.totals,
    contactOptions: action.contactOptions,
    expirationTermOptions: action.expirationTermOptions,
    commentOptions: action.commentOptions,
    templateOptions: action.templateOptions,
    itemOptions: action.itemOptions,
    taxCodeOptions: action.taxCodeOptions,
    emailQuote: {
      ...state.emailQuote,
      ...getLoadQuoteDetailEmailQuote(action.emailQuote, action.quote.quoteNumber),
    },
    emailQuoteDefaultState: {
      ...state.emailQuoteDefaultState,
      ...getLoadQuoteDetailEmailQuote(action.emailQuote, action.quote.quoteNumber),
    },
    exportPdf: {
      ...state.exportPdf,
      ...action.exportPdf,
    },
  });
};

const updateQuoteIdAfterCreate = (state, action) => ({
  ...state,
  quoteId: action.quoteId,
});

export const updateQuoteDetailHeaderOptions = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    [action.key]: action.value,
  },
});

const loadCustomerAddress = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    address: action.address,
  },
});

const loadCustomerAfterCreate = (state, { contactId, address, option }) => ({
  ...state,
  quote: {
    ...state.quote,
    contactId,
    address,
  },
  contactOptions: getUpdatedContactOptions(state, option),
});

const setCustomerLoadingState = (state, { isContactLoading }) => ({ ...state, isContactLoading });

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map(line => ({
      ...line,
      accountOptions: [account, ...line.accountOptions],
    })),
  },
  newLine: {
    ...state.newLine,
    accountOptions: [account, ...state.newLine.accountOptions],
  },
  isPageEdited: true,
});

const setAccountLoadingState = (state, { isAccountLoading }) => (
  { ...state, isAccountLoading }
);

const loadItemOption = (state, action) => ({
  ...state,
  itemOptions: [
    action.response,
    ...state.itemOptions,
  ],
});

const changeExportPdfForm = (state, action) => ({
  ...state,
  exportPdf: {
    ...state.exportPdf,
    template: action.template,
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_MODAL_SUBMITTING_STATE]: setModalSubmittingState,
  [SET_MODAL_ALERT]: setModalAlert,

  [LOAD_QUOTE_DETAIL]: loadQuoteDetail,
  [UPDATE_QUOTE_ID_AFTER_CREATE]: updateQuoteIdAfterCreate,
  [UPDATE_QUOTE_DETAIL_HEADER_OPTIONS]: updateQuoteDetailHeaderOptions,

  [ADD_QUOTE_SERVICE_LINE]: addQuoteServiceLine,
  [REMOVE_QUOTE_SERVICE_LINE]: removeQuoteServiceLine,
  [UPDATE_QUOTE_SERVICE_LINE]: updateQuoteServiceLine,
  [FORMAT_QUOTE_SERVICE_LINE]: formatQuoteServiceLine,
  [GET_QUOTE_SERVICE_CALCULATED_TOTALS]: getQuoteServiceCalculatedTotals,
  [RESET_QUOTE_SERVICE_TOTALS]: resetQuoteServiceTotals,

  [ADD_QUOTE_ITEM_LINE]: addQuoteItemLine,
  [REMOVE_QUOTE_ITEM_LINE]: removeQuoteItemLine,
  [UPDATE_QUOTE_ITEM_LINE]: updateQuoteItemLine,
  [FORMAT_QUOTE_ITEM_LINE]: formatQuoteItemLine,
  [SET_QUOTE_ITEM_SUBMITTING_STATE]: setQuoteItemSubmittingState,
  [SET_QUOTE_ITEM_LINE_DIRTY]: setQuoteItemLineDirty,
  [SET_QUOTE_ITEM_CALCULATED_LINES]: setQuoteItemCalculatedLines,

  [LOAD_CONTACT_ADDRESS]: loadCustomerAddress,
  [LOAD_CONTACT_AFTER_CREATE]: loadCustomerAfterCreate,
  [SET_CONTACT_LOADING_STATE]: setCustomerLoadingState,

  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [SET_ACCOUNT_LOADING_STATE]: setAccountLoadingState,

  [LOAD_ITEM_AFTER_CREATE]: loadItemOption,

  [UPDATE_EMAIL_QUOTE_DETAIL]: updateEmailQuoteDetail,
  [RESET_OPEN_SEND_EMAIL]: resetOpenSendEmailParam,
  [RESET_EMAIL_QUOTE_DETAIL]: resetEmailQuoteDetail,
  [ADD_EMAIL_ATTACHMENTS]: addAttachments,
  [UPLOAD_EMAIL_ATTACHMENT]: uploadEmailAttachment,
  [UPLOAD_EMAIL_ATTACHMENT_FAILED]: uploadEmailAttachmentFailed,
  [UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS]: uploadEmailAttachmentUploadProgress,
  [REMOVE_EMAIL_ATTACHMENT]: removeEmailAttachment,

  [CHANGE_EXPORT_PDF_TEMPLATE]: changeExportPdfForm,
};

const quoteDetailReducer = createReducer(getDefaultState(), handlers);

export default quoteDetailReducer;
