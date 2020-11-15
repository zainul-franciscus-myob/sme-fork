import {
  LOAD_PURCHASE_ORDER_LIST,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST,
} from '../PurchaseOrderIntents';
import {
  getBusinessId,
  getFilterOptions,
  getOffset,
  getOrderBy,
  getSortOrder,
} from './purchaseOrderListSelectors';

const createPurchaseOrderListIntegrator = (store, integration) => ({
  loadPurchaseOrderList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_PURCHASE_ORDER_LIST;
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
        offset: 0,
      },
      onSuccess,
      onFailure,
    });
  },

  sortAndFilterPurchaseOrderList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SORT_AND_FILTER_PURCHASE_ORDER_LIST;
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
        offset: 0,
      },
      onSuccess,
      onFailure,
    });
  },

  loadPurchaseOrderListNextPage: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const offset = getOffset(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
        offset,
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createPurchaseOrderListIntegrator;
