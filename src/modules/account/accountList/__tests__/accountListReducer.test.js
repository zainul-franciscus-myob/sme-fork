import {
  CLOSE_MODAL,
  DISMISS_ALERT,
  OPEN_MODAL,
  RESELECT_ACCOUNTS,
  SELECT_ACCOUNT,
  SELECT_ALL_ACCOUNTS,
  SET_ALERT,
} from '../../AccountIntents';
import accountListReducer from '../accountListReducer';

describe('accountListReducer', () => {
  const reducer = accountListReducer;

  describe('BULK_DELETE_ACCOUNTS', () => {
    it('opens deletes selected accounts modal', () => {
      const state = {
        showDeleteModal: false,
      };
      const action = {
        intent: OPEN_MODAL,
      };

      const actual = reducer(state, action);

      expect(actual.showDeleteModal).toEqual(true);
    });

    it('closes deletes selected accounts modal', () => {
      const state = {
        showDeleteModal: true,
      };
      const action = {
        intent: CLOSE_MODAL,
      };

      const actual = reducer(state, action);

      expect(actual.showDeleteModal).toEqual(false);
    });

    it('selects single account', () => {
      const state = {
        entries: [
          { id: 1, selected: false },
          { id: 2, selected: false },
        ],
      };
      const action = {
        intent: SELECT_ACCOUNT,
        index: 1,
        value: true,
      };
      const actual = reducer(state, action);
      const expected = [
        { id: 1, selected: false },
        { id: 2, selected: true },
      ];

      expect(actual.entries).toEqual(expected);
    });

    it('selects all accounts', () => {
      const state = {
        entries: [
          { id: 1, selected: false },
          { id: 2, selected: false },
        ],
      };
      const action = { intent: SELECT_ALL_ACCOUNTS, selected: true };
      const actual = reducer(state, action);
      const expected = [
        { id: 1, selected: true },
        { id: 2, selected: true },
      ];

      expect(actual.entries).toEqual(expected);
    });

    it('reselects accounts not deleted successfully', () => {
      const state = {
        entries: [
          { id: 1, selected: false },
          { id: 2, selected: false },
        ],
      };
      const action = {
        intent: RESELECT_ACCOUNTS,
        entries: [
          { id: 1, selected: true },
          { id: 2, selected: false },
        ],
      };

      const actual = reducer(state, action);

      expect(actual.entries).toEqual(action.entries);
    });

    it('add alerts', () => {
      const state = {
        alert: [],
      };
      const action = {
        intent: SET_ALERT,
        alert: {
          message: 'error',
          type: 'danger',
        },
      };
      const actual = reducer(state, action);

      expect(actual.alert).toEqual([action.alert]);
    });

    it('dismiss alerts', () => {
      const state = {
        alert: [
          {
            message: 'error1',
            type: 'danger',
          },
          {
            message: 'error2',
            type: 'danger',
          },
        ],
      };
      const action = { intent: DISMISS_ALERT, id: 0 };
      const actual = reducer(state, action);
      const expected = [
        {
          message: 'error2',
          type: 'danger',
        },
      ];

      expect(actual.alert).toEqual(expected);
    });
  });
});
