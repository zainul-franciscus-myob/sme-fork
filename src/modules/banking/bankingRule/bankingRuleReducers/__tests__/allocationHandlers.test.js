import { addTableRow, removeTableRow } from '../allocationHandlers';

describe('allocationHandlers', () => {
  describe('addTableRow', () => {
    const state = {
      withdrawalAccounts: [
        {
          id: '1',
          taxCodeId: '1',
        },
      ],
      depositAccounts: [
        {
          id: '1',
          taxCodeId: '1',
        },
      ],
      bankingRule: {
        allocationType: 'Percent',
        allocations: [],
      },
    };

    it('should add 100.00 to the first line if allocationType is percent', () => {
      const action = {
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          allocationType: 'Percent',
        },
      };

      const actual = addTableRow(modifiedState, action);

      expect(actual.bankingRule.allocations[0].value).toEqual('100.00');
    });

    it('should add 0.00 to all subsequent lines if allocationType is percent', () => {
      const action = {
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          allocationType: 'Percent',
          allocations: [
            {},
          ],
        },
      };

      const actual = addTableRow(modifiedState, action);

      expect(actual.bankingRule.allocations[1].value).toEqual('0.00');
    });

    it('should add Full amount to the first line if allocationType is amount', () => {
      const action = {
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          allocationType: 'Amount',
        },
      };

      const actual = addTableRow(modifiedState, action);

      expect(actual.bankingRule.allocations[0].value).toEqual('Full amount');
    });

    it('should change the previous line to 0.00 & add Remainder to all subsequent lines if allocationType is amount', () => {
      const action = {
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          allocationType: 'Amount',
          allocations: [{}],
        },
      };

      const actual = addTableRow(modifiedState, action);

      expect(actual.bankingRule.allocations[0].value).toEqual('0.00');
      expect(actual.bankingRule.allocations[1].value).toEqual('Remainder');
    });

    it('should populate the taxCodeId based on the selected accountId', () => {
      const action = {
        row: { accountId: '1' },
      };

      const modifiedState = {
        ...state,
        depositAccounts: [
          {
            id: '1',
            taxCodeId: '2',
          },
        ],
      };

      const actual = addTableRow(modifiedState, action);

      expect(actual.bankingRule.allocations[0].taxCodeId).toEqual('2');
    });
  });

  describe('removeTableRow', () => {
    const state = {
      bankingRule: {
        allocationType: 'Percent',
        allocations: [
          {},
          {},
        ],
      },
    };

    it('remove a line and there’s only one line left in the allocation table the percetange should become 100.00', () => {
      const action = {
        index: 1,
      };

      const modifiedState = {
        ...state,
      };

      const actual = removeTableRow(modifiedState, action);

      expect(actual.bankingRule.allocations[0].value).toEqual('100.00');
    });

    fit('remove a line and there’s only one line left in the allocation table the amount should become Full amount', () => {
      const action = {
        index: 1,
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          allocationType: 'Amount',
        },
      };

      const actual = removeTableRow(modifiedState, action);

      expect(actual.bankingRule.allocations[0].value).toEqual('Full amount');
    });

    it('remove a line now the last line should become Remainder', () => {
      const action = {
        index: 2,
      };

      const modifiedState = {
        ...state,
        bankingRule: {
          ...state.bankingRule,
          allocationType: 'Amount',
          allocations: [
            {},
            {},
            {},
          ],
        },
      };

      const actual = removeTableRow(modifiedState, action);

      expect(actual.bankingRule.allocations[1].value).toEqual('Remainder');
    });
  });
});
