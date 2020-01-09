import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_FILTERED_PAY_EVENTS,
  SET_LOADING_STATE,
  SET_PAY_EVENTS,
  SET_SELECTED_PAYROLL_YEAR,
  SET_TABLE_LOADING_STATE,
} from './ReportsIntents';

const createReportsDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  setPayEvents: (response) => {
    store.dispatch({
      intent: SET_PAY_EVENTS,
      response,
    });
  },

  setFilteredPayEvents: (response) => {
    store.dispatch({
      intent: SET_FILTERED_PAY_EVENTS,
      response,
    });
  },

  setSelectedPayrollYear: (selectedPayrollYear) => {
    store.dispatch({
      intent: SET_SELECTED_PAYROLL_YEAR,
      selectedPayrollYear,
    });
  },

  clearPayEvents: () => {
    store.dispatch({
      intent: SET_FILTERED_PAY_EVENTS,
      response: { payEvents: [] },
    });
  },
});

export default createReportsDispatcher;
