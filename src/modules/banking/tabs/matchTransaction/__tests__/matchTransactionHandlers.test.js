import {
  addAdjustment,
  removeAdjustment,
  showSelectedMatchTransactions,
  toggleMatchTransactionSelectAllState,
  updateAdjustment,
  updateMatchTransactionSelection,
  updateSelectedTransactionDetails,
} from '../matchTransactionHandlers';

describe('matchTransactionHandlers', () => {
  describe('updateSelectedTransactionDetails', () => {
    it('should return correct state', () => {
      const state = {
        openEntry: {
          match: {
            entries: [
              {
                journalId: 'idOfJournal',
                journalLineId: 'idOfJournalLine',
                matchAmount: 0,
              },
            ],
          },
        },
      };

      const action = {
        index: 0,
        key: 'matchAmount',
        value: 10,
      };

      const expected = {
        openEntry: {
          match: {
            entries: [
              {
                journalId: 'idOfJournal',
                journalLineId: 'idOfJournalLine',
                matchAmount: 10,
                selected: true,
              },
            ],
            selectedEntries: {
              'idOfJournal-idOfJournalLine': {
                journalId: 'idOfJournal',
                journalLineId: 'idOfJournalLine',
                matchAmount: 10,
                selected: true,
              },
            },
          },
        },
      };

      const actual = updateSelectedTransactionDetails(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('toggleMatchTransactionSelectAllState', () => {
    it('should return correct state', () => {
      const state = {
        openEntry: {
          match: {
            entries: [
              {
                journalId: 'idOfJournal',
                journalLineId: 'idOfJournalLine',
                selected: false,
              },
              {
                journalId: 'idOf2ndJournal',
                journalLineId: 'idOf2ndJournalLine',
                selected: false,
              },
            ],
          },
        },
      };

      const action = {
        selected: true,
      };

      const expected = {
        openEntry: {
          match: {
            entries: [
              {
                journalId: 'idOfJournal',
                journalLineId: 'idOfJournalLine',
                selected: true,
              },
              {
                journalId: 'idOf2ndJournal',
                journalLineId: 'idOf2ndJournalLine',
                selected: true,
              },
            ],
            selectedEntries: {
              'idOfJournal-idOfJournalLine': {
                journalId: 'idOfJournal',
                journalLineId: 'idOfJournalLine',
                selected: true,
              },
              'idOf2ndJournal-idOf2ndJournalLine': {
                journalId: 'idOf2ndJournal',
                journalLineId: 'idOf2ndJournalLine',
                selected: true,
              },
            },
          },
        },
      };

      const actual = toggleMatchTransactionSelectAllState(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('updateAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        withdrawalAccounts: [],
        depositAccounts: [],
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2010-09-09',
          },
        ],
        openEntry: {
          match: {
            adjustments: [{ id: '1', accountId: '123' }],
          },
        },
      };

      const action = { index: 0, key: 'accountId', value: '321' };

      const expected = {
        withdrawalAccounts: [],
        depositAccounts: [],
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2010-09-09',
          },
        ],
        openEntry: {
          isEdited: true,
          match: {
            adjustments: [{ id: '1', accountId: '321' }],
          },
        },
      };

      const actual = updateAdjustment(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('addAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        withdrawalAccounts: [],
        depositAccounts: [],
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2010-09-09',
          },
        ],
        openEntry: {
          match: {
            adjustments: [],
          },
        },
      };

      const action = { id: '1', key: 'accountId', value: '123' };

      const expected = {
        withdrawalAccounts: [],
        depositAccounts: [],
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2010-09-09',
          },
        ],
        openEntry: {
          isEdited: true,
          match: {
            adjustments: [{ id: '1', accountId: '123' }],
          },
        },
      };

      const actual = addAdjustment(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('removeAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        openEntry: {
          match: {
            adjustments: [{ id: '1', accountId: '123' }],
          },
        },
      };

      const action = { index: 0 };

      const expected = {
        openEntry: {
          isEdited: true,
          match: {
            adjustments: [],
          },
        },
      };

      const actual = removeAdjustment(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('showSelectedMatchTransactions', () => {
    it('should return all selected transactions', () => {
      const state = {
        openEntry: {
          match: {
            entries: [
              { journalId: 1, journalLineId: 2, selected: true },
              { journalId: 2, journalLineId: 3, selected: false },
            ],
            selectedEntries: {
              '3-5': { journalId: 3, journalLineId: 5, selected: true },
            },
          },
        },
      };

      const expected = {
        openEntry: {
          match: {
            entries: [
              { journalId: 3, journalLineId: 5, selected: true },
              { journalId: 1, journalLineId: 2, selected: true },
            ],
            selectedEntries: {
              '3-5': { journalId: 3, journalLineId: 5, selected: true },
            },
          },
        },
      };

      const actual = showSelectedMatchTransactions(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('updateMatchTransactionSelection', () => {
    const getState = (entries) => ({
      openEntry: {
        match: {
          totalAmount: 1000,
          entries,
          selectedEntries: [],
        },
      },
    });

    it('should select match transaction', () => {
      const entries = [
        {
          totalAmount: '100',
          discountAmount: '10',
          type: 'Purchase',
          selected: false,
        },
      ];
      const state = getState(entries);

      const actual = updateMatchTransactionSelection(state, {
        index: 0,
        selected: true,
      });

      expect(actual.openEntry.match.entries[0].selected).toBeTruthy();
    });

    it('should prefill matchAmount with full bank transaction amount', () => {
      const entries = [
        {
          totalAmount: '100',
          discountAmount: '10',
          type: 'Transaction',
          selected: false,
        },
      ];
      const state = getState(entries);

      const actual = updateMatchTransactionSelection(state, {
        index: 0,
        selected: true,
      });

      expect(actual.openEntry.match.entries[0].matchAmount).toEqual(1000);
    });

    it('should prefill matchAmount with 0', () => {
      const entries = [
        { totalAmount: '100', selected: false },
        { totalAmount: '1000', matchAmount: 1000, selected: true },
      ];
      const state = getState(entries);

      const actual = updateMatchTransactionSelection(state, {
        index: 0,
        selected: true,
      });

      expect(actual.openEntry.match.entries[0].matchAmount).toEqual(0);
    });

    it('should prefill matchAmount with full transaction due amount', () => {
      const entries = [
        { selected: true, matchAmount: 500 },
        { totalAmount: '100', discountAmount: '10', selected: false },
      ];
      const state = getState(entries);

      const actual = updateMatchTransactionSelection(state, {
        index: 1,
        selected: true,
      });

      expect(actual.openEntry.match.entries[1].matchAmount).toEqual(90);
    });

    it('should prefill matchAmount with the rest of the available amount', () => {
      const entries = [
        { selected: true, matchAmount: 500 },
        { totalAmount: '1000', selected: false },
      ];
      const state = getState(entries);

      const actual = updateMatchTransactionSelection(state, {
        index: 1,
        selected: true,
      });

      expect(actual.openEntry.match.entries[1].matchAmount).toEqual(500);
    });

    it('should unselect match transaction and clear matchAmount', () => {
      const entries = [{ matchAmount: 100, selected: false }];
      const state = getState(entries);

      const actual = updateMatchTransactionSelection(state, {
        index: 0,
        selected: false,
      });

      expect(actual.openEntry.match.entries[0].selected).toBeFalsy();
      expect(actual.openEntry.match.entries[0].matchAmount).toEqual('');
    });
  });
});
