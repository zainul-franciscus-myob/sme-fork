import {
  LOAD_SUPPLIER_RETURN_LIST,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
} from '../SupplierReturnIntents';
import {
  getParams,
  getUrlParams,
} from './selectors/SupplierReturnListIntegrationSelectors';

const createSupplierReturnListIntegrator = (store, integration) => ({
  loadSupplierReturnList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_SUPPLIER_RETURN_LIST;

    const state = store.getState();
    const urlParams = getUrlParams(state);
    const params = getParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  sortAndFilterSupplierReturnList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_SUPPLIER_RETURN_LIST;

    const state = store.getState();
    const urlParams = getUrlParams(state);
    const params = getParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createSupplierReturnListIntegrator;
