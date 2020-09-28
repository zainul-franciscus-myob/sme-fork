import * as intents from '../EmployeeNzIntents';
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

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [intents.LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [intents.SET_ALERT]: setAlert,
  [intents.DISMISS_ALERT]: dismissAlert,
  [intents.LOAD_EMPLOYEE_LIST_FAILED]: loadEmployeeListFailed,
};

const employeeListNzReducer = createReducer(getDefaultState(), handlers);

export default employeeListNzReducer;
