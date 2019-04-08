import dateFormat from 'dateformat';

import {
  LOAD_SERVICE_QUOTE_DETAIL,
  SET_LOADING_STATE, UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
} from '../QuoteIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
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
    issueDate: '',
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
    subTotal: '',
    totalTax: '',
    totalAmount: '',
  },
});

const isDateOptionChange = filterName => filterName === 'issueDate';

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
  quote: {
    ...state.quote,
    [action.key]: isDateOptionChange(action.key)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const handlers = {
  [LOAD_SERVICE_QUOTE_DETAIL]: loadServiceQuoteDetail,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [UPDATE_SERVICE_QUOTE_HEADER_OPTIONS]: updateServiceQuoteHeaderOptions,
};

const serviceQuoteReducer = createReducer(getDefaultState(), handlers);

export default serviceQuoteReducer;
