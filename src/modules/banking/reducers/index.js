import {
  ADD_ATTACHMENTS,
  ADD_MATCH_TRANSACTION_ADJUSTMENT,
  ADD_SPLIT_ALLOCATION_LINE,
  ALLOCATE_TRANSACTION,
  APPEND_NEW_ACCOUNT_TO_ALLOCATE_TABLE,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  CALCULATE_SPLIT_ALLOCATION_TAX,
  CLOSE_BULK_ALLOCATION,
  CLOSE_MODAL,
  COLLAPSE_TRANSACTION_LINE,
  DELETE_SPLIT_ALLOCATION_LINE,
  EXPAND_ADJUSTMENT_SECTION,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_NEW_SPLIT_ALLOCATION,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  OPEN_BULK_ALLOCATION,
  OPEN_MODAL,
  OPEN_REMOVE_ATTACHMENT_MODAL,
  POPULATE_REMAINING_AMOUNT,
  REMOVE_ATTACHMENT,
  REMOVE_ATTACHMENT_BY_INDEX,
  REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
  RESET_BULK_ALLOCATION,
  RESET_FILTERS,
  RESET_MATCH_TRANSACTION_OPTIONS,
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
  SET_ENTRY_HOVERED,
  SET_ERROR_STATE,
  SET_FOCUS,
  SET_JOB_LOADING_STATE,
  SET_LAST_ALLOCATED_ACCOUNT,
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
  START_ENTRY_LOADING_STATE,
  START_LOADING_MORE,
  START_MODAL_BLOCKING,
  STOP_ENTRY_LOADING_STATE,
  STOP_LOADING_MORE,
  STOP_MODAL_BLOCKING,
  TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
  UNALLOCATE_TRANSACTION,
  UNSELECT_TRANSACTIONS,
  UPDATE_BULK_ALLOCATION_OPTIONS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_MATCH_TRANSACTION_SELECTION,
  UPDATE_PERIOD_DATE_RANGE,
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
  resetMatchTransactionOptions,
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
} from '../tabs/matchTransaction/matchTransactionHandlers';
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
  calculateSplitAllocationTax,
  deleteSplitAllocationLine,
  loadNewSplitAllocation,
  loadSplitAllocation,
  populateRemainingAmount,
  saveSplitAllocation,
  updateSplitAllocationHeader,
  updateSplitAllocationLine,
} from '../tabs/splitAllocation/splitAllocationHandlers';
import {
  allocateTransaction,
  setLastAllocatedAccount,
} from './allocateHandlers';
import { appliedTransactions } from './applyRuleResultHandlers';
import {
  bulkAllocateTransactions,
  closeBulkAllocation,
  openBulkAllocation,
  resetBulkAllocation,
  selectAllTransactions,
  selectTransaction,
  setBulkLoading,
  unallocateTransactions,
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
} from '../tabs/transferMoney/transferMoneyHandlers';
import FocusLocations from '../types/FocusLocations';
import Periods from '../../../components/PeriodPicker/Periods';
import TransactionTypes from '../types/TransactionTypes';
import bankingRuleHandlers from '../bankingRule/bankingRuleReducers';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';
import getDateRangeByPeriodAndRegion from '../../../components/PeriodPicker/getDateRangeByPeriodAndRegion';
import getDefaultState from './getDefaultState';
import wrapHandlers from '../../../store/wrapHandlers';

const resetState = () => getDefaultState();

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
  jobs: action.jobs,
  entries: action.entries.map((entry) => ({
    ...entry,
    isLoading: false,
  })),
  filterOptions: {
    ...state.filterOptions,
    bankAccount: action.bankAccount,
  },
  pagination: action.pagination,
  defaultFilterOptions: {
    ...state.defaultFilterOptions,
    bankAccount: action.bankAccount,
  },
});

const loadBankTransactionsNextPage = (state, action) => {
  const allTransactionIds = state.entries.map(
    (transaction) => transaction.transactionId
  );

  const entries = action.entries.filter(
    (transaction) => !allTransactionIds.includes(transaction.transactionId)
  );

  return {
    ...state,
    entries: [...state.entries, ...entries],
    pagination: {
      ...action.pagination,
    },
  };
};

const sortAndFilterBankTransactions = (state, action) => ({
  ...state,
  entries: action.entries,
  balances: action.balances,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  pagination: {
    ...action.pagination,
  },
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const updatePeriodDateRange = (state, { period, dateFrom, dateTo }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    period,
    dateFrom,
    dateTo,
  },
});

