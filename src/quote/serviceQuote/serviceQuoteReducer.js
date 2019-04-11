import dateFormat from 'dateformat';

import {
  ADD_SERVICE_QUOTE_LINE,
  CLOSE_MODAL,
  FORMAT_SERVICE_QUOTE_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_NEW_SERVICE_QUOTE,
  LOAD_SERVICE_QUOTE_DETAIL,
  OPEN_MODAL,
  REMOVE_SERVICE_QUOTE_LINE,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
  UPDATE_SERVICE_QUOTE_LINE,
} from '../QuoteIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { getDefaultTaxCodeId, getLineByIndex } from './ServiceQuoteSelectors';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const getDefaultState = () => ({
  isLoading: true,
  quote: {
    id: '',
    customerId: '',
    expirationTerm: '',
    expirationDays: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
    taxInclusive: true,
    quoteNumber: '',
    address: '',
    issueDate: convertToDateString(Date.now()),
    purchaseOrderNumber: '',
    notesToCustomer: '',
    lines: [],
  },
  customerOptions: [],
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
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  businessId: '',
  region: '',
  isPageEdited: false,
  modalType: '',
  alertMessage: '',
  isSubmitting: false,
});

const isDateOptionChange = filterName => filterName === 'issueDate';

const loadNewServiceQuote = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    ...action.quote,
  },
  customerOptions: action.customerOptions,
  expirationTermOptions: action.expirationTermOptions,
  newLine: action.newLine,
});

const loadServiceQuoteDetail = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    ...action.quote,
  },
  customerOptions: action.customerOptions,
  expirationTermOptions: action.expirationTermOptions,
  newLine: action.newLine,
  totals: action.totals,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitalState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => (getDefaultState());

const updateServiceQuoteHeaderOptions = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    [action.key]: isDateOptionChange(action.key)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const getUpdatedLines = (index, lines, newLine) => lines.map((line, lineIndex) => (
  lineIndex === index ? newLine : line
));

const isAccountLineItem = lineKey => lineKey === 'allocatedAccountId';
const isAmountLineItem = lineKey => lineKey === 'amount';
const limitToTwoDecimals = value => value.replace(/^(\d*)\.(\d{0,2})(\d*)/, '$1.$2');
const updateServiceQuoteLine = (state, action) => {
  const line = getLineByIndex(state, { index: action.index });
  const value = isAmountLineItem(action.key) ? limitToTwoDecimals(action.value) : action.value;
  const newLine = {
    ...line,
    [action.key]: value,
    taxCodeId: isAccountLineItem(action.key)
      ? getDefaultTaxCodeId({ accountId: action.value, accounts: line.accounts })
      : line.taxCodeId,
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
        ...action.line,
        taxCodeId: getDefaultTaxCodeId({
          ...state.newLine,
          accountId: action.line.allocatedAccountId,
        }),
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

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
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

const formatLineAmount = amount => parseFloat(amount).toFixed(2);
const formatServiceQuoteLine = (state, action) => {
  const line = getLineByIndex(state, { index: action.index });
  if (line) {
    const newLine = {
      ...line,
      amount: line.amount && formatLineAmount(line.amount),
    };

    return {
      ...state,
      quote: {
        ...state.quote,
        lines: getUpdatedLines(action.index, state.quote.lines, newLine),
      },
    };
  }

  return state;
};

const resetTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});

const handlers = {
  [LOAD_SERVICE_QUOTE_DETAIL]: loadServiceQuoteDetail,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [UPDATE_SERVICE_QUOTE_HEADER_OPTIONS]: updateServiceQuoteHeaderOptions,
  [UPDATE_SERVICE_QUOTE_LINE]: updateServiceQuoteLine,
  [ADD_SERVICE_QUOTE_LINE]: addServiceQuoteLine,
  [REMOVE_SERVICE_QUOTE_LINE]: removeServiceQuoteLine,
  [GET_CALCULATED_TOTALS]: getCalculatedTotals,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [LOAD_NEW_SERVICE_QUOTE]: loadNewServiceQuote,
  [LOAD_CUSTOMER_ADDRESS]: loadCustomerAddress,
  [FORMAT_SERVICE_QUOTE_LINE]: formatServiceQuoteLine,
  [RESET_TOTALS]: resetTotals,
};

const serviceQuoteReducer = createReducer(getDefaultState(), handlers);

export default serviceQuoteReducer;
