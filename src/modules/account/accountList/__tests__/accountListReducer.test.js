import {
  DISMISS_ALERT,
  RESELECT_ACCOUNTS,
  SELECT_ACCOUNT,
  SELECT_ALL_ACCOUNTS,
  SET_ACCOUNT_DETAILS,
  SET_ALERT,
  SET_EDIT_MODE,
} from '../../AccountIntents';
import accountListReducer from '../accountListReducer';

describe('accountListReducer', () => {
  const reducer = accountListReducer;

  describe('BULK_DELETE_ACCOUNTS', () => {
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

describe('BULK_UPDATE_ACCOUNTS', () => {
  const reducer = accountListReducer;

  it('enters edit mode', () => {
    const state = {
      editMode: false,
    };
    const action = {
      intent: SET_EDIT_MODE,
      editingMode: true,
    };

    const actual = reducer(state, action);

    expect(actual.editingMode).toEqual(true);
  });

  it('exits edit mode', () => {
    const state = {
      editMode: true,
    };
    const action = {
      intent: SET_EDIT_MODE,
      editingMode: false,
    };

    const actual = reducer(state, action);

    expect(actual.editingMode).toEqual(false);
  });

  it('updates opening balance and marks entry as dirty', () => {
    const state = {
      editMode: true,
      entries: [
        { id: 1, dirty: false },
        { id: 2, dirty: false },
      ],
    };
    const action = {
      intent: SET_ACCOUNT_DETAILS,
      index: 0,
      key: 'openingBalance',
      value: 1111,
    };

    const actual = reducer(state, action);
    const expected = [
      { id: 1, openingBalance: 1111, dirty: true },
      { id: 2, dirty: false },
    ];

    expect(actual.entries).toEqual(expected);
  });
});
