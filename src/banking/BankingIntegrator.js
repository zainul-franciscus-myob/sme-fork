import {
  ALLOCATE_TRANSACTION,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  REMOVE_ATTACHMENT,
  SAVE_MATCH_TRANSACTION,
  SAVE_PENDING_NOTE,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UNALLOCATE_OPEN_ENTRY_TRANSACTION,
  UNALLOCATE_TRANSACTION,
  UNMATCH_TRANSACTION,
  UPLOAD_ATTACHMENT,
} from './BankingIntents';
import {
  getAllocationPayload,
  getAppliedFilterOptions,
  getBankTransactionLineByIndex,
  getBusinessId,
  getEditingNoteTransaction,
  getFilterOptions,
  getFlipSortOrder,
  getOpenPosition,
  getOrderBy,
  getPendingNote,
  getSortOrder,
  getUnallocationPayload,
} from './bankingSelectors';
import { getBulkAllocationPayload, getBulkUnallocationPayload } from './bankingSelectors/bulkAllocationSelectors';
import {
  getCreateTransferMoneyPayload,
  getMatchTransferMoneyPayload,
  getMatchTransferMoneyQueryParams,
  getMatchTransferMoneyUrlParams,
} from './bankingSelectors/transferMoneySelectors';
import {
  getDefaultMatchTransactionFilterRequestParams,
  getMatchTransactionFilterRequestParams,
  getMatchTransactionOrderBy,
  getMatchTransactionPayload,
  getMatchTransactionSortOrder,
  getUnmatchTransactionPayload,
} from './bankingSelectors/matchTransactionSelectors';
import { getSplitAllocationPayload } from './bankingSelectors/splitAllocationSelectors';

