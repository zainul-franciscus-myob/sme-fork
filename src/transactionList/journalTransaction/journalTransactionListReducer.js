import {
  LOAD_TRANSACTION_LIST,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_MULTI_FILTER_OPTIONS,
} from './JournalTransactionListIntents';
import { defaultFilterOptions } from './getDefaultState';
import Periods from '../../components/PeriodPicker/Periods';
import getDateRangeByPeriodAndRegion from '../../components/PeriodPicker/getDateRangeByPeriodAndRegion';

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
  settings = { sortOrder: 'desc', orderBy: 'Date' },
}) => {
  const defaultFilterOptionsForRegion = getDefaultFilterOptionsForRegion(region);
  return {
    ...state,
    defaultFilterOptions: defaultFilterOptionsForRegion,
    filterOptions: {
      ...state.filterOptions,
      ...defaultFilterOptionsForRegion,
      sourceJournal,
      ...settings.filterOptions,
    },
    appliedFilterOptions: {
      ...state.appliedFilterOptions,
      ...defaultFilterOptionsForRegion,
      sourceJournal,
      ...settings.filterOptions,
    },
    sortOrder: settings.sortOrder,
    orderBy: settings.orderBy,
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
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    ...action.filterOptions,
  },
});

const sortAndFilterTransactionList = (state, action) => ({
  ...state,
  entries: action.entries,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
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

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const handlers = {
  [LOAD_TRANSACTION_LIST]: loadTransactionList,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [UPDATE_MULTI_FILTER_OPTIONS]: updateMultiFilterOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_INITIAL_STATE]: setInitialState,
};

export default handlers;
