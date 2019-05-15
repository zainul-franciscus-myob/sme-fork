import {
  ALLOCATE_TRANSACTION,
  LOAD_BANK_TRANSACTIONS,
  LOAD_SPLIT_ALLOCATION, SAVE_SPLIT_ALLOCATION,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UNALLOCATE_SPLIT_ALLOCATION,
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
  [UNALLOCATE_TRANSACTION]: {
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
  [UNALLOCATE_SPLIT_ALLOCATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/unallocate_bank_transaction`,
  },
};

export default BankingMapping;
