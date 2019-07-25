import {
  LOAD_EMPLOYMENT_CLASSIFICATION_LIST,
  LOAD_SUPER_FUND_LIST,
  SET_ALERT,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_LOADING_STATE,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE,
  SET_SUPER_FUND_LIST_FILTER_OPTIONS,
  SET_SUPER_FUND_LIST_LOADING_STATE,
  SET_SUPER_FUND_LIST_SORT_ORDER,
  SET_SUPER_FUND_LIST_TABLE_LOADING_STATE,
  SET_TAB,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
} from './PayrollSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';

const createPayrollSettingsDispatcher = store => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setAlert: ({ message, type }) => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: { message, type },
    });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: undefined,
    });
  },

  setTab: (selectedTab) => {
    const intent = SET_TAB;
    store.dispatch({ intent, selectedTab });
  },

  loadSuperFundList: (response) => {
    const intent = LOAD_SUPER_FUND_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  filterSuperFundList: (response) => {
    const intent = SORT_AND_FILTER_SUPER_FUND_LIST;
    store.dispatch({
      intent,
      ...response,
      isSort: false,
    });
  },

  sortSuperFundList: (response) => {
    const intent = SORT_AND_FILTER_SUPER_FUND_LIST;
    store.dispatch({
      intent,
      ...response,
      isSort: true,
    });
  },

  setSuperFundListFilterOptions: ({ key, value }) => {
    const intent = SET_SUPER_FUND_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  setSuperFundListSortOrder: (orderBy, sortOrder) => {
    const intent = SET_SUPER_FUND_LIST_SORT_ORDER;
    store.dispatch({
      intent,
      orderBy,
      sortOrder,
    });
  },

  setSuperFundListLoadingState: (isLoading) => {
    const intent = SET_SUPER_FUND_LIST_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setSuperFundListTableLoadingState: (isTableLoading) => {
    const intent = SET_SUPER_FUND_LIST_TABLE_LOADING_STATE;
    store.dispatch({ intent, isTableLoading });
  },

  loadEmploymentClassificationList: (response) => {
    const intent = LOAD_EMPLOYMENT_CLASSIFICATION_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  setEmploymentClassificationListLoadingState: (isLoading) => {
    const intent = SET_EMPLOYMENT_CLASSIFICATION_LIST_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setEmploymentClassificationListTableLoadingState: (isTableLoading) => {
    const intent = SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE;
    store.dispatch({ intent, isTableLoading });
  },

  filterEmploymentClassificationList: (response) => {
    const intent = SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST;
    store.dispatch({
      intent,
      ...response,
      isSort: false,
    });
  },

  sortEmploymentClassificationList: (response) => {
    const intent = SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST;
    store.dispatch({
      intent,
      ...response,
      isSort: true,
    });
  },

  setEmploymentClassificationListFilterOptions: ({ key, value }) => {
    const intent = SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  setEmploymentClassificationListSortOrder: (orderBy, sortOrder) => {
    const intent = SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER;
    store.dispatch({
      intent,
      orderBy,
      sortOrder,
    });
  },
});

export default createPayrollSettingsDispatcher;
