import { appliedTransactions } from '../applyRuleResultHandlers';

describe('applyRuleResultHandlers', () => {
  describe('appliedTransactions', () => {
    const state = {
      bankAccounts: [],
      filterOptions: {},
      entries: [
        { transactionId: '1', withdrawal: 100, deposit: undefined },
        { transactionId: '2', withdrawal: undefined, deposit: 50 },
        { transactionId: '3', withdrawal: 150, deposit: undefined },
      ],
      balances: {
        bankBalance: 1000,
        myobBalance: 1000,
        unallocated: 1000,
      },
    };

    it('apply rule result should be merged to bank transaction entry', () => {
      const updatedState = {
        ...state,
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
        bankAccounts: [],
        filterOptions: {},
        balances: {},
        entries: [
          { transactionId: '1', allocateOrMatch: 'foo' },
          { transactionId: '2' },
        ],
      };

      const actual = appliedTransactions(updatedState, action);

      expect(actual).toEqual(expected);
    });

    it('should update balances with all applied transaction lines', () => {
      const action = {
        entries: [
          { transactionId: '1', type: 'singleAllocation' },
          { transactionId: '2', type: 'paymentRuleMatched' },
          { transactionId: '3', type: 'splitAllocation' },
        ],
      };

      const actual = appliedTransactions(state, action);

      const expected = { bankBalance: 1000, myobBalance: 1250, unallocated: 750 };

      expect(actual.balances).toEqual(expected);
    });

    it('shouldn\'t update balances if no allocated transactions', () => {
      const action = {
        entries: [
          { transactionId: '1', type: 'splitMatched' },
          { transactionId: '2', type: 'paymentRuleMatched' },
          { transactionId: '3', type: 'splitMatched' },
        ],
      };

      const actual = appliedTransactions(state, action);

      const expected = {
        bankBalance: 1000,
        myobBalance: 1000,
        unallocated: 1000,
      };

      expect(actual.balances).toEqual(expected);
    });
  });
});
