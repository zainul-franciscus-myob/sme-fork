import { SELECT_ALL, SELECT_ROW, SET_SORT_ORDER } from '../BankReconciliationIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import bankReconciliationDetailReducer from '../bankReconciliationReducer';

describe('bankReconciliationReducer', () => {
  describe('setInitialState', () => {
    it('should map bankAccount to selectedAccountId if it exists', () => {
      const state = {};

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          bankAccount: '123',
        },
      };

      const { selectedAccountId } = bankReconciliationDetailReducer(state, action);

      expect(selectedAccountId).toEqual('123');
    });

    it('should leave selectedAccountId empty if bankAccount doesnt exist', () => {
      const state = {};

      const action = {
        intent: SET_INITIAL_STATE,
        context: {},
      };

      const { selectedAccountId } = bankReconciliationDetailReducer(state, action);

      expect(selectedAccountId).toEqual('');
    });
  });

  describe('selectRow', () => {
    it('should select a Withdrawal row', () => {
      const state = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
            withdrawal: 100,
          },
          {
            journalLineId: '2',
          },
        ],
      };

      const expected = {
        calculatedClosingBalance: 100,
        entries: [
          {
            journalLineId: '1',
            withdrawal: 100,
            isChecked: true,
          },
          {
            journalLineId: '2',
          },
        ],
      };

      const action = { intent: SELECT_ROW, index: 0, value: true };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should select a Deposit row', () => {
      const state = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
            deposit: 100,
          },
          {
            journalLineId: '2',
          },
        ],
      };

      const expected = {
        calculatedClosingBalance: 300,
        entries: [
          {
            journalLineId: '1',
            deposit: 100,
            isChecked: true,
          },
          {
            journalLineId: '2',
          },
        ],
      };

      const action = { intent: SELECT_ROW, index: 0, value: true };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should handle Withdrawal row with 0 amount', () => {
      const state = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
            withdrawal: 0,
          },
          {
            journalLineId: '2',
          },
        ],
      };

      const expected = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
            withdrawal: 0,
            isChecked: true,
          },
          {
            journalLineId: '2',
          },
        ],
      };

      const action = { intent: SELECT_ROW, index: 0, value: true };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should handle Deposit row with 0 amount', () => {
      const state = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
            deposit: 0,
          },
          {
            journalLineId: '2',
          },
        ],
      };

      const expected = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
            deposit: 0,
            isChecked: true,
          },
          {
            journalLineId: '2',
          },
        ],
      };

      const action = { intent: SELECT_ROW, index: 0, value: true };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should unselect a Withdrawal row', () => {
      const state = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
          },
          {
            journalLineId: '2',
            withdrawal: 100,
            isChecked: true,
          },
        ],
      };

      const expected = {
        calculatedClosingBalance: 300,
        entries: [
          {
            journalLineId: '1',
          },
          {
            journalLineId: '2',
            withdrawal: 100,
            isChecked: false,
          },
        ],
      };

      const action = { intent: SELECT_ROW, index: 1, value: false };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should unselect a Deposit row', () => {
      const state = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
          },
          {
            journalLineId: '2',
            deposit: 100,
            isChecked: true,
          },
        ],
      };

      const expected = {
        calculatedClosingBalance: 100,
        entries: [
          {
            journalLineId: '1',
          },
          {
            journalLineId: '2',
            deposit: 100,
            isChecked: false,
          },
        ],
      };

      const action = { intent: SELECT_ROW, index: 1, value: false };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('selectAll', () => {
    it('should select all when not all selected', () => {
      const state = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
            isChecked: true,
          },
          {
            journalLineId: '2',
            withdrawal: 200,
          },
          {
            journalLineId: '3',
            deposit: 100,
          },
        ],
      };

      const expected = {
        calculatedClosingBalance: 100,
        entries: [
          {
            journalLineId: '1',
            isChecked: true,
          },
          {
            journalLineId: '2',
            isChecked: true,
            withdrawal: 200,
          },
          {
            journalLineId: '3',
            isChecked: true,
            deposit: 100,
          },
        ],
      };

      const action = { intent: SELECT_ALL };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should unselect all transactions', () => {
      const state = {
        calculatedClosingBalance: 200,
        entries: [
          {
            journalLineId: '1',
            withdrawal: 200,
            isChecked: true,
          },
          {
            journalLineId: '2',
            deposit: 100,
            isChecked: true,
          },
        ],
      };

      const expected = {
        calculatedClosingBalance: 300,
        entries: [
          {
            journalLineId: '1',
            withdrawal: 200,
            isChecked: false,
          },
          {
            journalLineId: '2',
            deposit: 100,
            isChecked: false,
          },
        ],
      };

      const action = { intent: SELECT_ALL };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('setSortOrder', () => {
    it('order by new column', () => {
      const state = {
        orderBy: 'DateOccurred',
        sortOrder: 'desc',
      };

      const expected = {
        orderBy: 'Description',
        sortOrder: 'asc',
      };

      const action = { intent: SET_SORT_ORDER, orderBy: 'Description' };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('flip the sort order when sort on the same column', () => {
      const state = {
        orderBy: 'DateOccurred',
        sortOrder: 'desc',
      };

      const expected = {
        orderBy: 'DateOccurred',
        sortOrder: 'asc',
      };

      const action = { intent: SET_SORT_ORDER, orderBy: 'DateOccurred' };
      const actual = bankReconciliationDetailReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
