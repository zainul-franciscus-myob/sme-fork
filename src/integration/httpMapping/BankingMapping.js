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
} from '../../banking/BankingIntents';

const BankingMapping = {
  [LOAD_BANK_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/banking/load_bank_transactions`,
  },
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/banking/filter_bank_transactions`,
  },
  [ALLOCATE_TRANSACTION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/allocate_bank_transaction`,
  },
  [BULK_ALLOCATE_TRANSACTIONS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/bulk_allocate_bank_transactions`,
  },
  [UNALLOCATE_TRANSACTION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/unallocate_bank_transaction`,
  },
  [BULK_UNALLOCATE_TRANSACTIONS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/bulk_unallocate_bank_transactions`,
  },
  [UNALLOCATE_OPEN_ENTRY_TRANSACTION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/unallocate_bank_transaction`,
  },
  [LOAD_SPLIT_ALLOCATION]: {
    method: 'GET',
    getPath: ({ businessId, type, journalId }) => `/${businessId}/banking/load_split_allocation/${type}/${journalId}`,
  },
  [SAVE_SPLIT_ALLOCATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/create_split_allocation`,
  },
  [LOAD_MATCH_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/banking/load_match_transactions`,
  },
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/banking/filter_match_transactions`,
  },
  [SAVE_MATCH_TRANSACTION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/save_match_transaction`,
  },
  [LOAD_PAYMENT_ALLOCATION_LINES]: {
    method: 'GET',
    getPath: ({ businessId, paymentType }) => `/${businessId}/banking/load_new_payment/${paymentType}`,
  },
  [LOAD_PAYMENT_ALLOCATION]: {
    method: 'GET',
    getPath: ({ businessId, paymentType, paymentId }) => `/${businessId}/banking/load_payment/${paymentType}/${paymentId}`,
  },
  [SAVE_PAYMENT_ALLOCATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/allocate_payment`,
  },
  [LOAD_TRANSFER_MONEY]: {
    method: 'GET',
    getPath: ({ businessId, transferMoneyId }) => `/${businessId}/banking/load_transfer_money/${transferMoneyId}`,
  },
  [SAVE_TRANSFER_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/create_transfer_money`,
  },
  [FETCH_BANK_FEEDS_TRANSACTIONS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/fetch_bank_transactions`,
  },
};

export default BankingMapping;
