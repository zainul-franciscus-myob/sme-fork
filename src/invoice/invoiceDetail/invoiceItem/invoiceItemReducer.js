import dateFormat from 'dateformat';

import {
  ADD_LINE,
  FORMAT_LINE_AMOUNT,
  REMOVE_LINE,
  RESET_TOTALS,
  SET_ARE_LINES_CALCULATING,
  SET_LINE_AMOUNT_DIRTY,
  TABLE_ROW_CHANGE,
  UPDATE_INVOICE_ITEM_OPTION,
  UPDATE_INVOICE_PAYMENT_AMOUNT,
  UPDATE_LINES,
} from './InvoiceItemIntents';
import {
  LOAD_CONTACT_ADDRESS,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SET_ALERT,
  SET_MODAL_ALERT,
  SET_MODAL_TYPE,
  SET_SHOW_EMAIL_MODAL_AFTER_SAVE,
  SET_SUBMITTING_STATE,
  UPDATE_EMAIL_INVOICE_DETAIL,
  UPDATE_INVOICE_ID_AFTER_CREATE,
} from '../../InvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import InvoiceDetailModalType from '../InvoiceDetailModalType';
import createReducer from '../../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const buildIssueDate = (invoiceId, issueDate) => {
  if (invoiceId === 'newItem') {
    return convertToDateString(Date.now());
  }
  return issueDate;
};

const getEmailInvoiceDefaultState = () => ({
  hasEmailReplyDetails: false,
  isEmailMeACopy: false,
  businessName: '',
  ccToEmail: [''],
  fromEmail: '',
  fromName: '',
  messageBody: '',
  subject: '',
  toEmail: [''],
  toName: '',
  attachments: [],
});

const getDefaultState = () => ({
  isLineAmountDirty: false,
  areLinesCalculating: false,
  isSubmitting: false,
  isPageEdited: false,
  alert: undefined,
  modalAlert: undefined,
  shouldShowEmailModalAfterSave: false,
  modalType: InvoiceDetailModalType.NONE,
  invoiceId: '',
  openSendEmail: false,
  invoice: {
    customerId: '',
    address: '',
    expirationTerm: '',
    expirationDays: 0,
    chargeForLatePayment: '',
    discountForEarlyPayment: '',
    numberOfDaysForDiscount: 0,
    invoiceNumber: '',
    isTaxInclusive: false,
    lines: [],
    note: '',
    issueDate: '',
    purchaseOrderNumber: '',
    isAllowOnlinePayments: false,
    amountPaid: '0.00',
  },
  emailInvoice: {
    ...getEmailInvoiceDefaultState(),
  },
  payDirect: {
    isRegistered: false,
    baseUrl: '',
    serialNumber: '',
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
    displaySubTotal: '$0.00',
    displayTotalTax: '$0.00',
    displayTotalAmount: '$0.00',
    displayAmountDue: '$0.00',
    displayAmountPaid: '$0.00',
  },
  comments: [],
});

const getModalType = (openSendEmailModal, emailInvoice) => {
  if (openSendEmailModal === 'true') {
    return emailInvoice.hasEmailReplyDetails
      ? InvoiceDetailModalType.EMAIL_INVOICE
      : InvoiceDetailModalType.EMAIL_SETTINGS;
  }
  return InvoiceDetailModalType.NONE;
};

const getModalAlert = alertMessage => alertMessage && ({
  type: 'success',
  message: alertMessage.content,
});

const setEmailInvoiceDetail = emailInvoice => ({
  ...getEmailInvoiceDefaultState,
  ...emailInvoice,
  toEmail: emailInvoice.toEmail.length > 0 ? emailInvoice.toEmail : [''],
  ccToEmail: emailInvoice.ccToEmail.length > 0 ? emailInvoice.ccToEmail : [''],
});

const setInitialState = (state, action) => {
  const {
    payload: {
      customers,
      expirationTerms,
      invoice,
      items,
      newLine,
      taxCodes,
      totals,
      comments,
      payDirect,
      emailInvoice,
    },
    context: {
      region, businessId, invoiceId, quoteId, openSendEmail,
    },
    message,
  } = action.context;

  const modalType = getModalType(
    openSendEmail,
    emailInvoice,
  );
  const modalAlert = getModalAlert(message);
  const defaultState = getDefaultState();

  return {
    ...state,
    invoice: {
      ...state.invoice,
      ...invoice,
      issueDate: buildIssueDate(invoiceId, invoice.issueDate),
    },
    emailInvoice: emailInvoice
      ? setEmailInvoiceDetail(emailInvoice)
      : defaultState.emailInvoice,
    emailInvoiceDefaultState: emailInvoice
      ? setEmailInvoiceDetail(emailInvoice)
      : defaultState.emailInvoice,
    payDirect,
    customers,
    expirationTerms,
    items,
    taxCodes,
    newLine,
    totals: {
      ...state.totals,
      ...totals,
    },
    region,
    businessId,
    invoiceId,
    quoteId,
    openSendEmail,
    comments,
    modalType,
    modalAlert,
  };
};

