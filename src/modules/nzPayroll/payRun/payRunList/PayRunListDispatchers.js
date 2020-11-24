import {
  FLIP_SORT_ORDER,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PAY_RUN_LIST,
  UPDATE_FILTER_OPTIONS,
} from './PayRunListIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const PayRunDispatchers = (store) => ({
  updateFilterOptions: (filterName, value) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  },

  resetFilterOptions: () => {
    store.dispatch({
      intent: RESET_FILTER_OPTIONS,
    });
  },

  sortAndFilterPayRunList: (entries, sortOrder) => {
    const intent = SORT_AND_FILTER_PAY_RUN_LIST;
    store.dispatch({
      intent,
      entries,
      sortOrder,
    });
  },

  setSortOrder: (sortOrder) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder,
    });
  },

  flipSortOrder: () => {
    store.dispatch({
      intent: FLIP_SORT_ORDER,
    });
  },

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: undefined,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    store.dispatch({
      intent,
      isTableLoading,
    });
  },

  unsubscribeFromStore: () => {
    store.unsubscribeAll();
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent,
      context,
    });
  },

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  resetState() {
    const intent = RESET_STATE;
    store.dispatch({
      intent,
    });
  },
});

export default PayRunDispatchers;
