import dateFormat from 'dateformat';

import {
  ADD_INVOICE_SERVICE_LINE,
  FORMAT_INVOICE_SERVICE_LINE,
  GET_CALCULATED_INVOICE_DETAIL_TOTALS,
  REMOVE_INVOICE_SERVICE_LINE,
  RESET_TOTALS,
  UPDATE_INVOICE_PAYMENT_AMOUNT,
  UPDATE_INVOICE_SERVICE_HEADER_OPTIONS,
  UPDATE_INVOICE_SERVICE_LINE,
} from './InvoiceServiceIntents';
import {
  LOAD_CONTACT_ADDRESS,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SET_ALERT,
  SET_MODAL_ALERT,
  SET_MODAL_TYPE,
  SET_SUBMITTING_STATE,
  UPDATE_EMAIL_INVOICE_DETAIL,
  UPDATE_INVOICE_ID_AFTER_CREATE,
} from '../../InvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import { getDefaultTaxCodeId, getLineByIndex } from './invoiceServiceSelectors';
import InvoiceDetailModalType from '../InvoiceDetailModalType';
import SaveActionType from '../SaveActionType';
import createReducer from '../../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

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
  invoiceId: '',
  invoice: {
    id: '',
    contactId: '',
    expirationTerm: '',
    expirationDays: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
    taxInclusive: true,
    number: '',
    address: '',
    issueDate: convertToDateString(Date.now()),
    orderNumber: '',
    notes: '',
    amountPaid: '0.00',
    isAllowOnlinePayments: false,
    lines: [],
  },
  emailInvoice: {
    ...getEmailInvoiceDefaultState(),
  },
  payDirect: {
    isRegistered: false,
    baseUrl: '',
    serialNumber: '',
  },
  contactOptions: [],
  expirationTermOptions: [],
  newLine: {
    description: '',
    allocatedAccountId: '',
    amount: '',
    taxCodeId: '',
    accounts: [],
    taxCodes: [],
  },
  totals: {
    subTotal: '0.00',
    totalTax: '0.00',
    totalAmount: '0.00',
  },
  businessId: '',
  region: '',
  isPageEdited: false,
  modalType: InvoiceDetailModalType.NONE,
  alert: undefined,
  modalAlert: undefined,
  isSubmitting: false,
  saveActionType: SaveActionType.SAVE,
  comments: [],
});

const getModalType = (shouldOpenEmailModal, emailInvoice) => {
  if (shouldOpenEmailModal) {
    return emailInvoice.hasEmailReplyDetails
      ? InvoiceDetailModalType.EMAIL_INVOICE
      : InvoiceDetailModalType.EMAIL_SETTINGS;
  }
  return InvoiceDetailModalType.NONE;
};

const setModalAndPageAlert = (shouldOpenEmailModal, alertMessage) => {
  const alert = ({
    type: 'success',
    message: alertMessage.content,
  });

  return shouldOpenEmailModal ? { modalAlert: alert } : { pageAlert: alert };
};

const setEmailInvoiceDetail = emailInvoice => ({
  ...getEmailInvoiceDefaultState,
  ...emailInvoice,
  toEmail: emailInvoice.toEmail.length > 0 ? emailInvoice.toEmail : [''],
  ccToEmail: emailInvoice.ccToEmail.length > 0 ? emailInvoice.ccToEmail : [''],
});

const getShouldOpenEmailModal = (openSendEmailParam, invoiceId) => (
  invoiceId !== 'newService' && openSendEmailParam === 'true'
);

