import {
  ALLOCATE_TRANSACTION,
  LOAD_BANK_TRANSACTIONS,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
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
};

export default BankingMapping;
