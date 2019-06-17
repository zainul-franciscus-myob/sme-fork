import {
  ADD_SPLIT_ALLOCATION_LINE,
  ALLOCATE_TRANSACTION,
  CLEAR_BANK_FEEDS_LOGIN,
  CLOSE_MODAL,
  COLLAPSE_TRANSACTION_LINE,
  DELETE_SPLIT_ALLOCATION_LINE,
  LOAD_BANK_TRANSACTIONS,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_NEW_SPLIT_ALLOCATION,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_PAYMENT_ALLOCATION,
  LOAD_PAYMENT_ALLOCATION_LINES,
  LOAD_PAYMENT_ALLOCATION_OPTIONS,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  OPEN_MODAL,
  RESET_FILTER_OPTIONS,
  SAVE_MATCH_TRANSACTION,
  SAVE_PAYMENT_ALLOCATION,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SET_ALERT,
  SET_ENTRY_FOCUS,
  SET_ENTRY_LOADING_STATE,
  SET_FETCHING_TRANSACTIONS_STATE,
  SET_LOADING_STATE,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_MATCH_TRANSACTION_SORT_ORDER,
  SET_OPEN_ENTRY_LOADING_STATE,
  SET_OPEN_ENTRY_POSITION,
  SET_PAYMENT_ALLOCATION_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UNALLOCATE_OPEN_ENTRY_TRANSACTION,
  UNALLOCATE_TRANSACTION,
  UPDATE_BANK_FEEDS_LOGIN,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_MATCH_TRANSACTION_SELECTION,
  UPDATE_PAYMENT_ALLOCATION_LINE,
  UPDATE_PAYMENT_ALLOCATION_OPTIONS,
  UPDATE_SPLIT_ALLOCATION_HEADER,
  UPDATE_SPLIT_ALLOCATION_LINE,
  UPDATE_TRANSFER_MONEY,
} from '../BankingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  addSplitAllocationLine,
  deleteSplitAllocationLine,
  loadNewSplitAllocation,
  loadSplitAllocation,
  saveSplitAllocation,
  updateSplitAllocationHeader,
  updateSplitAllocationLine,
} from './splitAllocationHandlers';
import {
  clearBankFeedsLoginDetails,
  resetFilterOptions,
  setIsFetchingTransactionsState,
  updateBankFeedsLoginDetails,
} from './bankFeedsLoginHandlers';
import { collapseTransactionLine, setOpenEntryLoadingState, setOpenPosition } from './openEntryHandlers';
import { getCalculatedAllocatedBalances, getCalculatedUnallocatedBalances } from '../bankingSelectors';
import {
  loadMatchTransactions,
  saveMatchTransaction,
  setMatchTransactionLoadingState,
  setMatchTransactionSortOrder,
  sortAndFilterMatchTransactions,
  updateMatchTransactionOptions,
  updateMatchTransactionSelection,
} from './matchTransactionHandlers';
import {
  loadNewTransferMoney,
  loadTransferMoney,
  saveTransferMoney,
  updateTransferMoney,
} from './transferMoneyHandlers';
import {
  loadPaymentAllocation,
  loadPaymentAllocationLines,
  loadPaymentAllocationOptions, savePaymentAllocation,
  setPaymentAllocationLoadingState,
  updatePaymentAllocationLine,
  updatePaymentAllocationOptions,
} from './paymentAllocationHandler';
import createReducer from '../../store/createReducer';
import getDefaultState from './getDefaultState';

const resetState = () => (getDefaultState());

