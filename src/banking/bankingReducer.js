import dateFormat from 'dateformat';

import {
  LOAD_BANK_TRANSACTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UPDATE_FILTER_OPTIONS,
} from './BankingIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../SystemIntents';
import createReducer from '../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');
const getDefaultDateRange = () => new Date().setMonth(new Date().getMonth() - 3);

const getDefaultState = () => ({
  entries: [],
  balances: {
    bankBalance: '',
    myobBalance: '',
    unallocated: '',
  },
  bankAccounts: [],
  transactionTypes: [],
  filterOptions: {
    transactionType: '',
    bankAccount: '',
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  appliedFilterOptions: {
    transactionType: '',
    bankAccount: '',
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  orderBy: '',
  sortOrder: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  businessId: '',
  region: '',
});

const resetState = () => (getDefaultState());

const loadBankTransactions = (state, action) => ({
  ...state,
  bankAccounts: action.bankAccounts,
  transactionTypes: action.transactionTypes,
  balances: action.balances,
  entries: action.entries,
  sortOrder: action.sortOrder,
  filterOptions: {
    ...state.filterOptions,
    bankAccount: action.bankAccount,
    transactionType: action.transactionType,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    bankAccount: action.bankAccount,
    transactionType: action.transactionType,
  },
});

const isDateFilterChange = filterName => filterName === 'dateTo' || filterName === 'dateFrom';

const sortAndFilterBankTransactions = (state, action) => ({
  ...state,
  entries: action.entries,
  balances: action.balances,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: isDateFilterChange(action.filterName)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: sortAndFilterBankTransactions,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
};

const bankingReducer = createReducer(getDefaultState(), handlers);

export default bankingReducer;
