import {
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  SET_SELECTED_PAYROLL_YEAR,
} from '../PaydayFilingIntents';

export const getEiSubmissionsDefaultState = () => ({
  payrollYears: [],
  selectedPayrollYear: '',
});

const setSelectedPayrollYear = (state, { selectedPayrollYear }) => ({
  ...state,
  selectedPayrollYear,
});

const setInitialEiSubmissionsAndPayrollOptions = (state, { response }) => ({
  ...state,
  payrollYears: response.payrollYears,
  selectedPayrollYear: response.selectedPayrollYear,
});

export const eiSubmissionsHandlers = {
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
  [LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS]: setInitialEiSubmissionsAndPayrollOptions,
};
