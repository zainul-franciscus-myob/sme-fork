import { getMostRecentStatus } from '../invoiceHistorySelectors';

describe('invoiceHistorySelectors', () => {
  describe('getMostRecentStatus', () => {
    it('returns status of top element in invoiceHistory array', () => {
      const state = {
        invoiceHistory: [
          {
            status: 'VIEWED_ONLINE',
          },
          {
            status: 'DOWNLOADED',
          },
        ],
      };

      const expected = 'VIEWED_ONLINE';

      const actual = getMostRecentStatus(state);

      expect(actual).toEqual(expected);
    });
  });
});
