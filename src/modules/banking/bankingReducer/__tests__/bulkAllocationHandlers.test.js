import {
  bulkAllocateTransactions,
  selectAllTransactions,
  selectTransaction,
  unallocateTransactions,
  updateBulkAllocationOptions,
} from '../bulkAllocationHandlers';

describe('bulkAllocationHandlers', () => {
  describe('selectTransction', () => {
    it('should select a transaction', () => {
      const state = {
        entries: [
          {
            transactionId: '1',
          },
          {
            transactionId: '2',
          },
        ],
      };

      const expected = {
        entries: [
          {
            transactionId: '1',
            selected: true,
          },
          {
            transactionId: '2',
          },
        ],
      };

      const actual = selectTransaction(state, { index: 0, value: true });

      expect(actual).toEqual(expected);
    });

    it('should unselect a transaction', () => {
      const state = {
        entries: [
          {
            transactionId: '1',
          },
          {
            transactionId: '2',
            selected: true,
          },
        ],
      };

      const expected = {
        entries: [
          {
            transactionId: '1',
          },
          {
            transactionId: '2',
            selected: false,
          },
        ],
      };

      const actual = selectTransaction(state, { index: 1, value: false });

      expect(actual).toEqual(expected);
    });
  });

  describe('selectAllTransctions', () => {
    it('should select all transactions when not all selected', () => {
      const state = {
        entries: [
          {
            transactionId: '1',
            selected: true,
          },
          {
            transactionId: '2',
          },
        ],
      };

      const expected = {
        entries: [
          {
            transactionId: '1',
            selected: true,
          },
          {
            transactionId: '2',
            selected: true,
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
            transactionId: '1',
            selected: true,
          },
          {
            transactionId: '2',
            selected: true,
          },
        ],
      };

      const expected = {
        entries: [
          {
            transactionId: '1',
            selected: false,
          },
          {
            transactionId: '2',
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

      const actual = updateBulkAllocationOptions(state, { key: 'accountId', value: '123' });

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

      const actual = updateBulkAllocationOptions(state, { key: 'taxCodeId', value: '2' });

      expect(actual).toEqual(expected);
    });
  });

  describe('bulkAllocateTransactions', () => {
    it('should set allocation result to entries', () => {
      const state = {
        balances: { bankBalance: 1000, myobBalance: 1000, unallocated: 1000 },
        entries: [
          {
            transactionId: '1',
            isReportable: false,
            allocateOrMatch: '',
            journals: [],
            type: '',
            taxCode: '',
            withdrawal: 100,
          },
          {
            transactionId: '2',
            isReportable: false,
            allocateOrMatch: '',
            journals: [],
            type: '',
            taxCode: '',
          },
        ],
      };

      const expected = {
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
            type: 'singleAllocation',
            taxCode: 'GST',
            withdrawal: 100,
          },
          {
            transactionId: '2',
            isReportable: false,
            allocateOrMatch: '',
            journals: [],
            type: '',
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
            type: 'singleAllocation',
            taxCode: 'GST',
            isReportable: true,
          },
        ],
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('bulkUnallocateTransactions', () => {
    it('should set allocation result to entries', () => {
      const state = {
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
            type: '',
            withdrawal: 100,
          },
          {
            transactionId: '2',
            allocateOrMatch: '',
            journals: [
              {
                journalId: '333',
                journalLineId: '444',
                sourceJournal: 'CashPayment',
              },
            ],
            taxCode: 'GST',
            type: '',
          },
        ],
      };

      const expected = {
        balances: { bankBalance: 1000, myobBalance: 1100, unallocated: 900 },
        entries: [
          {
            transactionId: '1',
            allocateOrMatch: 'Possible match found',
            journals: [],
            taxCode: '',
            type: 'matched',
            withdrawal: 100,
          },
          {
            transactionId: '2',
            allocateOrMatch: '',
            journals: [
              {
                journalId: '333',
                journalLineId: '444',
                sourceJournal: 'CashPayment',
              },
            ],
            taxCode: 'GST',
            type: '',
          },
        ],
      };

      const actual = unallocateTransactions(state, {
        entries: [
          {
            transactionId: '1',
            allocateOrMatch: 'Possible match found',
            type: 'matched',
          },
        ],
      });

      expect(actual).toEqual(expected);
    });
  });
});
