import {
  ALLOCATE_TRANSACTION,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
  LOAD_JOB_AFTER_CREATE,
  OPEN_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SAVE_PENDING_NOTE,
  SAVE_TRANSFER_MONEY,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UNALLOCATE_TRANSACTION,
  UPLOAD_ATTACHMENT,
} from './BankingIntents';
import {
  getAllocationPayload,
  getBankTransactionLineByIndex,
  getBusinessId,
  getEditingNoteTransaction,
  getFilterBankTransactionsParams,
  getFilterBankTransactionsUrlParams,
  getLoadBankTransactionsNextPageParams,
  getLoadBankTransactionsNextPageUrlParams,
  getLoadBankTransactionsParams,
  getLoadBankTransactionsUrlParams,
  getOpenPosition,
  getPendingNote,
  getSortBankTransactionsParams,
  getSortBankTransactionsUrlParams,
  getUnallocationPayload,
} from './selectors';
import {
  getBulkAllocationPayload,
  getBulkUnallocationPayload,
} from './selectors/bulkActionSelectors';
import { getCreateTransferMoneyPayload } from './tabs/transferMoney/transferMoneySelectors';
import { getRemoveDocumentParams } from './selectors/attachmentsSelectors';
import createMatchTransactionIntegrator from './tabs/matchTransaction/createMatchTransactionIntegrator';
import createSplitAllocationIntegrator from './tabs/splitAllocation/createSplitAllocationIntegrator';
import createTransferMoneyIntegrator from './tabs/transferMoney/createTransferMoneyIntegrator';

const createBankingIntegrator = (store, integration) => ({
  loadBankTransactions: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_BANK_TRANSACTIONS;
    const urlParams = getLoadBankTransactionsUrlParams(state);
    const params = getLoadBankTransactionsParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadBankTransactionsNextPage: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_BANK_TRANSACTIONS_NEXT_PAGE;
    const urlParams = getLoadBankTransactionsNextPageUrlParams(state);
    const params = getLoadBankTransactionsNextPageParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  filterBankTransactions: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SORT_AND_FILTER_BANK_TRANSACTIONS;
    const urlParams = getFilterBankTransactionsUrlParams(state);
    const params = getFilterBankTransactionsParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  sortBankTransactions: ({ orderBy, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SORT_AND_FILTER_BANK_TRANSACTIONS;
    const urlParams = getSortBankTransactionsUrlParams(state);
    const params = getSortBankTransactionsParams(state, orderBy);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  allocateTransaction: ({ index, selectedAccount, onSuccess, onFailure }) => {
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

  bulkAllocateTransactions: ({ onSuccess, onFailure }) => {
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

  bulkUnallocateTransactions: ({ onSuccess, onFailure }) => {
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

  // @TODO: The transfer money modal uses this, i'm going to leave it the banking integrator for now.
  //        The reason being is that if we can create a transfer money with hotkeys, than
  //        the banking module will need to be able to do this...
  saveTransferMoney: ({ index, onSuccess, onFailure }) => {
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

  // @TODO: Currently both split allocation and transfer money make use of this function
  //        I'll leave it here for now.
  unallocateOpenEntryTransaction: ({ onSuccess, onFailure }) => {
    const intent = UNALLOCATE_TRANSACTION;
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

  applyRuleToTransactions: ({ bankingRuleId, onSuccess, onFailure }) => {
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

  loadAttachments: ({ index, onSuccess, onFailure }) => {
    const state = store.getState();
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

  uploadAttachment: ({ onSuccess, onFailure, onProgress, file }) => {
    const state = store.getState();
    const index = getOpenPosition(state);

    const { transactionUid } = getBankTransactionLineByIndex(state, index);

    integration.writeFormData({
      intent: UPLOAD_ATTACHMENT,
      content: {
        relationshipKey: 'BankTransactionUID',
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

  openAttachment: ({ onSuccess, onFailure, id }) => {
    const state = store.getState();

    integration.read({
      intent: OPEN_ATTACHMENT,
      allowParallelRequests: true,
      urlParams: {
        businessId: getBusinessId(state),
        documentId: id,
      },
      onSuccess,
      onFailure,
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
      params: getRemoveDocumentParams(state),
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

  linkInTrayDocument: ({ onSuccess, onFailure, inTrayDocumentId }) => {
    const state = store.getState();
    const index = getOpenPosition(state);

    const { transactionUid, transactionId } = getBankTransactionLineByIndex(
      state,
      index
    );

    integration.write({
      intent: LINK_IN_TRAY_DOCUMENT,
      content: {
        id: transactionId,
        uid: transactionUid,
        inTrayDocumentId,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  loadAccountAfterCreate: ({ accountId, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = {
      accountId,
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadJobAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_JOB_AFTER_CREATE;
    const urlParams = {
      jobId: id,
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  ...createTransferMoneyIntegrator(store, integration),
  ...createSplitAllocationIntegrator(store, integration),
  ...createMatchTransactionIntegrator(store, integration),
});

export default createBankingIntegrator;
