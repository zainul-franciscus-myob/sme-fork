import {
  LOAD_CUSTOMER_RETURN_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../CustomerReturnIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createCustomerReturnListDispatcher = (store) => ({
  setInitialState: (context, settings) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      settings,
    });
  },
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setAlert: ({ message, type }) => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  },
  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: undefined,
    });
  },
  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({
      intent,
      loadingState,
    });
  },
  setSortOrder: (orderBy, sortOrder) =>
    store.dispatch({
      intent: SET_SORT_ORDER,
      orderBy,
      sortOrder,
    }),
  setTableLoadingState: (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    store.dispatch({
      intent,
      isTableLoading,
    });
  },
  loadCustomerReturnList: (response) =>
    store.dispatch({
      intent: LOAD_CUSTOMER_RETURN_LIST,
      ...response,
    }),
  updateFilterBarOptions: ({ key, value }) =>
    store.dispatch({
      intent: UPDATE_FILTER_BAR_OPTIONS,
      key,
      value,
    }),
  sortAndFilterCustomerReturnList: ({
    entries,
    totalAmount,
    totalCreditAmount,
  }) => {
    store.dispatch({
      intent: SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
      entries,
      totalAmount,
      totalCreditAmount,
    });
  },
});

export default createCustomerReturnListDispatcher;
