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

  setSelectedPayRun: (selectedPayRunId) => {
    store.dispatch({
      intent: SET_SELECTED_PAYRUN,
      selectedPayRunId,
    });
  },

  clearSelectedPayRun: () => {
    store.dispatch({
      intent: SET_SELECTED_PAYRUN,
      selectedPayRunId: '',
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  setFilteredEiSubmissions: (response) => {
    store.dispatch({
      intent: LOAD_FILTERED_EI_SUBMISSIONS,
      response,
    });
  },

  clearEiSubmissionsList: () => {
    store.dispatch({
      intent: CLEAR_EI_SUBMISSIONS_LIST,
    });
  },

  setDetailsLoadingState: (detailsLoadingState) => {
    store.dispatch({
      intent: SET_DETAILS_LOADING_STATE,
      detailsLoadingState,
    });
  },

  setDetailsAlert: (detailsAlertMessage) => {
    store.dispatch({
      intent: SET_DETAILS_ALERT,
      detailsAlertMessage,
    });
  },

  clearDetailsAlert: () => {
    store.dispatch({
      intent: SET_DETAILS_ALERT,
      detailsAlertMessage: '',
    });
  },

  setPayRunSubmittingStatus: (selectedPayRun) => {
    store.dispatch({
      intent: SET_PAYRUN_SUBMITTING_STATUS,
      selectedPayRun,
    });
  },
});

export default createEiSubmissionsDispatcher;
