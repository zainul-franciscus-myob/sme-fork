import {
  ADD_CONDITION_PREDICATE,
  REMOVE_CONDITION_PREDICATE,
} from '../../BankingRuleDetailIntents';
import bankingRuleDetailReducer from '..';

describe('conditionHandlers', () => {
  describe('addConditionPredicate', () => {
    const state = {
      conditions: [],
    };

    it('should set matcher to Contains when condition field is Description', () => {
      const action = {
        intent: ADD_CONDITION_PREDICATE,
        conditionIndex: 0,
        newData: {
          key: 'value',
          value: 'foo',
        },
      };

      const modifiedState = {
        ...state,
        conditions: [{ field: 'Description', predicates: [] }],
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.conditions[0].predicates[0].matcher).toEqual('Contains');
    });

    it('should set matcher to Equal when condition field is Amount', () => {
      const action = {
        intent: ADD_CONDITION_PREDICATE,
        conditionIndex: 0,
        newData: {
          key: 'value',
          value: 'foo',
        },
      };

      const modifiedState = {
        ...state,
        conditions: [{ field: 'Amount', predicates: [] }],
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.conditions[0].predicates[0].matcher).toEqual('Equal');
    });
  });

  describe('removeConditionPredicate', () => {
    const state = {
      bankingRule: {
        conditions: [],
      },
    };

    it('should remove correct predicate', () => {
      const action = {
        intent: REMOVE_CONDITION_PREDICATE,
        conditionIndex: 0,
        predicateIndex: 0,
      };

      const modifiedState = {
        ...state,
        conditions: [{ predicates: [{ id: 1 }, { id: 2 }] }],
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.conditions[0].predicates.length).toEqual(1);
      expect(actual.conditions[0].predicates[0].id).toEqual(2);
    });

    it('should remove condition when predicate is empty', () => {
      const action = {
        intent: REMOVE_CONDITION_PREDICATE,
        conditionIndex: 0,
        predicateIndex: 0,
      };

      const modifiedState = {
        ...state,
        conditions: [{ predicates: [{}] }],
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.conditions.length).toEqual(0);
    });
  });
});
