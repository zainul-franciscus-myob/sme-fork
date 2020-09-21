import {
  ADD_ATTACHMENTS,
  ALLOCATE_TRANSACTION,
  APPEND_NEW_ACCOUNT_TO_ALLOCATE_TABLE,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  CLOSE_BULK_ALLOCATION,
  CLOSE_MODAL,
  COLLAPSE_TRANSACTION_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
  LOAD_JOB_AFTER_CREATE,
  OPEN_BULK_ALLOCATION,
  OPEN_MODAL,
  OPEN_REMOVE_ATTACHMENT_MODAL,
  POPULATE_REMAINING_AMOUNT,
  REMOVE_ATTACHMENT,
  REMOVE_ATTACHMENT_BY_INDEX,
  RESET_BULK_ALLOCATION,
  RESET_FILTERS,
  SAVE_PENDING_NOTE,
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
  SET_MODAL_ALERT,
  SET_OPEN_ENTRY_LOADING_STATE,
  SET_OPEN_ENTRY_POSITION,
  SET_OPERATION_IN_PROGRESS_STATE,
  SET_PENDING_NOTE,
  SET_SUBMMITTING_NOTE_STATE,
  SET_TABLE_LOADING_STATE,
  SET_TRANSACTION_STATUS_TYPE_TO_UNMATCHED,
  SET_TRANSFER_MONEY_DETAIL,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  START_ENTRY_LOADING_STATE,
  START_LOADING_MORE,
  START_MODAL_BLOCKING,
  STOP_ENTRY_LOADING_STATE,
  STOP_LOADING_MORE,
  STOP_MODAL_BLOCKING,
  UNALLOCATE_TRANSACTION,
  UNSELECT_TRANSACTIONS,
  UPDATE_BULK_ALLOCATION_OPTIONS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
  UPDATE_UPLOAD_PROGRESS,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from './BankingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import ModalTypes from './types/ModalTypes';
import createMatchTransactionDispatcher from './tabs/matchTransaction/createMatchTransactionDispatcher';
import createSplitAllocationDispatcher from './tabs/splitAllocation/createSplitAllocationDispatcher';
import createTransferMoneyDispatcher from './tabs/transferMoney/createTransferMoneyDispatcher';

const createBankingDispatcher = (store) => ({
  setFocus: ({ index, location }) => {
    store.dispatch({
      intent: SET_FOCUS,
      index,
      location,
      isFocused: true,
    });
  },

  hoverEntry: (index, isHovering) => {
    store.dispatch({
      intent: SET_ENTRY_HOVERED,
      index,
      isHovering,
    });
  },

  blurEntry: (index) => {
    store.dispatch({
      intent: SET_FOCUS,
      index,
      location: undefined,
      isFocused: false,
    });
  },

  startEntryLoadingState: (index, displayName) => {
    store.dispatch({
      intent: START_ENTRY_LOADING_STATE,
      index,
      displayName,
    });
  },

  stopEntryLoadingState: (index) => {
    store.dispatch({
      intent: STOP_ENTRY_LOADING_STATE,
      index,
    });
  },

  setBulkLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_BULK_LOADING_STATE,
      isLoading,
    });
  },

  openBulkAllocation: () => {
    store.dispatch({
      intent: OPEN_BULK_ALLOCATION,
    });
  },

  closeBulkAllocation: () => {
    store.dispatch({
      intent: CLOSE_BULK_ALLOCATION,
    });
  },

  resetBulkAllocation: () => {
    store.dispatch({
      intent: RESET_BULK_ALLOCATION,
    });
  },

  openBulkUnallocateModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalTypes.BULK_UNALLOCATE,
    });
  },

  loadBankTransactions: (payload) => {
    store.dispatch({
      intent: LOAD_BANK_TRANSACTIONS,
      ...payload,
    });
  },

  loadBankTransactionsNextPage: ({ entries, pagination }) => {
    store.dispatch({
      intent: LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
      entries,
      pagination,
    });
  },

  sortAndFilterBankTransactions: (isSort, payload) => {
    store.dispatch({
      intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
      isSort,
      ...payload,
    });
  },

  setLastAllocatedAccount: (selectedAccount) => {
    store.dispatch({
      intent: SET_LAST_ALLOCATED_ACCOUNT,
      selectedAccount,
    });
  },

  allocateTransaction: (index, { payload }) => {
    store.dispatch({
      intent: ALLOCATE_TRANSACTION,
      index,
      ...payload,
    });
  },

  bulkAllocateTransactions: ({ entries }) => {
    store.dispatch({
      intent: BULK_ALLOCATE_TRANSACTIONS,
      entries,
    });
  },

  applyRuleToTransactions: (entries) => {
    store.dispatch({
      intent: APPLY_RULE_TO_TRANSACTIONS,
      entries,
    });
  },

  unallocateTransaction: ({ entries }) => {
    store.dispatch({
      intent: UNALLOCATE_TRANSACTION,
      entries,
    });
  },

  bulkUnallocateTransactions: ({ entries }) => {
    store.dispatch({
      intent: BULK_UNALLOCATE_TRANSACTIONS,
      entries,
    });
  },

  setAlert: ({ message, type }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  },

  setErrorState: (hasError) => {
    store.dispatch({
      intent: SET_ERROR_STATE,
      hasError,
    });
  },

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  startLoadingMore: () => {
    store.dispatch({
      intent: START_LOADING_MORE,
    });
  },

  stopLoadingMore: () => {
    store.dispatch({
      intent: STOP_LOADING_MORE,
    });
  },

  updateFilterOptions: ({ filterName, value }) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  },

  updatePeriodDateRange: ({ period, dateFrom, dateTo }) => {
    const intent = UPDATE_PERIOD_DATE_RANGE;
    store.dispatch({
      intent,
      period,
      dateFrom,
      dateTo,
    });
  },

  resetFilters: () => {
    store.dispatch({ intent: RESET_FILTERS });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  },

  collapseTransactionLine: () => {
    store.dispatch({
      intent: COLLAPSE_TRANSACTION_LINE,
    });
  },

  setOpenEntryPosition: (index) => {
    store.dispatch({
      intent: SET_OPEN_ENTRY_POSITION,
      index,
    });
  },

  setOpenEntryLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_OPEN_ENTRY_LOADING_STATE,
      isLoading,
    });
  },

  openCancelModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalTypes.CANCEL,
    });
  },

  // @TODO: Need to determine whether the modal should live in MatchTransactions or not
  // Currently modals would be rendered in the root view
  openUnmatchTransactionModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalTypes.UNMATCH_TRANSACTION,
    });
  },

  openTransferMoneyModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalTypes.TRANSFER_MONEY,
    });
  },

  startModalBlocking: () => {
    store.dispatch({
      intent: START_MODAL_BLOCKING,
    });
  },

  stopModalBlocking: () => {
    store.dispatch({
      intent: STOP_MODAL_BLOCKING,
    });
  },

  setModalAlert: ({ type, message }) => {
    store.dispatch({
      intent: SET_MODAL_ALERT,
      modalAlert: {
        message,
        type,
      },
    });
  },

  dismissModalAlert: () => {
    store.dispatch({
      intent: SET_MODAL_ALERT,
      modalAlert: undefined,
    });
  },

  closeModal: () => {
    store.dispatch({ intent: CLOSE_MODAL });
  },

  selectTransaction: ({ index, value }) => {
    store.dispatch({
      intent: SELECT_TRANSACTION,
      index,
      value,
    });
  },

  selectAllTransactions: () => {
    store.dispatch({
      intent: SELECT_ALL_TRANSACTIONS,
    });
  },

  unselectTransactions: () => {
    store.dispatch({
      intent: UNSELECT_TRANSACTIONS,
    });
  },

  updateBulkAllocationOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BULK_ALLOCATION_OPTIONS,
      key,
      value,
    });
  },

  setTransferMoneyDetail: ({ key, value }) => {
    store.dispatch({ intent: SET_TRANSFER_MONEY_DETAIL, key, value });
  },

  // @TODO: This is used by both the modal and transfer money tab.
  //        Therefore, i'll leave it in the banking dispatcher for now.
  saveTransferMoney: (index, payload) => {
    store.dispatch({
      intent: SAVE_TRANSFER_MONEY,
      index,
      ...payload,
    });
  },

  setAttachemntsLoadingState: (isAttachmentsLoading) => {
    store.dispatch({
      intent: SET_ATTACHMENTS_LOADING_STATE,
      isAttachmentsLoading,
    });
  },

  loadAttachments: (attachments) => {
    store.dispatch({
      intent: LOAD_ATTACHMENTS,
      attachments,
    });
  },

  addAttachments: (files) => {
    const intent = ADD_ATTACHMENTS;
    store.dispatch({ intent, files });
  },

  uploadAttachment: ({ response, file }) => {
    const intent = UPLOAD_ATTACHMENT;
    store.dispatch({ intent, ...response, file });
  },

  uploadAttachmentFailed: ({ message, file }) => {
    const intent = UPLOAD_ATTACHMENT_FAILED;
    store.dispatch({ intent, message, file });
  },

  updateUploadProgress: ({ uploadProgress, file }) => {
    const intent = UPDATE_UPLOAD_PROGRESS;
    store.dispatch({ intent, uploadProgress, file });
  },

  openRemoveAttachmentModal: (id) => {
    const intent = OPEN_REMOVE_ATTACHMENT_MODAL;
    store.dispatch({
      intent,
      id,
      modal: { type: ModalTypes.DELETE_ATTACHMENT },
    });
  },

  removeAttachment: (id) => {
    const intent = REMOVE_ATTACHMENT;
    store.dispatch({ intent, id });
  },

  removeAttachmentByIndex: (index) => {
    const intent = REMOVE_ATTACHMENT_BY_INDEX;
    store.dispatch({ intent, index });
  },

  setOperationInProgressState: (id, isInProgress) => {
    const intent = SET_OPERATION_IN_PROGRESS_STATE;
    store.dispatch({ intent, id, isInProgress });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setEditingNoteState: (editingNotePosition) => {
    store.dispatch({
      intent: SET_EDITING_NOTE_STATE,
      editingNotePosition,
    });
  },

  setSubmittingNoteState: (isSubmittingNote) => {
    store.dispatch({
      intent: SET_SUBMMITTING_NOTE_STATE,
      isSubmittingNote,
    });
  },

  setPendingNote: ({ value }) => {
    store.dispatch({
      intent: SET_PENDING_NOTE,
      pendingNote: value,
    });
  },

  savePendingNote: () => {
    store.dispatch({
      intent: SAVE_PENDING_NOTE,
    });
  },

  loadAccountAfterCreate: (account) => {
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      account,
    });
  },

  appendAccountToAllocateTable: (account) => {
    store.dispatch({
      intent: APPEND_NEW_ACCOUNT_TO_ALLOCATE_TABLE,
      account,
    });
  },

  setLoadingSingleAccountState: (isLoadingAccount) => {
    store.dispatch({
      intent: SET_LOADING_SINGLE_ACCOUNT_STATE,
      isLoadingAccount,
    });
  },

  loadJobAfterCreate: (jobId, payload) =>
    store.dispatch({
      intent: LOAD_JOB_AFTER_CREATE,
      jobId,
      ...payload,
    }),

  setJobLoadingState: (isJobLoading) =>
    store.dispatch({
      intent: SET_JOB_LOADING_STATE,
      isJobLoading,
    }),

  populateRemainingAmount: (index) =>
    store.dispatch({
      intent: POPULATE_REMAINING_AMOUNT,
      index,
    }),

  setTransactionStatusTypeToUnmatched: (index) =>
    store.dispatch({
      intent: SET_TRANSACTION_STATUS_TYPE_TO_UNMATCHED,
      index,
    }),

  ...createMatchTransactionDispatcher(store),
  ...createSplitAllocationDispatcher(store),
  ...createTransferMoneyDispatcher(store),
});

export default createBankingDispatcher;
