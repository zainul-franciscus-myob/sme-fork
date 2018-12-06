import { getDefaultTaxCodeId } from './spendMoneyDetailSelectors';
import SpendMoneyIntents from '../SpendMoneyIntents';
import SystemIntents from '../../SystemIntents';
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
};

const resetState = () => (initialState);

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
  spendMoney: {
    ...state.spendMoney,
    lines: getLinesForUpdate(action, state.spendMoney.lines),
  },
});

const addLine = (state, action) => ({
  ...state,
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
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.filter((item, index) => index !== action.index),
  },
});

const updateHeader = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    [action.key]: action.value,
  },
});

const loadNewSpendMoney = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    ...action.spendMoney,
    originalReferenceId: action.spendMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
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

const handlers = {
  [SpendMoneyIntents.UPDATE_SPEND_MONEY_HEADER]: updateHeader,
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: loadNewSpendMoney,
  [SpendMoneyIntents.GET_CALCULATED_TOTALS]: getCalculateTotals,
  [SpendMoneyIntents.LOAD_REFERENCE_ID]: loadReferenceId,
  [SpendMoneyIntents.UPDATE_SPEND_MONEY_LINE]: updateLine,
  [SpendMoneyIntents.ADD_SPEND_MONEY_LINE]: addLine,
  [SpendMoneyIntents.DELETE_SPEND_MONEY_LINE]: deleteLine,
  [SpendMoneyIntents.FORMAT_SPEND_MONEY_LINE]: formatLine,
  [SpendMoneyIntents.SET_LOADING_STATE]: setLoadingState,
  [SpendMoneyIntents.SET_SUBMITTING_STATE]: setSubmittingState,
  [SpendMoneyIntents.SET_ALERT_MESSAGE]: setAlertMessage,
  [SpendMoneyIntents.OPEN_MODAL]: openModal,
  [SpendMoneyIntents.CLOSE_MODAL]: closeModal,
  [SystemIntents.RESET_STATE]: resetState,
};
const spendMoneyReducer = createReducer(initialState, handlers);

export default spendMoneyReducer;
