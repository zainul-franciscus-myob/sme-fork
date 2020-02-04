import { addConditionPredicate, removeConditionPredicate } from '../conditionHandlers';

describe('conditionHandlers', () => {
  describe('addConditionPredicate', () => {
    const state = {
      bankingRule: {
        conditions: [],
      },
    };
    it('should set matcher to Contains when condition field is Description', () => {
      const action = {
        conditionIndex: 0,
        newData: {
          key: 'value',
          value: 'foo',
        },
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          conditions: [
            { field: 'Description', predicates: [] },
          ],
        },
      };

      const actual = addConditionPredicate(modifiedState, action);

      expect(actual.bankingRule.conditions[0].predicates[0].matcher).toEqual('Contains');
    });

    it('should set matcher to Equal when condition field is Amount', () => {
      const action = {
        conditionIndex: 0,
        newData: {
          key: 'value',
          value: 'foo',
        },
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          conditions: [
            { field: 'Amount', predicates: [] },
          ],
        },
      };

      const actual = addConditionPredicate(modifiedState, action);

      expect(actual.bankingRule.conditions[0].predicates[0].matcher).toEqual('Equal');
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
        conditionIndex: 0,
        predicateIndex: 0,
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          conditions: [
            { predicates: [{ id: 1 }, { id: 2 }] },
          ],
        },
      };

      const actual = removeConditionPredicate(modifiedState, action);

      expect(actual.bankingRule.conditions[0].predicates.length).toEqual(1);
      expect(actual.bankingRule.conditions[0].predicates[0].id).toEqual(2);
    });

    it('should remove condition when predicate is empty', () => {
      const action = {
        conditionIndex: 0,
        predicateIndex: 0,
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          conditions: [
            { predicates: [{}] },
          ],
        },
      };

      const actual = removeConditionPredicate(modifiedState, action);

      expect(actual.bankingRule.conditions.length).toEqual(0);
    });
  });
});
