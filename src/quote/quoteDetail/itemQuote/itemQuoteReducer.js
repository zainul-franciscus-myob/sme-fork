import dateFormat from 'dateformat';

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
import { LOAD_CUSTOMER_ADDRESS, SET_ALERT } from '../../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const getDefaultState = () => ({
  businessId: '',
  quoteId: '',
  layout: '',
  quote: {
    customerId: '',
    address: '',
    expirationTerm: '',
    expirationDays: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
    isTaxInclusive: false,
    quoteNumber: '',
    purchaseOrder: '',
    issueDate: convertToDateString(Date.now()),
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
  alertMessage: '',
  isLineAmountInputDirty: false,
  isSubmitting: false,
  isPageEdited: false,
  isCalculating: false,
  modalType: undefined,
});

const setModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const setAlert = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setInitialState = (state, action) => {
  const defaultState = getDefaultState();

  return ({
    ...defaultState,
    ...action.context,
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

const handlers = {
  [SET_IS_CALCULATING]: setIsCalculating,
  [SET_IS_LINE_AMOUNT_INPUT_DIRTY]: setIsLineAmountInputDirty,
  [SET_MODAL]: setModal,
  [SET_ALERT]: setAlert,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_CUSTOMER_ADDRESS]: loadCustomerAddress,
  [FORMAT_LINE_AMOUNT_INPUTS]: formatLineAmountInputs,
  [RESET_STATE]: resetState,
  [UPDATE_ITEM_QUOTE_OPTION]: updateQuoteOption,
  [ADD_TABLE_ROW]: addTableRow,
  [CHANGE_TABLE_ROW]: changeTableRow,
  [REMOVE_TABLE_ROW]: removeTableRow,
  [CALCULATE_LINES]: calculateLines,
};

const itemQuoteReducer = createReducer(getDefaultState(), handlers);

export default itemQuoteReducer;
