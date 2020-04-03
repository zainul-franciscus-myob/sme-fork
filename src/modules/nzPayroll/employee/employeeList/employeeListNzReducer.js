
import { LOAD_EMPLOYEE_LIST, SET_LOADING_STATE } from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  entries: [],
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
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [SET_LOADING_STATE]: setLoadingState,
};

const employeeListNzReducer = createReducer(getDefaultState(), handlers);

export default employeeListNzReducer;
