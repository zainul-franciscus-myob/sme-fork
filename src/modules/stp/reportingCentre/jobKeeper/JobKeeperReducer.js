import {
  SET_FILTERED_EMPLOYEES,
  SET_JOB_KEEPER_INITIAL,
  SET_LOADING_STATE,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SORTED_EMPLOYEES,
  SET_TABLE_LOADING_STATE,
  SORT_JOB_KEEPER_EMPLOYEES,
} from './JobKeeperIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  payrollYears: [],
  selectedPayrollYear: '',
  eventId: uuid(),
  employees: [],
  sortOrder: 'asc',
  orderBy: 'FirstName',
});

const setSelectedPayrollYear = (state, { selectedPayrollYear }) => ({
  ...state,
  selectedPayrollYear,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setJobKeeperInitial = (state, { response }) => ({
  ...state,
  ...response,
});

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setFilteredEmployees = (state, { response }) => ({
  ...state,
  ...response,
});

const setSortedEmployees = (state, { response }) => ({
  ...state,
  ...response,
});

const setSort = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});


const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_JOB_KEEPER_INITIAL]: setJobKeeperInitial,
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
  [SET_TABLE_LOADING_STATE]: setIsTableLoading,
  [SET_FILTERED_EMPLOYEES]: setFilteredEmployees,
  [SET_SORTED_EMPLOYEES]: setSortedEmployees,
  [SORT_JOB_KEEPER_EMPLOYEES]: setSort,
};

const jobKeeperReducer = createReducer(getDefaultState(), handlers);

export default jobKeeperReducer;
