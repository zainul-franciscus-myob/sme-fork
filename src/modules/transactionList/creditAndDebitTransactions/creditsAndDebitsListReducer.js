import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_NEXT_PAGE,
  REPLACE_FILTER_OPTIONS,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
} from './CreditsAndDebitsListIntents';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import getDateRangeByPeriodAndRegion from '../../../components/PeriodPicker/getDateRangeByPeriodAndRegion';

const loadMoreButtonStatusBasedOnHasNextPage = hasNextPage => (
  hasNextPage ? LoadMoreButtonStatuses.SHOWN : LoadMoreButtonStatuses.HIDDEN);

const setInitialState = (state, {
  context,
  settings,
  sourceJournal,
}) => {
  const filterOptions = {
    ...state.filterOptions,
    ...getDateRangeByPeriodAndRegion(context.region, new Date(), state.filterOptions.period),
    ...settings.filterOptions,
    sourceJournal: (
      sourceJournal || settings.filterOptions.sourceJournal || state.filterOptions.sourceJournal
    ),
  };
  return ({
    ...state,
    ...context,
    filterOptions,
    appliedFilterOptions: filterOptions,
    orderBy: settings.orderBy || state.orderBy,
    sortOrder: settings.sortOrder || state.sortOrder,
  });
};

const loadCreditsAndDebitsList = (state, action) => ({
  ...state,
  sourceJournalFilters: action.sourceJournalFilters,
  entries: action.entries,
  accountList: action.accountList,
  pagination: action.pagination,
  loadMoreButtonStatus: loadMoreButtonStatusBasedOnHasNextPage(action.pagination.hasNextPage),
});

const sortAndFilterCreditsAndDebitsList = (state, action) => ({
  ...state,
  entries: action.entries,
  pagination: action.pagination,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : { ...state.filterOptions },
  loadMoreButtonStatus: loadMoreButtonStatusBasedOnHasNextPage(action.pagination.hasNextPage),
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const replaceFilterOptions = (state, action) => {
  const {
    period, sourceJournal, dateFrom, dateTo, keywords,
  } = action.filterOptions;

  return ({
    ...state,
    filterOptions: {
      ...state.filterOptions,
      period,
      sourceJournal,
      dateFrom,
      dateTo,
      keywords,
    },
  });
};

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const updatePeriodDateRange = (state, { period, dateFrom, dateTo }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    period,
    dateFrom,
    dateTo,
  },
});

const setNextPageLoadingState = (state, action) => ({
  ...state,
  loadMoreButtonStatus:
    action.isNextPageLoading
      ? LoadMoreButtonStatuses.LOADING
      : loadMoreButtonStatusBasedOnHasNextPage(state.pagination.hasNextPage),
});

const loadNextPage = (state, action) => ({
  ...state,
  entries: [
    ...state.entries,
    ...action.entries,
  ],
  pagination: action.pagination,
  loadMoreButtonStatus: loadMoreButtonStatusBasedOnHasNextPage(action.pagination.hasNextPage),
});

const handlers = {
  [LOAD_CREDITS_AND_DEBITS_LIST]: loadCreditsAndDebitsList,
  [SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST]: sortAndFilterCreditsAndDebitsList,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [REPLACE_FILTER_OPTIONS]: replaceFilterOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_INITIAL_STATE]: setInitialState,
  [UPDATE_PERIOD_DATE_RANGE]: updatePeriodDateRange,
  [SET_NEXT_PAGE_LOADING_STATE]: setNextPageLoadingState,
  [LOAD_NEXT_PAGE]: loadNextPage,
};

export default handlers;