const resetFilters = (state) => ({
  ...state,
  filterOptions: {
    ...state.defaultFilterOptions,
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

const startLoadingMore = (state) => ({
  ...state,
  isLoadingMore: true,
});

const stopLoadingMore = (state) => ({
  ...state,
  isLoadingMore: false,
});

const setErrorState = (state, action) => ({
  ...state,
  hasError: action.hasError,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const getTransactionType = (transactionType) => {
  switch (transactionType) {
    case 'Linked':
    case TransactionTypes.ALLOCATED:
      return TransactionTypes.ALLOCATED;
    case 'Unlinked':
    case TransactionTypes.UNALLOCATED:
      return TransactionTypes.UNALLOCATED;
    case TransactionTypes.ALL:
      return TransactionTypes.ALL;
    default:
      return TransactionTypes.ALL;
  }
};

const setInitialState = (state, action) => {
  const transactionType = getTransactionType(action.context.transactionType);
  const { bankAccount, dateFrom, dateTo, keywords } = action.context;
  const { period } = state.filterOptions;

  const datesWithDefaultPeriod = getDateRangeByPeriodAndRegion(
    action.context.region,
    new Date(),
    period
  );

  const isValidDate = (dateString) =>
    !Number.isNaN(new Date(dateString).getDate());
  const parseDate = (dateString) => formatIsoDate(new Date(dateString));

  const filterOptions = {
    transactionType,
    bankAccount,
    keywords,
    dateFrom: isValidDate(dateFrom)
      ? parseDate(dateFrom)
      : datesWithDefaultPeriod.dateFrom,
    dateTo: isValidDate(dateTo)
      ? parseDate(dateTo)
      : datesWithDefaultPeriod.dateTo,
    period:
      isValidDate(dateFrom) || isValidDate(dateTo)
        ? Periods.custom
        : datesWithDefaultPeriod.period,
  };

  return {
    ...state,
    ...action.context,
    filterOptions,
  };
};

export const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

export const closeModal = (state) => ({
  ...state,
  modalType: '',
});

export const startModalBlocking = (state) => ({
  ...state,
  isModalBlocking: true,
});

export const stopModalBlocking = (state) => ({
  ...state,
  isModalBlocking: false,
});

export const setModalAlert = (state, action) => ({
  ...state,
  modalAlert: action.modalAlert,
});

export const setFocus = (state, { index, location, isFocused }) => {
  const availableLocations = Object.values(FocusLocations);

  // Ignore the action if it's to remove the focus from an element that's not currently in focus
  const shouldIgnoreAction = !isFocused && state.focus.index !== index;

  if (shouldIgnoreAction) return state;

  if (availableLocations.includes(location)) {
    return {
      ...state,
      focus: {
        ...state.focus,
        index,
        location,
        isFocused,
      },
    };
  }

  // Reset the focus state if we received an undefined location
  return {
    ...state,
    focus: getDefaultState().focus,
  };
};

export const setEntryHovered = (state, action) => ({
  ...state,
  hoverIndex: action.isHovering ? action.index : -1,
});

export const startEntryLoadingState = (state, action) => ({
  ...state,
  entries: state.entries.map((entry, index) =>
    index === action.index
      ? {
          ...entry,
          isLoading: true,
          displayName: action.displayName,
        }
      : entry
  ),
});

export const stopEntryLoadingState = (state, action) => ({
  ...state,
  entries: state.entries.map((entry, index) =>
    index === action.index
      ? {
          ...entry,
          isLoading: false,
          displayName: '',
        }
      : entry
  ),
});

const setEditingNoteState = (state, { editingNotePosition }) => {
  const entry = state.entries[editingNotePosition] || {};
  const pendingNote = entry.note || entry.description;

  return {
    ...state,
    editingNotePosition,
    pendingNote,
  };
};

const setPendingNote = (state, { pendingNote }) => ({
  ...state,
  pendingNote,
});

const savePendingNote = (state) => {
  const { editingNotePosition, entries, pendingNote } = state;
  const newEntries = entries.map((entry, index) =>
    index === editingNotePosition ? { ...entry, note: pendingNote } : entry
  );

  return {
    ...state,
    editingNotePosition: undefined,
    pendingNote: undefined,
    entries: newEntries,
  };
};

const setSubmittingNoteState = (state, action) => ({
  ...state,
  isSubmittingNote: action.isSubmittingNote,
});

export const loadAccountAfterCreate = (state, { account }) => ({
  ...state,
  withdrawalAccounts: [account, ...state.withdrawalAccounts],
  depositAccounts: [account, ...state.depositAccounts],
});

const loadJobAfterCreate = (state, { intent, ...job }) => ({
  ...state,
  jobs: [job, ...state.jobs],
  openEntry: {
    ...state.openEntry,
    allocate: {
      ...state.openEntry.allocate,
      lines: state.openEntry.allocate.lines.map((line) => ({
        ...line,
        lineJobOptions: [job, ...line.lineJobOptions],
      })),
      newLine: {
        ...state.openEntry.allocate.newLine,
        lineJobOptions: [
          job,
          ...state.openEntry.allocate.newLine.lineJobOptions,
        ],
      },
    },
  },
  isPageEdited: true,
});

const setJobLoadingState = (state, { isJobLoading }) => ({
  ...state,
  isJobLoading,
});

export const setLoadingSingleAccountState = (state, action) => ({
  ...state,
  isLoadingAccount: action.isLoadingAccount,
});

const handlers = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [LOAD_BANK_TRANSACTIONS_NEXT_PAGE]: loadBankTransactionsNextPage,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: sortAndFilterBankTransactions,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [UPDATE_PERIOD_DATE_RANGE]: updatePeriodDateRange,
  [RESET_FILTERS]: resetFilters,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [START_LOADING_MORE]: startLoadingMore,
  [STOP_LOADING_MORE]: stopLoadingMore,
  [SET_ERROR_STATE]: setErrorState,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_FOCUS]: setFocus,
  [SET_ENTRY_HOVERED]: setEntryHovered,
  [START_ENTRY_LOADING_STATE]: startEntryLoadingState,
  [STOP_ENTRY_LOADING_STATE]: stopEntryLoadingState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [START_MODAL_BLOCKING]: startModalBlocking,
  [STOP_MODAL_BLOCKING]: stopModalBlocking,
  [SET_MODAL_ALERT]: setModalAlert,
  [ALLOCATE_TRANSACTION]: allocateTransaction,
  [SET_LAST_ALLOCATED_ACCOUNT]: setLastAllocatedAccount,
  [UNALLOCATE_TRANSACTION]: unallocateTransactions,
  [BULK_UNALLOCATE_TRANSACTIONS]: unallocateTransactions,
  [COLLAPSE_TRANSACTION_LINE]: collapseTransactionLine,
  [SET_OPEN_ENTRY_POSITION]: setOpenPosition,
  [SET_OPEN_ENTRY_LOADING_STATE]: setOpenEntryLoadingState,
  [UPDATE_SPLIT_ALLOCATION_HEADER]: updateSplitAllocationHeader,
  [ADD_SPLIT_ALLOCATION_LINE]: addSplitAllocationLine,
  [UPDATE_SPLIT_ALLOCATION_LINE]: updateSplitAllocationLine,
  [DELETE_SPLIT_ALLOCATION_LINE]: deleteSplitAllocationLine,
  [LOAD_SPLIT_ALLOCATION]: loadSplitAllocation,
  [LOAD_NEW_SPLIT_ALLOCATION]: loadNewSplitAllocation,
  [SAVE_SPLIT_ALLOCATION]: saveSplitAllocation,
  [CALCULATE_SPLIT_ALLOCATION_TAX]: calculateSplitAllocationTax,
  [LOAD_MATCH_TRANSACTIONS]: loadMatchTransactions,
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: sortAndFilterMatchTransactions,
  [SAVE_MATCH_TRANSACTION]: saveMatchTransaction,
  [UPDATE_MATCH_TRANSACTION_OPTIONS]: updateMatchTransactionOptions,
  [RESET_MATCH_TRANSACTION_OPTIONS]: resetMatchTransactionOptions,
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
  [RESET_BULK_ALLOCATION]: resetBulkAllocation,
  [SET_BULK_LOADING_STATE]: setBulkLoading,
  [OPEN_BULK_ALLOCATION]: openBulkAllocation,
  [CLOSE_BULK_ALLOCATION]: closeBulkAllocation,
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
  [LOAD_JOB_AFTER_CREATE]: loadJobAfterCreate,
  [SET_JOB_LOADING_STATE]: setJobLoadingState,
  [POPULATE_REMAINING_AMOUNT]: populateRemainingAmount,
  ...wrapHandlers('bankingRuleModal', bankingRuleHandlers),
};

const bankingReducer = createReducer(getDefaultState(), handlers);

export default bankingReducer;