import { getDeleteBankFeedUrlParams, getSaveBankFeedsPayload } from '../BankFeedsSelectors';

describe('BankFeedsSelectors', () => {
  describe('getDeleteBankFeedUrlParams', () => {
    it('returns the url params to delete a bank feed', () => {
      const state = {
        businessId: 'abc',
        accountToBeDeleted: {
          accountType: 'someType',
          id: '1',
        },
      };

      const actual = getDeleteBankFeedUrlParams(state);
      const expected = {
        businessId: 'abc',
        id: '1',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getSaveBankFeedsPayload', () => {
    it('returns an array of only bank feeds with linked accounts', () => {
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
            {
              id: '4',
              linkedAccountId: '5',
            },
          ],
        },
      };
      const actual = getSaveBankFeedsPayload(state);
      const expected = [
        {
          id: '1',
          linkedAccountId: '2',
        },
        {
          id: '4',
          linkedAccountId: '5',
        },
      ];

      expect(actual).toEqual(expected);
    });
  });
});
