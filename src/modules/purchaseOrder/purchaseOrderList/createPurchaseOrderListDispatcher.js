import {
  LOAD_PURCHASE_ORDER_LIST,
  LOAD_PURCHASE_ORDER_LIST_FAIL,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE_FAIL,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST_FAIL,
  START_LOADING_MORE,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SORT_ORDER,
} from '../PurchaseOrderIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createPurchaseOrderListDispatcher = (store) => ({
  setTableLoadingState: (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    store.dispatch({ intent, isTableLoading });
  },

  setAlert: ({ message, type }) => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: { message, type },
    });
  },

  startLoadingMore: () => {
    store.dispatch({
      intent: START_LOADING_MORE,
    });
  },

  setSortOrder: ({ orderBy, newSortOrder }) => {
    const intent = SET_SORT_ORDER;
    store.dispatch({
      intent,
      sortOrder: newSortOrder,
      orderBy,
    });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: undefined,
    });
  },

  setInitialState: (context, settings) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent,
      context,
      settings,
    });
  },

  resetFilterOptions: () => {
    const intent = RESET_FILTER_OPTIONS;
    store.dispatch({ intent });
  },

  updateFilterOptions: ({ key, value }) => {
    const intent = UPDATE_FILTER_OPTIONS;
    store.dispatch({
      intent,
      filterName: key,
      value,
    });
  },

  sortAndFilterPurchaseOrderList: ({ pagination, entries, total }) => {
    const intent = SORT_AND_FILTER_PURCHASE_ORDER_LIST;
    store.dispatch({
      intent,
      pagination,
      entries,
      total,
    });
  },

  sortAndFilterPurchaseOrderListFail: (message) => {
    const intent = SORT_AND_FILTER_PURCHASE_ORDER_LIST_FAIL;
    store.dispatch({ intent, message });
  },

  loadPurchaseOrderListNextPage: ({ pagination, entries }) => {
    const intent = LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE;
    store.dispatch({
      intent,
      entries,
      pagination,
    });
  },

  loadPurchaseOrderListNextPageFail: (message) => {
    const intent = LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE_FAIL;
    store.dispatch({ intent, message });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  updateSortOrder: (orderBy) => {
    store.dispatch({
      intent: UPDATE_SORT_ORDER,
      orderBy,
    });
  },

  loadPurchaseOrderList: (action) => {
    const intent = LOAD_PURCHASE_ORDER_LIST;
    store.dispatch({
      intent,
      ...action,
    });
  },

  loadPurchaseOrderListFail: (action) => {
    const intent = LOAD_PURCHASE_ORDER_LIST_FAIL;
    store.dispatch({
      intent,
      action,
    });
  },
});

export default createPurchaseOrderListDispatcher;
