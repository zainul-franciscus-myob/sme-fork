import { allocateTransaction } from '../allocateHandlers';
import BankTransactionStatusTypes from '../../types/BankTransactionStatusTypes';

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
          type: BankTransactionStatusTypes.unmatched,
        },
      ],
    };

    const action = {
      index: 0,
      selectedAccountId: '1',
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
            type: BankTransactionStatusTypes.singleAllocation,
            taxCode: 'GST',
            isReportable: false,
            isRuleApplied: false,
          },
        ],
      };

      const actual = allocateTransaction(state, action);

      expect(actual).toEqual(expected);
    });

    it('should not set a selectedAccountId if not provided', () => {
      const modifiedAction = {
        ...action,
        selectedAccountId: '',
      };

      const actual = allocateTransaction(state, modifiedAction);

      expect(actual.entries[0].selectedAccountId).toEqual('');
    });

    it('should set the appliedRule to undefined if not given', () => {
      const modifiedState = {
        ...state,
        entries: [
          {
            withdrawal: 10,
            deposit: 0,
            type: BankTransactionStatusTypes.unmatched,
            appliedRule: {
              ruleType: 'SpendMoney',
              contactId: '123',
              ruleName: 'For Coffees',
            },
          },
        ],
      };

      const actual = allocateTransaction(modifiedState, action);

      expect(actual.entries[0].appliedRule).toEqual(undefined);
    });

    describe('updating the calculated balances', () => {
      it('should reduce amount from unallocated when account is under deposit', () => {
        const modifiedState = {
          ...state,
          entries: [
            {
              deposit: 100,
              withdrawal: undefined,
              type: BankTransactionStatusTypes.unmatched,
            },
          ],
          balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 1000 },
        };

        const expected = {
          bankBalance: 1000,
          myobBalance: 1100,
          unallocated: 900,
        };

        const actual = allocateTransaction(modifiedState, action);

        expect(actual.balances).toEqual(expected);
      });

      it('should add amount to unallocated when account is under withdrawal', () => {
        const modifiedState = {
          ...state,
          entries: [
            {
              deposit: undefined,
              withdrawal: 100,
              type: BankTransactionStatusTypes.unmatched,
            },
          ],
          balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 1000 },
        };

        const expected = {
          bankBalance: 1000,
          myobBalance: 900,
          unallocated: 1100,
        };

        const actual = allocateTransaction(modifiedState, action);

        expect(actual.balances).toEqual(expected);
      });

      it.each([
        [BankTransactionStatusTypes.singleAllocation],
        [BankTransactionStatusTypes.splitAllocation],
        [BankTransactionStatusTypes.splitMatched],
        [BankTransactionStatusTypes.transfer],
      ])(
        'should not update the calculated balances for a %s bank transaction',
        (status) => {
          const modifiedState = {
            ...state,
            entries: [
              {
                withdrawal: 10,
                deposit: 0,
                type: status,
              },
            ],
          };

          const actual = allocateTransaction(modifiedState, action);

          expect(actual.balances).toEqual(state.balances);
        }
      );

      it.each([
        [BankTransactionStatusTypes.unmatched],
        [BankTransactionStatusTypes.matched],
        [BankTransactionStatusTypes.paymentRuleMatched],
      ])(
        'should update the calculated balances for a %s bank transaction',
        (status) => {
          const modifiedState = {
            ...state,
            entries: [
              {
                withdrawal: 10,
                deposit: 0,
                type: status,
              },
            ],
          };

          const expectedBalances = {
            ...state.balances,
            myobBalance: -10,
            unallocated: 10,
          };

          const actual = allocateTransaction(modifiedState, action);

          expect(actual.balances).toEqual(expectedBalances);
        }
      );
    });
  });
});
