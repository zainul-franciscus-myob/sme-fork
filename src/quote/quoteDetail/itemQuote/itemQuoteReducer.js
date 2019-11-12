import {
  ADD_EMAIL_ATTACHMENTS,
  CHANGE_EXPORT_PDF_TEMPLATE,
  LOAD_CUSTOMER_ADDRESS,
  REMOVE_EMAIL_ATTACHMENT,
  RESET_EMAIL_QUOTE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SET_ALERT,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_QUOTE_DETAIL,
  UPDATE_QUOTE_ID_AFTER_CREATE,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../../QuoteIntents';
import {
  ADD_TABLE_ROW,
  CALCULATE_LINES,
  CHANGE_TABLE_ROW,
  FORMAT_LINE_AMOUNT_INPUTS,
  REMOVE_TABLE_ROW,
  SET_IS_CALCULATING,
  SET_IS_LINE_AMOUNT_INPUT_DIRTY,
  SET_MODAL,
  SET_SUBMITTING_STATE,
  UPDATE_ITEM_QUOTE_OPTION,
} from './ItemQuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getLoadQuoteDetailModalType, getShouldOpenEmailModal } from './ItemQuoteSelectors';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  businessId: '',
  quoteId: '',
  layout: '',
  openExportPdf: false,
  quote: {
    customerId: '',
    customerName: '',
    address: '',
    expirationTerm: '',
    expirationDays: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
    isTaxInclusive: false,
    quoteNumber: '',
    purchaseOrder: '',
    issueDate: formatIsoDate(new Date()),
    note: '',
    lines: [],
  },
  customers: [],
  expirationTerms: [],
  items: [],
  taxCodes: [],
  newLine: {
    units: '',
    itemId: '',
    description: '',
    unitPrice: '',
    discount: '',
    displayDiscount: '',
    taxCodeId: '',
    amount: '',
    displayAmount: '',
  },
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  alert: undefined,
  isLineAmountInputDirty: false,
  isSubmitting: false,
  isPageEdited: false,
  isCalculating: false,
  modalType: undefined,
  isModalSubmitting: false,
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

const setModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
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

  const modalType = getLoadQuoteDetailModalType(action.context, action.payload.emailQuote);

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
      ...action.payload.quote,
    },
    customers: action.payload.customers,
    expirationTerms: action.payload.expirationTerms,
    taxCodes: action.payload.taxCodes,
    items: action.payload.items,
    newLine: action.payload.newLine,
    totals: action.payload.totals,
    comments: action.payload.comments,
    pageTitle: action.payload.pageTitle,
    emailQuote: {
      ...defaultState.emailQuote,
      ...getLoadQuoteDetailEmailQuote(action.payload.emailQuote, action.payload.quote.quoteNumber),
    },
    emailQuoteDefaultState: {
      ...defaultState.emailQuoteDefaultState,
      ...getLoadQuoteDetailEmailQuote(action.payload.emailQuote, action.payload.quote.quoteNumber),
    },
    exportPdf: {
      ...defaultState.exportPdf,
      ...action.payload.exportPdf,
    },
    templateOptions: action.payload.templateOptions,
    modalAlert,
    alert: pageAlert,
  });
};

const resetState = () => getDefaultState();

const loadCustomerAddress = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    address: action.address,
  },
});

const updateQuoteIdAfterCreate = (state, action) => ({
  ...state,
  quoteId: action.quoteId,
});

const updateQuoteOption = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    [action.key]: action.value,
  },
});

const addTableRow = (state, action) => {
  const { id, ...partialLine } = action.row;

  return {
    ...state,
    isPageEdited: true,
    quote: {
      ...state.quote,
      lines: [
        ...state.quote.lines,
        {
          ...state.newLine,
          ...partialLine,
        },
      ],
    },
  };
};

const changeTableRow = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      if (index === action.index) {
        return {
          ...line,
          [action.key]: action.value,
          displayDiscount: action.key === 'discount' ? action.value : line.displayDiscount,
          displayAmount: action.key === 'amount' ? action.value : line.displayAmount,
        };
      }
      return line;
    }),
  },
});

const removeTableRow = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.filter((_, index) => index !== action.index),
  },
});

const calculateLines = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: action.quote.lines,
  },
  totals: action.totals,
});

const setIsCalculating = (state, action) => ({
  ...state,
  isCalculating: action.isCalculating,
});

const setIsLineAmountInputDirty = (state, action) => ({
  ...state,
  isLineAmountInputDirty: action.isLineAmountInputDirty,
});

const safeParseNumber = (number) => {
  const realNumber = Number(number);
  return Number.isNaN(realNumber) ? '0' : number;
};

const formatLineAmountInputs = (state, action) => {
  const { index, key } = action;
  const parsedNumber = safeParseNumber(state.quote.lines[index][key]);

  return {
    ...state,
    quote: {
      ...state.quote,
      lines: state.quote.lines.map(
        (line, lineIndex) => (lineIndex === index
          ? {
            ...line,
            [key]: parsedNumber,
          }
          : line),
      ),
    },
  };
};

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
  [SET_IS_CALCULATING]: setIsCalculating,
  [SET_IS_LINE_AMOUNT_INPUT_DIRTY]: setIsLineAmountInputDirty,
  [SET_MODAL]: setModal,
  [SET_MODAL_SUBMITTING_STATE]: setModalSubmittingState,
  [SET_ALERT]: setAlert,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_CUSTOMER_ADDRESS]: loadCustomerAddress,
  [FORMAT_LINE_AMOUNT_INPUTS]: formatLineAmountInputs,
  [RESET_STATE]: resetState,
  [UPDATE_ITEM_QUOTE_OPTION]: updateQuoteOption,
  [UPDATE_QUOTE_ID_AFTER_CREATE]: updateQuoteIdAfterCreate,
  [ADD_TABLE_ROW]: addTableRow,
  [CHANGE_TABLE_ROW]: changeTableRow,
  [REMOVE_TABLE_ROW]: removeTableRow,
  [CALCULATE_LINES]: calculateLines,
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

const itemQuoteReducer = createReducer(getDefaultState(), handlers);

export default itemQuoteReducer;