const loadBankTransactions = (state, action) => ({
  ...state,
  bankAccounts: action.bankAccounts,
  withdrawalAccounts: action.withdrawalAccounts,
  depositAccounts: action.depositAccounts,
  transactionTypes: action.transactionTypes,
  transferAccounts: action.transferAccounts,
  balances: action.balances,
  contacts: action.contacts,
  suppliers: action.suppliers,
  customers: action.customers,
  taxCodes: action.taxCodes,
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

export const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

export const closeModal = state => ({
  ...state,
  modalType: '',
});

export const setEntryFocus = (state, action) => ({
  ...state,
  entries: state.entries.map(
    (entry, index) => (
      index === action.index ? { ...entry, isFocused: action.isFocused } : entry
    ),
  ),
});

export const setEntryLoading = (state, action) => ({
  ...state,
  entries: state.entries.map(
    (entry, index) => (
      index === action.index ? { ...entry, isLoading: action.isLoading } : entry
    ),
  ),
});


export const allocateTransaction = (state, action) => ({
  ...state,
  balances: getCalculatedAllocatedBalances(state, action.index),
  entries: state.entries.map(
    (entry, index) => (
      index === action.index
        ? {
          ...entry,
          isReportable: action.isReportable,
          allocateOrMatch: action.allocateOrMatch,
          journalId: action.journalId,
          journalLineId: action.journalLineId,
          sourceJournal: action.sourceJournal,
          type: action.type,
          taxCode: action.taxCode,
        }
        : entry
    ),
  ),
});

export const unallocateTransaction = (state, action) => ({
  ...state,
  balances: getCalculatedUnallocatedBalances(state, action.index),
  entries: state.entries.map(
    (entry, index) => (
      index === action.index
        ? {
          ...entry,
          allocateOrMatch: action.allocateOrMatch,
          journalId: '',
          journalLineId: '',
          sourceJournal: '',
          type: action.type,
          taxCode: '',
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
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [ALLOCATE_TRANSACTION]: allocateTransaction,
  [UNALLOCATE_TRANSACTION]: unallocateTransaction,
  [COLLAPSE_TRANSACTION_LINE]: collapseTransactionLine,
  [SET_OPEN_ENTRY_POSITION]: setOpenPosition,
  [SET_OPEN_ENTRY_LOADING_STATE]: setOpenEntryLoadingState,
  [UNALLOCATE_OPEN_ENTRY_TRANSACTION]: unallocateTransaction,
  [UPDATE_SPLIT_ALLOCATION_HEADER]: updateSplitAllocationHeader,
  [ADD_SPLIT_ALLOCATION_LINE]: addSplitAllocationLine,
  [UPDATE_SPLIT_ALLOCATION_LINE]: updateSplitAllocationLine,
  [DELETE_SPLIT_ALLOCATION_LINE]: deleteSplitAllocationLine,
  [LOAD_SPLIT_ALLOCATION]: loadSplitAllocation,
  [LOAD_NEW_SPLIT_ALLOCATION]: loadNewSplitAllocation,
  [SAVE_SPLIT_ALLOCATION]: saveSplitAllocation,
  [LOAD_MATCH_TRANSACTIONS]: loadMatchTransactions,
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: sortAndFilterMatchTransactions,
  [SAVE_MATCH_TRANSACTION]: saveMatchTransaction,
  [UPDATE_MATCH_TRANSACTION_OPTIONS]: updateMatchTransactionOptions,
  [SET_MATCH_TRANSACTION_SORT_ORDER]: setMatchTransactionSortOrder,
  [UPDATE_MATCH_TRANSACTION_SELECTION]: updateMatchTransactionSelection,
  [SET_MATCH_TRANSACTION_LOADING_STATE]: setMatchTransactionLoadingState,
  [LOAD_PAYMENT_ALLOCATION]: loadPaymentAllocation,
  [LOAD_PAYMENT_ALLOCATION_LINES]: loadPaymentAllocationLines,
  [SAVE_PAYMENT_ALLOCATION]: savePaymentAllocation,
  [LOAD_PAYMENT_ALLOCATION_OPTIONS]: loadPaymentAllocationOptions,
  [UPDATE_PAYMENT_ALLOCATION_OPTIONS]: updatePaymentAllocationOptions,
  [UPDATE_PAYMENT_ALLOCATION_LINE]: updatePaymentAllocationLine,
  [SET_PAYMENT_ALLOCATION_LOADING_STATE]: setPaymentAllocationLoadingState,
  [LOAD_TRANSFER_MONEY]: loadTransferMoney,
  [LOAD_NEW_TRANSFER_MONEY]: loadNewTransferMoney,
  [SAVE_TRANSFER_MONEY]: saveTransferMoney,
  [UPDATE_TRANSFER_MONEY]: updateTransferMoney,
  [UPDATE_BANK_FEEDS_LOGIN]: updateBankFeedsLoginDetails,
  [CLEAR_BANK_FEEDS_LOGIN]: clearBankFeedsLoginDetails,
  [SET_FETCHING_TRANSACTIONS_STATE]: setIsFetchingTransactionsState,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
};

const bankingReducer = createReducer(getDefaultState(), handlers);

export default bankingReducer;
