import {
  FILTER_JOB_LIST,
  LOAD_JOB_LIST,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_FILTER_OPTIONS,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

const defaultFilterOptions = {
  keywords: '',
  showInactive: false,
};

const getDefaultState = () => ({
  filterOptions: {
    ...defaultFilterOptions,
  },
  isDefaultFilter: true,
  entries: [],
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  businessId: '',
  region: '',
  showStatusColumn: false,
});

const resetState = () => getDefaultState();

const loadJobList = (state, action) => ({
  ...state,
  entries: action.entries,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  loadingState: action.loadingState,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const filterJobList = (state, action) => ({
  ...state,
  entries: action.entries,
  isDefaultFilter: shallowCompare(state.filterOptions, defaultFilterOptions),
  showStatusColumn: state.filterOptions.showInactive,
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
  filterOptions: defaultFilterOptions,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [LOAD_JOB_LIST]: loadJobList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [FILTER_JOB_LIST]: filterJobList,
  [RESET_STATE]: resetState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
  [SET_INITIAL_STATE]: setInitialState,
};

const jobListReducer = createReducer(getDefaultState(), handlers);

export default jobListReducer;
