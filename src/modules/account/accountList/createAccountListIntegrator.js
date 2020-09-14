import {
  DELETE_ACCOUNTS,
  LOAD_ACCOUNT_LIST,
  SORT_AND_FILTER_ACCOUNT_LIST,
  UPDATE_ACCOUNTS,
} from '../AccountIntents';
import {
  getAccountsForBulkDelete,
  getAccountsForBulkUpdate,
  getBusinessId,
  getFilterOptions,
} from './AccountListSelectors';

const createAccountListIntegrator = (store, integration) => ({
  loadAccountList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_ACCOUNT_LIST;

    const state = store.getState();
    const businessId = getBusinessId(state);
    const filterOptions = getFilterOptions(state);

    const urlParams = { businessId };
    const params = {
      ...filterOptions,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  filterAccountList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_ACCOUNT_LIST;

    const state = store.getState();
    const businessId = getBusinessId(state);
    const filterOptions = getFilterOptions(state);

    const urlParams = { businessId };
    const params = {
      ...filterOptions,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  fetchAllAccounts: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_ACCOUNT_LIST;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  deleteAccounts: (onSuccess, onFailure) => {
    const state = store.getState();
    const content = getAccountsForBulkDelete(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    integration.write({
      intent: DELETE_ACCOUNTS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
  updateAccounts: (onSuccess, onFailure) => {
    const state = store.getState();
    const content = getAccountsForBulkUpdate(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    integration.write({
      intent: UPDATE_ACCOUNTS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createAccountListIntegrator;
