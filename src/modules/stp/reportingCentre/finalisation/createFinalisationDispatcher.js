
import {
  LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
  LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
  SELECT_ALL_EMPLOYEES,
  SELECT_EMPLOYEES_ITEM,
  SET_FILTERED_EMPLOYEES,
  SET_IS_RFBA_ENABLED,
  SET_LOADING_STATE,
  SET_SELECTED_PAYROLL_YEAR,
  SET_TABLE_LOADING_STATE,
  UPDATE_EMPLOYEE_ROW,
} from './FinalisationIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const createFinalisationDispatcher = store => ({
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

  loadInitialInformation: (response) => {
    store.dispatch({
      intent: LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
      response,
    });
  },

  loadHeadersAndEmployeesForYear: (response) => {
    store.dispatch({
      intent: LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
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

  setIsRFBAEnabled: (isRFBAEnabled) => {
    store.dispatch({
      intent: SET_IS_RFBA_ENABLED,
      isRFBAEnabled,
    });
  },

  clearEmployees: () => {
    store.dispatch({
      intent: SET_FILTERED_EMPLOYEES,
      response: { employees: [] },
    });
  },

  selectAllEmployees: (isSelected) => {
    store.dispatch({
      intent: SELECT_ALL_EMPLOYEES,
      isSelected,
    });
  },

  selectEmployeesItem: (item, isSelected) => {
    store.dispatch({
      intent: SELECT_EMPLOYEES_ITEM,
      item,
      isSelected,
    });
  },

  updateEmployeeRow: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_EMPLOYEE_ROW,
      key,
      value,
    });
  },
});

export default createFinalisationDispatcher;
