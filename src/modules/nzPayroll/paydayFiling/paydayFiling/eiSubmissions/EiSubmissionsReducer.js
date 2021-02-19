import {
  CLEAR_EI_SUBMISSIONS_LIST,
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SELECTED_PAYRUN,
  SET_TABLE_LOADING_STATE,
} from '../PaydayFilingIntents';

export const getEiSubmissionsDefaultState = () => ({
  payrollYears: [],
  selectedPayrollYear: '',
  payRuns: [],
  isTableLoading: false,
  selectedPayRun: undefined,
});

const setSelectedPayrollYear = (state, { selectedPayrollYear }) => ({
  ...state,
  selectedPayrollYear,
});

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setInitialEiSubmissionsAndPayrollOptions = (state, { response }) => ({
  ...state,
  payRuns: response.payRuns,
  payrollYears: response.payrollYears,
  selectedPayrollYear: response.selectedPayrollYear,
});

const setEiSubmissions = (state, { response }) => ({
  ...state,
  payRuns: response.payRuns,
});

const clearEiSubmissions = (state) => ({
  ...state,
  payRuns: [],
});

const setSelectedPayRun = (state, { selectedPayRunId }) => ({
  ...state,
  selectedPayRun: state.payRuns.find(
    (payRun) => payRun.id === selectedPayRunId
  ),
});

export const eiSubmissionsHandlers = {
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
  [LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS]: setInitialEiSubmissionsAndPayrollOptions,
  [SET_TABLE_LOADING_STATE]: setIsTableLoading,
  [LOAD_FILTERED_EI_SUBMISSIONS]: setEiSubmissions,
  [CLEAR_EI_SUBMISSIONS_LIST]: clearEiSubmissions,
  [SET_SELECTED_PAYRUN]: setSelectedPayRun,
};
