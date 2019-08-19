import {
  UPDATE_FORM,
} from '../BankingRuleBillIntents';
import bankingRuleBillReducer from '../bankingRuleBillReducer';

describe('bankingRuleBillReducer', () => {
  describe('updateForm', () => {
    const state = {
      conditions: {
        containsWords: {
          id: 1,
          value: '',
        },
        exactWords: {
          id: 2,
          value: '',
        },
      },
      allocations: [],
    };

    it('updates exact words condition', () => {
      const action = {
        intent: UPDATE_FORM,
        key: 'exactWords',
        value: 'a',
      };

      const actual = bankingRuleBillReducer(state, action);

      expect(actual.conditions.exactWords).toEqual({
        id: 2,
        value: 'a',
      });
    });

    it('updates contains words condition', () => {
      const action = {
        intent: UPDATE_FORM,
        key: 'containsWords',
        value: 'a',
      };

      const actual = bankingRuleBillReducer(state, action);

      expect(actual.conditions.containsWords).toEqual({
        id: 1,
        value: 'a',
      });
    });

    it('updates key with value', () => {
      const action = {
        intent: UPDATE_FORM,
        key: 'a',
        value: 'b',
      };

      const actual = bankingRuleBillReducer(state, action);

      expect(actual.a).toEqual('b');
    });
  });
});
