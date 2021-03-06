import {
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
  LOAD_ACCOUNT_LIST,
  RESELECT_ACCOUNTS,
  RESET_ACCOUNT_LIST_FILTER_OPTIONS,
  SELECT_ACCOUNTS,
  SELECT_ALL_ACCOUNTS,
  SET_ACCOUNT_DETAILS,
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TAB,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_EDIT_MODE,
  SET_HOVERED_ROW,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_MOVE_TO_DISABLED,
  SET_REDIRECT_URL,
  SET_REMAINING_HISTORICAL_BALANCE,
  SET_SELECTED_TAX_CODE,
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
  filterOptions: {
    keywords: '',
    showInactive: false,
    type: tabIds.all,
  },
  entries: [],
  hasFlexibleAccountNumbers: false,
  editingMode: false,
  modalType: '',
  redirectUrl: '',
  openingBalanceDate: '',
  remainingHistoricalBalance: 0,
  ignoredLinkedAccounts: {
    equityAccountCurrentEarnings: {
      accountId: '',
    },
    equityHistoricalBalancing: {
      accountId: '',
    },
  },
  accountClassifications: {},
  taxCodeList: [],
  hoveredRowIndex: null,
  selectedTaxCodeId: null,
  disableMoveTo: false,
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

const loadAccountList = (state, action) => ({
  ...state,
  entries: action.entries.map((entry) => ({
    ...entry,
    selected: false,
    dirty: false,
  })),
  hasFlexibleAccountNumbers: action.hasFlexibleAccountNumbers,
  openingBalanceDate: action.openingBalanceDate,
  ignoredLinkedAccounts: {
    ...action.linkedAccounts,
  },
  accountClassifications: action.accountClassifications,
  taxCodeList: action.taxCodeList,
});

const sortAndFilterAccountList = (state, action) => ({
  ...state,
  entries: action.entries.map((entry) => ({
    ...entry,
    dirty: false,
  })),
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

const shouldDisableMoveTo = (state, { disabled }) => ({
  ...state,
  disableMoveTo: disabled,
});

const selectAccounts = (state, { updatedAccountsMap }) => ({
  ...state,
  entries: state.entries.map((entry, index) =>
    updatedAccountsMap[index] ? updatedAccountsMap[index] : entry
  ),
});

const selectAllAccount = (state, { selected }) => ({
  ...state,
  entries: state.entries.map((entry) => ({ ...entry, selected })),
});

const setModalType = (state, { modalType }) => ({
  ...state,
  modalType,
});

const reselectAccounts = (state, { entries }) => ({
  ...state,
  entries,
});

const setEditMode = (state, { editingMode }) => ({
  ...state,
  editingMode,
});

const setAccountDetails = (state, action) => ({
  ...state,
  entries: state.entries.map((entry, id) =>
    id === action.index && entry[action.key] !== action.value
      ? { ...entry, [action.key]: action.value, dirty: true }
      : entry
  ),
});

const setRedirectUrl = (state, { redirectUrl }) => ({
  ...state,
  redirectUrl,
});

const setRemainingHistoricalBalance = (
  state,
  { remainingHistoricalBalance }
) => ({
  ...state,
  remainingHistoricalBalance,
});

const setHoveredRow = (state, { index }) =>
  state.hoveredRowIndex === index
    ? state
    : { ...state, hoveredRowIndex: index };

const setSelectedTaxCode = (state, { taxCode }) => ({
  ...state,
  selectedTaxCodeId: taxCode ? taxCode.id : null,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [DISMISS_ALERT]: dismissAlert,
  [DISMISS_ALL_ALERTS]: dismissAllAlerts,

  [LOAD_ACCOUNT_LIST]: loadAccountList,
  [SORT_AND_FILTER_ACCOUNT_LIST]: sortAndFilterAccountList,
  [SET_ACCOUNT_LIST_FILTER_OPTIONS]: setAccountListFilterOption,
  [RESET_ACCOUNT_LIST_FILTER_OPTIONS]: resetAccountListFilterOption,
  [SET_ACCOUNT_LIST_TAB]: setAccountListTab,
  [SET_ACCOUNT_LIST_TABLE_LOADING_STATE]: setAccountListTableLoadingState,
  [SELECT_ACCOUNTS]: selectAccounts,
  [SELECT_ALL_ACCOUNTS]: selectAllAccount,
  [RESELECT_ACCOUNTS]: reselectAccounts,

  [SET_EDIT_MODE]: setEditMode,
  [SET_ACCOUNT_DETAILS]: setAccountDetails,

  [SET_MODAL_TYPE]: setModalType,
  [SET_REDIRECT_URL]: setRedirectUrl,

  [SET_REMAINING_HISTORICAL_BALANCE]: setRemainingHistoricalBalance,

  [SET_HOVERED_ROW]: setHoveredRow,

  [SET_SELECTED_TAX_CODE]: setSelectedTaxCode,

  [SET_MOVE_TO_DISABLED]: shouldDisableMoveTo,
};

const accountListReducer = createReducer(getDefaultState(), handlers);

export default accountListReducer;
