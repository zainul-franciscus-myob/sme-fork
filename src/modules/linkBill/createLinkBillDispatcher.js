import {
  LOAD_LINK_BILL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_BILL_SELECTION,
  UPDATE_FILTER_OPTIONS,
} from './LinkBillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createLinkBillDispatcher = store => ({
  loadLinkBill: (response) => {
    store.dispatch({
      intent: LOAD_LINK_BILL,
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

  updateBillSelection: ({ id, value }) => {
    store.dispatch({
      intent: UPDATE_BILL_SELECTION,
      id,
      value,
    });
  },

  sortAndFilterLinkBillList: (bills) => {
    store.dispatch({
      intent: SORT_AND_FILTER_BILL_LIST,
      bills,
    });
  },

  setSortOrder: (orderBy, sortOrder) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      orderBy,
      sortOrder,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  setAlert: ({ message, type }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
    });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
});

export default createLinkBillDispatcher;
