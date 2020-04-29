import {
  getCreateNewInvoiceUrl,
  getInvoiceListUrl,
} from '../redirectSelectors';

describe('redirectSelectors', () => {
  const state = {
    businessId: 'abc',
    region: 'au',
    invoiceId: '1',
    invoice: {
      layout: 'service',
    },
  };

  describe('getInvoiceListUrl', () => {
    it('returns the correct Url for invoice list page', () => {
      const expected = '/#/au/abc/invoice';
      const actual = getInvoiceListUrl(state);

      expect(expected).toEqual(actual);
    });
  });

  describe('getCreateNewInvoiceUrl', () => {
    it('returns the correct Url to create a new invoice from another invoice CRUD page', () => {
      const expected = '/#/au/abc/invoice/new?layout=service';
      const actual = getCreateNewInvoiceUrl(state);

      expect(expected).toEqual(actual);
    });
  });
});
