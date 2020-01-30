import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_ALERT,
  SET_EMPLOYEE_ETP,
  SET_LOADING_STATE,
  SET_NEW_EVENT_ID,
  SET_SELECTED_ETP,
  SET_SELECT_ALL_ETP,
} from './EtpIntents';

const createEtpDispatcher = store => ({
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

  setNewEventId: () => {
    store.dispatch({
      intent: SET_NEW_EVENT_ID,
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

  setSelectedPay: (pay, isSelected) => {
    store.dispatch({
      intent: SET_SELECTED_ETP,
      pay,
      isSelected,
    });
  },

  selectAllPays: (isSelected) => {
    store.dispatch({
      intent: SET_SELECT_ALL_ETP,
      isSelected,
    });
  },

  setEmployeeEtps: (response) => {
    store.dispatch({
      intent: SET_EMPLOYEE_ETP,
      response,
    });
  },
});

export default createEtpDispatcher;
