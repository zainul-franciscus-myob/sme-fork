import {
  NEXT_EMPLOYEE,
  SET_EMPLOYEE_ERRORED,
  SET_EMPLOYEE_SUCCEEDED,
  SET_LOADING_STATE,
} from './EmailPaySlipModalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

export const getDefaultState = () => ({
  businessId: '',
  isOpen: false,
  isLoading: true,
  emailSettings: undefined,
  employees: [],
  currentEmployee: undefined,
  currentCount: 0,
  errors: [],
  success: [],
});

const setInitialState = (state, { context }) => {
  const defaultState = getDefaultState();
  const { businessId, emailSettings, employees } = context;
  return ({
    ...defaultState,
    businessId,
    isOpen: true,
    emailSettings,
    employees,
    currentEmployee: employees[0],
  });
};

const resetState = () => (getDefaultState());

const setLoadingState = (state, { isLoading }) => ({ ...state, isLoading });

const setNextEmployee = (state) => {
  const nextCount = state.currentCount + 1;
  const nextEmployee = state.employees[nextCount];
  return {
    ...state,
    currentCount: nextCount,
    currentEmployee: nextEmployee,
  };
};

const setEmployeeErrored = state => ({
  ...state,
  errors: [...state.errors, state.currentEmployee],
});

const setEmployeeSucceeded = state => ({
  ...state,
  success: [...state.success, state.currentEmployee],
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [NEXT_EMPLOYEE]: setNextEmployee,
  [SET_EMPLOYEE_ERRORED]: setEmployeeErrored,
  [SET_EMPLOYEE_SUCCEEDED]: setEmployeeSucceeded,
};

export default createReducer(getDefaultState(), handlers);
