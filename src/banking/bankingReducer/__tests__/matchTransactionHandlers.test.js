import {
  addAdjustment,
  removeAdjustment,
  toggleMatchTransactionSelectAllState,
  updateAdjustment,
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
                matchAmount: 10,
                selected: true,
              },
            ],
            selectedEntries: {
              idOfJournal: {
                journalId: 'idOfJournal',
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
                selected: false,
              },
              {
                journalId: 'idOf2ndJournal',
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
                selected: true,
              },
              {
                journalId: 'idOf2ndJournal',
                selected: true,
              },
            ],
            selectedEntries: {
              idOfJournal: {
                journalId: 'idOfJournal',
                selected: true,
              },
              idOf2ndJournal: {
                journalId: 'idOf2ndJournal',
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
            adjustments: [
              { id: '1', accountId: '123' },
            ],
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
            adjustments: [
              { id: '1', accountId: '321' },
            ],
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
            adjustments: [
              { id: '1', accountId: '123' },
            ],
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
            adjustments: [
              { id: '1', accountId: '123' },
            ],
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
});
