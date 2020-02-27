import { LOAD_SUPPLIER_RETURN_LIST, SORT_AND_FILTER_SUPPLIER_RETURN_LIST } from '../SupplierReturnIntents';
import { getAppliedParams, getParams, getUrlParams } from './selectors/SupplierReturnListIntegrationSelectors';

const createSupplierReturnListIntegrator = (store, integration) => ({
  loadSupplierReturnList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_SUPPLIER_RETURN_LIST;

    const state = store.getState();
    const urlParams = getUrlParams(state);
    const params = getParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
  filterSupplierList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_SUPPLIER_RETURN_LIST;

    const state = store.getState();
    const urlParams = getUrlParams(state);
    const params = getParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
  sortSupplierReturnList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_SUPPLIER_RETURN_LIST;

    const state = store.getState();
    const urlParams = getUrlParams(state);
    const params = getAppliedParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
});

export default createSupplierReturnListIntegrator;
