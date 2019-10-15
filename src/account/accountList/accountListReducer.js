import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TAB,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../AccountListIntents';
import { tabIds } from './tabItems';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  filterOptions: {
    keywords: '',
    showInactive: false,
    type: tabIds.all,
  },
  appliedFilterOptions: {
    keywords: '',
    showInactive: false,
    type: tabIds.all,
  },
  entries: [],
});

const setInitialState = (state, { context, settings }) => ({
  ...state,
  ...context,
  filterOptions: settings || state.filterOptions,
  appliedFilterOptions: settings || state.appliedFilterOptions,
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const sortAndFilterAccountList = (state, action) => ({
  ...state,
  appliedFilterOptions: action.isSort
    ? state.appliedFilterOptions
    : state.filterOptions,
  entries: action.entries,
});

const setAccountListFilterOption = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const setAccountListTab = (state, { tabId }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    type: tabId,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    type: tabId,
  },
});

const setAccountListTableLoadingState = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,

  [SORT_AND_FILTER_ACCOUNT_LIST]: sortAndFilterAccountList,
  [SET_ACCOUNT_LIST_FILTER_OPTIONS]: setAccountListFilterOption,
  [SET_ACCOUNT_LIST_TAB]: setAccountListTab,
  [SET_ACCOUNT_LIST_TABLE_LOADING_STATE]: setAccountListTableLoadingState,
};

const accountListReducer = createReducer(getDefaultState(), handlers);

export default accountListReducer;
