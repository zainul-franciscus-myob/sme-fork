import {
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  SET_SELECTED_PAYROLL_YEAR,
} from '../PaydayFilingIntents';
import createPaydayFilingDispatcher from '../createPaydayFilingDispatcher';

const createEiSubmissionsDispatcher = (store) => ({
  ...createPaydayFilingDispatcher(store),

  setInitialEiSubmissionDetails: (response) => {
    store.dispatch({
      intent: LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
      response,
    });
  },

  setSelectedPayrollYear: (selectedPayrollYear) => {
    store.dispatch({
      intent: SET_SELECTED_PAYROLL_YEAR,
      selectedPayrollYear,
    });
  },
});

export default createEiSubmissionsDispatcher;
