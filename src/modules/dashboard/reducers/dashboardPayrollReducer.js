import {
  LOAD_PAYROLL,
  SET_PAYROLL_ERROR_STATE,
  SET_PAYROLL_LOADING_STATE,
} from '../DashboardIntents';

const setPayrollState = (state, partialPayrollState) => ({
  ...state,
  payroll: {
    ...state.payroll,
    ...partialPayrollState,
  },
});

const setPayrollLoadingState = (state, { isLoading }) =>
  setPayrollState(state, { isLoading });

const setPayrollErrorState = (state, { hasError }) =>
  setPayrollState(state, { hasError });

const loadPayroll = (state, action) => setPayrollState(state, action.payroll);

export default {
  [LOAD_PAYROLL]: loadPayroll,
  [SET_PAYROLL_LOADING_STATE]: setPayrollLoadingState,
  [SET_PAYROLL_ERROR_STATE]: setPayrollErrorState,
};
