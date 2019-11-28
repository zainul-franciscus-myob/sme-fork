import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_NEXT_PAGE,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
} from './CreditsAndDebitsListIntents';

const createCreditsAndDebitsListDispatcher = store => ({
  setInitialState: (context, settings = { filterOptions: {} }) => {
    const intent = SET_INITIAL_STATE;
    const {
      sourceJournal,
      ...rest
    } = context;

    store.dispatch({
      intent,
      sourceJournal,
      settings,
      context: rest,
    });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setTableLoadingState: (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    store.dispatch({
      intent,
      isTableLoading,
    });
  },

  setSortOrder: (orderBy, newSortOrder) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  },

  updateFilterOptions: (key, value) => {
    const intent = UPDATE_FILTER_OPTIONS;
    store.dispatch({
      intent,
      filterName: key,
      value,
    });
  },

  sortAndFilterCreditsAndDebitsList: (isSort, entries, sortOrder, pagination) => {
    const intent = SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST;
    store.dispatch({
      intent,
      entries,
      isSort,
      sortOrder,
      pagination,
    });
  },

  loadCreditsAndDebitsList: (response) => {
    const intent = LOAD_CREDITS_AND_DEBITS_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  updatePeriodDateRange: ({ period, dateFrom, dateTo }) => {
    const intent = UPDATE_PERIOD_DATE_RANGE;
    store.dispatch({
      intent,
      period,
      dateFrom,
      dateTo,
    });
  },

  setNextPageLoadingState: (isNextPageLoading) => {
    const intent = SET_NEXT_PAGE_LOADING_STATE;
    store.dispatch({
      intent,
      isNextPageLoading,
    });
  },

  loadNextPage: (response) => {
    const intent = LOAD_NEXT_PAGE;
    store.dispatch({
      intent,
      ...response,
    });
  },
});

export default createCreditsAndDebitsListDispatcher;
