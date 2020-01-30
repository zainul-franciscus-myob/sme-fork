import {
  ADD_RECEIVE_MONEY_LINE,
  CLOSE_MODAL,
  DELETE_RECEIVE_MONEY_LINE,
  FORMAT_RECEIVE_MONEY_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  OPEN_MODAL,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_RECEIVE_MONEY_HEADER,
  UPDATE_RECEIVE_MONEY_LINE,
} from '../ReceiveMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getDefaultTaxCodeId } from './receiveMoneyDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
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
  },
  newLine: {
    accountId: '',
    amount: '',
    units: '',
    description: '',
    taxCodeId: '',
  },
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  depositIntoAccountOptions: [],
  payFromContactOptions: [],
  accountOptions: [],
  taxCodeOptions: [],
  modal: undefined,
  alertMessage: '',
  loadingState: LoadingState.LOADING,
  pageTitle: '',
  isSubmitting: false,
  isPageEdited: false,
  businessId: '',
  region: '',
});

const pageEdited = { isPageEdited: true };

const resetState = () => (getDefaultState());
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
  pageTitle: action.pageTitle,
  depositIntoAccountOptions: action.depositIntoAccountOptions,
  payFromContactOptions: action.payFromContactOptions,
  accountOptions: action.accountOptions,
  taxCodeOptions: action.taxCodeOptions,
});

const isAccountLineItem = lineKey => lineKey === 'accountId';
const updateReceiveMoneyLine = (line, { lineKey, lineValue }, accountOptions) => {
  const updatedLine = {
    ...line,
    [lineKey]: lineValue,
  };

  return isAccountLineItem(lineKey)
    ? {
      ...updatedLine,
      taxCodeId: getDefaultTaxCodeId({ accountId: lineValue }, accountOptions),
    }
    : updatedLine;
};
const getLinesForUpdate = (action, lines, accountOptions) => lines.map((line, index) => (
  index === action.lineIndex ? updateReceiveMoneyLine(line, action, accountOptions) : line
));

const updateLine = (state, action) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    lines: getLinesForUpdate(action, state.receiveMoney.lines, state.accountOptions),
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
        taxCodeId: getDefaultTaxCodeId({ ...state.newLine, ...action.line }, state.accountOptions),
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

const updateHeader = (state, action) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    [action.key]: action.value,
  },
});

const loadNewReceiveMoney = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    ...action.receiveMoney,
    date: formatIsoDate(new Date()),
    originalReferenceId: action.receiveMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  pageTitle: action.pageTitle,
  depositIntoAccountOptions: action.depositIntoAccountOptions,
  payFromContactOptions: action.payFromContactOptions,
  accountOptions: action.accountOptions,
  taxCodeOptions: action.taxCodeOptions,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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
  modal: action.modal,
});

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const getTaxCalculations = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    lines: action.lines,
  },
  totals: action.totals,
});

const resetTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [LOAD_NEW_RECEIVE_MONEY]: loadNewReceiveMoney,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [UPDATE_RECEIVE_MONEY_HEADER]: updateHeader,
  [UPDATE_RECEIVE_MONEY_LINE]: updateLine,
  [ADD_RECEIVE_MONEY_LINE]: addLine,
  [DELETE_RECEIVE_MONEY_LINE]: deleteLine,
  [FORMAT_RECEIVE_MONEY_LINE]: formatLine,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_TOTALS]: resetTotals,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
};
const receiveMoneyReducer = createReducer(getDefaultState(), handlers);

export default receiveMoneyReducer;
