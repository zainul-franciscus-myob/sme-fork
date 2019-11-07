import { appliedTransactions } from '../applyRuleResultHandlers';

describe('applyRuleResultHandlers', () => {
  describe('appliedTransactions', () => {
    it('apply rule result should be merged to bank transaction entry', () => {
      const state = {
        balances: {},
        entries: [
          { transactionId: '1' },
          { transactionId: '2' },
        ],
      };

      const action = {
        entries: [
          { transactionId: '1', allocateOrMatch: 'foo' },
          { transactionId: '3', allocateOrMatch: 'foo' },
        ],
      };

      const expected = {
        balances: {},
        entries: [
          { transactionId: '1', allocateOrMatch: 'foo' },
          { transactionId: '2' },
        ],
      };

      const newState = appliedTransactions(state, action);

      expect(newState).toEqual(expected);
    });
  });
});
