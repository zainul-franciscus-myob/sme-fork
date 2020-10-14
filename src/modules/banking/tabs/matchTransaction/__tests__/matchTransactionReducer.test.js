import {
  ADD_MATCH_TRANSACTION_ADJUSTMENT,
  REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
  SHOW_SELECTED_MATCH_TRANSACTIONS,
  TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
  UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
  UPDATE_MATCH_TRANSACTION_SELECTION,
  UPDATE_SELECTED_TRANSACTION_DETAILS,
} from '../MatchTransactionIntents';
import reducer from '../matchTransactionReducer';

describe('matchTransactionReducer', () => {
  describe('updateSelectedTransactionDetails', () => {
    it('should return correct state', () => {
      const state = {
        entries: [
          {
            journalId: 'idOfJournal',
            journalLineId: 'idOfJournalLine',
            matchAmount: 0,
          },
        ],
      };

      const action = {
        intent: UPDATE_SELECTED_TRANSACTION_DETAILS,
        index: 0,
        key: 'matchAmount',
        value: 10,
      };

      const expected = {
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
      };

      const actual = reducer(state, action);
      expect(actual.entries).toEqual(expected.entries);
      expect(actual.selectedEntries).toEqual(expected.selectedEntries);
    });
  });

  describe('toggleMatchTransactionSelectAllState', () => {
    it('should return correct state', () => {
      const state = {
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
      };

      const action = {
        intent: TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
        selected: true,
      };

      const expected = {
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
      };

      const actual = reducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('updateAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        accounts: [],
        adjustments: [{ id: '1', accountId: '123' }],
      };

      const action = {
        intent: UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
        index: 0,
        key: 'accountId',
        value: '321',
      };

      const expected = {
        isEdited: true,
        accounts: [],
        adjustments: [{ id: '1', accountId: '321' }],
      };

      const actual = reducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('addAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        accounts: [],
        adjustments: [],
      };

      const action = {
        intent: ADD_MATCH_TRANSACTION_ADJUSTMENT,
        id: '1',
        key: 'accountId',
        value: '123',
      };

      const expected = {
        accounts: [],
        adjustments: [{ id: '1', accountId: '123' }],
        isEdited: true,
      };

      const actual = reducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('removeAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        adjustments: [{ id: '1', accountId: '123' }],
      };

      const action = { intent: REMOVE_MATCH_TRANSACTION_ADJUSTMENT, index: 0 };

      const expected = {
        adjustments: [],
        isEdited: true,
      };

      const actual = reducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('showSelectedMatchTransactions', () => {
    it('should return all selected transactions', () => {
      const state = {
        entries: [
          { journalId: 1, journalLineId: 2, selected: true },
          { journalId: 2, journalLineId: 3, selected: false },
        ],
        selectedEntries: {
          '3-5': { journalId: 3, journalLineId: 5, selected: true },
        },
      };

      const expected = {
        entries: [
          { journalId: 3, journalLineId: 5, selected: true },
          { journalId: 1, journalLineId: 2, selected: true },
        ],
        selectedEntries: {
          '3-5': { journalId: 3, journalLineId: 5, selected: true },
        },
      };

      const action = {
        intent: SHOW_SELECTED_MATCH_TRANSACTIONS,
      };

      const actual = reducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('updateMatchTransactionSelection', () => {
    const getState = (entries) => ({
      totalAmount: 1000,
      entries,
      selectedEntries: [],
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

      const actual = reducer(state, {
        intent: UPDATE_MATCH_TRANSACTION_SELECTION,
        index: 0,
        selected: true,
      });

      expect(actual.entries[0].selected).toBeTruthy();
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

      const actual = reducer(state, {
        intent: UPDATE_MATCH_TRANSACTION_SELECTION,
        index: 0,
        selected: true,
      });

      expect(actual.entries[0].matchAmount).toEqual(1000);
    });

    it('should prefill matchAmount with 0', () => {
      const entries = [
        { totalAmount: '100', selected: false },
        { totalAmount: '1000', matchAmount: 1000, selected: true },
      ];
      const state = getState(entries);

      const actual = reducer(state, {
        intent: UPDATE_MATCH_TRANSACTION_SELECTION,
        index: 0,
        selected: true,
      });

      expect(actual.entries[0].matchAmount).toEqual(0);
    });

    it('should prefill matchAmount with full transaction due amount', () => {
      const entries = [
        { selected: true, matchAmount: 500 },
        { totalAmount: '100', discountAmount: '10', selected: false },
      ];
      const state = getState(entries);

      const actual = reducer(state, {
        intent: UPDATE_MATCH_TRANSACTION_SELECTION,
        index: 1,
        selected: true,
      });

      expect(actual.entries[1].matchAmount).toEqual(90);
    });

    it('should prefill matchAmount with the rest of the available amount', () => {
      const entries = [
        { selected: true, matchAmount: 500 },
        { totalAmount: '1000', selected: false },
      ];
      const state = getState(entries);

      const actual = reducer(state, {
        intent: UPDATE_MATCH_TRANSACTION_SELECTION,
        index: 1,
        selected: true,
      });

      expect(actual.entries[1].matchAmount).toEqual(500);
    });

    it('should unselect match transaction and clear matchAmount', () => {
      const entries = [{ matchAmount: 100, selected: false }];
      const state = getState(entries);

      const actual = reducer(state, {
        intent: UPDATE_MATCH_TRANSACTION_SELECTION,
        index: 0,
        selected: false,
      });

      expect(actual.entries[0].selected).toBeFalsy();
      expect(actual.entries[0].matchAmount).toEqual('');
    });
  });
});
