import { LOAD_ITEM_LIST, LOAD_NEXT_PAGE, SORT_AND_FILTER_ITEM_LIST } from '../InventoryIntents';
import {
  getBusinessId,
  getFilterOptions,
  getLoadNextPageParams,
  getOrderBy,
  getSortOrder,
} from './itemListSelectors';

const CreateItemListIntegrator = (store, integration) => ({
  loadItemList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      ...getFilterOptions(state),
    };

    integration.read({
      intent: LOAD_ITEM_LIST,
      params,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  sortAndFilterItemList: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const filterOptions = getFilterOptions(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      ...filterOptions,
      sortOrder: getSortOrder(state),
      orderBy: getOrderBy(state),
    };

    integration.read({
      intent: SORT_AND_FILTER_ITEM_LIST,
      params,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  loadNextPage: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getLoadNextPageParams(state);

    integration.read({
      intent: LOAD_NEXT_PAGE,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default CreateItemListIntegrator;
