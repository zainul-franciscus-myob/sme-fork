import {
  LOAD_TRANSACTION_LIST,
  LOAD_TRANSACTION_LIST_NEXT_PAGE,
  REPLACE_FILTER_OPTIONS,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MULTI_FILTER_OPTIONS,
} from './JournalTransactionListIntents';
import { defaultFilterOptions } from './getDefaultState';
import Periods from '../../../components/PeriodPicker/Periods';
import getDateRangeByPeriodAndRegion from '../../../components/PeriodPicker/getDateRangeByPeriodAndRegion';

const getDefaultFilterOptionsForRegion = region => ({
  ...defaultFilterOptions,
  ...getDateRangeByPeriodAndRegion(
    region,
    new Date(),
    Periods.thisMonth,
  ),
});

const setInitialState = (state, {
  context: { region },
  sourceJournal,
  settings = { sortOrder: 'desc', orderBy: 'Date', filterOptions: {} },
}) => {
  const defaultFilterOptionsForRegion = getDefaultFilterOptionsForRegion(region);
  const filterOptions = {
    ...state.filterOptions,
    ...defaultFilterOptionsForRegion,
    ...settings.filterOptions,
    sourceJournal:
      sourceJournal
      || settings.filterOptions.sourceJournal
      || state.filterOptions.sourceJournal,
  };
  return {
    ...state,
    defaultFilterOptions: defaultFilterOptionsForRegion,
    filterOptions,
    sortOrder: settings.sortOrder,
    orderBy: settings.orderBy,
    isNextPageLoading: false,
  };
};

const loadTransactionList = (state, action) => ({
  ...state,
  sourceJournalFilters: action.sourceJournalFilters,
  entries: action.entries,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  filterOptions: {
    ...state.filterOptions,
    ...action.filterOptions,
  },
  pagination: {
    hasNextPage: action.pagination.hasNextPage,
    offset: action.pagination.offset,
  },
});

const sortAndFilterTransactionList = (state, action) => ({
  ...state,
  entries: action.entries,
  pagination: {
    hasNextPage: action.pagination.hasNextPage,
    offset: action.pagination.offset,
  },
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

const addUpdateToFilterOption = (filterOptions, { filterName, value }) => ({
  ...filterOptions,
  [filterName]: value,
});

const updateMultiFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    ...action.filterUpdates.reduce(addUpdateToFilterOption, {}),
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

const setIsNextPageLoadingState = (state, action) => ({
  ...state,
  isNextPageLoading: action.isNextPageLoading,
});

const loadTransactionListNextPage = (state, action) => {
  const filterDuplicates = action.entries.filter(
    ({ id }) => state.entries.every(entry => entry.id !== id),
  );
  return ({
    ...state,
    entries: [
      ...state.entries,
      ...filterDuplicates,
    ],
    pagination: {
      hasNextPage: action.pagination.hasNextPage,
      offset: action.pagination.offset,
    },
  });
};

const handlers = {
  [LOAD_TRANSACTION_LIST]: loadTransactionList,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [UPDATE_MULTI_FILTER_OPTIONS]: updateMultiFilterOptions,
  [REPLACE_FILTER_OPTIONS]: replaceFilterOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_NEXT_PAGE_LOADING_STATE]: setIsNextPageLoadingState,
  [LOAD_TRANSACTION_LIST_NEXT_PAGE]: loadTransactionListNextPage,
};

export default handlers;
