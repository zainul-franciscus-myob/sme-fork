
import {
  LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
  LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
  RESET_DIRTY_FLAG,
  RESET_EVENT_ID,
  SELECT_ALL_EMPLOYEES,
  SELECT_EMPLOYEES_ITEM,
  SET_IS_RFBA_ENABLED,
  SET_LOADING_STATE,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SORTED_EMPLOYEES,
  SET_TABLE_LOADING_STATE,
  SET_UNSAVED_CHANGES_MODAL,
  SORT_EMPLOYEES,
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

  setSort: ({ orderBy, sortOrder }) => {
    store.dispatch({
      intent: SORT_EMPLOYEES,
      orderBy,
      sortOrder,
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

  setSortedEmployees: (employees) => {
    store.dispatch({
      intent: SET_SORTED_EMPLOYEES,
      employees,
    });
  },

  setIsRFBAEnabled: (isRFBAEnabled) => {
    store.dispatch({
      intent: SET_IS_RFBA_ENABLED,
      isRFBAEnabled,
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

  updateEmployeeRow: ({ key, value, rowId }) => {
    store.dispatch({
      intent: UPDATE_EMPLOYEE_ROW,
      key,
      value,
      rowId,
    });
  },

  resetEventId: () => {
    store.dispatch({
      intent: RESET_EVENT_ID,
    });
  },

  setUnsavedChangesModal: (isOpen) => {
    store.dispatch({
      intent: SET_UNSAVED_CHANGES_MODAL,
      isOpen,
    });
  },

  resetDirtyFlag: () => {
    store.dispatch({
      intent: RESET_DIRTY_FLAG,
    });
  },
});

export default createFinalisationDispatcher;
