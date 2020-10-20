import {
  ADD_TABLE_ROW,
  REMOVE_TABLE_ROW,
  UPDATE_FORM,
} from '../../BankingRuleDetailIntents';
import RuleTypes from '../../RuleTypes';
import bankingRuleDetailReducer from '..';

describe('allocationHandlers', () => {
  describe('addTableRow', () => {
    const state = {
      ruleType: RuleTypes.spendMoney,
      allocationType: 'Percent',
      allocations: [],
      withdrawalAccounts: [
        {
          id: '1',
          taxCodeId: '1',
        },
      ],
    };

    it('should add 100.00 to the first line if allocationType is percent', () => {
      const action = {
        intent: ADD_TABLE_ROW,
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        allocationType: 'Percent',
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocations[0].value).toEqual('100.00');
    });

    it('should add 0.00 to all subsequent lines if allocationType is percent', () => {
      const action = {
        intent: ADD_TABLE_ROW,
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        allocationType: 'Percent',
        allocations: [{}],
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocations[1].value).toEqual('0.00');
    });

    it('should add Full amount to the first line if allocationType is amount', () => {
      const action = {
        intent: ADD_TABLE_ROW,
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        allocationType: 'Amount',
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocations[0].value).toEqual('Full amount');
    });

    it('should change the previous line to 0.00 & add Remainder to all subsequent lines if allocationType is amount', () => {
      const action = {
        intent: ADD_TABLE_ROW,
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        allocationType: 'Amount',
        allocations: [{}],
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocations[0].value).toEqual('0.00');
      expect(actual.allocations[1].value).toEqual('Remainder');
    });

    it('should populate the taxCodeId based on the selected accountId', () => {
      const action = {
        intent: ADD_TABLE_ROW,
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        withdrawalAccounts: [
          {
            id: '1',
            taxCodeId: '2',
          },
        ],
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocations[0].taxCodeId).toEqual('2');
    });
  });

  describe('removeTableRow', () => {
    const state = {
      allocationType: 'Percent',
      allocations: [{}, {}],
    };

    it('remove a line and there’s only one line left in the allocation table the percetange should become 100.00', () => {
      const action = {
        intent: REMOVE_TABLE_ROW,
        index: 1,
      };

      const modifiedState = {
        ...state,
        allocationType: 'Percent',
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocations[0].value).toEqual('100.00');
    });

    it('remove a line and there’s only one line left in the allocation table the amount should become Full amount', () => {
      const action = {
        intent: REMOVE_TABLE_ROW,
        index: 1,
      };

      const modifiedState = {
        ...state,
        allocationType: 'Amount',
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocations[0].value).toEqual('Full amount');
    });

    it('remove a line now the last line should become Remainder', () => {
      const action = {
        intent: REMOVE_TABLE_ROW,
        index: 2,
      };

      const modifiedState = {
        ...state,
        allocationType: 'Amount',
        allocations: [{}, {}, {}],
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocations[1].value).toEqual('Remainder');
    });
  });

  describe('updateForm', () => {
    const state = {
      allocations: [],
    };

    it('empties allocations when change allocation type', () => {
      const modifiedState = {
        ...state,
        allocations: [{}],
      };

      const action = {
        intent: UPDATE_FORM,
        key: 'allocationType',
        value: 'a',
      };

      const actual = bankingRuleDetailReducer(modifiedState, action);

      expect(actual.allocationType).toEqual('a');
      expect(actual.allocations).toEqual([]);
    });

    it('updates key with value', () => {
      const action = {
        intent: UPDATE_FORM,
        key: 'a',
        value: 'b',
      };

      const actual = bankingRuleDetailReducer(state, action);

      expect(actual.a).toEqual('b');
    });
  });
});
