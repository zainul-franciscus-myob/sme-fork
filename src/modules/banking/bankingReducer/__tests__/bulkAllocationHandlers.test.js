import { BULK_LIMITATION } from '../../bankingSelectors/bulkActionSelectors';
import {
  bulkAllocateTransactions,
  selectAllTransactions,
  selectTransaction,
  unallocateTransactions,
  updateBulkAllocationOptions,
} from '../bulkAllocationHandlers';
import BankTransactionStatusTypes from '../../types/BankTransactionStatusTypes';

describe('bulkAllocationHandlers', () => {
  describe('selectTransction', () => {
    it('should select a transaction', () => {
      const state = {
        entries: [{}, {}],
      };

      const expected = {
        entries: [
          {
            selected: true,
          },
          {},
        ],
      };

      const actual = selectTransaction(state, { index: 0, value: true });

      expect(actual).toEqual(expected);
    });

    it('should not select a transaction when selected number exceed limitation', () => {
      const state = {
        entries: [
          ...Array(BULK_LIMITATION).fill({
            selected: true,
          }),
          {},
        ],
      };

      const actual = selectTransaction(state, {
        index: BULK_LIMITATION,
        value: true,
      });

      expect(actual).toEqual(state);
    });

    it('should unselect a transaction', () => {
      const state = {
        entries: [
          {},
          {
            selected: true,
          },
        ],
      };

      const expected = {
        entries: [
          {},
          {
            selected: false,
          },
        ],
      };

      const actual = selectTransaction(state, { index: 1, value: false });

      expect(actual).toEqual(expected);
    });
  });

  describe('selectAllTransctions', () => {
    it('should select maximum transactions when not maximum selected', () => {
      const state = {
        entries: Array(BULK_LIMITATION + 1)
          .fill({})
          .map((_, index) => ({ transactionId: String(index) })),
      };

      const expected = {
        entries: [
          ...Array(BULK_LIMITATION)
            .fill({})
            .map((_, index) => ({
              transactionId: String(index),
              selected: true,
            })),
          {
            transactionId: String(BULK_LIMITATION),
          },
        ],
      };

      const actual = selectAllTransactions(state);

      expect(actual).toEqual(expected);
    });

    it('should unselect all transactions', () => {
      const state = {
        entries: [
          {
            selected: true,
          },
          {
            selected: true,
          },
        ],
      };

      const expected = {
        entries: [
          {
            selected: false,
          },
          {
            selected: false,
          },
        ],
      };

      const actual = selectAllTransactions(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('updateBulkAllocationOptions', () => {
    it('should set accountId and taxCodeId when select account', () => {
      const state = {
        bulkAllocationAccounts: [
          {
            id: '123',
            taxCodeId: '2',
          },
        ],
        bulkAllocationOptions: {
          accountId: '',
          taxCodeId: '',
        },
      };

      const expected = {
        bulkAllocationAccounts: [
          {
            id: '123',
            taxCodeId: '2',
          },
        ],
        bulkAllocationOptions: {
          accountId: '123',
          taxCodeId: '2',
        },
      };

      const actual = updateBulkAllocationOptions(state, {
        key: 'accountId',
        value: '123',
      });

      expect(actual).toEqual(expected);
    });

    it('should set taxCodeId when select tax code', () => {
      const state = {
        bulkAllocationOptions: {
          accountId: '',
          taxCodeId: '',
        },
      };

      const expected = {
        bulkAllocationOptions: {
          accountId: '',
          taxCodeId: '2',
        },
      };

      const actual = updateBulkAllocationOptions(state, {
        key: 'taxCodeId',
        value: '2',
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('bulkAllocateTransactions', () => {
    it('should set allocation result to entries', () => {
      const state = {
        bankAccounts: [],
        filterOptions: {},
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 1000 },
        entries: [
          {
            transactionId: '1',
            isReportable: false,
            allocateOrMatch: '',
            journals: [],
            type: BankTransactionStatusTypes.unmatched,
            taxCode: '',
            withdrawal: 100,
          },
          {
            transactionId: '2',
            isReportable: false,
            allocateOrMatch: '',
            journals: [],
            type: BankTransactionStatusTypes.unmatched,
            taxCode: '',
          },
        ],
      };

      const expected = {
        bankAccounts: [],
        filterOptions: {},
        balances: { bankBalance: 1000, myobBalance: 900, unallocated: 1100 },
        entries: [
          {
            transactionId: '1',
            isReportable: true,
            allocateOrMatch: 'Income',
            journals: [
              {
                journalId: '1',
                journalLineId: '12',
                sourceJournal: 'CashReceipt',
              },
            ],
            type: BankTransactionStatusTypes.singleAllocation,
            taxCode: 'GST',
            withdrawal: 100,
          },
          {
            transactionId: '2',
            isReportable: false,
            allocateOrMatch: '',
            journals: [],
            type: BankTransactionStatusTypes.unmatched,
            taxCode: '',
          },
        ],
      };

      const actual = bulkAllocateTransactions(state, {
        entries: [
          {
            transactionId: '1',
            allocateOrMatch: 'Income',
            journals: [
              {
                journalId: '1',
                journalLineId: '12',
                sourceJournal: 'CashReceipt',
              },
            ],
            taxCode: 'GST',
            type: BankTransactionStatusTypes.singleAllocation,
            isReportable: true,
          },
        ],
      });

      expect(actual).toEqual(expected);
    });

    describe('updating the calculated balances', () => {
      const state = {
        bankAccounts: [],
        filterOptions: {},
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 1000 },
      };

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
                transactionId: '1',
                allocateOrMatch: '',
                withdrawal: 100,
                type: status,
              },
            ],
          };

          const action = {
            entries: [
              {
                transactionId: '1',
                allocateOrMatch: 'Income',
                type: BankTransactionStatusTypes.singleAllocation,
              },
            ],
          };

          const actual = bulkAllocateTransactions(modifiedState, action);

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
                transactionId: '2',
                allocateOrMatch: '',
                withdrawal: 100,
                type: status,
              },
            ],
          };

          const action = {
            entries: [
              {
                transactionId: '2',
                allocateOrMatch: 'Income',
                type: BankTransactionStatusTypes.singleAllocation,
              },
            ],
          };

          const expectedBalances = {
            ...state.balances,
            myobBalance: 900,
            unallocated: 1100,
          };

          const actual = bulkAllocateTransactions(modifiedState, action);

          expect(actual.balances).toEqual(expectedBalances);
        }
      );

      it('should handle a bulk allocating a variety of different transaction types', () => {
        const modifiedState = {
          ...state,
          entries: [
            {
              transactionId: '1',
              allocateOrMatch: '',
              withdrawal: 100,
              type: BankTransactionStatusTypes.singleAllocation,
            },
            {
              transactionId: '2',
              allocateOrMatch: '',
              withdrawal: 100,
              type: BankTransactionStatusTypes.paymentRuleMatched,
            },
            {
              transactionId: '3',
              allocateOrMatch: '',
              withdrawal: 100,
              type: BankTransactionStatusTypes.splitMatched,
            },
            {
              transactionId: '4',
              allocateOrMatch: '',
              withdrawal: 100,
              type: BankTransactionStatusTypes.unmatched,
            },
          ],
        };

        const action = {
          entries: [
            {
              transactionId: '1',
              allocateOrMatch: 'Income',
              type: BankTransactionStatusTypes.singleAllocation,
            },
            {
              transactionId: '2',
              allocateOrMatch: 'Income',
              type: BankTransactionStatusTypes.singleAllocation,
            },
            {
              transactionId: '3',
              allocateOrMatch: 'Income',
              type: BankTransactionStatusTypes.singleAllocation,
            },
            {
              transactionId: '4',
              allocateOrMatch: 'Income',
              type: BankTransactionStatusTypes.singleAllocation,
            },
          ],
        };

        const expectedBalances = {
          ...state.balances,
          myobBalance: 800,
          unallocated: 1200,
        };

        const actual = bulkAllocateTransactions(modifiedState, action);

        expect(actual.balances).toEqual(expectedBalances);
      });
    });
  });

  describe('bulkUnallocateTransactions', () => {
    it('should set allocation result to entries', () => {
      const state = {
        bankAccounts: [],
        filterOptions: {},
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 1000 },
        entries: [
          {
            transactionId: '1',
            allocateOrMatch: '',
            journals: [
              {
                journalId: '111',
                journalLineId: '222',
                sourceJournal: 'CashPayment',
              },
            ],
            taxCode: 'GST',
            type: BankTransactionStatusTypes.unmatched,
            withdrawal: 100,
          },
        ],
      };

      const expected = {
        bankAccounts: [],
        filterOptions: {},
        balances: { bankBalance: 1000, myobBalance: 1100, unallocated: 900 },
        entries: [
          {
            transactionId: '1',
            allocateOrMatch: 'Possible match found',
            journals: [],
            taxCode: '',
            selectedAccountId: '',
            type: BankTransactionStatusTypes.matched,
            withdrawal: 100,
          },
        ],
      };

      const actual = unallocateTransactions(state, {
        entries: [
          {
            transactionId: '1',
            allocateOrMatch: 'Possible match found',
            type: BankTransactionStatusTypes.matched,
          },
        ],
      });

      expect(actual).toEqual(expected);
    });
  });
});
