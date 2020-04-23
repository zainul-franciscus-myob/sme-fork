import {
  SET_FILTERED_EMPLOYEES,
  SET_JOB_KEEPER_INITIAL,
  SET_LOADING_STATE,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SORTED_EMPLOYEES,
  SET_TABLE_LOADING_STATE,
  SORT_JOB_KEEPER_EMPLOYEES,
} from './JobKeeperIntents';

const createJobKeeperDispatcher = store => ({
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setInitialJobKeeper: (response) => {
    store.dispatch({
      intent: SET_JOB_KEEPER_INITIAL,
      response,
    });
  },

  setSelectedPayrollYear: (selectedPayrollYear) => {
    store.dispatch({
      intent: SET_SELECTED_PAYROLL_YEAR,
      selectedPayrollYear,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  setSortedEmployees: (response) => {
    store.dispatch({
      intent: SET_SORTED_EMPLOYEES,
      response,
    });
  },

  setFilteredEmployees: (response) => {
    store.dispatch({
      intent: SET_FILTERED_EMPLOYEES,
      response,
    });
  },

  setSort: ({ orderBy, sortOrder }) => {
    store.dispatch({
      intent: SORT_JOB_KEEPER_EMPLOYEES,
      orderBy,
      sortOrder,
    });
  },
});

export default createJobKeeperDispatcher;
