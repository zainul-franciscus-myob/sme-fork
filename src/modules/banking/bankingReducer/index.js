import {
  ADD_ATTACHMENTS,
  ADD_MATCH_TRANSACTION_ADJUSTMENT,
  ADD_SPLIT_ALLOCATION_LINE,
  ALLOCATE_TRANSACTION,
  APPEND_NEW_ACCOUNT_TO_ALLOCATE_TABLE,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  CLOSE_MODAL,
  COLLAPSE_TRANSACTION_LINE,
  DELETE_SPLIT_ALLOCATION_LINE,
  EXPAND_ADJUSTMENT_SECTION,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_NEW_SPLIT_ALLOCATION,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  OPEN_MODAL,
  OPEN_REMOVE_ATTACHMENT_MODAL,
  REMOVE_ATTACHMENT,
  REMOVE_ATTACHMENT_BY_INDEX,
  REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
  RESET_BULK_ALLOCATION,
  SAVE_MATCH_TRANSACTION,
  SAVE_PENDING_NOTE,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SELECT_ALL_TRANSACTIONS,
  SELECT_TRANSACTION,
  SET_ALERT,
  SET_ATTACHMENTS_LOADING_STATE,
  SET_BULK_LOADING_STATE,
  SET_EDITING_NOTE_STATE,
  SET_ENTRY_FOCUS,
  SET_ENTRY_LOADING_STATE,
  SET_ERROR_STATE,
  SET_LOADING_SINGLE_ACCOUNT_STATE,
  SET_LOADING_STATE,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_MATCH_TRANSACTION_SORT_ORDER,
  SET_MATCH_TRANSFER_MONEY_LOADING_STATE,
  SET_MATCH_TRANSFER_MONEY_SELECTION,
  SET_MATCH_TRANSFER_MONEY_SORT_ORDER,
  SET_MODAL_ALERT,
  SET_OPEN_ENTRY_LOADING_STATE,
  SET_OPEN_ENTRY_POSITION,
  SET_OPERATION_IN_PROGRESS_STATE,
  SET_PENDING_NOTE,
  SET_SUBMMITTING_NOTE_STATE,
  SET_TABLE_LOADING_STATE,
  SET_TRANSFER_MONEY_DETAIL,
  SHOW_SELECTED_MATCH_TRANSACTIONS,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  SORT_MATCH_TRANSFER_MONEY,
  START_MODAL_BLOCKING,
  STOP_MODAL_BLOCKING,
  TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
  UNALLOCATE_OPEN_ENTRY_TRANSACTION,
  UNALLOCATE_TRANSACTION,
  UNMATCH_TRANSACTION,
  UNSELECT_TRANSACTIONS,
  UPDATE_BULK_ALLOCATION_OPTIONS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_MATCH_TRANSACTION_SELECTION,
  UPDATE_SELECTED_TRANSACTION_DETAILS,
  UPDATE_SPLIT_ALLOCATION_HEADER,
  UPDATE_SPLIT_ALLOCATION_LINE,
  UPDATE_UPLOAD_PROGRESS,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from '../BankingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  addAdjustment,
  expandAdjustmentSection,
  loadMatchTransactions,
  removeAdjustment,
  saveMatchTransaction,
  setMatchTransactionLoadingState,
  setMatchTransactionSortOrder,
  showSelectedMatchTransactions,
  sortAndFilterMatchTransactions,
  toggleMatchTransactionSelectAllState,
  updateAdjustment,
  updateMatchTransactionOptions,
  updateMatchTransactionSelection,
  updateSelectedTransactionDetails,
} from './matchTransactionHandlers';
import {
  addAttachments,
  collapseTransactionLine,
  loadAttachments,
  openRemoveAttachmentModal,
  removeAttachment,
  removeAttachmentByIndex,
  setAttachemntsLoadingState,
  setOpenEntryLoadingState,
  setOpenPosition,
  setOperationInProgressState,
  uploadAttachment,
  uploadAttachmentFailed,
  uploadAttachmentProgress,
} from './openEntryHandlers';
import {
  addSplitAllocationLine,
  appendAccountToAllocateTable,
  deleteSplitAllocationLine,
  loadNewSplitAllocation,
  loadSplitAllocation,
  saveSplitAllocation,
  updateSplitAllocationHeader,
  updateSplitAllocationLine,
} from './splitAllocationHandlers';
import { allocateTransaction, unallocateTransaction } from './allocateHandlers';
import { appliedTransactions } from './applyRuleResultHandlers';
import {
  bulkAllocateTransactions,
  bulkUnallocateTransactions,
  resetBulkAllocation,
  selectAllTransactions,
  selectTransaction,
  setBulkLoading,
  unselectTransactions,
  updateBulkAllocationOptions,
} from './bulkAllocationHandlers';
import {
  loadMatchTransferMoney,
  loadTransferMoney,
  saveTransferMoney,
  setMatchTransferMoneyLoadingState,
  setMatchTransferMoneySelection,
  setMatchTransferMoneySortOrder,
  sortMatchTransferMoney,
  updateTransferMoney,
} from './transferMoneyHandlers';
import TransactionTypes from '../TransactionTypes';
import bankingRuleHandlers from '../bankingRule/bankingRuleReducers';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';
import getDefaultState from './getDefaultState';
import wrapHandlers from '../../../store/wrapHandlers';

