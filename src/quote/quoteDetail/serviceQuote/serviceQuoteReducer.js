import {
  ADD_EMAIL_ATTACHMENTS,
  CHANGE_EXPORT_PDF_TEMPLATE,
  LOAD_CUSTOMER_ADDRESS,
  REMOVE_EMAIL_ATTACHMENT,
  RESET_EMAIL_QUOTE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_QUOTE_DETAIL,
  UPDATE_QUOTE_ID_AFTER_CREATE,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../../QuoteIntents';
import {
  ADD_SERVICE_QUOTE_LINE,
  CLOSE_MODAL,
  FORMAT_SERVICE_QUOTE_LINE,
  GET_SERVICE_QUOTE_CALCULATED_TOTALS,
  OPEN_MODAL,
  REMOVE_SERVICE_QUOTE_LINE,
  RESET_TOTALS,
  SET_SUBMITTING_STATE,
  UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
  UPDATE_SERVICE_QUOTE_LINE,
} from './ServiceQuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getDefaultTaxCodeId,
  getLineByIndex,
  getLoadQuoteDetailModalType,
  getShouldOpenEmailModal,
} from './ServiceQuoteSelectors';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  isLoading: true,
  layout: '',
  openExportPdf: false,
  quote: {
    id: '',
    customerId: '',
    customerName: '',
    expirationTerm: '',
    expirationDays: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
    taxInclusive: true,
    quoteNumber: '',
    address: '',
    issueDate: formatIsoDate(new Date()),
    purchaseOrderNumber: '',
    notesToCustomer: '',
    lines: [],
  },
  customerOptions: [],
  expirationTerms: [],
  newLine: {
    description: '',
    allocatedAccountId: '',
    amount: '',
    taxCodeId: '',
    accounts: [],
    taxCodes: [],
  },
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  businessId: '',
  region: '',
  quoteId: '',
  isPageEdited: false,
  modalType: '',
  isModalSubmitting: false,
  alert: undefined,
  isSubmitting: false,
  comments: [],
  pageTitle: '',
  emailQuote: {
    hasEmailReplyDetails: false,
    isEmailMeACopy: false,
    ccToEmail: [''],
    fromEmail: '',
    fromName: '',
    messageBody: '',
    subject: '',
    toEmail: [''],
    attachments: [],
    templateName: '',
  },
  templateOptions: [],
  exportPdf: {
    template: '',
  },
  modalAlert: undefined,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

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

const getLoadQuoteDetailModalAndPageAlert = (state, alertMessage) => {
  const shouldOpenEmailModal = getShouldOpenEmailModal(state);
  const alert = ({ type: 'success', message: alertMessage.content });

  return shouldOpenEmailModal ? { modalAlert: alert } : { pageAlert: alert };
};

const setInitialState = (state, action) => {
  const defaultState = getDefaultState();

  const modalType = getLoadQuoteDetailModalType(action.context, action.emailQuote);

  const { modalAlert, pageAlert } = action.message
    ? getLoadQuoteDetailModalAndPageAlert(action.context, action.message)
    : {};

  return ({
    ...defaultState,
    ...action.context,
    layout: action.layout,
    openExportPdf: defaultState.openExportPdf,
    modalType,
    quote: {
      ...defaultState.quote,
      ...action.quote,
    },
    customerOptions: action.customerOptions,
    expirationTerms: action.expirationTerms,
    newLine: action.newLine,
    totals: action.totals,
    comments: action.comments,
    pageTitle: action.pageTitle,
    emailQuote: {
      ...defaultState.emailQuote,
      ...getLoadQuoteDetailEmailQuote(action.emailQuote, action.quote.quoteNumber),
    },
    emailQuoteDefaultState: {
      ...defaultState.emailQuoteDefaultState,
      ...getLoadQuoteDetailEmailQuote(action.emailQuote, action.quote.quoteNumber),
    },
    exportPdf: {
      ...defaultState.exportPdf,
      ...action.exportPdf,
    },
    templateOptions: action.templateOptions,
    modalAlert,
    alert: pageAlert,
  });
};

const resetState = () => (getDefaultState());

const updateQuoteIdAfterCreate = (state, action) => ({
  ...state,
  quoteId: action.quoteId,
});

const updateServiceQuoteHeaderOptions = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    [action.key]: action.value,
  },
});

const getUpdatedLines = (index, lines, newLine) => lines.map((line, lineIndex) => (
  lineIndex === index ? newLine : line
));

const isAccountLineItem = lineKey => lineKey === 'allocatedAccountId';
const updateServiceQuoteLine = (state, action) => {
  const line = getLineByIndex(state, { index: action.index });
  const newLine = {
    ...line,
    taxCodeId: isAccountLineItem(action.key)
      ? getDefaultTaxCodeId({ accountId: action.value, accounts: line.accounts })
      : line.taxCodeId,
    [action.key]: action.value,
  };

  return ({
    ...state,
    isPageEdited: true,
    quote: {
      ...state.quote,
      lines: getUpdatedLines(action.index, state.quote.lines, newLine),
    },
  });
};

const addServiceQuoteLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: [
      ...state.quote.lines,
      {
        ...state.newLine,
        taxCodeId: getDefaultTaxCodeId({
          ...state.newLine,
          accountId: action.line.allocatedAccountId,
        }),
        ...action.line,
      },
    ],
  },
});

const removeLine = (lines, index) => lines.filter((line, i) => i !== index);
const removeServiceQuoteLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: removeLine(state.quote.lines, action.index),
  },
});

const getCalculatedTotals = (state, action) => ({
  ...state,
  totals: action.totals,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setModalSubmittingState = (state, { isModalSubmitting }) => ({ ...state, isModalSubmitting });

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const loadCustomerAddress = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    address: action.address,
  },
});

const formatLineAmount = (amount) => {
  const realNumber = Number(amount);
  return (Number.isNaN(realNumber) ? '' : parseFloat(amount).toFixed(2));
};
const formatServiceQuoteLine = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map(
      (line, lineIndex) => (lineIndex === action.index
        ? {
          ...line,
          amount: line.amount && formatLineAmount(line.amount),
        }
        : line),
    ),
  },
});

const resetTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});

const changeExportPdfForm = (state, action) => ({
  ...state,
  exportPdf: {
    ...state.exportPdf,
    template: action.template,
  },
});

const updateEmailQuoteDetail = (state, action) => ({
  ...state,
  emailQuote: {
    ...state.emailQuote,
    [action.key]: action.value,
  },
});

const setModalAlert = (state, { modalAlert }) => ({ ...state, modalAlert });

const resetOpenSendEmailParam = state => ({
  ...state,
  openSendEmail: 'false',
});

const resetEmailQuoteDetail = state => ({
  ...state,
  emailQuote: state.emailQuoteDefaultState,
});

const isMoreThan25MB = size => size > 25000000;

const buildAttachmentState = size => (
  isMoreThan25MB(size) ? { state: 'failed', error: 'File is more than 25MB' } : { state: 'queued' }
);

const addAttachments = (state, { files }) => ({
  ...state,
  emailQuote: {
    ...state.emailQuote,
    attachments: [
      ...state.emailQuote.attachments,
      ...files.map(file => ({
        ...buildAttachmentState(file.size),
        file,
      })),
    ],
  },

});

const updateEmailAttachment = (state, file, partialAttachment) => ({
  ...state,
  emailQuote: {
    ...state.emailQuote,
    attachments: state.emailQuote.attachments.map(attachment => (
      attachment.file === file ? { ...attachment, ...partialAttachment } : attachment
    )),
  },
});

const uploadEmailAttachment = (state, { keyName, uploadPassword, file }) => (
  updateEmailAttachment(state, file, { keyName, uploadPassword, state: 'finished' })
);

const uploadEmailAttachmentFailed = (state, { message, file }) => (
  updateEmailAttachment(state, file, { error: message, state: 'failed' })
);

const uploadEmailAttachmentUploadProgress = (state, { file, uploadProgress }) => (
  updateEmailAttachment(state, file, { state: 'loading', uploadProgress })
);

const removeEmailAttachment = (state, { index }) => ({
  ...state,
  emailQuote: {
    ...state.emailQuote,
    attachments: state.emailQuote.attachments.filter((attachment, i) => index !== i),
  },
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [UPDATE_SERVICE_QUOTE_HEADER_OPTIONS]: updateServiceQuoteHeaderOptions,
  [UPDATE_SERVICE_QUOTE_LINE]: updateServiceQuoteLine,
  [UPDATE_QUOTE_ID_AFTER_CREATE]: updateQuoteIdAfterCreate,
  [ADD_SERVICE_QUOTE_LINE]: addServiceQuoteLine,
  [REMOVE_SERVICE_QUOTE_LINE]: removeServiceQuoteLine,
  [GET_SERVICE_QUOTE_CALCULATED_TOTALS]: getCalculatedTotals,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_MODAL_SUBMITTING_STATE]: setModalSubmittingState,
  [SET_ALERT]: setAlert,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [LOAD_CUSTOMER_ADDRESS]: loadCustomerAddress,
  [FORMAT_SERVICE_QUOTE_LINE]: formatServiceQuoteLine,
  [RESET_TOTALS]: resetTotals,
  [CHANGE_EXPORT_PDF_TEMPLATE]: changeExportPdfForm,
  [UPDATE_EMAIL_QUOTE_DETAIL]: updateEmailQuoteDetail,
  [SET_MODAL_ALERT]: setModalAlert,
  [RESET_OPEN_SEND_EMAIL]: resetOpenSendEmailParam,
  [RESET_EMAIL_QUOTE_DETAIL]: resetEmailQuoteDetail,
  [ADD_EMAIL_ATTACHMENTS]: addAttachments,
  [UPLOAD_EMAIL_ATTACHMENT]: uploadEmailAttachment,
  [UPLOAD_EMAIL_ATTACHMENT_FAILED]: uploadEmailAttachmentFailed,
  [UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS]: uploadEmailAttachmentUploadProgress,
  [REMOVE_EMAIL_ATTACHMENT]: removeEmailAttachment,
};

const serviceQuoteReducer = createReducer(getDefaultState(), handlers);

export default serviceQuoteReducer;
