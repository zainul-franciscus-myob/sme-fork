import {
  LOAD_BANKING_RULE_LIST,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANKING_RULE_LIST,
  UPDATE_FILTER_OPTIONS,
} from './BankingRuleListIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isNoConditionRuleEnabled: false,
  alert: undefined,
  loadingState: LoadingState.LOADING,
  sortOrder: '',
  orderBy: '',
  filterOptions: {
    ruleIntent: '',
    keywords: '',
    showInactive: false,
  },
  ruleIntentOptions: [],
  entries: [],
});

const loadBankingRuleList = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  ruleIntentOptions: action.ruleIntentOptions,
  entries: action.entries,
});

const sortAndFilterBankingRuleList = (state, action) => ({
  ...state,
  entries: action.entries,
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

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const resetFilterOptions = (state) => ({
  ...state,
  filterOptions: getDefaultState().filterOptions,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const handlers = {
  [LOAD_BANKING_RULE_LIST]: loadBankingRuleList,
  [SORT_AND_FILTER_BANKING_RULE_LIST]: sortAndFilterBankingRuleList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_ALERT]: setAlert,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
};

const bankingRuleReducer = createReducer(getDefaultState(), handlers);

export default bankingRuleReducer;
