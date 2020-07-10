import {
  LOAD_QUOTE_LIST,
  LOAD_QUOTE_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createQuoteListDispatcher = (store) => ({
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
  setNextPageLoadingState: (isNextPageLoading) => {
    store.dispatch({ intent: SET_NEXT_PAGE_LOADING_STATE, isNextPageLoading });
  },
  updateFilterOptions: ({ filterName, value }) => {
    store.dispatch({ intent: UPDATE_FILTER_OPTIONS, filterName, value });
  },
  setSortOrder: (orderBy, newSortOrder) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  },
  loadQuoteList: (payload) => {
    store.dispatch({ intent: LOAD_QUOTE_LIST, ...payload });
  },
  loadQuoteListNextPage: ({ entries, pagination }) => {
    store.dispatch({ intent: LOAD_QUOTE_LIST_NEXT_PAGE, entries, pagination });
  },
  sortAndFilterQuoteList: ({ entries, total, pagination }) => {
    store.dispatch({
      intent: SORT_AND_FILTER_QUOTE_LIST,
      entries,
      total,
      pagination,
    });
  },
});

export default createQuoteListDispatcher;
