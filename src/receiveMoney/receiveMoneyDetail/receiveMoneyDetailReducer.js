import dateFormat from 'dateformat';

import { getDefaultTaxCodeId } from './receiveMoneyDetailSelectors';
import ReceiveMoneyIntents from '../ReceiveMoneyIntents';
import SystemIntents from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const initialState = {
  receiveMoney: {
    id: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    isTaxInclusive: false,
    isReportable: false,
    description: '',
    selectedDepositIntoAccountId: '',
    selectedPayFromContactId: '',
    lines: [],
    depositIntoAccounts: [],
    payFromContacts: [],
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
const formatStringNumber = num => parseFloat(num).toFixed(2).toString();
const formatLine = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    lines: state.receiveMoney.lines.map(
      ({ amount, ...line }, index) => (
        {
          amount: index === action.index && amount ? formatStringNumber(amount) : amount,
          ...line,
        }
      ),
    ),
  },
});

const loadReceiveMoneyDetail = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    ...action.receiveMoney,
    originalReferenceId: action.receiveMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  totals: action.totals,
  isLoading: false,
});

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const isAccountLineItem = lineKey => lineKey === 'accountId';
const updateReceiveMoneyLine = (line, { lineKey, lineValue }) => {
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
  index === action.lineIndex ? updateReceiveMoneyLine(line, action) : line
));

const updateLine = (state, action) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    lines: getLinesForUpdate(action, state.receiveMoney.lines),
  },
});

const addLine = (state, action) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    lines: [
      ...state.receiveMoney.lines,
      {
        ...state.newLine,
        ...action.line,
        taxCodeId: getDefaultTaxCodeId({ ...state.newLine, ...action.line }),
      },
    ],
  },
});

const deleteLine = (state, action) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    lines: state.receiveMoney.lines.filter((item, index) => index !== action.index),
  },
});

const isDateOptionChange = filterName => filterName === 'date';

const updateHeader = (state, action) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    [action.key]: isDateOptionChange(action.key)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const loadNewReceiveMoney = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    ...action.receiveMoney,
    date: convertToDateString(Date.now()),
    originalReferenceId: action.receiveMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  isLoading: false,
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

const handlers = {
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [ReceiveMoneyIntents.LOAD_NEW_RECEIVE_MONEY]: loadNewReceiveMoney,
  [ReceiveMoneyIntents.GET_CALCULATED_TOTALS]: getCalculateTotals,
  [ReceiveMoneyIntents.UPDATE_RECEIVE_MONEY_HEADER]: updateHeader,
  [ReceiveMoneyIntents.UPDATE_RECEIVE_MONEY_LINE]: updateLine,
  [ReceiveMoneyIntents.ADD_RECEIVE_MONEY_LINE]: addLine,
  [ReceiveMoneyIntents.DELETE_RECEIVE_MONEY_LINE]: deleteLine,
  [ReceiveMoneyIntents.FORMAT_RECEIVE_MONEY_LINE]: formatLine,
  [ReceiveMoneyIntents.SET_LOADING_STATE]: setLoadingState,
  [ReceiveMoneyIntents.SET_SUBMITTING_STATE]: setSubmittingState,
  [ReceiveMoneyIntents.SET_ALERT_MESSAGE]: setAlertMessage,
  [ReceiveMoneyIntents.OPEN_MODAL]: openModal,
  [ReceiveMoneyIntents.CLOSE_MODAL]: closeModal,
  [SystemIntents.RESET_STATE]: resetState,
};
const receiveMoneyReducer = createReducer(initialState, handlers);

export default receiveMoneyReducer;
