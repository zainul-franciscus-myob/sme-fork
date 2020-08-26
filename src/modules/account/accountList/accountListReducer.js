import {
  CLOSE_MODAL,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
  OPEN_MODAL,
  RESELECT_ACCOUNTS,
  RESET_ACCOUNT_LIST_FILTER_OPTIONS,
  SELECT_ACCOUNT,
  SELECT_ALL_ACCOUNTS,
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TAB,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../AccountIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { tabIds } from './tabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  alert: [],
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  showDeleteModal: false,
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
  alert: [...state.alert, action.alert],
});

const dismissAlert = (state, action) => ({
  ...state,
  alert: state.alert.filter((_, i) => i !== action.id),
});

const dismissAllAlerts = (state) => ({
  ...state,
  alert: [],
});

const sortAndFilterAccountList = (state, action) => ({
  ...state,
  entries: action.entries.map((entry) => ({
    ...entry,
    selected: false,
  })),
  hasFlexibleAccountNumbers: action.hasFlexibleAccountNumbers,
});

const setAccountListFilterOption = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const resetAccountListFilterOption = (state) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    keywords: '',
    showInactive: false,
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

const selectAccount = (state, { index, value }) => ({
  ...state,
  entries: state.entries.map((entry, id) =>
    id === index ? { ...entry, selected: value } : entry
  ),
});

const selectAllAccount = (state, { selected }) => ({
  ...state,
  entries: state.entries.map((entry) => ({ ...entry, selected })),
});

const openModal = (state) => ({
  ...state,
  showDeleteModal: true,
});

const closeModal = (state) => ({
  ...state,
  showDeleteModal: false,
});

const reselectAccounts = (state, { entries }) => ({
  ...state,
  entries,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [DISMISS_ALERT]: dismissAlert,
  [DISMISS_ALL_ALERTS]: dismissAllAlerts,

  [SORT_AND_FILTER_ACCOUNT_LIST]: sortAndFilterAccountList,
  [SET_ACCOUNT_LIST_FILTER_OPTIONS]: setAccountListFilterOption,
  [RESET_ACCOUNT_LIST_FILTER_OPTIONS]: resetAccountListFilterOption,
  [SET_ACCOUNT_LIST_TAB]: setAccountListTab,
  [SET_ACCOUNT_LIST_TABLE_LOADING_STATE]: setAccountListTableLoadingState,
  [SELECT_ACCOUNT]: selectAccount,
  [SELECT_ALL_ACCOUNTS]: selectAllAccount,
  [RESELECT_ACCOUNTS]: reselectAccounts,

  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const accountListReducer = createReducer(getDefaultState(), handlers);

export default accountListReducer;
