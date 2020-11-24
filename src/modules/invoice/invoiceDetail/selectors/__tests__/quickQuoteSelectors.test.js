import { getShouldLoadCustomerQuote } from '../quickQuoteSelectors';

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

  describe('getShouldLoadCustomerQuotes', () => {
    it('loads customer quotes', () => {
      const state = {
        invoiceId: 'new',
        quoteId: undefined,
        invoice: { customerId: '1' },
      };
      const actual = getShouldLoadCustomerQuote(state);

      expect(actual).toBeTruthy();
    });

    it('does not load customer when invoice is convert from quote', () => {
      const state = {
        invoiceId: 'new',
        quoteId: '2',
        invoice: { customerId: '1' },
      };
      const actual = getShouldLoadCustomerQuote(state);

      expect(actual).toBeFalsy();
    });

    it('does not load customer on existing invoice', () => {
      const state = {
        invoiceId: '1',
        quoteId: undefined,
        invoice: { customerId: '1' },
      };
      const actual = getShouldLoadCustomerQuote(state);

      expect(actual).toBeFalsy();
    });

    it('does not load customer when customer is empty', () => {
      const state = {
        invoiceId: '1',
        quoteId: undefined,
        invoice: { customerId: '' },
      };
      const actual = getShouldLoadCustomerQuote(state);

      expect(actual).toBeFalsy();
    });
  });
});
