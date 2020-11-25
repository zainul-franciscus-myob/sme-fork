import {
  DELETE_ACCOUNTS,
  LOAD_ACCOUNT_LIST,
  MOVE_ACCOUNT_DOWN,
  MOVE_ACCOUNT_UP,
  SORT_AND_FILTER_ACCOUNT_LIST,
  UPDATE_ACCOUNTS,
} from '../AccountIntents';
import {
  getAccountsForBulkDelete,
  getBusinessId,
  getFilterOptions,
  getSelectedSingleAccount,
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
  updateAccounts: (accounts, onSuccess, onFailure) => {
    const state = store.getState();
    const content = accounts;
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
  moveUp: (onSuccess, onFailure) => {
    const state = store.getState();
    const selectedAccount = getSelectedSingleAccount(state);

    const urlParams = {
      businessId: getBusinessId(state),
      accountId: selectedAccount.id,
    };
    integration.write({
      intent: MOVE_ACCOUNT_UP,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  moveDown: (onSuccess, onFailure) => {
    const state = store.getState();
    const selectedAccount = getSelectedSingleAccount(state);

    const urlParams = {
      businessId: getBusinessId(state),
      accountId: selectedAccount.id,
    };
    integration.write({
      intent: MOVE_ACCOUNT_DOWN,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createAccountListIntegrator;
