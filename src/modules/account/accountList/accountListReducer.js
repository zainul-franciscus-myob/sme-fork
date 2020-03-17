import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TAB,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../AccountIntents';
import { tabIds } from './tabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  filterOptions: {
    keywords: '',
    showInactive: false,
    type: tabIds.all,
  },
  entries: [],
  hasFlexibleAccountNumbers: false,
});

const setInitialState = (state, { context, settings }) => ({
  ...state,
  ...context,
  filterOptions: settings || state.filterOptions,
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const sortAndFilterAccountList = (state, action) => ({
  ...state,
  entries: action.entries,
  hasFlexibleAccountNumbers: action.hasFlexibleAccountNumbers,
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
