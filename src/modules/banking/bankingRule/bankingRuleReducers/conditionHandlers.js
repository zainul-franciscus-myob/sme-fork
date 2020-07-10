import FieldTypes from '../FieldTypes';

export const updateRuleCondition = (state, action) => {
  const { conditionIndex, key, value } = action;
  const conditions = state.bankingRule.conditions.map((condition, i) => {
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
    bankingRule: {
      ...state.bankingRule,
      conditions,
    },
  };
};

export const addRuleCondition = (state) => {
  const newCondition = {
    field: FieldTypes.description,
    predicates: [{ matcher: 'Contains', value: '' }],
  };
  return {
    ...state,
    bankingRule: {
      ...state.bankingRule,
      conditions: [...state.bankingRule.conditions, newCondition],
    },
  };
};

export const addConditionPredicate = (state, action) => {
  const { conditionIndex, newData } = action;
  const { key, value, id } = newData;
  const conditions = state.bankingRule.conditions.map(
    (condition, currentConditionIndex) => {
      if (currentConditionIndex === conditionIndex) {
        const matcher =
          condition.field === FieldTypes.description ? 'Contains' : 'Equal';
        return {
          ...condition,
          predicates: [
            ...condition.predicates,
            {
              id,
              matcher,
              [key]: value,
            },
          ],
        };
      }
      return condition;
    }
  );
  return {
    ...state,
    bankingRule: {
      ...state.bankingRule,
      conditions,
    },
  };
};

export const updateConditionPredicate = (state, action) => {
  const { conditionIndex, predicateIndex, key, value } = action;
  const conditions = state.bankingRule.conditions.map(
    (condition, currentConditionIndex) => {
      if (currentConditionIndex === conditionIndex) {
        const predicates = condition.predicates.map(
          (predicate, currentPredicateIndex) => {
            if (currentPredicateIndex === predicateIndex) {
              return {
                ...predicate,
                [key]: value,
              };
            }
            return predicate;
          }
        );
        return {
          ...condition,
          predicates,
        };
      }
      return condition;
    }
  );
  return {
    ...state,
    bankingRule: {
      ...state.bankingRule,
      conditions,
    },
  };
};

export const removeConditionPredicate = (state, action) => {
  const { conditionIndex, predicateIndex } = action;
  const conditions = state.bankingRule.conditions
    .map((condition, currentConditionIndex) => {
      if (conditionIndex === currentConditionIndex) {
        const predicates = condition.predicates.filter(
          (_, currentPredicateIndex) => currentPredicateIndex !== predicateIndex
        );
        return {
          ...condition,
          predicates,
        };
      }
      return condition;
    })
    .filter(({ predicates }) => predicates.length > 0);
  return {
    ...state,
    bankingRule: {
      ...state.bankingRule,
      conditions,
    },
  };
};
