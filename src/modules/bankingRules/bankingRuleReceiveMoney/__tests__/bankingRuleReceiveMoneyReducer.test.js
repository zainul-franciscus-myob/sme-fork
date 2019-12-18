import {
  ADD_TABLE_ROW,
  FORMAT_AMOUNT,
  REMOVE_TABLE_ROW, UPDATE_FORM,
} from '../BankingRuleReceiveMoneyIntents';
import bankingRuleReceiveMoneyReducer from '../bankingRuleReceiveMoneyReducer';

describe('bankingRuleReceiveMoneyReducer', () => {
  describe('addTableRow', () => {
    const state = {
      allocationType: 'Percent',
      allocations: [],
      allocationAccounts: [
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

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

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
        allocations: [
          {},
        ],
      };

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

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

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

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

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

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
        allocationAccounts: [
          {
            id: '1',
            taxCodeId: '2',
          },
        ],
      };

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

      expect(actual.allocations[0].taxCodeId).toEqual('2');
    });
  });

  describe('removeTableRow', () => {
    const state = {
      allocationType: 'Percent',
      allocations: [
        {},
        {},
      ],
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

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

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

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

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
        allocations: [
          {},
          {},
          {},
        ],
      };

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

      expect(actual.allocations[1].value).toEqual('Remainder');
    });
  });

  describe('formatAmount', () => {
    it('should format a value of - to an empty string for an inputted value', () => {
      const action = {
        intent: FORMAT_AMOUNT,
        index: 0,
      };

      const state = {
        allocations: [
          {
            value: '-',
          },
        ],
      };

      const actual = bankingRuleReceiveMoneyReducer(state, action);

      expect(actual.allocations[0].value).toEqual('');
    });

    it('should format the value at the given index', () => {
      const action = {
        intent: FORMAT_AMOUNT,
        index: 1,
      };

      const state = {
        allocations: [
          {
            value: '27.00',
          },
          {
            value: '12',
          },
        ],
      };

      const expected = {
        allocations: [
          {
            value: '27.00',
          },
          {
            value: '12.00',
          },
        ],
      };

      const actual = bankingRuleReceiveMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

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
        equalAmounts: {
          id: 3,
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

      const actual = bankingRuleReceiveMoneyReducer(state, action);

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

      const actual = bankingRuleReceiveMoneyReducer(state, action);

      expect(actual.conditions.containsWords).toEqual({
        id: 1,
        value: 'a',
      });
    });

    it('updates equal amounts condition', () => {
      const action = {
        intent: UPDATE_FORM,
        key: 'equalAmounts',
        value: 'a',
      };

      const actual = bankingRuleReceiveMoneyReducer(state, action);

      expect(actual.conditions.equalAmounts).toEqual({
        id: 3,
        value: 'a',
      });
    });

    it('empties allocations when change allocation type', () => {
      const modifiedState = {
        ...state,
        allocations: [
          {},
        ],
      };

      const action = {
        intent: UPDATE_FORM,
        key: 'allocationType',
        value: 'a',
      };

      const actual = bankingRuleReceiveMoneyReducer(modifiedState, action);

      expect(actual.allocationType).toEqual('a');
      expect(actual.allocations).toEqual([]);
    });

    it('updates key with value', () => {
      const action = {
        intent: UPDATE_FORM,
        key: 'a',
        value: 'b',
      };

      const actual = bankingRuleReceiveMoneyReducer(state, action);

      expect(actual.a).toEqual('b');
    });
  });
});