import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAYROLL_IS_SET_UP,
  SET_SUBMITTING_STATE,
  SET_TAB,
  SET_TABLE_LOADING_STATE,
  UPDATE_TAX_PAY_ITEM_DETAIL,
} from '../PayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createPayItemListDispatcher = (store) => ({
  openModal: ({ type, url }) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type,
        url,
      },
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },

  loadTabContentList: (payload, intent) => {
    store.dispatch({
      intent,
      ...payload,
    });
  },

  sortList: (payload, intent) => {
    store.dispatch({
      intent,
      ...payload,
      isSort: true,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  setTab: (selectedTab) => {
    store.dispatch({
      intent: SET_TAB,
      selectedTab,
    });
  },

  setAlert: ({ message, type }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setPayrollIsSetUp: (payrollIsSetUp) => {
    store.dispatch({
      intent: SET_PAYROLL_IS_SET_UP,
      payrollIsSetUp,
    });
  },

  setSortOrder: (intent, orderBy, sortOrder) => {
    store.dispatch({
      intent,
      orderBy,
      sortOrder,
    });
  },

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

  updateTaxPayItemDetail: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_TAX_PAY_ITEM_DETAIL,
      key,
      value,
    });
  },
});

export default createPayItemListDispatcher;
