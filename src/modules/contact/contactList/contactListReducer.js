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
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const defaultFilterOptions = {
  keywords: '',
  showInactive: false,
  type: 'all',
};

const getDefaultState = () => ({
  defaultFilterOptions,
  filterOptions: defaultFilterOptions,
  typeFilters: [],
  entries: [],
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isNextPageLoading: false,
  loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
  businessId: '',
  region: '',
  showHiddenColumns: false,
});

const resetState = () => getDefaultState();

const loadContactList = (state, action) => ({
  ...state,
  entries: action.entries,
  typeFilters: action.typeFilters,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  pagination: {
    hasNextPage: action.pagination.hasNextPage,
    offset: action.pagination.offset,
  },
  filterOptions: {
    ...state.filterOptions,
    type: action.type,
  },
  defaultFilterOptions: {
    ...state.defaultFilterOptions,
    type: action.type,
  },
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  loadingState: action.loadingState,
});

const setNextPageLoadingState = (state, action) => ({
  ...state,
  isNextPageLoading: action.isNextPageLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const sortAndFilterContactList = (state, action) => ({
  ...state,
  entries: action.entries,
  showHiddenColumns: state.filterOptions.showInactive,
  pagination: {
    hasNextPage: action.pagination.hasNextPage,
    offset: action.pagination.offset,
  },
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const resetFilters = (state) => ({
  ...state,
  filterOptions: {
    ...state.defaultFilterOptions,
  },
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadContactListNextPage = (state, action) => {
  const contactExistsInState = (payloadContact) =>
    state.entries.some(
      (existingContact) => existingContact.id === payloadContact.id
    );

  const entries = action.entries.filter(
    (payloadContact) => !contactExistsInState(payloadContact)
  );

  return {
    ...state,
    entries: [...state.entries, ...entries],
    pagination: {
      hasNextPage: action.pagination.hasNextPage,
      offset: action.pagination.offset,
    },
  };
};

const handlers = {
  [LOAD_CONTACT_LIST]: loadContactList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_NEXT_PAGE_LOADING_STATE]: setNextPageLoadingState,
  [SET_ALERT]: setAlert,
  [SORT_AND_FILTER_CONTACT_LIST]: sortAndFilterContactList,
  [RESET_STATE]: resetState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_CONTACT_LIST_NEXT_PAGE]: loadContactListNextPage,
  [RESET_FILTERS]: resetFilters,
};

const contactListReducer = createReducer(getDefaultState(), handlers);

export default contactListReducer;
