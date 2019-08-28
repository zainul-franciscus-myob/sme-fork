import {
  LOAD_BANKING_RULE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANKING_RULE_LIST,
  UPDATE_FILTER_OPTIONS,
} from './BankingRuleListIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  alert: undefined,
  isLoading: true,
  sortOrder: '',
  orderBy: '',
  filterOptions: {
    keywords: '',
    showInactive: false,
  },
  appliedFilterOptions: {
    keywords: '',
    showInactive: false,
  },
  entries: [],
});

const loadBankingRuleList = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  entries: action.entries,
});

const sortAndFilterBankingRuleList = (state, action) => ({
  ...state,
  entries: action.entries,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
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
    [action.filterName]: action.value,
  },
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setInitalState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => (getDefaultState());

const handlers = {
  [LOAD_BANKING_RULE_LIST]: loadBankingRuleList,
  [SORT_AND_FILTER_BANKING_RULE_LIST]: sortAndFilterBankingRuleList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_ALERT]: setAlert,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
};

const bankingRuleReducer = createReducer(getDefaultState(), handlers);

export default bankingRuleReducer;
