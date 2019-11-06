import { SORT_AND_FILTER_ACCOUNT_LIST } from '../AccountIntents';
import {
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
});

export default createAccountListIntegrator;