const createBankingIntegrator = (store, integration) => ({
  loadBankTransactions: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const intent = LOAD_BANK_TRANSACTIONS;
    const urlParams = { businessId: getBusinessId(state) };

    const fitlerOptions = getFilterOptions(state);

    integration.read({
      intent,
      urlParams,
      params: fitlerOptions,
      onSuccess,
      onFailure,
    });
  },

  filterBankTransactions: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SORT_AND_FILTER_BANK_TRANSACTIONS;
    const urlParams = { businessId: getBusinessId(state) };

    const fitlerOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...fitlerOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },

  sortBankTransactions: ({ orderBy, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SORT_AND_FILTER_BANK_TRANSACTIONS;
    const urlParams = { businessId: getBusinessId(state) };

    const fitlerOptions = getAppliedFilterOptions(state);
    const sortOrder = getFlipSortOrder(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...fitlerOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },

  allocateTransaction: ({
    index, selectedAccount, onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const intent = ALLOCATE_TRANSACTION;
    const urlParams = { businessId: getBusinessId(state) };

    const content = getAllocationPayload(index, selectedAccount, state);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },

  bulkAllocateTransactions: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const intent = BULK_ALLOCATE_TRANSACTIONS;
    const urlParams = { businessId: getBusinessId(state) };

    const content = getBulkAllocationPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  unallocateTranscation: ({
    index, onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const intent = UNALLOCATE_TRANSACTION;
    const urlParams = { businessId: getBusinessId(state) };

    const content = getUnallocationPayload(index, state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  bulkUnallocateTransactions: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const intent = BULK_UNALLOCATE_TRANSACTIONS;
    const urlParams = { businessId: getBusinessId(state) };

    const content = getBulkUnallocationPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  unmatchTransaction: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const intent = UNMATCH_TRANSACTION;
    const urlParams = { businessId: getBusinessId(state) };

    const content = getUnmatchTransactionPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadExistingTransferMoney: ({
    index, onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = LOAD_TRANSFER_MONEY;

    const line = getBankTransactionLineByIndex(state, index);

    const urlParams = {
      businessId: getBusinessId(state),
      transferMoneyId: line.journalId,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadMatchTransferMoney: ({
    index, onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = LOAD_MATCH_TRANSFER_MONEY;
    const urlParams = getMatchTransferMoneyUrlParams(state);
    const params = getMatchTransferMoneyQueryParams(state, index);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },

  saveMatchTransferMoney: ({
    index, onSuccess, onFailure,
  }) => {
    const intent = SAVE_TRANSFER_MONEY;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getMatchTransferMoneyPayload(state, index);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },

  saveTransferMoney: ({
    index, onSuccess, onFailure,
  }) => {
    const intent = SAVE_TRANSFER_MONEY;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getCreateTransferMoneyPayload(state, index);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadSplitAllocation: ({
    index, onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const { withdrawal, journalId } = getBankTransactionLineByIndex(state, index);
    const intent = LOAD_SPLIT_ALLOCATION;

    const urlParams = {
      businessId: getBusinessId(state),
      type: withdrawal ? 'spend_money' : 'receive_money',
      journalId,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveSplitAllocation: ({
    index, onSuccess, onFailure,
  }) => {
    const intent = SAVE_SPLIT_ALLOCATION;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getSplitAllocationPayload(state, index);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },

  unallocateOpenEntryTransaction: ({
    onSuccess, onFailure,
  }) => {
    const intent = UNALLOCATE_OPEN_ENTRY_TRANSACTION;
    const state = store.getState();

    const index = getOpenPosition(state);
    const urlParams = { businessId: getBusinessId(state) };
    const content = getUnallocationPayload(index, state);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadMatchTranscation: ({
    index, onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const intent = LOAD_MATCH_TRANSACTIONS;

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const { bankAccount: accountId } = getFilterOptions(state);

    const line = getBankTransactionLineByIndex(state, index);

    const filterOptions = getDefaultMatchTransactionFilterRequestParams(accountId, line);

    integration.read({
      intent,
      params: {
        ...filterOptions,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  sortOrFilterMatchTransaction: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const intent = SORT_AND_FILTER_MATCH_TRANSACTIONS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getMatchTransactionFilterRequestParams(state);
    const sortOrder = getMatchTransactionSortOrder(state);
    const orderBy = getMatchTransactionOrderBy(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...params,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },

  saveMatchTransaction: ({
    index, onSuccess, onFailure,
  }) => {
    const intent = SAVE_MATCH_TRANSACTION;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getMatchTransactionPayload(state, index);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },

  applyRuleToTransactions: ({
    bankingRuleId, onSuccess, onFailure,
  }) => {
    const intent = APPLY_RULE_TO_TRANSACTIONS;
    const state = store.getState();

    const urlParams = { bankingRuleId, businessId: getBusinessId(state) };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadAttachments: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const index = getOpenPosition(state);
    const intent = LOAD_ATTACHMENTS;

    const { transactionUid } = getBankTransactionLineByIndex(state, index);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = {
      transactionUid,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  uploadAttachment: ({
    onSuccess, onFailure, onProgress, file,
  }) => {
    const state = store.getState();
    const index = getOpenPosition(state);

    const { transactionUid } = getBankTransactionLineByIndex(state, index);

    integration.writeFormData({
      intent: UPLOAD_ATTACHMENT,
      content: {
        relationshipKey: 'BankFeedTransactionUID',
        relationshipValue: transactionUid,
        file,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
      onProgress,
    });
  },

  removeAttachment: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const id = state.openEntry.pendingDeleteId;

    integration.write({
      intent: REMOVE_ATTACHMENT,
      allowParallelRequests: true,
      urlParams: {
        businessId: getBusinessId(state),
        documentId: id,
      },
      onSuccess,
      onFailure,
    });
  },

  savePendingNote: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const transaction = getEditingNoteTransaction(state);
    const note = getPendingNote(state) || transaction.description;

    integration.write({
      intent: SAVE_PENDING_NOTE,
      urlParams: {
        businessId: getBusinessId(state),
        transactionId: transaction.transactionId,
      },
      content: {
        note,
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingIntegrator;
