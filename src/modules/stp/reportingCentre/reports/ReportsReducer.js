import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_FILTERED_PAY_EVENTS,
  SET_LOADING_STATE,
  SET_PAY_EVENTS,
  SET_SELECTED_PAYROLL_YEAR,
  SET_TABLE_LOADING_STATE,
} from './ReportsIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  payrollYears: [],
  selectedPayrollYear: '',
  payEvents: [],
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

const setPayEvents = (state, { response }) => ({
  ...state,
  ...response,
  selectedPayrollYear: (response.payrollYears && response.payrollYears[0] && response.payrollYears[0].year) || '',
});

const setFilteredPayEvents = (state, { response }) => ({
  ...state,
  ...response,
});

const setSelectedPayrollYear = (state, { selectedPayrollYear }) => ({
  ...state,
  selectedPayrollYear,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setIsTableLoading,
  [SET_PAY_EVENTS]: setPayEvents,
  [SET_FILTERED_PAY_EVENTS]: setFilteredPayEvents,
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
};

const reportsReducer = createReducer(getDefaultState(), handlers);

export default reportsReducer;
