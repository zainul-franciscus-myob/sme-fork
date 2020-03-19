import {
  LOAD_ITEM_LIST,
  LOAD_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ITEM_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../InventoryIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getFlipSortOrder, getOrderBy,
} from './itemListSelectors';

const CreateItemListDispatcher = store => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },
  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },
  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },
  loadItemList: (response) => {
    store.dispatch({
      intent: LOAD_ITEM_LIST,
      ...response,
    });
  },
  sortItemList: (response) => {
    store.dispatch({
      intent: SORT_AND_FILTER_ITEM_LIST,
      ...response,
    });
  },
  filterItemList: (response) => {
    store.dispatch({
      intent: SORT_AND_FILTER_ITEM_LIST,
      ...response,
    });
  },
  setNextPageLoadingState: (isNextPageLoading) => {
    store.dispatch({
      intent: SET_NEXT_PAGE_LOADING_STATE,
      isNextPageLoading,
    });
  },
  loadNextPage: (response) => {
    store.dispatch({
      intent: LOAD_NEXT_PAGE,
      ...response,
    });
  },
  updateFilterOptions: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      key,
      value,
    });
  },
  setSortOrder: (orderBy) => {
    const state = store.getState();
    const newSortOrder = orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  },
  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  },
});


export default CreateItemListDispatcher;
