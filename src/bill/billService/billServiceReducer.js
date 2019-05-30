import dateFormat from 'dateformat';

import {
  ADD_BILL_SERVICE_LINE,
  CLOSE_MODAL,
  FORMAT_BILL_SERVICE_LINE,
  GET_CALCULATED_BILL_DETAIL_TOTALS,
  LOAD_CUSTOMER_ADDRESS,
  OPEN_MODAL,
  REMOVE_BILL_SERVICE_LINE,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BILL_SERVICE_HEADER_OPTIONS,
  UPDATE_BILL_SERVICE_LINE,
} from '../BillIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { getDefaultTaxCodeId, getLineByIndex } from './billServiceSelectors';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const getDefaultState = () => ({
  isLoading: false,
  bill: {
    id: '',
    contactId: '',
    expirationTerm: '',
    expirationDays: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
    taxInclusive: true,
    isReportable: false,
    number: '',
    address: '',
    issueDate: convertToDateString(Date.now()),
    orderNumber: '',
    notes: '',
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

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitalState = (state, action) => {
  const defaultState = getDefaultState();

  return ({
    ...defaultState,
    ...action.context,
    bill: {
      ...defaultState.bill,
      ...action.bill,
    },
    contactOptions: action.contactOptions || defaultState.contactOptions,
    expirationTermOptions: action.expirationTermOptions || defaultState.expirationTermOptions,
    newLine: action.newLine || defaultState.newLine,
    totals: action.totals || defaultState.totals,
  });
};

const resetState = () => (getDefaultState());

const updateBillServiceHeaderOptions = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    [action.key]: action.value,
  },
});

const getUpdatedLines = (index, lines, newLine) => lines.map((line, lineIndex) => (
  lineIndex === index ? newLine : line
));

const isAccountLineItem = lineKey => lineKey === 'allocatedAccountId';

const isAmountLineItem = lineKey => lineKey === 'amount';

const limitToTwoDecimals = value => value.replace(/^(\d*)\.(\d{0,2})(\d*)/, '$1.$2');

const updateBillServiceLine = (state, action) => {
  const line = getLineByIndex(state, { index: action.index });
  const value = isAmountLineItem(action.key) ? limitToTwoDecimals(action.value) : action.value;
  const newLine = {
    ...line,
    taxCodeId: isAccountLineItem(action.key)
      ? getDefaultTaxCodeId({ accountId: action.value, accounts: line.accounts })
      : line.taxCodeId,
    [action.key]: value,
  };

  return ({
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      lines: getUpdatedLines(action.index, state.bill.lines, newLine),
    },
  });
};

const addBillServiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: [
      ...state.bill.lines,
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

const removeBillServiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: removeLine(state.bill.lines, action.index),
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

const loadContactAddress = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    address: action.address,
  },
});

const formatLineAmount = amount => parseFloat(amount).toFixed(2);

const formatBillServiceLine = (state, action) => {
  const line = getLineByIndex(state, { index: action.index });
  if (line) {
    const newLine = {
      ...line,
      amount: line.amount && formatLineAmount(line.amount),
    };

    return {
      ...state,
      bill: {
        ...state.bill,
        lines: getUpdatedLines(action.index, state.bill.lines, newLine),
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
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [LOAD_CUSTOMER_ADDRESS]: loadContactAddress,
  [UPDATE_BILL_SERVICE_HEADER_OPTIONS]: updateBillServiceHeaderOptions,
  [UPDATE_BILL_SERVICE_LINE]: updateBillServiceLine,
  [ADD_BILL_SERVICE_LINE]: addBillServiceLine,
  [REMOVE_BILL_SERVICE_LINE]: removeBillServiceLine,
  [FORMAT_BILL_SERVICE_LINE]: formatBillServiceLine,
  [GET_CALCULATED_BILL_DETAIL_TOTALS]: getCalculatedTotals,
  [RESET_TOTALS]: resetTotals,
  [SET_SUBMITTING_STATE]: setSubmittingState,
};

const billServiceReducer = createReducer(getDefaultState(), handlers);

export default billServiceReducer;
