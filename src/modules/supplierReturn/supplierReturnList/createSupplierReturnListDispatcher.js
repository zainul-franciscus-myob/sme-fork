import {
  LOAD_SUPPLIER_RETURN_LIST,
  RESET_FILTER_BAR_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../SupplierReturnIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createSupplierReturnListDispatcher = (store) => ({
  setInitialState: (context, settings) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context, settings });
  },
  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },
  setAlert: ({ message, type }) => {
    store.dispatch({ intent: SET_ALERT, alert: { message, type } });
  },
  dismissAlert: () => {
    store.dispatch({ intent: SET_ALERT, alert: undefined });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({ intent: SET_LOADING_STATE, loadingState });
  },
  setTableLoadingState: (isTableLoading) => {
    store.dispatch({ intent: SET_TABLE_LOADING_STATE, isTableLoading });
  },
  updateFilterBarOptions: ({ key, value }) => {
    store.dispatch({ intent: UPDATE_FILTER_BAR_OPTIONS, key, value });
  },
  resetFilterBarOptions: () => {
    store.dispatch({ intent: RESET_FILTER_BAR_OPTIONS });
  },
  setSortOrder: (orderBy, sortOrder) => {
    store.dispatch({ intent: SET_SORT_ORDER, orderBy, sortOrder });
  },
  loadSupplierReturnList: (payload) => {
    store.dispatch({ intent: LOAD_SUPPLIER_RETURN_LIST, ...payload });
  },
  sortAndFilterSupplierReturnList: (payload, isSort) => {
    store.dispatch({
      intent: SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
      ...payload,
      isSort,
    });
  },
});

export default createSupplierReturnListDispatcher;
