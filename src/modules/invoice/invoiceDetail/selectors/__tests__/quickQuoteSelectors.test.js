const { getCustomerQuotes } = require('../quickQuoteSelectors');

describe('quickQuoteSelector', () => {
  describe('getCustomerQuotes', () => {
    it('build quote url', () => {
      const state = {
        businessId: 'businessId',
        region: 'au',
        customerQuotes: [
          {
            id: '1',
            amount: '123',
            displayId: '1234567890121',
            dateOccurred: '25/09/2020',
          },
          {
            id: '2',
            amount: '321',
            displayId: '1234567890122',
            dateOccurred: '26/09/2020',
          },
        ],
      };
      const actual = getCustomerQuotes(state);
      expect(actual).toEqual([
        {
          id: '1',
          amount: '123',
          displayId: '1234567890121',
          dateOccurred: '25/09/2020',
          url: '/#/au/businessId/quote/1',
        },
        {
          id: '2',
          amount: '321',
          displayId: '1234567890122',
          dateOccurred: '26/09/2020',
          url: '/#/au/businessId/quote/2',
        },
      ]);
    });
  });
});
