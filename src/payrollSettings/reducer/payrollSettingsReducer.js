import {
  LOAD_EMPLOYMENT_CLASSIFICATION_LIST,
  LOAD_SUPER_FUND_LIST,
  SET_ALERT,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_LOADING_STATE,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE,
  SET_SUPER_FUND_LIST_FILTER_OPTIONS,
  SET_SUPER_FUND_LIST_LOADING_STATE,
  SET_SUPER_FUND_LIST_SORT_ORDER,
  SET_SUPER_FUND_LIST_TABLE_LOADING_STATE,
  SET_TAB,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
} from '../PayrollSettingsIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  loadEmploymentClassificationList,
  setEmploymentClassificationListFilterOption,
  setEmploymentClassificationListLoadingState,
  setEmploymentClassificationListSortOrder,
  setEmploymentClassificationListTableLoadingState,
  sortAndFilterEmploymentClassificationList,
} from './employmentClassificationListReducer';
import {
  loadSuperFundList,
  setSuperFundListFilterOption,
  setSuperFundListLoadingState,
  setSuperFundListSortOrder,
  setSuperFundListTableLoadingState,
  sortAndFilterSuperFundList,
} from './superFundListReducer';
import createReducer from '../../store/createReducer';
import getDefaultState from './getDefaultState';

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => (getDefaultState());

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});


const setTab = (state, action) => ({
  ...state,
  tab: action.selectedTab,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_TAB]: setTab,
  [LOAD_SUPER_FUND_LIST]: loadSuperFundList,
  [SORT_AND_FILTER_SUPER_FUND_LIST]: sortAndFilterSuperFundList,
  [SET_SUPER_FUND_LIST_FILTER_OPTIONS]: setSuperFundListFilterOption,
  [SET_SUPER_FUND_LIST_SORT_ORDER]: setSuperFundListSortOrder,
  [SET_SUPER_FUND_LIST_LOADING_STATE]: setSuperFundListLoadingState,
  [SET_SUPER_FUND_LIST_TABLE_LOADING_STATE]: setSuperFundListTableLoadingState,
  [LOAD_EMPLOYMENT_CLASSIFICATION_LIST]: loadEmploymentClassificationList,
  [SET_EMPLOYMENT_CLASSIFICATION_LIST_LOADING_STATE]: setEmploymentClassificationListLoadingState,
  [SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS]: setEmploymentClassificationListFilterOption,
  [SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST]: sortAndFilterEmploymentClassificationList,
  [SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE]:
    setEmploymentClassificationListTableLoadingState,
  [SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER]: setEmploymentClassificationListSortOrder,
};

const payrollSettingsReducer = createReducer(getDefaultState(), handlers);

export default payrollSettingsReducer;