const resetState = () => (getDefaultState());

const buildInvoiceOptionValue = ({ key, value }) => (
  key === 'expirationDays'
    ? Number(value)
    : value
);

const updateInvoiceItemOption = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    [action.key]: buildInvoiceOptionValue(action),
  },
});

const loadContactAddress = (state, action) => ({
  ...state,
  invoice: {
    ...state.invoice,
    address: action.address,
  },
});

const setAreLinesCalculating = (state, action) => ({
  ...state,
  areLinesCalculating: action.areLinesCalculating,
});

const setLineAmountDirty = (state, action) => ({
  ...state,
  isLineAmountDirty: action.isLineAmountDirty,
});

const updateLines = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    isTaxInclusive: action.invoice.isTaxInclusive,
    lines: action.invoice.lines,
  },
  totals: {
    ...state.totals,
    ...action.totals,
  },
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setModalAlert = (state, action) => ({
  ...state,
  modalAlert: action.modalAlert,
});

const setModalType = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const addLine = (state, action) => {
  const { id, ...partialLine } = action.line;

  return {
    ...state,
    isPageEdited: true,
    invoice: {
      ...state.invoice,
      lines: [
        ...state.invoice.lines,
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
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
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

const removeLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.filter((_, index) => index !== action.index),
  },
});

const resetTotals = state => ({
  ...state,
  totals: {
    ...getDefaultState().totals,
  },
});

const safeParseNumber = (number) => {
  const realNumber = Number(number);
  return Number.isNaN(realNumber) ? '0' : number;
};

const formatLineAmount = (state, action) => {
  const { index, key } = action;
  const parsedNumber = safeParseNumber(state.invoice.lines[index][key]);

  return {
    ...state,
    invoice: {
      ...state.invoice,
      lines: state.invoice.lines.map(
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

const setShowEmailModalAfterSave = (state, action) => ({
  ...state,
  shouldShowEmailModalAfterSave: action.shouldShowEmailModalAfterSave,
});

const resetEmailInvoiceDetail = state => ({
  ...state,
  emailInvoice: state.emailInvoiceDefaultState,
});

const resetOpenSendEmailParam = state => ({
  ...state,
  openSendEmail: 'false',
});

const updateInvoiceIdAfterCreate = (state, action) => ({
  ...state,
  invoiceId: action.id,
});

const updateEmailInvoiceDetail = (state, action) => ({
  ...state,
  emailInvoice: {
    ...state.emailInvoice,
    [action.key]: action.value,
  },
});

const updatePaymentAmount = (state, action) => ({
  ...state,
  invoice: {
    ...state.invoice,
    amountPaid: action.amount,
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [UPDATE_INVOICE_ITEM_OPTION]: updateInvoiceItemOption,
  [LOAD_CONTACT_ADDRESS]: loadContactAddress,
  [SET_ARE_LINES_CALCULATING]: setAreLinesCalculating,
  [SET_LINE_AMOUNT_DIRTY]: setLineAmountDirty,
  [UPDATE_LINES]: updateLines,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [ADD_LINE]: addLine,
  [TABLE_ROW_CHANGE]: changeTableRow,
  [REMOVE_LINE]: removeLine,
  [RESET_TOTALS]: resetTotals,
  [FORMAT_LINE_AMOUNT]: formatLineAmount,
  [SET_SHOW_EMAIL_MODAL_AFTER_SAVE]: setShowEmailModalAfterSave,
  [RESET_EMAIL_INVOICE_DETAIL]: resetEmailInvoiceDetail,
  [RESET_OPEN_SEND_EMAIL]: resetOpenSendEmailParam,
  [UPDATE_INVOICE_ID_AFTER_CREATE]: updateInvoiceIdAfterCreate,
  [UPDATE_EMAIL_INVOICE_DETAIL]: updateEmailInvoiceDetail,
  [SET_ALERT]: setAlert,
  [SET_MODAL_ALERT]: setModalAlert,
  [SET_MODAL_TYPE]: setModalType,
  [UPDATE_INVOICE_PAYMENT_AMOUNT]: updatePaymentAmount,
};

const invoiceItemReducer = createReducer(getDefaultState(), handlers);

export default invoiceItemReducer;
