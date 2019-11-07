import {
  ADD_CONDITION_PREDICATE,
  ADD_RULE_CONDITION,
  ADD_TABLE_ROW,
  FORMAT_AMOUNT,
  REMOVE_CONDITION_PREDICATE,
  REMOVE_TABLE_ROW,
  SET_ALERT,
  SET_INITIAL_STATE,
  SET_SAVING_STATE,
  UPDATE_CONDITION_PREDICATE,
  UPDATE_RULE_CONDITION,
  UPDATE_RULE_DETAILS,
  UPDATE_TABLE_ROW,
} from './BankingRuleIntents';

const createBankingRuleDispatcher = store => ({
  updateRuleDetails: (key, value) => {
    store.dispatch(
      {
        intent: UPDATE_RULE_DETAILS,
        key,
        value,
      },
    );
  },

  updateRuleCondition: (conditionIndex, key, value) => {
    store.dispatch(
      {
        intent: UPDATE_RULE_CONDITION,
        conditionIndex,
        key,
        value,
      },
    );
  },

  addRuleCondition: () => {
    store.dispatch(
      {
        intent: ADD_RULE_CONDITION,
      },
    );
  },

  addConditionPredicate: (conditionIndex, newData) => {
    store.dispatch(
      {
        intent: ADD_CONDITION_PREDICATE,
        conditionIndex,
        newData,
      },
    );
  },

  updateConditionPredicate: (conditionIndex, predicateIndex, key, value) => {
    store.dispatch(
      {
        intent: UPDATE_CONDITION_PREDICATE,
        conditionIndex,
        predicateIndex,
        key,
        value,
      },
    );
  },

  removeConditionPredicate: (conditionIndex, predicateIndex) => {
    store.dispatch(
      {
        intent: REMOVE_CONDITION_PREDICATE,
        conditionIndex,
        predicateIndex,
      },
    );
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

  formatAmount: (index) => {
    store.dispatch({
      intent: FORMAT_AMOUNT,
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

  setInitialState: (state) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent, ...state,
    });
  },
});

export default createBankingRuleDispatcher;
