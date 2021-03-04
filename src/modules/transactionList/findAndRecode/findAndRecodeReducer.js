import {
  CLOSE_MODAL,
  CLOSE_RECODE_OPTIONS,
  FINISH_RECODE,
  LOAD_FIND_AND_RECODE_LIST,
  LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
  OPEN_MODAL,
  OPEN_RECODE_OPTIONS,
  RECODE_ITEM_FAILURE,
  RECODE_ITEM_SUCCESS,
  RESET_FILTER_OPTIONS,
  SELECT_ALL_ITEMS,
  SELECT_ITEM,
  SET_FIND_AND_RECODE_LIST_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_FIND_AND_RECODE_LIST,
  START_RECODE,
  UNSELECT_ALL_ITEMS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD,
  UPDATE_RECODE_OPTIONS,
} from './FindAndRecodeIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getAreAllItemsSelected } from './findAndRecodeSelectors';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import Periods from '../../../components/PeriodPicker/Periods';
import RecodeStatus from './types/RecodeStatus';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  region: undefined,
  businessId: undefined,
  lastMonthInFinancialYear: undefined,
  modalType: undefined,
  accountList: [],
  taxCodeList: [],
  entries: [],
  isTableLoading: false,
  isFindAndRecodeListLoading: false,
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
  isRecodeOptionsOpen: false,
  recodeOptions: {
    accountId: '',
    taxCodeId: '',
  },
  recodeItems: [],
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

const setFindAndRecodeListLoadingState = (
  state,
  { isFindAndRecodeListLoading }
) => ({
  ...state,
  isFindAndRecodeListLoading,
});

const startRecode = (state) => ({
  ...state,
  recodeItems: state.recodeItems.map((item) => ({
    ...item,
    status: RecodeStatus.LOADING,
  })),
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

const loadFindAndRecodeList = (
  state,
  { accountList, taxCodeList, entries, pagination, lastMonthInFinancialYear }
) => ({
  ...state,
  accountList,
  taxCodeList,
  entries,
  pagination,
  lastMonthInFinancialYear,
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
    recodeItems: areAllItemsSelected
      ? []
      : state.entries.map((entry) => ({
          id: entry.id,
          status: RecodeStatus.SELECTED,
        })),
  };
};

const selectItem = (state, { id }) => {
  const isSelected = state.recodeItems.some((item) => item.id === id);

  return {
    ...state,
    recodeItems: isSelected
      ? state.recodeItems.filter((item) => item.id !== id)
      : [
          ...state.recodeItems,
          {
            id,
            status: RecodeStatus.SELECTED,
          },
        ],
  };
};

const unselectAllItems = (state) => ({
  ...state,
  recodeItems: [],
});

export const finishRecode = (state) => {
  return {
    ...state,
    recodeItems: state.recodeItems.filter(
      (item) => item.status === RecodeStatus.FAILURE
    ),
  };
};

const openRecodeOptions = (state) => ({
  ...state,
  isRecodeOptionsOpen: true,
});

const closeRecodeOptions = (state) => ({
  ...state,
  isRecodeOptionsOpen: false,
});

const updateRecodeOptions = (state, { key, value }) => ({
  ...state,
  recodeOptions: {
    ...state.recodeOptions,
    [key]: value,
  },
});

const getRecodeAccountName = (state) => {
  const recodeAccountId = state.recodeOptions.accountId;
  const recodeAccount = state.accountList.find(
    (account) => account.id === recodeAccountId
  );

  return `${recodeAccount.displayId} ${recodeAccount.displayName}`;
};

const getRecodeTaxCodeName = (state) => {
  const recodeTaxCodeId = state.recodeOptions.taxCodeId;
  const recodeTaxCode = state.taxCodeList.find(
    (taxCode) => taxCode.id === recodeTaxCodeId
  );

  return `${recodeTaxCode.displayName}`;
};

const recodeItemSuccess = (state, { id }) => {
  const isRecodeAccount = Boolean(state.recodeOptions.accountId);
  const isRecodeTaxCode = Boolean(state.recodeOptions.taxCodeId);

  return {
    ...state,
    entries: state.entries.map((entry) => {
      if (entry.id === id) {
        return {
          ...entry,
          displayAccountName: isRecodeAccount
            ? getRecodeAccountName(state)
            : entry.displayAccountName,
          taxCode: isRecodeTaxCode
            ? getRecodeTaxCodeName(state)
            : entry.taxCode,
        };
      }

      return entry;
    }),
    recodeItems: state.recodeItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: RecodeStatus.SUCCESS,
        };
      }

      return item;
    }),
  };
};

const recodeItemFailure = (state, { id, error }) => ({
  ...state,
  recodeItems: state.recodeItems.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: RecodeStatus.FAILURE,
        error,
      };
    }

    return item;
  }),
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = (state) => ({
  ...state,
  modalType: undefined,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_FIND_AND_RECODE_LIST_LOADING_STATE]: setFindAndRecodeListLoadingState,
  [LOAD_FIND_AND_RECODE_LIST]: loadFindAndRecodeList,
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
  [FINISH_RECODE]: finishRecode,
  [START_RECODE]: startRecode,
  [OPEN_RECODE_OPTIONS]: openRecodeOptions,
  [CLOSE_RECODE_OPTIONS]: closeRecodeOptions,
  [UPDATE_RECODE_OPTIONS]: updateRecodeOptions,
  [RECODE_ITEM_SUCCESS]: recodeItemSuccess,
  [RECODE_ITEM_FAILURE]: recodeItemFailure,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const findAndRecodeReducer = createReducer(getDefaultState(), handlers);

export default findAndRecodeReducer;
