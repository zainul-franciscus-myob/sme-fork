import {
  ADD_ATTACHMENTS,
  ADD_MATCH_TRANSACTION_ADJUSTMENT,
  ADD_SPLIT_ALLOCATION_LINE,
  ALLOCATE_TRANSACTION,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  CLOSE_MODAL,
  COLLAPSE_TRANSACTION_LINE,
  DELETE_SPLIT_ALLOCATION_LINE,
  EXPAND_ADJUSTMENT_SECTION,
  LOAD_ATTACHMENTS,
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
  OPEN_REMOVE_ATTACHMENT_MODAL,
  REMOVE_ATTACHMENT,
  REMOVE_ATTACHMENT_BY_INDEX,
  REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
  RESET_BULK_ALLOCATION,
  SAVE_MATCH_TRANSACTION,
  SAVE_PAYMENT_ALLOCATION,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SELECT_ALL_TRANSACTIONS,
  SELECT_TRANSACTION,
  SET_ALERT,
  SET_ATTACHMENTS_LOADING_STATE,
  SET_BULK_LOADING_STATE,
  SET_ENTRY_FOCUS,
  SET_ENTRY_LOADING_STATE,
  SET_ERROR_STATE,
  SET_LOADING_STATE,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_MATCH_TRANSACTION_SORT_ORDER,
  SET_OPEN_ENTRY_LOADING_STATE,
  SET_OPEN_ENTRY_POSITION,
  SET_OPERATION_IN_PROGRESS_STATE,
  SET_PAYMENT_ALLOCATION_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
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
  UPDATE_PAYMENT_ALLOCATION_LINE,
  UPDATE_PAYMENT_ALLOCATION_OPTIONS,
  UPDATE_SELECTED_TRANSACTION_DETAILS,
  UPDATE_SPLIT_ALLOCATION_HEADER,
  UPDATE_SPLIT_ALLOCATION_LINE,
  UPDATE_TRANSFER_MONEY,
  UPDATE_UPLOAD_PROGRESS,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from './BankingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import ModalTypes from './ModalTypes';

const createBankingDispatcher = store => ({
  focusEntry: (index) => {
    store.dispatch({
      intent: SET_ENTRY_FOCUS,
      index,
      isFocused: true,
    });
  },

  blurEntry: (index) => {
    store.dispatch({
      intent: SET_ENTRY_FOCUS,
      index,
      isFocused: false,
    });
  },

  setEntryLoadingState: (index, isLoading) => {
    store.dispatch({
      intent: SET_ENTRY_LOADING_STATE,
      index,
      isLoading,
    });
  },

  setBulkLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_BULK_LOADING_STATE,
      isLoading,
    });
  },

  resetBulkAllocation: () => {
    store.dispatch({
      intent: RESET_BULK_ALLOCATION,
    });
  },

  loadBankTransactions: (payload) => {
    store.dispatch({
      intent: LOAD_BANK_TRANSACTIONS,
      ...payload,
    });
  },

  sortAndFilterBankTransactions: (isSort, payload) => {
    store.dispatch({
      intent: SORT_AND_FILTER_BANK_TRANSACTIONS,
      isSort,
      ...payload,
    });
  },


  allocateTransaction: (index, { payload, selectedAccount }) => {
    store.dispatch({
      intent: ALLOCATE_TRANSACTION,
      index,
      ...payload,
      selectedAccount,
    });
  },

  bulkAllocateTransactions: ({ entries }) => {
    store.dispatch({
      intent: BULK_ALLOCATE_TRANSACTIONS,
      entries,
    });
  },

  bulkUnallocateTransactions: ({ entries }) => {
    store.dispatch({
      intent: BULK_UNALLOCATE_TRANSACTIONS,
      entries,
    });
  },

  applyRuleToTransactions: (entries) => {
    store.dispatch({
      intent: APPLY_RULE_TO_TRANSACTIONS,
      entries,
    });
  },

  unAllocateTransaction: (index, payload) => {
    store.dispatch({
      intent: UNALLOCATE_TRANSACTION,
      index,
      ...payload,
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

  updateFilterOptions: ({ filterName, value }) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
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

  loadExistingTransferMoney: (index, payload) => {
    store.dispatch({
      intent: LOAD_TRANSFER_MONEY,
      index,
      ...payload,
    });
  },

  loadNewTransferMoney: (index) => {
    store.dispatch({
      intent: LOAD_NEW_TRANSFER_MONEY,
      index,
    });
  },

  updateTransferMoney: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_TRANSFER_MONEY,
      key,
      value,
    });
  },

  loadSplitAllocation: (index, payload) => {
    store.dispatch({
      intent: LOAD_SPLIT_ALLOCATION,
      index,
      ...payload,
    });
  },

  loadNewSplitAllocation: (index) => {
    store.dispatch({
      intent: LOAD_NEW_SPLIT_ALLOCATION,
      index,
    });
  },

  saveSplitAllocation: (index, payload) => {
    store.dispatch({
      intent: SAVE_SPLIT_ALLOCATION,
      index,
      ...payload,
    });
  },

  unAllocateOpenEntryTransaction: (index, payload) => {
    store.dispatch({
      intent: UNALLOCATE_OPEN_ENTRY_TRANSACTION,
      index,
      ...payload,
    });
  },

  unmatchTransaction: (index, payload) => {
    store.dispatch({
      intent: UNMATCH_TRANSACTION,
      index,
      ...payload,
    });
  },

  openCancelModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalTypes.CANCEL,
    });
  },

  openBulkUnallocateModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalTypes.BULK_UNALLOCATE,
    });
  },

  openBankingRuleModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalTypes.BANKING_RULE,
    });
  },

  openUnmatchTransactionModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalTypes.UNMATCH_TRANSACTION,
    });
  },

  closeModal: () => {
    store.dispatch({ intent: CLOSE_MODAL });
  },

  updateSplitAllocationHeader: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_SPLIT_ALLOCATION_HEADER,
      key,
      value,
    });
  },

  addSplitAllocationLine: ({ key, value }) => {
    store.dispatch({
      intent: ADD_SPLIT_ALLOCATION_LINE,
      key,
      value,
    });
  },

  updateSplitAllocationLine: (lineIndex, lineKey, lineValue) => {
    store.dispatch({
      intent: UPDATE_SPLIT_ALLOCATION_LINE,
      lineIndex,
      lineKey,
      lineValue,
    });
  },

  deleteSplitAllocationLine: (index) => {
    store.dispatch({
      intent: DELETE_SPLIT_ALLOCATION_LINE,
      index,
    });
  },

  loadMatchTransaction: (index, filterOptions, payload, totalAmount) => {
    store.dispatch({
      intent: LOAD_MATCH_TRANSACTIONS,
      index,
      totalAmount,
      ...filterOptions,
      ...payload,
    });
  },

  sortAndFilterMatchTransactions: (index, payload) => {
    store.dispatch({
      intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
      index,
      ...payload,
    });
  },

  saveMatchTransaction: (index, payload) => {
    store.dispatch({
      intent: SAVE_MATCH_TRANSACTION,
      index,
      ...payload,
    });
  },

  updateMatchTransactionOptions: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_MATCH_TRANSACTION_OPTIONS,
      key,
      value,
    });
  },

  updateMatchTransactionSortOrder: (orderBy, sortOrder) => {
    store.dispatch({
      intent: SET_MATCH_TRANSACTION_SORT_ORDER,
      orderBy,
      sortOrder,
    });
  },

  setMatchTransactionLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_MATCH_TRANSACTION_LOADING_STATE,
      isLoading,
    });
  },

  updateMatchTransactionSelection: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_MATCH_TRANSACTION_SELECTION,
      journalId: key,
      selected: value,
    });
  },

  updateSelectedTransactionDetails: ({ index, key, value }) => {
    store.dispatch({
      intent: UPDATE_SELECTED_TRANSACTION_DETAILS,
      index,
      key,
      value,
    });
  },

  addMatchTransactionAdjustment: ({ id, key, value }) => {
    store.dispatch({
      intent: ADD_MATCH_TRANSACTION_ADJUSTMENT,
      id,
      key,
      value,
    });
  },

  updateMatchTransactionAdjustment: (index, { key, value }) => {
    store.dispatch({
      intent: UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
      index,
      key,
      value,
    });
  },

  removeMatchTransactionAdjustment: (index) => {
    store.dispatch({
      intent: REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
      index,
    });
  },

  expandAdjustmentSection: () => {
    store.dispatch({
      intent: EXPAND_ADJUSTMENT_SECTION,
    });
  },

  toggleSelectAllState: (selected) => {
    store.dispatch({
      intent: TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
      selected,
    });
  },

  loadPaymentAllocationOptions: (index) => {
    store.dispatch({
      intent: LOAD_PAYMENT_ALLOCATION_OPTIONS,
      index,
    });
  },

  loadPaymentAllocationLines: (index, payload) => {
    store.dispatch({
      intent: LOAD_PAYMENT_ALLOCATION_LINES,
      index,
      ...payload,
    });
  },

  loadPaymentAllocation: (index, payload) => {
    store.dispatch({
      intent: LOAD_PAYMENT_ALLOCATION,
      index,
      ...payload,
    });
  },


  savePaymentAllocation: (index, payload) => {
    store.dispatch({
      intent: SAVE_PAYMENT_ALLOCATION,
      index,
      ...payload,
    });
  },

  saveTransferMoney: (index, payload) => {
    store.dispatch({
      intent: SAVE_TRANSFER_MONEY,
      index,
      ...payload,
    });
  },

  updatePaymentAllocationOptions: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_PAYMENT_ALLOCATION_OPTIONS,
      key,
      value,
    });
  },

  updatePaymentAllocationLine: ({ index, key, value }) => {
    store.dispatch({
      intent: UPDATE_PAYMENT_ALLOCATION_LINE,
      index,
      key,
      value,
    });
  },

  setPaymentAllocationLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_PAYMENT_ALLOCATION_LOADING_STATE,
      isLoading,
    });
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
});

export default createBankingDispatcher;
