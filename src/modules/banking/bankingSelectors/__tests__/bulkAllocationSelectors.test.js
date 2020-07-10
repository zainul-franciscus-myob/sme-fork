import {
  BULK_LIMITATION,
  getBulkAllocationPayload,
  getBulkMessage,
  getBulkSelectStatus,
  getCanSelectMore,
  getIsCheckboxDisabled,
  getIsEditedEntryInBulkSelection,
} from '../bulkAllocationSelectors';

describe('bulkAllocationSelector', () => {
  describe('getBulkSelectStatus', () => {
    it('show checked when all entries are selected', () => {
      const state = {
        entries: [{ selected: true }, { selected: true }],
      };
      const status = getBulkSelectStatus(state);

      expect(status).toEqual('checked');
    });

    it('show indeterminate when partial entries are selected', () => {
      const state = {
        entries: [{ selected: true }, { selected: false }],
      };
      const status = getBulkSelectStatus(state);

      expect(status).toEqual('indeterminate');
    });

    it('show default status when no entry selected', () => {
      const state = {
        entries: [{ selected: false }, { selected: false }],
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
            withdrawal: 32.0,
            allocateOrMatch: 'Allocate me',
            selected: true,
            type: 'unmatched',
            description: 'spend money',
          },
          {
            transactionId: '2',
            date: '2019-02-12',
            deposit: 33.0,
            allocateOrMatch: 'Possible match found',
            type: 'matched',
            description: 'receive money',
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
            withdrawal: 32.0,
            description: 'spend money',
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
            withdrawal: 32.0,
            allocateOrMatch: 'Allocate me',
            type: 'unmatched',
            selected: true,
            description: 'spend money',
          },
          {
            transactionId: '2',
            date: '2019-02-12',
            deposit: 33.0,
            allocateOrMatch: 'Possible match found',
            type: 'matched',
            selected: true,
          },
          {
            transactionId: '3',
            date: '2019-02-13',
            withdrawal: 35.0,
            allocateOrMatch: 'Internet',
            type: 'singleAllocation',
            selected: true,
          },
          {
            transactionId: '4',
            date: '2019-02-14',
            deposit: 38.0,
            allocateOrMatch: 'Splitted across accounts',
            type: 'splitAllocation',
            selected: true,
          },
          {
            transactionId: '5',
            date: '2019-02-15',
            withdrawal: 40.0,
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
            withdrawal: 32.0,
            description: 'spend money',
          },
          {
            transactionId: '2',
            date: '2019-02-12',
            deposit: 33.0,
          },
          {
            transactionId: '3',
            date: '2019-02-13',
            withdrawal: 35.0,
          },
          {
            transactionId: '4',
            date: '2019-02-14',
            deposit: 38.0,
          },
        ],
      };
      const actual = getBulkAllocationPayload(state);

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

  describe('getCanSelectMore', () => {
    it('return false when all selected', () => {
      const state = {
        entries: [
          {
            selected: true,
          },
        ],
      };

      const actual = getCanSelectMore(state);

      expect(actual).toBe(false);
    });

    it('return false when maximum selected', () => {
      const state = {
        entries: Array(BULK_LIMITATION).fill({
          selected: true,
        }),
      };

      const actual = getCanSelectMore(state);

      expect(actual).toBe(false);
    });

    it('return true when not all selected and not reaching maximum', () => {
      const state = {
        entries: [
          ...Array(BULK_LIMITATION - 1).fill({
            selected: true,
          }),
          {},
        ],
      };

      const actual = getCanSelectMore(state);

      expect(actual).toBe(true);
    });
  });

  describe('getIsCheckboxDisabled', () => {
    it('return true when bulk loading', () => {
      const state = {
        isBulkLoading: true,
      };

      const actual = getIsCheckboxDisabled(state, 0);

      expect(actual).toBe(true);
    });

    it('return true when cannot select more and current line is not selected', () => {
      const state = {
        isBulkLoading: false,
        entries: [
          ...Array(BULK_LIMITATION).fill({
            selected: true,
          }),
          {},
        ],
      };

      const actual = getIsCheckboxDisabled(state, BULK_LIMITATION);

      expect(actual).toBe(true);
    });

    it('return false when current line is selected', () => {
      const state = {
        isBulkLoading: false,
        entries: Array(BULK_LIMITATION).fill({
          selected: true,
        }),
      };

      const actual = getIsCheckboxDisabled(state, 0);

      expect(actual).toBe(false);
    });

    it('return false when can select more', () => {
      const state = {
        isBulkLoading: false,
        entries: [
          ...Array(BULK_LIMITATION - 1).fill({
            selected: true,
          }),
          {},
        ],
      };

      const actual = getIsCheckboxDisabled(state, BULK_LIMITATION - 1);

      expect(actual).toBe(false);
    });
  });

  describe('getBulkMessage', () => {
    it('build message for single selection', () => {
      const state = {
        entries: [
          {
            selected: true,
          },
        ],
      };

      const actual = getBulkMessage(state);

      expect(actual).toBe('1 transaction selected (max 50)');
    });

    it('build message for single selection', () => {
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

      const actual = getBulkMessage(state);

      expect(actual).toBe('2 transactions selected (max 50)');
    });
  });
});
