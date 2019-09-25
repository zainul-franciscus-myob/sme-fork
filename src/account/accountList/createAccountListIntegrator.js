import { LOAD_ACCOUNT_LIST, SORT_AND_FILTER_ACCOUNT_LIST } from '../AccountListIntents';
import {
  getBusinessId,
  getFilterOptions,
} from './AccountListSelectors';

const createAccountListIntegrator = (store, integration) => ({
  loadAccountList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_ACCOUNT_LIST;

    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
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
});

export default createAccountListIntegrator;
