import {
  LOAD_PAY_SUPER_LIST,
  LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
  SET_ACCESS_TOKEN,
  SET_ALERT,
  SET_IS_LOADING,
  SET_IS_TABLE_LOADING,
  SET_SORT_ORDER,
} from './paySuperIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createPaySuperListDispatcher = store => ({
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

  setIsLoading: (isLoading) => {
    store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  },

  setIsTableLoading: (isTableLoading) => {
    store.dispatch({
      intent: SET_IS_TABLE_LOADING,
      isTableLoading,
    });
  },

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: null,
    });
  },

  setSortOrder: (orderByColumn) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      orderBy: orderByColumn,
    });
  },

  setAccessToken: (accessToken) => {
    store.dispatch({
      intent: SET_ACCESS_TOKEN,
      accessToken,
    });
  },

  loadPaySuperList: (response) => {
    store.dispatch({
      intent: LOAD_PAY_SUPER_LIST,
      response,
    });
  },

  updateSuperPaymentStatus: (response) => {
    store.dispatch({
      intent: LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
      response,
    });
  },
});

export default createPaySuperListDispatcher;