const resetState = () => (getDefaultState());

const loadBankTransactions = (state, action) => ({
  ...state,
  bankAccounts: action.bankAccounts,
  withdrawalAccounts: action.withdrawalAccounts,
  depositAccounts: action.depositAccounts,
  transferAccounts: action.transferAccounts,
  bulkAllocationAccounts: action.bulkAllocationAccounts,
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
  filterOptions: {
    ...state.filterOptions,
    bankAccount: action.bankAccount,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    bankAccount: action.bankAccount,
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

const setErrorState = (state, action) => ({
  ...state,
  hasError: action.hasError,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const getTransactionType = transactionType => (transactionType === 'Linked'
  ? TransactionTypes.ALLOCATED
  : TransactionTypes.UNALLOCATED);

const setDate = (date, dateInState) => {
  const dateObject = new Date(date);
  return Number.isNaN(dateObject.getDate()) ? dateInState : formatIsoDate(dateObject);
};

const setInitialState = (state, action) => {
  const transactionType = getTransactionType(action.context.transactionType);

  const dates = transactionType === TransactionTypes.ALLOCATED ? {
    dateFrom: setDate(action.context.dateFrom, state.filterOptions.dateFrom),
    dateTo: setDate(action.context.dateTo, state.filterOptions.dateTo),
  } : {};

  const filterOptions = {
    ...state.filterOptions,
    ...dates,
    transactionType,
  };

  const appliedDates = transactionType === TransactionTypes.ALLOCATED ? {
    dateFrom: setDate(action.context.dateFrom, state.appliedFilterOptions.dateFrom),
    dateTo: setDate(action.context.dateTo, state.appliedFilterOptions.dateTo),
  } : {};

  const appliedFilterOptions = {
    ...state.appliedFilterOptions,
    ...appliedDates,
    transactionType,
  };

  return {
    ...state,
    ...action.context,
    filterOptions,
    appliedFilterOptions,
  };
};

export const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

export const closeModal = state => ({
  ...state,
  modalType: '',
});

export const startModalBlocking = state => ({
  ...state,
  isModalBlocking: true,
});

export const stopModalBlocking = state => ({
  ...state,
  isModalBlocking: false,

});

export const setModalAlert = (state, action) => ({
  ...state,
  modalAlert: action.modalAlert,
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

const setEditingNoteState = (state, { editingNotePosition }) => {
  const entry = state.entries[editingNotePosition] || {};
  const pendingNote = entry.note || entry.description;

  return ({
    ...state,
    editingNotePosition,
    pendingNote,
  });
};

const setPendingNote = (state, { pendingNote }) => ({
  ...state,
  pendingNote,
});

const savePendingNote = (state) => {
  const { editingNotePosition, entries, pendingNote } = state;
  const newEntries = entries.map((entry, index) => (
    index === editingNotePosition ? { ...entry, note: pendingNote } : entry
  ));

  return ({
    ...state,
    editingNotePosition: undefined,
    pendingNote: undefined,
    entries: newEntries,
  });
};

const setSubmittingNoteState = (state, action) => ({
  ...state,
  isSubmittingNote: action.isSubmittingNote,
});

export const loadAccountAfterCreate = (state, { account }) => ({
  ...state,
  withdrawalAccounts: [
    account,
    ...state.withdrawalAccounts,
  ],
  depositAccounts: [
    account,
    ...state.depositAccounts,
  ],
});

export const setLoadingSingleAccountState = (state, action) => ({
  ...state,
  isLoadingAccount: action.isLoadingAccount,
});

const handlers = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: sortAndFilterBankTransactions,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ERROR_STATE]: setErrorState,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_ENTRY_FOCUS]: setEntryFocus,
  [SET_ENTRY_LOADING_STATE]: setEntryLoading,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [START_MODAL_BLOCKING]: startModalBlocking,
  [STOP_MODAL_BLOCKING]: stopModalBlocking,
  [SET_MODAL_ALERT]: setModalAlert,
  [ALLOCATE_TRANSACTION]: allocateTransaction,
  [UNALLOCATE_TRANSACTION]: unallocateTransaction,
  [COLLAPSE_TRANSACTION_LINE]: collapseTransactionLine,
  [SET_OPEN_ENTRY_POSITION]: setOpenPosition,
  [SET_OPEN_ENTRY_LOADING_STATE]: setOpenEntryLoadingState,
  [UNALLOCATE_OPEN_ENTRY_TRANSACTION]: unallocateTransaction,
  [UNMATCH_TRANSACTION]: unallocateTransaction,
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
  [UPDATE_SELECTED_TRANSACTION_DETAILS]: updateSelectedTransactionDetails,
  [ADD_MATCH_TRANSACTION_ADJUSTMENT]: addAdjustment,
  [UPDATE_MATCH_TRANSACTION_ADJUSTMENT]: updateAdjustment,
  [REMOVE_MATCH_TRANSACTION_ADJUSTMENT]: removeAdjustment,
  [EXPAND_ADJUSTMENT_SECTION]: expandAdjustmentSection,
  [TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE]: toggleMatchTransactionSelectAllState,
  [SET_MATCH_TRANSACTION_LOADING_STATE]: setMatchTransactionLoadingState,
  [LOAD_MATCH_TRANSFER_MONEY]: loadMatchTransferMoney,
  [SORT_MATCH_TRANSFER_MONEY]: sortMatchTransferMoney,
  [SET_MATCH_TRANSFER_MONEY_SORT_ORDER]: setMatchTransferMoneySortOrder,
  [SET_MATCH_TRANSFER_MONEY_SELECTION]: setMatchTransferMoneySelection,
  [SET_MATCH_TRANSFER_MONEY_LOADING_STATE]: setMatchTransferMoneyLoadingState,
  [LOAD_TRANSFER_MONEY]: loadTransferMoney,
  [SET_TRANSFER_MONEY_DETAIL]: updateTransferMoney,
  [SAVE_TRANSFER_MONEY]: saveTransferMoney,
  [SELECT_TRANSACTION]: selectTransaction,
  [SELECT_ALL_TRANSACTIONS]: selectAllTransactions,
  [UPDATE_BULK_ALLOCATION_OPTIONS]: updateBulkAllocationOptions,
  [BULK_ALLOCATE_TRANSACTIONS]: bulkAllocateTransactions,
  [BULK_UNALLOCATE_TRANSACTIONS]: bulkUnallocateTransactions,
  [RESET_BULK_ALLOCATION]: resetBulkAllocation,
  [SET_BULK_LOADING_STATE]: setBulkLoading,
  [APPLY_RULE_TO_TRANSACTIONS]: appliedTransactions,
  [UNSELECT_TRANSACTIONS]: unselectTransactions,
  [SET_ATTACHMENTS_LOADING_STATE]: setAttachemntsLoadingState,
  [LOAD_ATTACHMENTS]: loadAttachments,
  [ADD_ATTACHMENTS]: addAttachments,
  [UPLOAD_ATTACHMENT]: uploadAttachment,
  [UPDATE_UPLOAD_PROGRESS]: uploadAttachmentProgress,
  [UPLOAD_ATTACHMENT_FAILED]: uploadAttachmentFailed,
  [OPEN_REMOVE_ATTACHMENT_MODAL]: openRemoveAttachmentModal,
  [REMOVE_ATTACHMENT_BY_INDEX]: removeAttachmentByIndex,
  [REMOVE_ATTACHMENT]: removeAttachment,
  [SET_OPERATION_IN_PROGRESS_STATE]: setOperationInProgressState,
  [SHOW_SELECTED_MATCH_TRANSACTIONS]: showSelectedMatchTransactions,
  [SET_EDITING_NOTE_STATE]: setEditingNoteState,
  [SET_SUBMMITTING_NOTE_STATE]: setSubmittingNoteState,
  [SET_PENDING_NOTE]: setPendingNote,
  [SAVE_PENDING_NOTE]: savePendingNote,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [APPEND_NEW_ACCOUNT_TO_ALLOCATE_TABLE]: appendAccountToAllocateTable,
  [SET_LOADING_SINGLE_ACCOUNT_STATE]: setLoadingSingleAccountState,
  ...wrapHandlers('bankingRuleModal', bankingRuleHandlers),
};

const bankingReducer = createReducer(getDefaultState(), handlers);

export default bankingReducer;
