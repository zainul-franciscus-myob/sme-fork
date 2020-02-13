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
} from '../BankingRuleIntents';
import {
  addConditionPredicate,
  addRuleCondition,
  removeConditionPredicate,
  updateConditionPredicate,
  updateRuleCondition,
} from './conditionHandlers';
import {
  addTableRow, formatAmount, removeTableRow, updateTableRow,
} from './allocationHandlers';
import { getRuleTypes } from '../bankingRuleSelectors';
import { tabIds } from '../../tabItems';
import FieldTypes from '../FieldTypes';
import getDefaultState from './getDefaultState';

export const updateRuleDetails = (state, action) => {
  const newState = {
    ...state,
    bankingRule: {
      ...state.bankingRule,
      [action.key]: action.value,
    },
  };
  if (action.key === 'allocationType') {
    newState.bankingRule.allocations = [];
  }
  if (action.key === 'contactId') {
    const contact = state.contacts.find(({ id }) => id === action.value);
    if (contact && contact.contactType === 'Supplier') {
      newState.bankingRule.isPaymentReportable = false;
    } else {
      newState.bankingRule.isPaymentReportable = undefined;
    }
  }
  return newState;
};

export const setInitialState = (state, {
  intent, description, activeTabId, isWithdrawal, ...otherFields
}) => {
  const defaultState = getDefaultState();
  const isAllocationOrMatchTabOpen = activeTabId === tabIds.allocate
  || activeTabId === tabIds.match;
  const ruleTypeIndex = isAllocationOrMatchTabOpen ? 0 : 1;
  const ruleType = getRuleTypes(isWithdrawal)[ruleTypeIndex].value;
  return {
    ...defaultState,
    bankingRule: {
      ...defaultState.bankingRule,
      name: description,
      ruleType,
      conditions: [{
        field: FieldTypes.description,
        predicates: [
          { matcher: 'Contains', value: description },
        ],
      }],
    },
    ...otherFields,
  };
};

export const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

export const setSavingState = (state, action) => ({
  ...state,
  isSaving: action.isSaving,
});

const bankingRuleHandlers = {
  [UPDATE_RULE_DETAILS]: updateRuleDetails,
  [UPDATE_RULE_CONDITION]: updateRuleCondition,
  [SET_INITIAL_STATE]: setInitialState,
  [ADD_RULE_CONDITION]: addRuleCondition,
  [ADD_CONDITION_PREDICATE]: addConditionPredicate,
  [UPDATE_CONDITION_PREDICATE]: updateConditionPredicate,
  [REMOVE_CONDITION_PREDICATE]: removeConditionPredicate,
  [ADD_TABLE_ROW]: addTableRow,
  [UPDATE_TABLE_ROW]: updateTableRow,
  [REMOVE_TABLE_ROW]: removeTableRow,
  [FORMAT_AMOUNT]: formatAmount,
  [SET_ALERT]: setAlert,
  [SET_SAVING_STATE]: setSavingState,
};

export default bankingRuleHandlers;
