import {
  getBulkAllocationPayload,
  getBulkSelectStatus, getBulkUnallocationPayload,
  getIsEditedEntryInBulkSelection,
} from '../bulkAllocationSelectors';

describe('bulkAllocationSelector', () => {
  describe('getBulkSelectStatus', () => {
    it('show checked when all entries are selected', () => {
      const state = {
        entries: [
          { selected: true },
          { selected: true },
        ],
      };
      const status = getBulkSelectStatus(state);

      expect(status).toEqual('checked');
    });

    it('show indeterminate when partial entries are selected', () => {
      const state = {
        entries: [
          { selected: true },
          { selected: false },
        ],
      };
      const status = getBulkSelectStatus(state);

      expect(status).toEqual('indeterminate');
    });

    it('show default status when no entry selected', () => {
      const state = {
        entries: [
          { selected: false },
          { selected: false },
        ],
      };
      const status = getBulkSelectStatus(state);

      expect(status).toEqual('');
    });
  });

  describe('getBulkAllocationPayload', () => {
    it('build bulk allocation payload with selected transactions', () => {
      const state = {
        filterOptions: {
          bankAccount: '1',
        },
        bulkAllocationOptions: {
          accountId: '123',
          taxCodeId: '2',
        },
        entries: [
          {
            transactionId: '1',
            date: '2019-02-11',
            withdrawal: 32.00,
            allocateOrMatch: 'Allocate me',
            selected: true,
            type: 'unmatched',
          },
          {
            transactionId: '2',
            date: '2019-02-12',
            deposit: 33.00,
            allocateOrMatch: 'Possible match found',
            type: 'matched',
          },
        ],
      };

      const expected = {
        bankAccountId: '1',
        bulkAllocationOptions: {
          accountId: '123',
          taxCodeId: '2',
        },
        entries: [
          {
            transactionId: '1',
            date: '2019-02-11',
            withdrawal: 32.00,
          },
        ],
      };
      const actual = getBulkAllocationPayload(state);

      expect(actual).toEqual(expected);
    });

    it('build bulk allocation payload with re-allocatable transactions', () => {
      const state = {
        filterOptions: {
          bankAccount: '1',
        },
        bulkAllocationOptions: {
          accountId: '123',
          taxCodeId: '2',
        },
        entries: [
          {
            transactionId: '1',
            date: '2019-02-11',
            withdrawal: 32.00,
            allocateOrMatch: 'Allocate me',
            type: 'unmatched',
            selected: true,
          },
          {
            transactionId: '2',
            date: '2019-02-12',
            deposit: 33.00,
            allocateOrMatch: 'Possible match found',
            type: 'matched',
            selected: true,
          },
          {
            transactionId: '3',
            date: '2019-02-13',
            withdrawal: 35.00,
            allocateOrMatch: 'Internet',
            type: 'singleAllocation',
            selected: true,
          },
          {
            transactionId: '4',
            date: '2019-02-14',
            deposit: 38.00,
            allocateOrMatch: 'Splitted across accounts',
            type: 'splitAllocation',
            selected: true,
          },
          {
            transactionId: '5',
            date: '2019-02-15',
            withdrawal: 40.00,
            allocateOrMatch: 'Matched to payment',
            type: 'payment',
            selected: true,
          },
        ],
      };

      const expected = {
        bankAccountId: '1',
        bulkAllocationOptions: {
          accountId: '123',
          taxCodeId: '2',
        },
        entries: [
          {
            transactionId: '1',
            date: '2019-02-11',
            withdrawal: 32.00,
          },
          {
            transactionId: '2',
            date: '2019-02-12',
            deposit: 33.00,
          },
          {
            transactionId: '3',
            date: '2019-02-13',
            withdrawal: 35.00,
          },
          {
            transactionId: '4',
            date: '2019-02-14',
            deposit: 38.00,
          },
        ],
      };
      const actual = getBulkAllocationPayload(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getBulkUnallocationPayload', () => {
    it('build bulk unallocation payload', () => {
      const state = {
        filterOptions: {
          bankAccount: '1',
        },
        entries: [
          {
            transactionId: '1',
            journalLineId: '111',
            selected: true,
            type: 'unmatched',
          },
          {
            transactionId: '2',
            journalLineId: '222',
            selected: true,
            type: 'matched',
          },
          {
            transactionId: '3',
            journalLineId: '333',
            type: 'singleAllocation',
          },
          {
            transactionId: '4',
            journalLineId: '444',
            selected: true,
            type: 'singleAllocation',
          },
          {
            transactionId: '5',
            journalLineId: '555',
            selected: true,
            type: 'splitAllocation',
          },
          {
            transactionId: '6',
            journalLineId: '666',
            selected: true,
            type: 'payment',
          },
        ],
      };

      const expected = {
        bankAccountId: '1',
        entries: [
          {
            transactionId: '4',
            journalLineId: '444',
          },
          {
            transactionId: '5',
            journalLineId: '555',
          },
          {
            transactionId: '6',
            journalLineId: '666',
          },
        ],
      };
      const actual = getBulkUnallocationPayload(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsEditedEntryInBulkSelection', () => {
    it('return true when open entry in bulk selection and has been edited', () => {
      const state = {
        openPosition: 0,
        openEntry: {
          isEdited: true,
        },
        entries: [
          {
            selected: true,
          },
        ],
      };

      const actual = getIsEditedEntryInBulkSelection(state);

      expect(actual).toBe(true);
    });

    it('return false when open entry in bulk selection and but not edited', () => {
      const state = {
        openPosition: 0,
        openEntry: {
          isEdited: false,
        },
        entries: [
          {
            selected: true,
          },
        ],
      };

      const actual = getIsEditedEntryInBulkSelection(state);

      expect(actual).toBe(false);
    });

    it('return false when no open entry', () => {
      const state = {
        openPosition: -1,
      };

      const actual = getIsEditedEntryInBulkSelection(state);

      expect(actual).toBe(false);
    });

    it('return false when open entry is not in bulk selection', () => {
      const state = {
        openPosition: 1,
        openEntry: {
          isEdited: true,
        },
        entries: [
          {
            selected: true,
          },
          {
            selected: false,
          },
        ],
      };

      const actual = getIsEditedEntryInBulkSelection(state);

      expect(actual).toBe(false);
    });
  });
});
