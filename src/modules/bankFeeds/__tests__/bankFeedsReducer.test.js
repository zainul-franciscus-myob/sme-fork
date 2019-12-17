import { DELETE_BANK_FEED } from '../BankFeedsIntents';
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
});
