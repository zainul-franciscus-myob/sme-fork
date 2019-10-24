import {
  LOAD_DASHBOARD,
  LOAD_DEFAULT_BANKING,
  LOAD_PURCHASE,
  LOAD_SALES,
  SET_ALERT,
  SET_BANKING_ERROR_STATE,
  SET_BANKING_LOADING_STATE,
  SET_BANK_FEED_ACCOUNT_ID,
  SET_LOADING_STATE,
  SET_PURCHASE_ERROR_STATE,
  SET_PURCHASE_LOADING_STATE,
  SET_SALES_ERROR_STATE,
  SET_SALES_LOADING_STATE,
} from './DashboardIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';

const createDashboardDispatcher = store => ({
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
});

export default createDashboardDispatcher;
