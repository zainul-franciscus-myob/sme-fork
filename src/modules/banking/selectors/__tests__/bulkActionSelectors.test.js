import {
  BULK_LIMITATION,
  getBulkAllocationPayload,
  getBulkMessage,
  getBulkSelectStatus,
  getBulkUnallocationPayload,
  getCanSelectMore,
  getIsCheckboxDisabled,
  getIsEditedEntryInBulkSelection,
  getShowBulkUnallocate,
} from '../bulkActionSelectors';

describe('bulkActionSelector', () => {
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
            bankAccountId: '123',
            description: 'spend money',
          },
          {
            transactionId: '2',
            date: '2019-02-12',
            deposit: 33.0,
            allocateOrMatch: 'Possible match found',
            type: 'matched',
            bankAccountId: '234',
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
            bankAccountId: '123',
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

  describe('getBulkUnallocationPayload', () => {
    it('build bulk unallocation payload', () => {
      const state = {
        filterOptions: {
          bankAccount: '1',
        },
        entries: [
          {
            transactionId: '1',
            journals: [],
            selected: true,
            type: 'unmatched',
          },
          {
            transactionId: '2',
            journals: [],
            selected: true,
            type: 'matched',
          },
          {
            transactionId: '3',
            journals: [],
            type: 'singleAllocation',
          },
          {
            transactionId: '4',
            bankAccountId: '123',
            journals: [],
            selected: true,
            type: 'singleAllocation',
          },
          {
            transactionId: '5',
            journals: [],
            selected: true,
            type: 'splitAllocation',
          },
          {
            transactionId: '6',
            journals: [],
            selected: true,
            type: 'paymentRuleMatched',
          },
          {
            transactionId: '7',
            journals: [],
            selected: true,
            type: 'splitMatched',
          },
          {
            transactionId: '8',
            journals: [],
            selected: true,
            type: 'transfer',
          },
        ],
      };

      const expected = {
        bankAccountId: '1',
        entries: [
          {
            transactionId: '4',
            bankAccountId: '123',
          },
          {
            transactionId: '5',
          },
          {
            transactionId: '7',
          },
          {
            transactionId: '8',
          },
        ],
      };
      const actual = getBulkUnallocationPayload(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getShowBulkUnallocate', () => {
    it('returns false when none of the selected transactions are allocated', () => {
      const state = {
        entries: [
          {
            transactionId: '1',
            journals: [],
            selected: true,
            type: 'unmatched',
          },
          {
            transactionId: '2',
            journals: [],
            selected: true,
            type: 'matched',
          },
          {
            transactionId: '3',
            journals: [],
            selected: true,
            type: 'paymentRuleMatched',
          },
          {
            transactionId: '4',
            journals: [
              {
                journalLineId: '444',
              },
            ],
            selected: false,
            type: 'singleAllocation',
          },
        ],
      };

      const actual = getShowBulkUnallocate(state);

      expect(actual).toBe(false);
    });

    describe('returns true when at least one selected transaction is allocated', () => {
      it.each([
        ['singleAllocation'],
        ['splitAllocation'],
        ['splitMatched'],
        ['transfer'],
      ])('of type %s', (type) => {
        const state = {
          entries: [
            {
              transactionId: '3',
              journals: [
                {
                  journalLineId: '333',
                },
              ],
              selected: true,
              type,
            },
          ],
        };

        const actual = getShowBulkUnallocate(state);

        expect(actual).toBe(true);
      });
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
