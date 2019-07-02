import {
  ALLOCATE_TRANSACTION,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  FETCH_BANK_FEEDS_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_PAYMENT_ALLOCATION,
  LOAD_PAYMENT_ALLOCATION_LINES,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  SAVE_MATCH_TRANSACTION,
  SAVE_PAYMENT_ALLOCATION,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UNALLOCATE_OPEN_ENTRY_TRANSACTION,
  UNALLOCATE_TRANSACTION,
} from './BankingIntents';
import {
  getAllocationPayload,
  getAppliedFilterOptions,
  getBankTransactionLineByIndex,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
  getOpenPosition,
  getOrderBy,
  getSortOrder,
  getUnallocationPayload,
} from './bankingSelectors';
import { getBankFeedsLoginDetails } from './bankingSelectors/bankFeedsLoginSelectors';
import {
  getBulkAllocationPayload,
  getBulkUnallocationPayload,
} from './bankingSelectors/bulkAllocationSelectors';
import {
  getDefaultMatchTransactionFilterOptions,
  getMatchTransactionFilterOptions,
  getMatchTransactionOrderBy,
  getMatchTransactionPayload,
  getMatchTransactionSortOrder,
} from './bankingSelectors/matchTransactionSelectors';
import {
  getPaymentAllocationFilterOptions,
  getPaymentAllocationPayload,
  getPaymentTypeUrlParam,
} from './bankingSelectors/paymentAllocationSelectors';
import { getSplitAllocationPayload } from './bankingSelectors/splitAllocationSelectors';
import { getTransferMoneyPayload } from './bankingSelectors/transferMoneySelectors';

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

    const filterOptions = getDefaultMatchTransactionFilterOptions(accountId, line);

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

    const filterOptions = getMatchTransactionFilterOptions(state);
    const sortOrder = getMatchTransactionSortOrder(state);
    const orderBy = getMatchTransactionOrderBy(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
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

  loadPaymentAllocationLines: ({
    onSuccess, onFailure,
  }) => {
    const intent = LOAD_PAYMENT_ALLOCATION_LINES;

    const state = store.getState();

    const index = getOpenPosition(state);

    const urlParams = {
      businessId: getBusinessId(state),
      paymentType: getPaymentTypeUrlParam(state, index),
    };

    const filterOptions = getPaymentAllocationFilterOptions(state);

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

  loadPaymentAllocation: ({
    index, onSuccess, onFailure,
  }) => {
    const intent = LOAD_PAYMENT_ALLOCATION;

    const state = store.getState();

    const { journalId } = getBankTransactionLineByIndex(state, index);

    const urlParams = {
      businessId: getBusinessId(state),
      paymentType: getPaymentTypeUrlParam(state, index),
      paymentId: journalId,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  savePaymentAllocation: ({
    index, onSuccess, onFailure,
  }) => {
    const intent = SAVE_PAYMENT_ALLOCATION;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getPaymentAllocationPayload(state, index);

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
    const content = getTransferMoneyPayload(state, index);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },

  confirmBankFeedsLogin: ({
    onSuccess, onFailure,
  }) => {
    const intent = FETCH_BANK_FEEDS_TRANSACTIONS;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getBankFeedsLoginDetails(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingIntegrator;
