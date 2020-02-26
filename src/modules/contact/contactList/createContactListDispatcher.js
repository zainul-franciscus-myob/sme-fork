import {
  LOAD_CONTACT_LIST,
  LOAD_CONTACT_LIST_NEXT_PAGE,
  RESET_FILTERS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CONTACT_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createContactListDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
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
  resetFilters: () => {
    store.dispatch({ intent: RESET_FILTERS });
  },
  setSortOrder: (orderBy, newSortOrder) => {
    store.dispatch({ intent: SET_SORT_ORDER, sortOrder: newSortOrder, orderBy });
  },
  loadContactList: (payload) => {
    store.dispatch({ intent: LOAD_CONTACT_LIST, ...payload });
  },
  loadContactListNextPage: ({ entries, pagination }) => {
    store.dispatch({ intent: LOAD_CONTACT_LIST_NEXT_PAGE, entries, pagination });
  },
  sortAndFilterContactList: ({ entries, isSort, pagination }) => {
    store.dispatch({
      intent: SORT_AND_FILTER_CONTACT_LIST, entries, isSort, pagination,
    });
  },
});

export default createContactListDispatcher;
