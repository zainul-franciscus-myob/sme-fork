import {
  ADD_IN_TRAY_ENTRY,
  CREATE_IN_TRAY_DOCUMENT,
  LOAD_CONFIG,
  LOAD_DASHBOARD,
  LOAD_DEFAULT_BANKING,
  LOAD_IN_TRAY,
  LOAD_PAYROLL,
  LOAD_PAYROLL_REPORTS,
  LOAD_PURCHASE,
  LOAD_SALES,
  LOAD_TRACKING,
  LOAD_TRACKING_DETAIL,
  REMOVE_IN_TRAY_ENTRY,
  SET_ALERT,
  SET_BANKING_ERROR_STATE,
  SET_BANKING_LOADING_STATE,
  SET_BANK_FEED_ACCOUNT_ID,
  SET_DASHBOARD_TASKS,
  SET_IN_TRAY_ALERT,
  SET_IN_TRAY_ERROR_STATE,
  SET_IN_TRAY_LOADING_STATE,
  SET_IN_TRAY_UPLOADING_STATE,
  SET_LOADING_STATE,
  SET_PAYROLL_ERROR_STATE,
  SET_PAYROLL_LOADING_STATE,
  SET_PAYROLL_REPORTS_ERROR_STATE,
  SET_PAYROLL_REPORTS_LOADING_STATE,
  SET_PURCHASE_ERROR_STATE,
  SET_PURCHASE_LOADING_STATE,
  SET_SALES_ERROR_STATE,
  SET_SALES_LOADING_STATE,
  SET_TRACKING_DETAIL_LOADING_STATE,
  SET_TRACKING_ERROR_STATE,
  SET_TRACKING_LOADING_STATE,
  SET_TRACKING_OPTIONS,
} from './DashboardIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createDashboardDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
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

  loadDashboard: (payload) => {
    const intent = LOAD_DASHBOARD;
    store.dispatch({ intent, ...payload });
  },

  loadConfig: (config) => {
    const intent = LOAD_CONFIG;
    store.dispatch({ intent, config });
  },

  loadSales: (payload) => {
    const intent = LOAD_SALES;
    store.dispatch({ intent, ...payload });
  },

  setSalesLoadingState: (isLoading) => {
    const intent = SET_SALES_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setSalesErrorState: (hasError) => {
    const intent = SET_SALES_ERROR_STATE;
    store.dispatch({ intent, hasError });
  },

  loadPurchase: (payload) => {
    const intent = LOAD_PURCHASE;
    store.dispatch({ intent, ...payload });
  },

  setPurchaseLoadingState: (isLoading) => {
    const intent = SET_PURCHASE_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setPurchaseErrorState: (hasError) => {
    const intent = SET_PURCHASE_ERROR_STATE;
    store.dispatch({ intent, hasError });
  },

  loadTracking: (payload) => {
    const intent = LOAD_TRACKING;
    store.dispatch({ intent, ...payload });
  },

  loadTrackingDetail: (payload) => {
    const intent = LOAD_TRACKING_DETAIL;
    store.dispatch({ intent, ...payload });
  },

  setTrackingLoadingState: (isLoading) => {
    const intent = SET_TRACKING_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setTrackingDetailLoadingState: (isDetailLoading) => {
    const intent = SET_TRACKING_DETAIL_LOADING_STATE;
    store.dispatch({ intent, isDetailLoading });
  },

  setTrackingErrorState: (hasError) => {
    const intent = SET_TRACKING_ERROR_STATE;
    store.dispatch({ intent, hasError });
  },

  setTrackingOptions: ({ key, value }) => {
    const intent = SET_TRACKING_OPTIONS;
    store.dispatch({ intent, key, value });
  },

  loadBanking: (payload) => {
    const intent = LOAD_DEFAULT_BANKING;
    store.dispatch({ intent, ...payload });
  },

  setBankingLoadingState: (isLoading) => {
    const intent = SET_BANKING_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setBankingErrorState: (hasError) => {
    const intent = SET_BANKING_ERROR_STATE;
    store.dispatch({ intent, hasError });
  },

  setBankFeedAccount: (bankFeedAccountId) => {
    const intent = SET_BANK_FEED_ACCOUNT_ID;
    store.dispatch({ intent, bankFeedAccountId });
  },

  loadPayroll: (payload) => {
    const intent = LOAD_PAYROLL;
    store.dispatch({ intent, ...payload });
  },

  setPayrollLoadingState: (isLoading) => {
    const intent = SET_PAYROLL_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setPayrollErrorState: (hasError) => {
    const intent = SET_PAYROLL_ERROR_STATE;
    store.dispatch({ intent, hasError });
  },

  loadPayrollReports: (payload) => {
    const intent = LOAD_PAYROLL_REPORTS;
    store.dispatch({ intent, ...payload });
  },

  setPayrollReportsLoadingState: (isLoading) => {
    const intent = SET_PAYROLL_REPORTS_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setPayrollReportsErrorState: (hasError) => {
    const intent = SET_PAYROLL_REPORTS_ERROR_STATE;
    store.dispatch({ intent, hasError });
  },

  addInTrayEntry: (entry) => {
    const intent = ADD_IN_TRAY_ENTRY;
    store.dispatch({ intent, entry });
  },

  createInTrayDocument: (uploadId, entry) => {
    const intent = CREATE_IN_TRAY_DOCUMENT;
    store.dispatch({ intent, uploadId, entry });
  },

  removeInTrayListEntry: (uploadId) => {
    const intent = REMOVE_IN_TRAY_ENTRY;
    store.dispatch({ intent, uploadId });
  },

  loadInTray: (payload) => {
    const intent = LOAD_IN_TRAY;
    store.dispatch({ intent, ...payload });
  },

  setInTrayUploadingState: (isUploading) => {
    const intent = SET_IN_TRAY_UPLOADING_STATE;
    store.dispatch({ intent, isUploading });
  },

  setInTrayLoadingState: (isLoading) => {
    const intent = SET_IN_TRAY_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setInTrayErrorState: (hasError) => {
    const intent = SET_IN_TRAY_ERROR_STATE;
    store.dispatch({ intent, hasError });
  },

  setInTrayAlert: ({ message, type }) => {
    const intent = SET_IN_TRAY_ALERT;
    store.dispatch({
      intent,
      alert: { message, type },
    });
  },

  dismissInTrayAlert: () => {
    const intent = SET_IN_TRAY_ALERT;
    store.dispatch({
      intent,
      alert: undefined,
    });
  },

  setDashboardTasks: (tasks) => {
    const intent = SET_DASHBOARD_TASKS;
    store.dispatch({ intent, tasks });
  },
});

export default createDashboardDispatcher;
