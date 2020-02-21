import { LOAD_ITEM_LIST, LOAD_NEXT_PAGE, SORT_AND_FILTER_ITEM_LIST } from '../InventoryIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getFlipSortOrder,
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
  sortItemList: ({ onSuccess, onFailure, orderBy }) => {
    const state = store.getState();
    const filterOptions = getAppliedFilterOptions(state);
    const newSortOrder = orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      ...filterOptions,
      sortOrder: newSortOrder,
      orderBy,
    };

    integration.read({
      intent: SORT_AND_FILTER_ITEM_LIST,
      params,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  filterItemList: ({
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
      rderBy: getOrderBy(state),
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
