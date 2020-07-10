import {
  LOAD_EMPLOYEE_LIST,
  LOAD_EMPLOYEE_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  START_LOADING_MORE,
  STOP_LOADING_MORE,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../EmployeeIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

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
  alert: undefined,
  isLoadingMore: false,
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const updateFilterBarOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const loadEmployeeList = (state, { intent, ...response }) => ({
  ...state,
  ...response,
});

const sortAndFilterEmployeeList = (state, action) => ({
  ...state,
  entries: action.entries,
  pagination: {
    hasNextPage: action.pagination.hasNextPage,
    offset: action.pagination.offset,
  },
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setSortOrder = (state, action) => ({
  ...state,
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

const loadEmployeeListNextPage = (state, action) => {
  const allEmployeeIds = state.entries.map((employee) => employee.id);
  const entries = action.entries.filter(
    (employee) => !allEmployeeIds.includes(employee.id)
  );

  return {
    ...state,
    entries: [...state.entries, ...entries],
    pagination: {
      ...action.pagination,
    },
  };
};

const startLoadingMore = (state) => ({
  ...state,
  isLoadingMore: true,
});

const stopLoadingMore = (state) => ({
  ...state,
  isLoadingMore: false,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [UPDATE_FILTER_BAR_OPTIONS]: updateFilterBarOptions,
  [LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [SORT_AND_FILTER_EMPLOYEE_LIST]: sortAndFilterEmployeeList,
  [SET_ALERT]: setAlert,
  [SET_SORT_ORDER]: setSortOrder,
  [LOAD_EMPLOYEE_LIST_NEXT_PAGE]: loadEmployeeListNextPage,
  [START_LOADING_MORE]: startLoadingMore,
  [STOP_LOADING_MORE]: stopLoadingMore,
};

const employeeListReducer = createReducer(getDefaultState(), handlers);

export default employeeListReducer;
