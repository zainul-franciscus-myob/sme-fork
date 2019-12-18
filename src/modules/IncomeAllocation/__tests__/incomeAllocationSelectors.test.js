import { getLineDataByIndexSelector } from '../IncomeAllocationSelectors';

describe('incomeAllocationSelectors', () => {
  const state = {
    incomeAllocation: {
      lines: [
        {
          headerAccountId: '1',
          retainedEarningsAccountId: '2',
          originalRetainedEarningsAccountId: '2',
          currentEarningsAccountId: '3',
          originalCurrentEarningsAccountId: '3',
          equity: '100',
        },
      ],
    },
    accounts: [
      {
        id: '1',
        detailAccounts: [{
          id: '2',
          isActive: false,
        }, {
          id: '3',
          isActive: true,
        }],
      },
    ],
  };

  describe('getLineDataByIndexSelector', () => {
    const props = {
      index: 0,
    };

    it('should get a line data given the state and index', () => {
      const lineByIndexSelector = getLineDataByIndexSelector();

      const expected = {
        headerAccountId: '1',
        retainedEarningsAccountId: '2',
        currentEarningsAccountId: '3',
        equity: '100',
        headerAccounts: [{ id: '1' }],
        retainedEarningsAccounts: [{ id: '2', isActive: false }, { id: '3', isActive: true }],
        currentEarningsAccounts: [{ id: '3', isActive: true }],
      };

      expect(lineByIndexSelector(state, props)).toEqual(expected);
    });
  });
});
