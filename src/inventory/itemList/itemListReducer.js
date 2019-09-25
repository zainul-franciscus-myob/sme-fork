import {
  LOAD_ITEM_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ITEM_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../InventoryIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  filterOptions: {
    type: 'All',
    keywords: '',
    showInactive: false,
  },
  appliedFilterOptions: {
    type: 'All',
    keywords: '',
    showInactive: false,
  },
  orderBy: '',
  sortOrder: '',
  typeFilters: [],
  entries: [],
  alert: undefined,
  isLoading: true,
  isFilteredList: false,
  isTableLoading: false,
  businessId: '',
  region: '',
});

const loadItemList = (state, action) => ({
  ...state,
  entries: action.entries,
  typeFilters: action.typeFilters,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  filterOptions: {
    ...state.filterOptions,
    type: action.type,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    type: action.type,
  },
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const sortAndFilterItemList = (state, action) => ({
  ...state,
  entries: action.entries,
  isFilteredList: action.isFilteredList,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
  showHiddenColumns: state.filterOptions.showInactive,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const resetState = () => (getDefaultState());

const handlers = {
  [LOAD_ITEM_LIST]: loadItemList,
  [SORT_AND_FILTER_ITEM_LIST]: sortAndFilterItemList,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
};

const itemListReducer = createReducer(getDefaultState(), handlers);

export default itemListReducer;
