import {
  LOAD_MATCH_TRANSACTIONS,
  SAVE_MATCH_TRANSACTION,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
} from '../MatchTransactionIntents';

const HttpMatchTransactionsMapping = {
  [LOAD_MATCH_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/load_match_transactions`,
  },
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/filter_match_transactions`,
  },
  [SAVE_MATCH_TRANSACTION]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/save_match_transaction`,
  },
};

export default HttpMatchTransactionsMapping;
