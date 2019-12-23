import {
  LOAD_SALES_SETTINGS,
  SAVE_TAB_DATA,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PENDING_TAB,
  SET_SUBMITTING_STATE,
  SET_TAB,
  SET_TEMPLATE_LIST,
  SET_TEMPLATE_LIST_LOADING,
  SET_TEMPLATE_LIST_SORT_ORDER,
  UPDATE_EMAIL_SETTINGS,
  UPDATE_SALES_SETTINGS_ITEM,
} from '../SalesSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createSalesSettingsDispatcher = store => ({
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
      alert: {},
    });
  },

  loadSalesSettings: (payload) => {
    const intent = LOAD_SALES_SETTINGS;
    store.dispatch({ intent, ...payload });
  },

  saveDataTab: () => {
    store.dispatch({
      intent: SAVE_TAB_DATA,
    });
  },

  setTab: (selectedTab) => {
    store.dispatch({
      intent: SET_TAB,
      selectedTab,
    });
  },

  setPendingTab: (pendingTab) => {
    store.dispatch({
      intent: SET_PENDING_TAB,
      pendingTab,
    });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  updateSalesSettingsItem: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_SALES_SETTINGS_ITEM,
      key,
      value,
    });
  },

  updateEmailSettings: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_EMAIL_SETTINGS,
      key,
      value,
    });
  },

  setTemplateListLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TEMPLATE_LIST_LOADING,
      isTableLoading,
    });
  },
  setTemplateListSortOrder: (orderBy, sortOrder) => {
    store.dispatch({
      intent: SET_TEMPLATE_LIST_SORT_ORDER,
      orderBy,
      sortOrder,
    });
  },
  setTemplateList: (response) => {
    store.dispatch({
      intent: SET_TEMPLATE_LIST,
      response,
    });
  },
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
});

export default createSalesSettingsDispatcher;
