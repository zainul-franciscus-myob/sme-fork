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

const createTerminationDispatcher = store => ({
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

  setEmployees: (response) => {
    store.dispatch({
      intent: SET_EMPLOYEES,
      response,
    });
  },

  setSelectedPayrollYear: (selectedPayrollYear) => {
    store.dispatch({
      intent: SET_SELECTED_PAYROLL_YEAR,
      selectedPayrollYear,
    });
  },

  setFilteredEmployees: (response) => {
    store.dispatch({
      intent: SET_FILTERED_EMPLOYEES,
      response,
    });
  },

  clearEmployees: () => {
    store.dispatch({
      intent: SET_FILTERED_EMPLOYEES,
      response: { employees: [] },
    });
  },

  setTerminationDate: (employee, terminationDate) => {
    store.dispatch({
      intent: SET_EMPLOYEE_TERMINATION_DATE,
      employee,
      terminationDate,
    });
  },

  setNewEventId: () => {
    store.dispatch({
      intent: SET_NEW_EVENT_ID,
    });
  },
});

export default createTerminationDispatcher;
