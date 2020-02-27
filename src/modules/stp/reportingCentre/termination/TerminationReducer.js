import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_EMPLOYEES,
  SET_EMPLOYEE_TERMINATION_DATE,
  SET_FILTERED_EMPLOYEES,
  SET_LOADING_STATE,
  SET_NEW_EVENT_ID,
  SET_SELECTED_PAYROLL_YEAR,
  SET_TABLE_LOADING_STATE,
} from './TerminationIntents';
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
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setEmployees = (state, { response }) => ({
  ...state,
  ...response,
  selectedPayrollYear: (response.payrollYears && response.payrollYears[0] && response.payrollYears[0].year) || '',
});

const setFilteredEmployees = (state, { response }) => ({
  ...state,
  ...response,
});

const setSelectedPayrollYear = (state, { selectedPayrollYear }) => ({
  ...state,
  selectedPayrollYear,
});

const setTerminationDate = (state, { employee, terminationDate }) => ({
  ...state,
  employees: state.employees.map(emp => (emp.id === employee.id ? {
    ...emp,
    terminationDate,
    isDirty: true,
  } : emp)),
});

const setNewEventId = state => ({
  ...state,
  eventId: uuid(),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setIsTableLoading,
  [SET_EMPLOYEES]: setEmployees,
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
  [SET_FILTERED_EMPLOYEES]: setFilteredEmployees,
  [SET_EMPLOYEE_TERMINATION_DATE]: setTerminationDate,
  [SET_NEW_EVENT_ID]: setNewEventId,
};

const terminationReducer = createReducer(getDefaultState(), handlers);

export default terminationReducer;
