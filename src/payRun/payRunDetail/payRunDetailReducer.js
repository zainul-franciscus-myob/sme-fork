import {
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  LOAD_PAY_RUN_DETAILS,
  PRINT_TAB_SELECT_ALL,
  PRINT_TAB_SELECT_ITEM,
  SET_LOADING_STATE, SET_PDF_LOADING_STATE,
  SET_TAB,
} from './payRunDetailIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isLoading: true,
  selectedTab: 'email-pay-slips',
  emailPaySlipEmployees: [],
  printPaySlipEmployees: [],
  totalNetPay: '',
  paymentPeriodStart: '',
  paymentPeriodEnd: '',
  paymentDate: '',
  emailSettings: undefined,
});

const resetState = () => (getDefaultState());

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setSelectedTab = (state, action) => ({
  ...state,
  selectedTab: action.selectedTab,
});

const emailTabSelectAll = (state, action) => ({
  ...state,
  emailPaySlipEmployees: state.emailPaySlipEmployees.map(e => ({
    ...e,
    isSelected: action.isSelected,
  })),
});

const emailTabSelectItem = (state, action) => ({
  ...state,
  emailPaySlipEmployees: state.emailPaySlipEmployees.map(e => (
    e === action.item ? { ...action.item, isSelected: action.isSelected } : e)),
});

const printTabSelectAll = (state, action) => ({
  ...state,
  printPaySlipEmployees: state.printPaySlipEmployees.map(e => ({
    ...e,
    isSelected: action.isSelected,
  })),
});

const printTabSelectItem = (state, action) => ({
  ...state,
  printPaySlipEmployees: state.printPaySlipEmployees.map(e => (
    e === action.item ? { ...action.item, isSelected: action.isSelected } : e)),
});

const loadPayRunDetails = (state, action) => ({
  ...state,
  totalNetPay: action.response.totalNetPay,
  paymentPeriodStart: action.response.paymentPeriodStart,
  paymentPeriodEnd: action.response.paymentPeriodEnd,
  paymentDate: action.response.paymentDate,
  emailPaySlipEmployees: action.response.emailPaySlipEmployees.map(e => (
    { ...e, isSelected: true }
  )),
  printPaySlipEmployees: action.response.printPaySlipEmployees.map(e => (
    { ...e, isSelected: true }
  )),
  emailSettings: action.response.emailSettings,
});

const setPdfIsLoading = (state, { transactionId, isLoading }) => ({
  ...state,
  emailPaySlipEmployees: state.emailPaySlipEmployees.map(e => (
    e.transactionId === transactionId ? { ...e, isLoading } : e)),
  printPaySlipEmployees: state.printPaySlipEmployees.map(e => (
    e.transactionId === transactionId ? { ...e, isLoading } : e)),
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_PDF_LOADING_STATE]: setPdfIsLoading,
  [SET_TAB]: setSelectedTab,
  [EMAIL_TAB_SELECT_ALL]: emailTabSelectAll,
  [EMAIL_TAB_SELECT_ITEM]: emailTabSelectItem,
  [PRINT_TAB_SELECT_ALL]: printTabSelectAll,
  [PRINT_TAB_SELECT_ITEM]: printTabSelectItem,
  [LOAD_PAY_RUN_DETAILS]: loadPayRunDetails,
};

const payRunDetailReducer = createReducer(getDefaultState(), handlers);

export default payRunDetailReducer;
