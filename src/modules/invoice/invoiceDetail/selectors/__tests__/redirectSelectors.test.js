import {
  getCreateDuplicateInvoiceUrl,
  getCreateNewInvoiceUrl,
  getInvoiceListUrl,
  getInvoiceReadWithEmailModalUrl,
  getRedirectRefUrl,
} from '../redirectSelectors';

describe('redirectSelectors', () => {
  const state = {
    businessId: 'abc',
    region: 'au',
    invoiceId: '1',
    invoice: {
      layout: 'service',
    },
    redirectRefJournalId: 1,
    redirectRefJournalType: 'ReceivePayment',
  };

  describe('getInvoiceListUrl', () => {
    it('returns the correct Url for invoice list page', () => {
      const expected = '/#/au/abc/invoice';
      const actual = getInvoiceListUrl(state);

      expect(expected).toEqual(actual);
    });
  });

  describe('getInvoiceReadWithEmailModalUrl', () => {
    it('returns the correct Url for invoice read/update screen', () => {
      const expected = '/#/au/abc/invoice/1?openSendEmail=true';
      const actual = getInvoiceReadWithEmailModalUrl(state);

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

  describe('getCreateDuplicateInvoiceUrl', () => {
    it('returns the correct Url to create a duplicate invoice from another invoice CRUD page', () => {
      const expected = '/#/au/abc/invoice/new?duplicatedInvoiceId=1';
      const actual = getCreateDuplicateInvoiceUrl(state);

      expect(expected).toEqual(actual);
    });
  });

  describe('getRedirectRefUrl', () => {
    it('returns the correct Url with ref journal id', () => {
      const expected = '/#/au/abc/invoicePayment/1';
      const actual = getRedirectRefUrl(state);

      expect(expected).toEqual(actual);
    });
  });
});
