import {
  LOAD_BANK_TRANSACTIONS,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
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
};

export default BankingMapping;
