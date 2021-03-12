import {
  LOAD_REMITTANCE_ADVICE_LIST,
  SELECT_ALL_REMITTANCE_ADVICE_LIST,
  SELECT_REMITTANCE_ADVICE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_REMITTANCE_ADVICE_LIST,
} from './RemittanceAdviceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createRemittanceAdviceListDispatcher = (store) => ({
  setLoadingState: (loadingState) =>
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    }),

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent,
      context,
    });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  selectRemittanceAdvice: (id) =>
    store.dispatch({
      intent: SELECT_REMITTANCE_ADVICE,
      id,
    }),

  selectAllRemittanceAdviceList: () =>
    store.dispatch({
      intent: SELECT_ALL_REMITTANCE_ADVICE_LIST,
    }),

  loadRemittanceAdviceList: (payload) =>
    store.dispatch({
      intent: LOAD_REMITTANCE_ADVICE_LIST,
      payload,
    }),

  setTableLoadingState: (isTableLoading) =>
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    }),

  sortAndFilterRemittanceAdviceList: (payload) =>
    store.dispatch({
      intent: SORT_AND_FILTER_REMITTANCE_ADVICE_LIST,
      payload,
    }),

  setSortOrder: (orderBy, newSortOrder) =>
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    }),

  setAlert: (alert) =>
    store.dispatch({
      intent: SET_ALERT,
      alert,
    }),
});

export default createRemittanceAdviceListDispatcher;
