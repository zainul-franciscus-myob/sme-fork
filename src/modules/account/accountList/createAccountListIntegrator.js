import {
  DELETE_ACCOUNTS,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../AccountIntents';
import {
  getAccountsForBulkDelete,
  getBusinessId,
  getFilterOptions,
} from './AccountListSelectors';

const createAccountListIntegrator = (store, integration) => ({
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
});

export default createAccountListIntegrator;
