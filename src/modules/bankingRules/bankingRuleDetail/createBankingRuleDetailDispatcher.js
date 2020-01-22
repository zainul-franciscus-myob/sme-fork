import {
  ADD_CONDITION_PREDICATE,
  ADD_RULE_CONDITION,
  ADD_TABLE_ROW,
  CHANGE_TABLE_ROW,
  CLOSE_MODAL,
  FORMAT_AMOUNT,
  OPEN_MODAL,
  REMOVE_CONDITION_PREDICATE,
  REMOVE_TABLE_ROW,
  SET_ALERT_MESSAGE,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  UPDATE_CONDITION_PREDICATE,
  UPDATE_FORM,
  UPDATE_RULE_CONDITION,
} from './BankingRuleDetailIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';

const createBankingRuleDetailDispatcher = store => ({
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

  setIsPageEdited: (isPageEdited) => {
    store.dispatch({
      intent: SET_IS_PAGE_EDITED,
      isPageEdited,
    });
  },

  displayAlert: errorMessage => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  }),

  dismissAlert: () => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
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

  formatAmount: (index) => {
    store.dispatch({
      intent: FORMAT_AMOUNT,
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
});

export default createBankingRuleDetailDispatcher;
