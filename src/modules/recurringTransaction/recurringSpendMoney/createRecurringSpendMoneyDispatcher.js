import {
  ADD_SPEND_MONEY_LINE,
  CLOSE_MODAL,
  GET_TAX_CALCULATIONS,
  LOAD_ABN_FROM_CONTACT,
  LOAD_ACCOUNT_AFTER_CREATE,
  OPEN_MODAL,
  REMOVE_SPEND_MONEY_LINE,
  RESET_PAY_TO_CONTACT,
  RESET_TOTALS,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAY_TO_CONTACT,
  SET_SCHEDULE_OPTIONS,
  SET_SPEND_MONEY_OPTIONS,
  SET_SUBMITTING_STATE,
  UPDATE_SPEND_MONEY_LINE,
} from './RecurringSpendMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createRecurringSpendMoneyDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },

  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },

  setLoadingState: (isLoading) => {
    store.dispatch({ intent: SET_LOADING_STATE, isLoading });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({ intent: SET_SUBMITTING_STATE, isSubmitting });
  },

  setAlert: (alert) => {
    store.dispatch({ intent: SET_ALERT, alert });
  },

  dismissAlert: () => {
    store.dispatch({ intent: SET_ALERT, alert: undefined });
  },

  openModal: ({ type, url }) => {
    store.dispatch({ intent: OPEN_MODAL, modal: { type, url } });
  },

  closeModal: () => {
    store.dispatch({ intent: CLOSE_MODAL });
  },

  loadRecurringSpendMoney: (intent, response) => {
    store.dispatch({ intent, ...response, isLoading: false });
  },

  setScheduleOptions: ({ key, value }) => {
    store.dispatch({ intent: SET_SCHEDULE_OPTIONS, key, value });
  },

  setSpendMoneyOptions: ({ key, value }) => {
    store.dispatch({ intent: SET_SPEND_MONEY_OPTIONS, key, value });
  },

  addSpendMoneyLine: (partialLine) => {
    store.dispatch({ intent: ADD_SPEND_MONEY_LINE, line: partialLine });
  },

  updateSpendMoneyLine: (lineIndex, lineKey, lineValue) => {
    store.dispatch({
      intent: UPDATE_SPEND_MONEY_LINE,
      lineIndex,
      lineKey,
      lineValue,
    });
  },

  removeSpendMoneyLine: (index) => {
    store.dispatch({ intent: REMOVE_SPEND_MONEY_LINE, index });
  },

  getTaxCalculations: (taxCalculations) => {
    store.dispatch({ intent: GET_TAX_CALCULATIONS, taxCalculations });
  },

  resetTotals: () => {
    store.dispatch({ intent: RESET_TOTALS });
  },

  setPayToContact: (contact) => {
    store.dispatch({ intent: SET_PAY_TO_CONTACT, contact });
  },

  resetPayToContact: () => {
    store.dispatch({ intent: RESET_PAY_TO_CONTACT });
  },

  loadAbn: (abn) => {
    store.dispatch({ intent: LOAD_ABN_FROM_CONTACT, abn });
  },

  setAbnLoadingState: (isAbnLoading) => {
    store.dispatch({ intent: SET_ABN_LOADING_STATE, isAbnLoading });
  },

  loadAccountAfterCreate: (payload) => {
    store.dispatch({ intent: LOAD_ACCOUNT_AFTER_CREATE, ...payload });
  },
});

export default createRecurringSpendMoneyDispatcher;
