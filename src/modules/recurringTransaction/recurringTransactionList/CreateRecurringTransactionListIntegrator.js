import {
  LOAD_RECURRING_TRANSACTION_LIST,
  SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
} from '../RecurringTransactionIntents';
import {
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './recurringTransactionListSelectors';

const CreateRecurringTransactionListIntegrator = (store, integration) => ({
  loadRecurringTransactionList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent: LOAD_RECURRING_TRANSACTION_LIST,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  sortAndFilterRecurringTransactionList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const filterOptions = getFilterOptions(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      ...filterOptions,
      sortOrder: getSortOrder(state),
      orderBy: getOrderBy(state),
    };

    integration.read({
      intent: SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
      params,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default CreateRecurringTransactionListIntegrator;