const setInitialState = (state, action) => {
  const defaultState = getDefaultState();

  const shouldOpenEmailModal = getShouldOpenEmailModal(
    action.context.openSendEmail,
    action.context.invoiceId,
  );
  const modalType = getModalType(
    shouldOpenEmailModal,
    action.emailInvoice,
  );
  const { modalAlert, pageAlert } = action.message
    ? setModalAndPageAlert(shouldOpenEmailModal, action.message)
    : {};

  return ({
    ...defaultState,
    ...action.context,
    invoice: {
      ...defaultState.invoice,
      ...action.invoice,
    },
    emailInvoice: action.emailInvoice
      ? setEmailInvoiceDetail(action.emailInvoice)
      : defaultState.emailInvoice,
    emailInvoiceDefaultState: action.emailInvoice
      ? setEmailInvoiceDetail(action.emailInvoice)
      : defaultState.emailInvoice,
    payDirect: action.payDirect,
    contactOptions: action.contactOptions || defaultState.contactOptions,
    expirationTermOptions: action.expirationTermOptions || defaultState.expirationTermOptions,
    newLine: action.newLine || defaultState.newLine,
    totals: action.totals || defaultState.totals,
    comments: action.comments || defaultState.comments,
    modalType,
    modalAlert,
    alert: pageAlert,
  });
};

const resetState = () => (getDefaultState());

const updateInvoiceServiceHeaderOptions = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    [action.key]: action.value,
  },
});

const isAccountLineItem = lineKey => lineKey === 'allocatedAccountId';

const getUpdatedLines = (index, lines, newLine) => lines.map((line, lineIndex) => (
  lineIndex === index ? newLine : line
));

const updateInvoiceServiceLine = (state, action) => {
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
    invoice: {
      ...state.invoice,
      lines: getUpdatedLines(action.index, state.invoice.lines, newLine),
    },
  });
};

const addInvoiceServiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: [
      ...state.invoice.lines,
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

const getCalculatedTotals = (state, action) => ({
  ...state,
  totals: action.totals,
});

const loadContactAddress = (state, action) => ({
  ...state,
  invoice: {
    ...state.invoice,
    address: action.address,
  },
});

const resetTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});

const formatLineAmount = amount => (Number(amount) ? parseFloat(amount).toFixed(2) : '');

const formatInvoiceServiceLine = (state, action) => {
  const line = getLineByIndex(state, { index: action.index });
  if (line) {
    const newLine = {
      ...line,
      amount: line.amount && formatLineAmount(line.amount),
    };

    return {
      ...state,
      invoice: {
        ...state.invoice,
        lines: getUpdatedLines(action.index, state.invoice.lines, newLine),
      },
    };
  }

  return state;
};

const removeLine = (lines, index) => lines.filter((line, i) => i !== index);

const removeInvoiceServiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: removeLine(state.invoice.lines, action.index),
  },
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

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
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
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [RESET_STATE]: resetState,
  [UPDATE_INVOICE_SERVICE_HEADER_OPTIONS]: updateInvoiceServiceHeaderOptions,
  [LOAD_CONTACT_ADDRESS]: loadContactAddress,
  [RESET_TOTALS]: resetTotals,
  [GET_CALCULATED_INVOICE_DETAIL_TOTALS]: getCalculatedTotals,
  [UPDATE_INVOICE_SERVICE_LINE]: updateInvoiceServiceLine,
  [ADD_INVOICE_SERVICE_LINE]: addInvoiceServiceLine,
  [FORMAT_INVOICE_SERVICE_LINE]: formatInvoiceServiceLine,
  [REMOVE_INVOICE_SERVICE_LINE]: removeInvoiceServiceLine,
  [RESET_EMAIL_INVOICE_DETAIL]: resetEmailInvoiceDetail,
  [RESET_OPEN_SEND_EMAIL]: resetOpenSendEmailParam,
  [UPDATE_INVOICE_ID_AFTER_CREATE]: updateInvoiceIdAfterCreate,
  [UPDATE_EMAIL_INVOICE_DETAIL]: updateEmailInvoiceDetail,
  [SET_ALERT]: setAlert,
  [SET_MODAL_ALERT]: setModalAlert,
  [SET_MODAL_TYPE]: setModalType,
  [UPDATE_INVOICE_PAYMENT_AMOUNT]: updatePaymentAmount,
};

const invoiceServiceReducer = createReducer(getDefaultState(), handlers);

export default invoiceServiceReducer;
