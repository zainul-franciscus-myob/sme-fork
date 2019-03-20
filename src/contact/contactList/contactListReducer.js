import {
  LOAD_CONTACT_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CONTACT_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../ContactIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';


const getDefaultState = () => ({
  filterOptions: {
    keywords: '',
    showInactive: false,
    type: 'all',
  },
  appliedFilterOptions: {
    keywords: '',
    showInactive: false,
    type: 'all',
  },
  typeFilters: [],
  entries: [],
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  businessId: '',
  region: '',
});

const resetState = () => (getDefaultState());

const loadContactList = (state, action) => ({
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
  }
  ,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const sortAndFilterContactList = (state, action) => ({
  ...state,
  entries: action.entries,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
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

const handlers = {
  [LOAD_CONTACT_LIST]: loadContactList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [SORT_AND_FILTER_CONTACT_LIST]: sortAndFilterContactList,
  [RESET_STATE]: resetState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_INITIAL_STATE]: setInitialState,
};

const contactListReducer = createReducer(getDefaultState(), handlers);

export default contactListReducer;
