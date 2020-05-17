import { BULK_LIMITATION } from '../../bankingSelectors/bulkAllocationSelectors';
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
          {},
          {},
        ],
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

      const actual = selectTransaction(state, { index: BULK_LIMITATION, value: true });

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
        bankAccounts: [],
        filterOptions: {},
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
        bankAccounts: [],
        filterOptions: {},
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
