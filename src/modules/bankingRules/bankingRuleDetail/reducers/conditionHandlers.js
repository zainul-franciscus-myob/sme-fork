import {
  ADD_CONDITION_PREDICATE,
  ADD_RULE_CONDITION,
  REMOVE_CONDITION_PREDICATE,
  UPDATE_CONDITION_PREDICATE,
  UPDATE_RULE_CONDITION,
} from '../BankingRuleDetailIntents';
import FieldTypes from '../FieldTypes';

const updateRuleCondition = (state, action) => {
  const {
    conditionIndex, key, value,
  } = action;
  const conditions = state.conditions.map((condition, i) => {
    if (i === conditionIndex) {
      return {
        ...condition,
        [key]: value,
        predicates: [],
      };
    }
    return condition;
  });
  return {
    ...state,
    conditions,
  };
};

const addRuleCondition = (state) => {
  const newCondition = {
    field: FieldTypes.description,
    predicates: [
      { matcher: 'Contains', value: '' },
    ],
  };
  return {
    ...state,
    conditions: [...state.conditions, newCondition],
  };
};

const addConditionPredicate = (state, action) => {
  const {
    conditionIndex, newData,
  } = action;
  const { key, value, id } = newData;
  const conditions = state.conditions.map((condition, currentConditionIndex) => {
    if (currentConditionIndex === conditionIndex) {
      const matcher = condition.field === FieldTypes.description ? 'Contains' : 'Equal';
      return {
        ...condition,
        predicates: [
          ...condition.predicates,
          {
            id, matcher, [key]: value,
          },
        ],
      };
    }
    return condition;
  });
  return {
    ...state,
    conditions,
  };
};

const updateConditionPredicate = (state, action) => {
  const {
    conditionIndex, predicateIndex, key, value,
  } = action;
  const conditions = state.conditions.map((condition, currentConditionIndex) => {
    if (currentConditionIndex === conditionIndex) {
      const predicates = condition.predicates.map((predicate, currentPredicateIndex) => {
        if (currentPredicateIndex === predicateIndex) {
          return {
            ...predicate,
            [key]: value,
          };
        }
        return predicate;
      });
      return {
        ...condition,
        predicates,
      };
    }
    return condition;
  });
  return {
    ...state,
    conditions,
  };
};

const removeConditionPredicate = (state, action) => {
  const { conditionIndex, predicateIndex } = action;
  const conditions = state.conditions.map((condition, currentConditionIndex) => {
    if (conditionIndex === currentConditionIndex) {
      const predicates = condition
        .predicates
        .filter((_, currentPredicateIndex) => currentPredicateIndex !== predicateIndex);
      return {
        ...condition,
        predicates,
      };
    }
    return condition;
  }).filter(({ predicates }) => predicates.length > 0);
  return {
    ...state,
    conditions,
  };
};

export default {
  [UPDATE_RULE_CONDITION]: updateRuleCondition,
  [ADD_RULE_CONDITION]: addRuleCondition,
  [ADD_CONDITION_PREDICATE]: addConditionPredicate,
  [UPDATE_CONDITION_PREDICATE]: updateConditionPredicate,
  [REMOVE_CONDITION_PREDICATE]: removeConditionPredicate,
};
