import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
  LOAD_TRANSACTION_NEXT_PAGE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
  SORT_AND_FILTER_TRANSACTION_LIST,
} from './TransactionListIntents';
import {
  getBusinessId,
  getFilterOptions,
} from './selectors/transactionListSelectors';
import {
  getLoadNextPageParams as getLoadNextPageParamsForCreditsAndDebits, getSortingForCreditsAndDebits,
} from './selectors/creditsAndDebitsSelectors';
import {
  getLoadNextPageParams as getLoadNextPageParamsForTransactions, getSortingForJournalTransactions,
} from './selectors/journalTransactionSelectors';

const createTransactionListIntegrator = (store, integration) => ({
  loadCreditsAndDebitsList: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = LOAD_CREDITS_AND_DEBITS_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const sortOptions = getSortingForCreditsAndDebits(state);

    integration.read({
      intent,
      params: {
        ...filterOptions,
        ...sortOptions,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  sortAndFilterCreditsAndDebitsList: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const sortOptions = getSortingForCreditsAndDebits(state);

    const filterOptions = getFilterOptions(state);
    integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        ...sortOptions,
      },
      onSuccess,
      onFailure,
    });
  },

  loadCreditsAndDebitsNextPage: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = LOAD_CREDITS_AND_DEBITS_NEXT_PAGE;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getLoadNextPageParamsForCreditsAndDebits(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  sortAndFilterTransactionList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SORT_AND_FILTER_TRANSACTION_LIST;

    const filterOptions = getFilterOptions(state);
    const sortingOptions = getSortingForJournalTransactions(state);
    const urlParams = { businessId: getBusinessId(state) };
    const params = {
      ...filterOptions,
      ...sortingOptions,
      offset: 0,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadTransactionListNextPage: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_TRANSACTION_NEXT_PAGE;

    const urlParams = { businessId: getBusinessId(state) };
    const params = getLoadNextPageParamsForTransactions(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createTransactionListIntegrator;
