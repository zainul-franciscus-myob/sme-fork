import {
  LOAD_RECURRING_TRANSACTION_LIST,
  SORT_RECURRING_TRANSACTION_LIST,
} from './RecurringTransactionListModalIntents';
import {
  getFilterOptions,
  getLoadRecurringTransactionListUrlParams,
  getSortRecurringTransactionListParams,
} from './RecurringTransactionListModalSelectors';

const createRecurringTransactionListModalIntegrator = (store, integration) => ({
  loadRecurringTransactionList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_RECURRING_TRANSACTION_LIST;
    const urlParams = getLoadRecurringTransactionListUrlParams(state);
    const params = getFilterOptions(state);

    integration.read({ intent, urlParams, params, onSuccess, onFailure });
  },
  sortRecurringTransactionList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SORT_RECURRING_TRANSACTION_LIST;
    const urlParams = getLoadRecurringTransactionListUrlParams(state);
    const params = getSortRecurringTransactionListParams(state);

    integration.read({ intent, params, urlParams, onSuccess, onFailure });
  },
});

export default createRecurringTransactionListModalIntegrator;
