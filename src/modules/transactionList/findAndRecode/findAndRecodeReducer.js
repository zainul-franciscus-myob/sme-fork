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
import { getAreAllItemsSelected } from './findAndRecodeSelectors';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import Periods from '../../../components/PeriodPicker/Periods';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  region: undefined,
  businessId: undefined,
  accountList: [],
  taxCodeList: [],
  entries: [],
  isTableLoading: false,
  isNextPageLoading: false,
  loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
  filterOptions: {
    accountId: undefined,
    taxCodeId: undefined,
    sourceJournal: 'All',
    keywords: '',
    period: Periods.thisMonth,
    dateFrom: '',
    dateTo: '',
  },
  sortOrder: 'desc',
  orderBy: 'Date',
  selectedItems: [],
  isRecodeLoading: false,
  isRecodeOpen: false,
  recodeOptions: {
    accountId: '',
  },
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => getDefaultState();

const setTableLoadingState = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const getRecodeLoadingState = (state, { isRecodeLoading }) => ({
  ...state,
  isRecodeLoading,
});

const setNextPageLoadingState = (state, { isNextPageLoading }) => ({
  ...state,
  isNextPageLoading,
});

const setSortOrder = (state, { orderBy }) => {
  const isSameOrderBy = orderBy === state.orderBy;
  const flippedSortOrder = state.sortOrder === 'desc' ? 'asc' : 'desc';

  return {
    ...state,
    sortOrder: isSameOrderBy ? flippedSortOrder : 'asc',
    orderBy,
  };
};

const updateFilterOptions = (state, { key, value }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [key]: value,
  },
});

const updatePeriod = (state, { period, dateFrom, dateTo }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    period,
    dateFrom,
    dateTo,
  },
});

const resetFilterOptions = (state) => ({
  ...state,
  filterOptions: getDefaultState().filterOptions,
});

const sortAndFilterFindAndRecodeList = (state, { entries, pagination }) => ({
  ...state,
  entries,
  pagination,
});

const loadFindAndRecodeListNextPage = (state, { entries, pagination }) => ({
  ...state,
  entries: [...state.entries, ...entries],
  pagination,
});

const selectAllItems = (state) => {
  const areAllItemsSelected = getAreAllItemsSelected(state);

  return {
    ...state,
    selectedItems: areAllItemsSelected
      ? []
      : state.entries.map((entry) => entry.id),
  };
};

const selectItem = (state, { id }) => {
  const isSelected = state.selectedItems.includes(id);

  return {
    ...state,
    selectedItems: isSelected
      ? state.selectedItems.filter((_) => _ !== id)
      : [...state.selectedItems, id],
  };
};

export const unselectAllItems = (state) => {
  return {
    ...state,
    selectedItems: [],
  };
};

const openRecode = (state) => ({
  ...state,
  isRecodeOpen: true,
});

const closeRecode = (state) => ({
  ...state,
  isRecodeOpen: false,
});

const updateRecodeOptions = (state, { key, value }) => ({
  ...state,
  recodeOptions: {
    ...state.recodeOptions,
    [key]: value,
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_NEXT_PAGE_LOADING_STATE]: setNextPageLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [UPDATE_PERIOD]: updatePeriod,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
  [SORT_AND_FILTER_FIND_AND_RECODE_LIST]: sortAndFilterFindAndRecodeList,
  [LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE]: loadFindAndRecodeListNextPage,
  [SELECT_ITEM]: selectItem,
  [SELECT_ALL_ITEMS]: selectAllItems,
  [UNSELECT_ALL_ITEMS]: unselectAllItems,
  [SET_RECODE_LOADING_STATE]: getRecodeLoadingState,
  [OPEN_RECODE]: openRecode,
  [CLOSE_RECODE]: closeRecode,
  [UPDATE_RECODE_OPTIONS]: updateRecodeOptions,
};

const findAndRecodeReducer = createReducer(getDefaultState(), handlers);

export default findAndRecodeReducer;
