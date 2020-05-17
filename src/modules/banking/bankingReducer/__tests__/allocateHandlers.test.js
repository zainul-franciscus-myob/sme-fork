import { allocateTransaction } from '../allocateHandlers';

describe('allocateHandlers', () => {
  describe('allocateTransaction', () => {
    const state = {
      bankAccounts: [],
      filterOptions: {},
      balances: {
        bankBalance: 0,
        myobBalance: 0,
        unallocated: 0,
        bankBalanceDate: '',
      },
      entries: [
        {
          withdrawal: 10,
          deposit: 0,
        },
      ],
    };

    const action = {
      index: 0,
      selectedAccount: {
        id: '1',
      },
      allocateOrMatch: 'Internet',
      journals: [
        {
          journalId: '8373',
          journalLineId: '1559',
          sourceJournal: 'CashReceipt',
        },
      ],
      type: 'singleAllocation',
      taxCode: 'GST',
      isReportable: false,
    };

    it('should update the allocated bank transaction line', () => {
      const expected = {
        bankAccounts: [],
        filterOptions: {},
        balances: {
          bankBalance: 0,
          myobBalance: -10,
          unallocated: 10,
          bankBalanceDate: '',
        },
        entries: [
          {
            selectedAccountId: '1',
            withdrawal: 10,
            deposit: 0,
            allocateOrMatch: 'Internet',
            journals: [
              {
                journalId: '8373',
                journalLineId: '1559',
                sourceJournal: 'CashReceipt',
              },
            ],
            type: 'singleAllocation',
            taxCode: 'GST',
            isReportable: false,
          },
        ],
      };

      const actual = allocateTransaction(state, action);

      expect(actual).toEqual(expected);
    });

    it('should not set a selectedAccountId if not provided', () => {
      const modifiedAction = {
        ...action,
        selectedAccount: undefined,
      };

      const actual = allocateTransaction(state, modifiedAction);

      expect(actual.entries[0].selectedAccountId).toEqual(undefined);
    });

    it('should reduce amount from unallocated when account is under deposit', () => {
      const modifiedState = {
        ...state,
        entries: [{ deposit: 100, withdrawal: undefined }],
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 1000 },
      };

      const expected = { bankBalance: 1000, myobBalance: 1100, unallocated: 900 };

      const actual = allocateTransaction(modifiedState, action);

      expect(actual.balances).toEqual(expected);
    });

    it('should add amount to unallocated when account is under withdrawal', () => {
      const modifiedState = {
        ...state,
        entries: [{ deposit: undefined, withdrawal: 100 }],
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 1000 },
      };

      const expected = { bankBalance: 1000, myobBalance: 900, unallocated: 1100 };

      const actual = allocateTransaction(modifiedState, action);

      expect(actual.balances).toEqual(expected);
    });
  });
});
