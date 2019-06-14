import dateFormat from 'dateformat';

import {
  ADD_INVOICE_SERVICE_LINE,
  FORMAT_INVOICE_SERVICE_LINE,
  GET_CALCULATED_INVOICE_DETAIL_TOTALS,
  REMOVE_INVOICE_SERVICE_LINE,
  RESET_TOTALS,
  UPDATE_INVOICE_SERVICE_HEADER_OPTIONS,
  UPDATE_INVOICE_SERVICE_LINE,
} from './InvoiceServiceIntents';
import {
  CLOSE_MODAL,
  LOAD_CONTACT_ADDRESS,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
} from '../InvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { getDefaultTaxCodeId, getLineByIndex } from './invoiceServiceSelectors';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

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
    onlinePaymentMethod: '',
    lines: [],
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
  modalType: '',
  alertMessage: '',
  isSubmitting: false,
});

const setInitalState = (state, action) => {
  const defaultState = getDefaultState();

  return ({
    ...defaultState,
    ...action.context,
    invoice: {
      ...defaultState.invoice,
      ...action.invoice,
    },
    contactOptions: action.contactOptions || defaultState.contactOptions,
    expirationTermOptions: action.expirationTermOptions || defaultState.expirationTermOptions,
    newLine: action.newLine || defaultState.newLine,
    totals: action.totals || defaultState.totals,
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

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitalState,
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
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const invoiceServiceReducer = createReducer(getDefaultState(), handlers);

export default invoiceServiceReducer;
