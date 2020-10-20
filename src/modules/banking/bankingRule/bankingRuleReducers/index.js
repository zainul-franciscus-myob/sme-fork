import {
  ADD_CONDITION_PREDICATE,
  ADD_RULE_CONDITION,
  ADD_TABLE_ROW,
  CLOSE,
  OPEN,
  REMOVE_CONDITION_PREDICATE,
  REMOVE_TABLE_ROW,
  SET_ALERT,
  SET_SAVING_STATE,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  START_LOADING,
  STOP_LOADING,
  UPDATE_CONDITION_PREDICATE,
  UPDATE_CONTACT,
  UPDATE_RULE_CONDITION,
  UPDATE_RULE_DETAILS,
  UPDATE_TABLE_ROW,
} from '../BankingRuleIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  addConditionPredicate,
  addRuleCondition,
  removeConditionPredicate,
  updateConditionPredicate,
  updateRuleCondition,
} from './conditionHandlers';
import {
  addTableRow,
  removeTableRow,
  updateTableRow,
} from './allocationHandlers';
import FieldTypes from '../FieldTypes';
import createReducer from '../../../../store/createReducer';
import getDefaultState from './getDefaultState';

const updateRuleDetails = (state, action) => {
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
  return newState;
};

const updateContact = (state, action) => {
  const { key, value, contactType, isPaymentReportable } = action;

  return {
    ...state,
    contactType,
    bankingRule: {
      ...state.bankingRule,
      isPaymentReportable,
      [key]: value,
    },
  };
};

const setInitialState = (
  _,
  {
    businessId,
    region,
    transaction,
    ruleType,
    bankAccounts,
    withdrawalAccounts,
    depositAccounts,
    jobs,
    taxCodes,
  }
) => {
  const state = getDefaultState();
  return {
    ...state,
    businessId,
    region,
    transaction,
    bankAccounts,
    withdrawalAccounts,
    depositAccounts,
    jobs,
    taxCodes,
    bankingRule: {
      ...state.bankingRule,
      ruleType,
      name: transaction.description,
      conditions: [
        {
          field: FieldTypes.description,
          predicates: [
            {
              matcher: 'Contains',
              value: transaction.description,
            },
          ],
        },
      ],
    },
  };
};

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setSavingState = (state, action) => ({
  ...state,
  isSaving: action.isSaving,
});

const startLoading = (state) => ({
  ...state,
  isLoading: true,
});

const stopLoading = (state) => ({
  ...state,
  isLoading: false,
});

const open = (state) => ({
  ...state,
  isOpen: true,
});

const close = (state) => ({
  ...state,
  isOpen: false,
});

const setViewedAccountToolTipState = (state, { viewedAccountToolTip }) => ({
  ...state,
  viewedAccountToolTip,
});

const resetState = () => getDefaultState();

const bankingRuleHandlers = {
  [UPDATE_CONTACT]: updateContact,
  [UPDATE_RULE_DETAILS]: updateRuleDetails,
  [UPDATE_RULE_CONDITION]: updateRuleCondition,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [ADD_RULE_CONDITION]: addRuleCondition,
  [ADD_CONDITION_PREDICATE]: addConditionPredicate,
  [UPDATE_CONDITION_PREDICATE]: updateConditionPredicate,
  [REMOVE_CONDITION_PREDICATE]: removeConditionPredicate,
  [ADD_TABLE_ROW]: addTableRow,
  [UPDATE_TABLE_ROW]: updateTableRow,
  [REMOVE_TABLE_ROW]: removeTableRow,
  [SET_ALERT]: setAlert,
  [SET_SAVING_STATE]: setSavingState,
  [START_LOADING]: startLoading,
  [STOP_LOADING]: stopLoading,
  [OPEN]: open,
  [CLOSE]: close,
  [SET_VIEWED_ACCOUNT_TOOL_TIP_STATE]: setViewedAccountToolTipState,
};

export default createReducer(getDefaultState(), bankingRuleHandlers);
