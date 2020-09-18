import {
  getCreateInvoiceFromQuoteUrl,
  getCreateNewQuoteUrl,
  getInvoiceUrl,
} from '../RedirectSelectors';

describe('RedirectSelectors', () => {
  const state = {
    businessId: 'businessId',
    region: 'au',
    quoteId: '1',
    quote: {
      layout: 'service',
    },
  };
  describe('getCreateInvoiceFromQuoteUrl', () => {
    it('returns the correct URL to create an invoice from quote', () => {
      const expected = '/#/au/businessId/invoice/new?quoteId=1';
      const actual = getCreateInvoiceFromQuoteUrl(state);

      expect(expected).toEqual(actual);
    });
  });

  describe('getCreateNewQuoteUrl', () => {
    it('returns the correct URL to create a new quote from another quote CRUD page', () => {
      const expected = '/#/au/businessId/quote/new?layout=service';
      const actual = getCreateNewQuoteUrl(state);

      expect(expected).toEqual(actual);
    });
  });

  describe('getInvoiceUrl', () => {
    it('returns the correct URL to redirect to invoice from quote activity history', () => {
      const expected = '/#/au/businessId/invoice/34';
      const actual = getInvoiceUrl(state, 34);

      expect(expected).toEqual(actual);
    });
  });
});
