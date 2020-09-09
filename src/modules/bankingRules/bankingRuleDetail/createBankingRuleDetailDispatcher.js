import {
  ADD_CONDITION_PREDICATE,
  ADD_RULE_CONDITION,
  ADD_TABLE_ROW,
  CHANGE_TABLE_ROW,
  CLOSE_MODAL,
  DISMISS_ALERT,
  DISPLAY_ALERT,
  LOAD_JOB_AFTER_CREATE,
  OPEN_MODAL,
  REMOVE_CONDITION_PREDICATE,
  REMOVE_TABLE_ROW,
  SET_CONTACT_TYPE,
  SET_IS_PAGE_EDITED,
  SET_IS_PAYMENT_REPORTABLE,
  SET_JOB_LOADING_STATE,
  SET_LOADING_STATE,
  START_LOAD_CONTACT,
  STOP_LOAD_CONTACT,
  UPDATE_CONDITION_PREDICATE,
  UPDATE_FORM,
  UPDATE_RULE_CONDITION,
} from './BankingRuleDetailIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createBankingRuleDetailDispatcher = (store) => ({
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

  loadBankingRule: (intent, bankingRule) => {
    store.dispatch({
      intent,
      bankingRule,
    });
  },

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

  setIsPageEdited: () => {
    store.dispatch({
      intent: SET_IS_PAGE_EDITED,
    });
  },

  displayAlert: (alert) =>
    store.dispatch({
      intent: DISPLAY_ALERT,
      alert,
    }),

  dismissAlert: () =>
    store.dispatch({
      intent: DISMISS_ALERT,
    }),

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  addTableRow: (row) => {
    store.dispatch({
      intent: ADD_TABLE_ROW,
      row,
    });
  },

  changeTableRow: (index, key, value) => {
    store.dispatch({
      intent: CHANGE_TABLE_ROW,
      index,
      key,
      value,
    });
  },

  removeTableRow: (index) => {
    store.dispatch({
      intent: REMOVE_TABLE_ROW,
      index,
    });
  },

  updateForm: (key, value) => {
    store.dispatch({
      intent: UPDATE_FORM,
      key,
      value,
    });
  },

  updateRuleCondition: (conditionIndex, key, value) => {
    store.dispatch({
      intent: UPDATE_RULE_CONDITION,
      conditionIndex,
      key,
      value,
    });
  },

  addRuleCondition: () => {
    store.dispatch({
      intent: ADD_RULE_CONDITION,
    });
  },

  addConditionPredicate: (conditionIndex, newData) => {
    store.dispatch({
      intent: ADD_CONDITION_PREDICATE,
      conditionIndex,
      newData,
    });
  },

  updateConditionPredicate: (conditionIndex, predicateIndex, key, value) => {
    store.dispatch({
      intent: UPDATE_CONDITION_PREDICATE,
      conditionIndex,
      predicateIndex,
      key,
      value,
    });
  },

  removeConditionPredicate: (conditionIndex, predicateIndex) => {
    store.dispatch({
      intent: REMOVE_CONDITION_PREDICATE,
      conditionIndex,
      predicateIndex,
    });
  },

  loadJobAfterCreate: (jobId, payload) =>
    store.dispatch({
      intent: LOAD_JOB_AFTER_CREATE,
      jobId,
      ...payload,
    }),

  setJobLoadingState: (isJobLoading) =>
    store.dispatch({
      intent: SET_JOB_LOADING_STATE,
      isJobLoading,
    }),

  setContactType: (contactType) => {
    store.dispatch({
      intent: SET_CONTACT_TYPE,
      contactType,
    });
  },

  setIsPaymentReportable: (isPaymentReportable) => {
    store.dispatch({
      intent: SET_IS_PAYMENT_REPORTABLE,
      isPaymentReportable,
    });
  },

  startLoadContact: () => {
    store.dispatch({
      intent: START_LOAD_CONTACT,
    });
  },

  stopLoadContact: () => {
    store.dispatch({
      intent: STOP_LOAD_CONTACT,
    });
  },
});

export default createBankingRuleDetailDispatcher;
