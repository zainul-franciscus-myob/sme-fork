import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_NEXT_PAGE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
} from './CreditsAndDebitsListIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getLoadNextPageParams,
  getOrderBy,
  getSortOrder,
} from './creditsAndDebitsListSelectors';

const createCreditsAndDebitsListIntegrator = (store, integration) => ({
  loadCreditsAndDebitsList: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = LOAD_CREDITS_AND_DEBITS_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    integration.read({
      intent,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  filterCreditsAndDebitsList: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

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

  sortCreditsAndDebitsList: ({
    onSuccess, onFailure, orderBy, newSortOrder,
  }) => {
    const state = store.getState();
    const intent = SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getAppliedFilterOptions(state);
    integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: newSortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },

  loadNextPage: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = LOAD_NEXT_PAGE;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getLoadNextPageParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createCreditsAndDebitsListIntegrator;
