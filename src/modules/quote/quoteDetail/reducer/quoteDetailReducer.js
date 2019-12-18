import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_QUOTE_LINE,
  CHANGE_EXPORT_PDF_TEMPLATE,
  CLOSE_MODAL,
  FORMAT_QUOTE_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  LOAD_QUOTE_DETAIL,
  OPEN_MODAL,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_QUOTE_LINE,
  RESET_EMAIL_QUOTE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  RESET_QUOTE_TOTALS,
  SET_ACCOUNT_LOADING_STATE,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
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
} from '../../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
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
  getLoadQuoteDetailModalType,
  getShouldOpenEmailModal,
  getUpdatedContactOptions,
} from '../selectors/QuoteDetailSelectors';
import ModalType from '../ModalType';
import QuoteLayout from '../QuoteLayout';
import QuoteLineLayout from '../QuoteLineLayout';
import createReducer from '../../../../store/createReducer';
import getDefaultState from './getDefaultState';

const setInitialState = (state, { context }) => ({ ...state, ...context });

const resetState = () => (getDefaultState());

const setLoadingState = (state, { isLoading }) => ({ ...state, isLoading });

const setSubmittingState = (state, { isSubmitting }) => ({ ...state, isSubmitting });

const setAlert = (state, { alert }) => ({ ...state, alert });

const openModal = (state, { modal }) => ({ ...state, modal });

const closeModal = state => ({ ...state, modal: undefined });

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
  const modal = modalType === ModalType.NONE
    ? undefined
    : { type: modalType };

  const { modalAlert, pageAlert } = action.message
    ? getLoadQuoteDetailModalAndPageAlert(state, action.message)
    : {};

  return ({
    ...state,
    openExportPdf: defaultState.openExportPdf,
    alert: pageAlert,
    modal,
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
    itemTemplateOptions: action.itemTemplateOptions || state.itemTemplateOptions,
    serviceTemplateOptions: action.serviceTemplateOptions || state.serviceTemplateOptions,
    itemOptions: action.itemOptions,
    accountOptions: action.accountOptions,
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

const getDefaultTemplate = (value, itemTemplateOptions, serviceTemplateOptions) => {
  if (value === QuoteLayout.ITEM_AND_SERVICE) {
    return itemTemplateOptions ? itemTemplateOptions.defaultTemplate : '';
  }
  return serviceTemplateOptions ? serviceTemplateOptions.defaultTemplate : '';
};

const updateQuoteLines = (layout, lines) => (layout === QuoteLayout.SERVICE
  ? lines.filter(line => line.type === QuoteLineLayout.SERVICE)
  : lines);

const updateLayout = (state, { value }) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    layout: value,
    lines: updateQuoteLines(value, state.quote.lines),
  },
  newLine: {
    ...state.newLine,
    type: value === QuoteLayout.ITEM_AND_SERVICE ? QuoteLineLayout.ITEM : QuoteLineLayout.SERVICE,
  },
  emailQuote: {
    ...state.emailQuote,
    templateName: getDefaultTemplate(
      value,
      state.itemTemplateOptions,
      state.serviceTemplateOptions,
    ),
  },
  exportPdf: {
    ...state.exportPdf,
    template: getDefaultTemplate(value, state.itemTemplateOptions, state.serviceTemplateOptions),
  },
});

const updateQuoteDetailHeaderOptions = (state, { key, value }) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    [key]: value,
  },
});

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const addQuoteLine = (state, action) => {
  const { id, ...partialLine } = action.line;
  const type = action.line.allocatedAccountId
    ? QuoteLineLayout.SERVICE
    : QuoteLineLayout.ITEM;

  const taxCodeId = action.line.allocatedAccountId ? getDefaultTaxCodeId({
    accountOptions: state.accountOptions,
    accountId: action.line.allocatedAccountId,
  }) : '';

  return {
    ...state,
    quote: {
      ...state.quote,
      lines: [
        ...state.quote.lines,
        {
          ...state.newLine,
          ...partialLine,
          type,
          taxCodeId,
        },
      ],
    },
    isPageEdited: true,
  };
};

const updateQuoteLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      if (index === action.index) {
        return {
          ...line,
          displayDiscount: action.key === 'discount' ? action.value : line.displayDiscount,
          displayAmount: action.key === 'amount' ? action.value : line.displayAmount,
          taxCodeId: action.key === 'allocatedAccountId'
            ? getDefaultTaxCodeId({ accountId: action.value, accountOptions: state.accountOptions })
            : line.taxCodeId,
          [action.key]: action.value,
        };
      }
      return line;
    }),
  },
});

const removeQuoteLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.filter((_, index) => index !== action.index),
  },
});

const resetQuoteTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});

const DEFAULT_UNITS = '1';
const updateUnits = (state, index) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, i) => ({
      ...line,
      units: index === i ? DEFAULT_UNITS : line.units,
    })),
  },
});

const formatQuoteLine = (state, { key, index }) => {
  const currentUnits = state.quote.lines[index].units;

  if (key === 'units' && Number(currentUnits) === 0) {
    return updateUnits(state, index);
  }

  return state;
};

const setQuoteSubmittingState = (state, action) => ({
  ...state,
  isCalculating: action.isCalculating,
});

const setQuoteLineDirty = (state, action) => ({
  ...state,
  isLineAmountInputDirty: action.isLineAmountInputDirty,
});

const setQuoteCalculatedLines = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: action.quote.lines,
  },
  totals: action.totals,
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
  accountOptions: [
    account,
    ...state.accountOptions,
  ],
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
  [UPDATE_LAYOUT]: updateLayout,

  [ADD_QUOTE_LINE]: addQuoteLine,
  [UPDATE_QUOTE_LINE]: updateQuoteLine,
  [REMOVE_QUOTE_LINE]: removeQuoteLine,
  [FORMAT_QUOTE_LINE]: formatQuoteLine,

  [RESET_QUOTE_TOTALS]: resetQuoteTotals,

  [SET_QUOTE_SUBMITTING_STATE]: setQuoteSubmittingState,
  [SET_QUOTE_LINE_DIRTY]: setQuoteLineDirty,
  [SET_QUOTE_CALCULATED_LINES]: setQuoteCalculatedLines,

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