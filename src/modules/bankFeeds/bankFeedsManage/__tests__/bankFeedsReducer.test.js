import {
  CLEAR_BANK_FEEDS_LOGIN,
  DELETE_BANK_FEED,
  UPDATE_BANK_FEEDS_LOGIN,
} from '../BankFeedsIntents';
import BankFeedTypes from '../BankFeedTypes';
import bankFeedsReducer from '../bankFeedsReducer';

describe('bankFeedsReducer', () => {
  const reducer = bankFeedsReducer;
  describe('deleteBankFeed', () => {
    it('removes the right bank feed from the bankFeeds in the state', () => {
      const state = {
        bankFeeds: {
          bankAccounts: [
            {
              id: '1',
              linkedAccountId: '2',
            },
            {
              id: '2',
              linkedAccountId: '',
            },
          ],
          creditCards: [
            {
              id: '3',
              linkedAccountId: '',
            },
          ],
        },
        accountToBeDeleted: {
          accountType: BankFeedTypes.BANK_ACCOUNT,
          id: '1',
        },
      };

      const action = {
        intent: DELETE_BANK_FEED,
      };

      const actual = reducer(state, action);
      const expectedBankAccountsInState = [{
        id: '2',
        linkedAccountId: '',
      }];

      expect(actual.bankFeeds.bankAccounts).toEqual(expectedBankAccountsInState);
    });
  });

  it('should update login state with provided key and value', () => {
    const state = {
      hi: 'hi',
      loginDetails: {
        username: '',
        password: '',
      },
    };
    const action = {
      intent: UPDATE_BANK_FEEDS_LOGIN,
      key: 'username',
      value: 'phoenix',
    };

    const expected = {
      hi: 'hi',
      loginDetails: {
        username: 'phoenix',
        password: '',
      },
    };

    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });

  it('should clear the login state from the store', () => {
    const state = {
      hello: 'hello',
      loginDetails: {
        username: 'phoenix',
        password: 'super secret password',
      },
    };
    const expected = {
      hello: 'hello',
      loginDetails: {
        username: '',
        password: '',
      },
    };
    const action = {
      intent: CLEAR_BANK_FEEDS_LOGIN,
    };
    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });
});
