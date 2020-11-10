import * as intents from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const employeeListNzDispatcher = ({ store }) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  loadEmployeeList: (response) => {
    const intent = intents.LOAD_EMPLOYEE_LIST;
    store.dispatch({ intent, ...response });
  },

  loadEmployeeListNextPage: (response) => {
    const intent = intents.LOAD_EMPLOYEE_LIST_NEXT_PAGE;
    store.dispatch({ intent, ...response });
  },

  loadEmployeeListFailed: () => {
    const intent = intents.LOAD_EMPLOYEE_LIST_FAILED;
    store.dispatch({ intent });
  },

  setAlert: ({ type, message }) => {
    const intent = intents.SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = intents.DISMISS_ALERT;
    store.dispatch({ intent });
  },

  setTableLoading: (isTableLoading) => {
    const intent = intents.SET_EMPLOYEE_LIST_TABLE_LOADING;
    store.dispatch({ intent, isTableLoading });
  },

  updateFilterBarOptions: ({ key, value }) => {
    store.dispatch({ intent: intents.UPDATE_FILTER_BAR_OPTIONS, key, value });
  },

  sortAndFilterEmployeeList: (response) => {
    store.dispatch({
      intent: intents.SORT_AND_FILTER_EMPLOYEE_LIST,
      ...response,
    });
  },

  resetFilterBarOptions: () => {
    store.dispatch({ intent: intents.RESET_FILTER_BAR_OPTIONS });
  },

  setSortOrder: (orderBy, sortOrder) => {
    store.dispatch({
      intent: intents.SET_SORT_ORDER,
      orderBy,
      sortOrder,
    });
  },
});

export default employeeListNzDispatcher;
