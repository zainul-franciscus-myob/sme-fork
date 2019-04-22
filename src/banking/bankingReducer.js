import dateFormat from 'dateformat';

import {
  ALLOCATE_TRANSACTION,
  LOAD_BANK_TRANSACTIONS,
  SET_ALERT,
  SET_ENTRY_FOCUS,
  SET_ENTRY_LOADING_STATE,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UNALLOCATE_TRANSACTION,
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
  withdrawalAccounts: [],
  depositAccounts: [],
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
  withdrawalAccounts: action.withdrawalAccounts,
  depositAccounts: action.depositAccounts,
  transactionTypes: action.transactionTypes,
  balances: action.balances,
  entries: action.entries.map(entry => ({
    ...entry,
    isFocused: false,
    isLoading: false,
  })),
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
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

const sortAndFilterBankTransactions = (state, action) => ({
  ...state,
  entries: action.entries,
  balances: action.balances,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
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

const setEntryFocus = (state, action) => ({
  ...state,
  entries: state.entries.map(
    (entry, index) => (
      index === action.index ? { ...entry, isFocused: action.isFocused } : entry
    ),
  ),
});

const setEntryLoading = (state, action) => ({
  ...state,
  entries: state.entries.map(
    (entry, index) => (
      index === action.index ? { ...entry, isLoading: action.isLoading } : entry
    ),
  ),
});

const allocateTransaction = (state, action) => ({
  ...state,
  entries: state.entries.map(
    (entry, index) => (
      index === action.index
        ? {
          ...entry,
          isUnallocated: false,
          allocateOrMatch: action.allocateOrMatch,
          journalLineId: action.journalLineId,
          type: action.type,
        }
        : entry
    ),
  ),
});

const unallocateTransaction = (state, action) => ({
  ...state,
  entries: state.entries.map(
    (entry, index) => (
      index === action.index
        ? {
          ...entry,
          isUnallocated: true,
          allocateOrMatch: '',
          journalLineId: '',
        }
        : entry
    ),
  ),
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
  [SET_ENTRY_FOCUS]: setEntryFocus,
  [SET_ENTRY_LOADING_STATE]: setEntryLoading,
  [ALLOCATE_TRANSACTION]: allocateTransaction,
  [UNALLOCATE_TRANSACTION]: unallocateTransaction,
};

const bankingReducer = createReducer(getDefaultState(), handlers);

export default bankingReducer;
