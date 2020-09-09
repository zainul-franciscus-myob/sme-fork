import {
  ADD_CONDITION_PREDICATE,
  ADD_RULE_CONDITION,
  ADD_TABLE_ROW,
  CLOSE,
  LOAD_CONTACT,
  OPEN,
  REMOVE_CONDITION_PREDICATE,
  REMOVE_TABLE_ROW,
  SET_ALERT,
  SET_SAVING_STATE,
  START_LOADING,
  START_LOADING_CONTACT,
  STOP_LOADING,
  STOP_LOADING_CONTACT,
  UPDATE_CONDITION_PREDICATE,
  UPDATE_RULE_CONDITION,
  UPDATE_RULE_DETAILS,
  UPDATE_TABLE_ROW,
} from './BankingRuleIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createBankingRuleDispatcher = (store) => ({
  updateRuleDetails: (key, value) => {
    store.dispatch({
      intent: UPDATE_RULE_DETAILS,
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

  addTableRow: (row) => {
    store.dispatch({
      intent: ADD_TABLE_ROW,
      row,
    });
  },

  updateTableRow: (index, key, value) => {
    store.dispatch({
      intent: UPDATE_TABLE_ROW,
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

  setAlert: ({ message, type }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  },

  setSavingState: (isSaving) => {
    store.dispatch({
      intent: SET_SAVING_STATE,
      isSaving,
    });
  },

  startLoading: () => {
    store.dispatch({
      intent: START_LOADING,
    });
  },

  stopLoading: () => {
    store.dispatch({
      intent: STOP_LOADING,
    });
  },

  startLoadingContact: () => {
    store.dispatch({
      intent: START_LOADING_CONTACT,
    });
  },

  stopLoadingContact: () => {
    store.dispatch({
      intent: STOP_LOADING_CONTACT,
    });
  },

  loadContact: (response) => {
    store.dispatch({
      intent: LOAD_CONTACT,
      ...response,
    });
  },

  open: () => {
    store.dispatch({
      intent: OPEN,
    });
  },

  close: () => {
    store.dispatch({
      intent: CLOSE,
    });
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent,
      ...context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
});

export default createBankingRuleDispatcher;
