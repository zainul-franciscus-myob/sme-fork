import {
  CLEAR_EI_SUBMISSIONS_LIST,
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  SET_DETAILS_ALERT,
  SET_DETAILS_LOADING_STATE,
  SET_PAYRUN_SUBMITTING_STATUS,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SELECTED_PAYRUN,
  SET_TABLE_LOADING_STATE,
} from '../PaydayFilingIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';

export const getEiSubmissionsDefaultState = () => ({
  payrollYears: [],
  selectedPayrollYear: '',
  payRuns: [],
  isTableLoading: false,
  selectedPayRun: undefined,
  detailsLoadingState: LoadingState.LOADING_SUCCESS,
  detailsAlertMessage: undefined,
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
  payRuns: response.payRuns.map((payRun) => ({
    ...payRun,
    initialStatus: payRun.status,
  })),
  payrollYears: response.payrollYears,
  selectedPayrollYear: response.selectedPayrollYear,
});

const setEiSubmissions = (state, { response }) => ({
  ...state,
  payRuns: response.payRuns.map((payRun) => ({
    ...payRun,
    initialStatus: payRun.status,
  })),
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
  detailsAlertMessage: undefined,
});

const setDetailsLoadingState = (state, { detailsLoadingState }) => ({
  ...state,
  detailsLoadingState,
});

const setDetailsAlert = (state, { detailsAlertMessage }) => ({
  ...state,
  detailsAlertMessage,
});

const setPayRunSubmittingStatus = (state, { selectedPayRun }) => ({
  ...state,
  payRuns: state.payRuns.map((payRun) => ({
    ...payRun,
    status: payRun.id === selectedPayRun.id ? 'Submitting' : payRun.status,
  })),
  selectedPayRun: {
    ...state.selectedPayRun,
    status: 'Submitting',
  },
});

export const eiSubmissionsHandlers = {
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
  [LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS]: setInitialEiSubmissionsAndPayrollOptions,
  [SET_TABLE_LOADING_STATE]: setIsTableLoading,
  [LOAD_FILTERED_EI_SUBMISSIONS]: setEiSubmissions,
  [CLEAR_EI_SUBMISSIONS_LIST]: clearEiSubmissions,
  [SET_SELECTED_PAYRUN]: setSelectedPayRun,
  [SET_DETAILS_LOADING_STATE]: setDetailsLoadingState,
  [SET_DETAILS_ALERT]: setDetailsAlert,
  [SET_PAYRUN_SUBMITTING_STATUS]: setPayRunSubmittingStatus,
};
