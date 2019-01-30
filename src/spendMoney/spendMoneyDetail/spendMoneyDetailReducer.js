import dateFormat from 'dateformat';

import {
  ADD_SPEND_MONEY_LINE,
  CLOSE_MODAL,
  DELETE_SPEND_MONEY_LINE,
  FORMAT_SPEND_MONEY_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  OPEN_MODAL,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_SPEND_MONEY_HEADER,
  UPDATE_SPEND_MONEY_LINE,
} from '../SpendMoneyIntents';
import {
  RESET_STATE,
} from '../../SystemIntents';
import { getDefaultTaxCodeId } from './spendMoneyDetailSelectors';
import createReducer from '../../store/createReducer';

const initialState = {
  spendMoney: {
    id: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    isTaxInclusive: false,
    isReportable: false,
    description: '',
    selectedPayFromAccountId: '',
    selectedPayToContactId: '',
    lines: [],
    payFromAccounts: [],
    payToContacts: [],
  },
  newLine: {
    accountId: '',
    amount: '',
    description: '',
    taxCodeId: '',
    taxAmount: '',
    accounts: [],
    taxCodes: [],
  },
  totals: {
    netAmount: '0.00',
    totalTax: '0.00',
    totalAmount: '0.00',
  },
  modalType: '',
  alertMessage: '',
  isLoading: true,
  isSubmitting: false,
  isPageEdited: false,
};

const pageEdited = { isPageEdited: true };

const resetState = () => (initialState);

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const isAccountLineItem = lineKey => lineKey === 'accountId';
const updateSpendMoneyLine = (line, { lineKey, lineValue }) => {
  const updatedLine = {
    ...line,
    [lineKey]: lineValue,
  };

  const { accounts } = line;
  return isAccountLineItem(lineKey)
    ? {
      ...updatedLine,
      taxCodeId: getDefaultTaxCodeId({ accountId: lineValue, accounts }),
    }
    : updatedLine;
};
const getLinesForUpdate = (action, lines) => lines.map((line, index) => (
  index === action.lineIndex ? updateSpendMoneyLine(line, action) : line
));

const updateLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: getLinesForUpdate(action, state.spendMoney.lines),
  },
});

const addLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: [
      ...state.spendMoney.lines,
      {
        ...state.newLine,
        ...action.line,
        taxCodeId: getDefaultTaxCodeId({ ...state.newLine, ...action.line }),
      },
    ],
  },
});

const formatStringNumber = num => parseFloat(num).toFixed(2).toString();
const formatLine = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.map(
      ({ amount, ...line }, index) => (
        {
          amount: index === action.index && amount ? formatStringNumber(amount) : amount,
          ...line,
        }
      ),
    ),
  },
});

const deleteLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.filter((item, index) => index !== action.index),
  },
});

const isDateOptionChange = filterName => filterName === 'date';

const updateHeader = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    [action.key]: isDateOptionChange(action.key)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const loadNewSpendMoney = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    ...action.spendMoney,
    date: convertToDateString(Date.now()),
    originalReferenceId: action.spendMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  isLoading: false,
});

const loadSpendMoneyDetail = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    ...action.spendMoney,
    originalReferenceId: action.spendMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  totals: action.totals,
  isLoading: false,
});

const loadReferenceId = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    referenceId: action.referenceId,
    originalReferenceId: action.referenceId,
  },
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
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

const getCalculateTotals = (state, action) => ({
  ...state,
  totals: action.totals,
});

const resetTotals = state => ({
  ...state,
  totals: initialState.totals,
});

const handlers = {
  [UPDATE_SPEND_MONEY_HEADER]: updateHeader,
  [LOAD_NEW_SPEND_MONEY]: loadNewSpendMoney,
  [LOAD_SPEND_MONEY_DETAIL]: loadSpendMoneyDetail,
  [GET_CALCULATED_TOTALS]: getCalculateTotals,
  [LOAD_REFERENCE_ID]: loadReferenceId,
  [UPDATE_SPEND_MONEY_LINE]: updateLine,
  [ADD_SPEND_MONEY_LINE]: addLine,
  [DELETE_SPEND_MONEY_LINE]: deleteLine,
  [FORMAT_SPEND_MONEY_LINE]: formatLine,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_TOTALS]: resetTotals,
  [RESET_STATE]: resetState,
};
const spendMoneyReducer = createReducer(initialState, handlers);

export default spendMoneyReducer;
