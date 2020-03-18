import { LOAD_CUSTOMER_RETURN_LIST, SORT_AND_FILTER_CUSTOMER_RETURN_LIST } from '../CustomerReturnIntents';
import {
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './CustomerReturnListSelectors';

const createCustomerReturnListIntegrator = (store, integration) => ({
  loadCustomerReturnList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    integration.read({
      intent: LOAD_CUSTOMER_RETURN_LIST,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  sortAndFilterCustomerReturnList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_CUSTOMER_RETURN_LIST;

    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
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

export default createCustomerReturnListIntegrator;
