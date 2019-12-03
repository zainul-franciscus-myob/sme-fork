import {
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  LOAD_PAY_RUN_DETAILS,
  PRINT_TAB_SELECT_ALL,
  PRINT_TAB_SELECT_ITEM,
  SET_LOADING_STATE,
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
  emailTab: {
    employees: [],
  },
  printTab: {
    employees: [],
  },
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
  emailTab: {
    ...state.emailTab,
    employees: state.emailTab.employees.map(e => ({
      ...e,
      isSelected: action.isSelected,
    })),
  },
});

const emailTabSelectItem = (state, action) => ({
  ...state,
  emailTab: {
    ...state.emailTab,
    employees: state.emailTab.employees.map(e => (
      e === action.item ? { ...action.item, isSelected: action.isSelected } : e)),
  },
});

const printTabSelectAll = (state, action) => ({
  ...state,
  printTab: {
    ...state.printTab,
    employees: state.printTab.employees.map(e => ({
      ...e,
      isSelected: action.isSelected,
    })),
  },
});

const printTabSelectItem = (state, action) => ({
  ...state,
  printTab: {
    ...state.printTab,
    employees: state.printTab.employees.map(e => (
      e === action.item ? { ...action.item, isSelected: action.isSelected } : e)),
  },
});

const loadPayRunDetails = (state, action) => ({
  ...state,
  totalNetPay: action.response.totalNetPay,
  paymentPeriodStart: action.response.paymentPeriodStart,
  paymentPeriodEnd: action.response.paymentPeriodEnd,
  paymentDate: action.response.paymentDate,
  emailTab: {
    ...state.emailTab,
    employees: action.response.emailPaySlipEmployees.map(e => (
      { ...e, isSelected: true }
    )),
  },
  printTab: {
    ...state.printTab,
    employees: action.response.printPaySlipEmployees.map(e => (
      { ...e, isSelected: true }
    )),
  },
  emailSettings: action.response.emailSettings,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TAB]: setSelectedTab,
  [EMAIL_TAB_SELECT_ALL]: emailTabSelectAll,
  [EMAIL_TAB_SELECT_ITEM]: emailTabSelectItem,
  [PRINT_TAB_SELECT_ALL]: printTabSelectAll,
  [PRINT_TAB_SELECT_ITEM]: printTabSelectItem,
  [LOAD_PAY_RUN_DETAILS]: loadPayRunDetails,
};

const payRunDetailReducer = createReducer(getDefaultState(), handlers);

export default payRunDetailReducer;
