import {
  LOAD_PAYROLL_REPORTS,
  SET_PAYROLL_REPORTS_ERROR_STATE,
  SET_PAYROLL_REPORTS_LOADING_STATE,
} from '../DashboardIntents';

const setPayrollReportsState = (state, payrollReports) => ({
  ...state,
  payrollReports: {
    ...state.payrollReports,
    ...payrollReports,
  },
});

const setPayrollReportsLoadingState = (state, { isLoading }) =>
  setPayrollReportsState(state, { isLoading });

const setPayrollReportsErrorState = (state, { hasError }) =>
  setPayrollReportsState(state, { hasError });

const loadPayrollReports = (state, action) =>
  setPayrollReportsState(state, action);

export default {
  [LOAD_PAYROLL_REPORTS]: loadPayrollReports,
  [SET_PAYROLL_REPORTS_LOADING_STATE]: setPayrollReportsLoadingState,
  [SET_PAYROLL_REPORTS_ERROR_STATE]: setPayrollReportsErrorState,
};
