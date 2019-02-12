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
  RESET_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';


const getInitialState = () => ({
  filterOptions: {
    keywords: '',
    showInactive: false,
    contactType: 'all',
  },
  appliedFilterOptions: {
    keywords: '',
    showInactive: false,
    contactType: 'all',
  },
  contactTypeFilters: [],
  entries: [],
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
});

const resetState = () => (getInitialState());

const loadContactList = (state, action) => ({
  ...state,
  entries: action.entries,
  contactTypeFilters: action.contactTypeFilters,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  filterOptions: {
    ...state.filterOptions,
    contactType: action.contactType,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    contactType: action.contactType,
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

const handlers = {
  [LOAD_CONTACT_LIST]: loadContactList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [SORT_AND_FILTER_CONTACT_LIST]: sortAndFilterContactList,
  [RESET_STATE]: resetState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
};

const contactListReducer = createReducer(getInitialState(), handlers);

export default contactListReducer;
