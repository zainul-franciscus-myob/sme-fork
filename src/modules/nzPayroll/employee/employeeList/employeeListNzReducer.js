import * as intents from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  filterOptions: {
    keywords: '',
    showInactive: false,
  },
  sortOrder: '',
  orderBy: '',
  entries: [],
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
});

const resetState = getDefaultState;

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const loadEmployeeList = (state, { ...employeeListResponse }) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
  entries: employeeListResponse.entries,
  pagination: employeeListResponse.pagination,
});

const loadEmployeeListNextPage = (state, { ...employeeListResponse }) => {
  const allEmployeeIds = state.entries.map((employee) => employee.id);
  const entries = employeeListResponse.entries.filter(
    (employee) => !allEmployeeIds.includes(employee.id)
  );

  return {
    ...state,
    loadingState: LoadingState.LOADING_SUCCESS,
    entries,
    pagination: employeeListResponse.pagination,
  };
};

const loadEmployeeListFailed = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING_FAIL,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const dismissAlert = (state) => ({
  ...state,
  alert: undefined,
});

const updateFilterBarOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const resetFilterBarOptions = (state) => ({
  ...state,
  filterOptions: getDefaultState().filterOptions,
});

const sortAndFilterEmployeeList = (state, action) => ({
  ...state,
  entries: action.entries,
  pagination: {
    hasNextPage: action.pagination.hasNextPage,
    offset: action.pagination.offset,
  },
});

const setSortOrder = (state, action) => ({
  ...state,
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

const setEmployeeListTableLoading = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [intents.LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [intents.LOAD_EMPLOYEE_LIST_NEXT_PAGE]: loadEmployeeListNextPage,
  [intents.SET_ALERT]: setAlert,
  [intents.DISMISS_ALERT]: dismissAlert,
  [intents.LOAD_EMPLOYEE_LIST_FAILED]: loadEmployeeListFailed,
  [intents.SORT_AND_FILTER_EMPLOYEE_LIST]: sortAndFilterEmployeeList,
  [intents.SET_SORT_ORDER]: setSortOrder,
  [intents.UPDATE_FILTER_BAR_OPTIONS]: updateFilterBarOptions,
  [intents.RESET_FILTER_BAR_OPTIONS]: resetFilterBarOptions,
  [intents.SET_EMPLOYEE_LIST_TABLE_LOADING]: setEmployeeListTableLoading,
};

const employeeListNzReducer = createReducer(getDefaultState(), handlers);

export default employeeListNzReducer;
