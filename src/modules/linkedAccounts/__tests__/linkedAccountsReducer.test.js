import {
  UPDATE_ACCOUNT,
  UPDATE_HAS_ACCOUNT_OPTION,
} from '../LinkedAccountsIntents';
import linkedAccountsReducer from '../linkedAccountsReducer';

describe('linkedAccountsReducer', () => {
  describe('updateAccount', () => {
    it('updates the accountId of the account and preserves other properties', () => {
      const state = {
        linkedAccounts: {
          accountKey: {
            accounts: [],
            hasAccount: true,
            accountId: '1',
          },
        },
      };

      const action = {
        intent: UPDATE_ACCOUNT,
        key: 'accountKey',
        value: '2',
      };

      const expected = {
        accounts: [],
        hasAccount: true,
        accountId: '2',
      };

      const actual = linkedAccountsReducer(state, action);

      expect(actual.linkedAccounts.accountKey).toEqual(expected);
    });
  });

  describe('updateHasAccountOption', () => {
    it('updates the hasAccount key and preserves other properties of the account', () => {
      const state = {
        linkedAccounts: {
          accountKey: {
            accounts: [],
            accountId: '1',
            hasAccount: true,
          },
        },
      };

      const action = {
        intent: UPDATE_HAS_ACCOUNT_OPTION,
        key: 'accountKey',
        value: false,
      };

      const expected = {
        accounts: [],
        accountId: '1',
        hasAccount: false,
      };

      const actual = linkedAccountsReducer(state, action);

      expect(actual.linkedAccounts.accountKey).toEqual(expected);
    });
  });
});
