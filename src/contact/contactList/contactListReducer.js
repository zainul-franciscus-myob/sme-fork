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
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import LoadMoreButtonStatuses from '../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import createReducer from '../../store/createReducer';

const defaultFilterOptions = {
  keywords: '',
  showInactive: false,
  type: 'all',
};

const getDefaultState = () => ({
  defaultFilterOptions,
  filterOptions: defaultFilterOptions,
  appliedFilterOptions: defaultFilterOptions,
  typeFilters: [],
  entries: [],
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  isNextPageLoading: false,
  loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
  businessId: '',
  region: '',
  showHiddenColumns: false,
});

const resetState = () => (getDefaultState());

const loadMoreButtonStatusBasedOnHasNextPage = hasNextPage => (
  hasNextPage ? LoadMoreButtonStatuses.SHOWN : LoadMoreButtonStatuses.HIDDEN);

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
  loadMoreButtonStatus: loadMoreButtonStatusBasedOnHasNextPage(action.pagination.hasNextPage),
  filterOptions: {
    ...state.filterOptions,
    type: action.type,
  },
  defaultFilterOptions: {
    ...state.defaultFilterOptions,
    type: action.type,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    type: action.type,
  },
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
  loadMoreButtonStatus:
    action.isTableLoading ? LoadMoreButtonStatuses.HIDDEN : LoadMoreButtonStatuses.SHOWN,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setNextPageLoadingState = (state, action) => ({
  ...state,
  loadMoreButtonStatus:
    action.isNextPageLoading
      ? LoadMoreButtonStatuses.LOADING
      : loadMoreButtonStatusBasedOnHasNextPage(state.pagination.hasNextPage),
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const sortAndFilterContactList = (state, action) => ({
  ...state,
  entries: action.entries,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
  showHiddenColumns: state.filterOptions.showInactive,
  pagination: {
    hasNextPage: action.pagination.hasNextPage,
    offset: action.pagination.offset,
  },
  loadMoreButtonStatus: loadMoreButtonStatusBasedOnHasNextPage(action.pagination.hasNextPage),
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const resetFilters = state => ({
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
  const contactExistsInState = payloadContact => state.entries.some(
    existingContact => existingContact.id === payloadContact.id,
  );

  const entries = action.entries.filter(
    payloadContact => !contactExistsInState(payloadContact),
  );

  return ({
    ...state,
    entries: [
      ...state.entries,
      ...entries,
    ],
    pagination: {
      hasNextPage: action.pagination.hasNextPage,
      offset: action.pagination.offset,
    },
    loadMoreButtonStatus: loadMoreButtonStatusBasedOnHasNextPage(action.pagination.hasNextPage),
  });
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
