import {
  CLOSE_RECODE,
  LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
  OPEN_RECODE,
  RESET_FILTER_OPTIONS,
  SELECT_ALL_ITEMS,
  SELECT_ITEM,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_RECODE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_FIND_AND_RECODE_LIST,
  UNSELECT_ALL_ITEMS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD,
  UPDATE_RECODE_OPTIONS,
} from './FindAndRecodeIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createFindAndRecodeDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  sortAndFilterFindAndRecodeList: (response) => {
    store.dispatch({
      intent: SORT_AND_FILTER_FIND_AND_RECODE_LIST,
      ...response,
    });
  },

  loadFindAndRecodeListNextPage: (response) => {
    store.dispatch({
      intent: LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
      ...response,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  setNextPageLoadingState: (isNextPageLoading) => {
    store.dispatch({
      intent: SET_NEXT_PAGE_LOADING_STATE,
      isNextPageLoading,
    });
  },

  setSortOrder: (orderBy) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      orderBy,
    });
  },

  updateFilterOptions: (key, value) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      key,
      value,
    });
  },

  resetFilterOptions: () => {
    store.dispatch({
      intent: RESET_FILTER_OPTIONS,
    });
  },

  updatePeriod: (periodDateRange) => {
    store.dispatch({
      intent: UPDATE_PERIOD,
      ...periodDateRange,
    });
  },

  selectItem: (id) => {
    store.dispatch({
      intent: SELECT_ITEM,
      id,
    });
  },

  selectAllItems: () => {
    store.dispatch({
      intent: SELECT_ALL_ITEMS,
    });
  },

  unselectAllItems: () => {
    store.dispatch({
      intent: UNSELECT_ALL_ITEMS,
    });
  },

  setRecodeLoadingState: (isRecodeLoading) => {
    store.dispatch({
      intent: SET_RECODE_LOADING_STATE,
      isRecodeLoading,
    });
  },

  openRecode: () => {
    store.dispatch({
      intent: OPEN_RECODE,
    });
  },

  closeRecode: () => {
    store.dispatch({
      intent: CLOSE_RECODE,
    });
  },

  updateRecodeOptions: (key, value) => {
    store.dispatch({
      intent: UPDATE_RECODE_OPTIONS,
      key,
      value,
    });
  },
});

export default createFindAndRecodeDispatcher;