import {
  LOAD_MATCH_TRANSACTIONS,
  SAVE_MATCH_TRANSACTION,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
} from './MatchTransactionIntents';
import { UNALLOCATE_TRANSACTION } from '../../BankingIntents';
import {
  getBusinessId,
  getDefaultMatchTransactionFilterRequestParams,
  getMatchTransactionFilterRequestParams,
  getMatchTransactionOrderBy,
  getMatchTransactionPayload,
  getMatchTransactionSortOrder,
  getUnmatchTransactionPayload,
} from './matchTransactionSelectors';

const createBankingIntegrator = (store, integration) => ({
  loadMatchTransactions: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_MATCH_TRANSACTIONS;
    const urlParams = { businessId: getBusinessId(state) };
    const filterOptions = getDefaultMatchTransactionFilterRequestParams(state);

    integration.read({
      intent,
      params: filterOptions,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  sortOrFilterMatchTransaction: ({ onSuccess, onFailure }) => {
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

  saveMatchTransaction: ({ onSuccess, onFailure }) => {
    const intent = SAVE_MATCH_TRANSACTION;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getMatchTransactionPayload(state);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },

  unmatchTransaction: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = UNALLOCATE_TRANSACTION;
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
});

export default createBankingIntegrator;
