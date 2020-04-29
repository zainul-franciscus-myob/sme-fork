import {
  LOAD_INVOICE_DETAIL,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
} from '../../../InvoiceIntents';
import {
  getCreateOrUpdateInvoicePayload,
  getLoadAddedAccountUrlParams,
  getLoadInvoiceIntent,
} from '../integratorSelectors';

describe('integratorSelectors', () => {
  describe('getLoadInvoiceIntent', () => {
    it('should load existing invoice detail', () => {
      const state = {
        invoiceId: '1',
      };

      const expected = LOAD_INVOICE_DETAIL;

      const actual = getLoadInvoiceIntent(state);

      expect(actual).toEqual(expected);
    });

    it('should load new invoice detail', () => {
      const state = {
        invoiceId: 'new',
      };

      const expected = LOAD_NEW_INVOICE_DETAIL;

      const actual = getLoadInvoiceIntent(state);

      expect(actual).toEqual(expected);
    });

    it('should load new invoice detail from existing invoice', () => {
      const state = {
        invoiceId: 'new',
        duplicateId: '1',
      };

      const expected = LOAD_NEW_DUPLICATE_INVOICE_DETAIL;

      const actual = getLoadInvoiceIntent(state);

      expect(actual).toEqual(expected);
    });

    it('should load new invoice detail from existing invoice', () => {
      const state = {
        invoiceId: 'new',
        quoteId: '1',
      };

      const expected = LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE;

      const actual = getLoadInvoiceIntent(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getCreateOrUpdateInvoicePayload', () => {
    it('should return invoice for service layout', () => {
      const state = {
        invoice: {
          id: '123',
          layout: 'service',
          contactId: '2',
          address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
          note: 'Thank you!',
          invoiceNumber: '00000123',
          purchaseOrderNumber: '123',
          issueDate: '2018-11-02',
          isAllowOnlinePayments: true,
          isTaxInclusive: true,
          expirationTerm: 'OnADayOfTheMonth',
          expirationDays: '4',
          chargeForLatePayment: 123.12,
          discountForEarlyPayment: 3546.34,
          numberOfDaysForDiscount: 10,
          amountPaid: '10.00',
          lines: [
            {
              id: '345',
              description: 'Yak shaving - 1/2 an hour',
              accountId: '123',
              amount: '48.50',
              taxCodeId: '124',
            },
          ],
        },
        contactOptions: [
          {
            name: 'Cow Feed',
            id: '2',
          },
        ],
        accountOptions: [
          {
            id: '123',
            displayName: 'My Sales Account 1',
            accountType: 'Sales',
            taxCodeId: '123',
            displayId: '4-123',
          },
          {
            id: '456',
            displayName: 'Sales Account 2',
            accountType: 'Assets',
            taxCodeId: '124',
            displayId: '4-456',
          },
          {
            id: '789',
            displayName: 'Expense Account',
            accountType: 'Assets',
            taxCodeId: '124',
            displayId: '6-789',
          },
        ],
        taxCodeOptions: [
          {
            id: '123',
            displayName: 'GST',
            description: 'Goods & Service Tax',
            displayRate: '10%',
          },
          {
            id: '124',
            displayName: 'FRE',
            description: 'GST FREE',
            displayRate: '5%',
          },
        ],
      };

      const expected = {
        id: '123',
        layout: 'service',
        contactId: '2',
        address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
        note: 'Thank you!',
        invoiceNumber: '00000123',
        purchaseOrderNumber: '123',
        issueDate: '2018-11-02',
        isAllowOnlinePayments: true,
        isTaxInclusive: true,
        expirationTerm: 'OnADayOfTheMonth',
        expirationDays: '4',
        chargeForLatePayment: 123.12,
        discountForEarlyPayment: 3546.34,
        numberOfDaysForDiscount: 10,
        amountPaid: '10.00',
        contactName: 'Cow Feed',
        lines: [
          {
            id: '345',
            description: 'Yak shaving - 1/2 an hour',
            accountId: '123',
            amount: '48.50',
            taxCodeId: '124',
          },
        ],
      };

      const actual = getCreateOrUpdateInvoicePayload(state);

      expect(actual).toEqual(expected);
    });

    it('should return invoice for item layout', () => {
      const invoice = {
        id: '123',
        layout: 'item',
        contactId: '1',
        address: 'Footloose Dance Studio\r\n45 Huntly Road\r\nNorth Ryde  NSW  2113\r\nAustralia\r\n',
        invoiceNumber: 'IN00000123',
        note: 'Thank you! Footloose',
        purchaseOrderNumber: 'PO123',
        issueDate: '2019-02-28T00:00:00',
        isAllowOnlinePayments: false,
        isTaxInclusive: true,
        expirationTerm: 'OnADayOfTheMonth',
        expirationDays: 10,
        chargeForLatePayment: 123.12,
        discountForEarlyPayment: 546.34,
        numberOfDaysForDiscount: 10,
        amountPaid: '10.00',
        lines: [
          {
            id: '1',
            units: '2',
            itemId: '3',
            description: 'Cooler Large',
            unitPrice: '520',
            discount: '10',
            taxCodeId: '2',
            amount: '850.9111',
            accountId: '92',
          },
        ],
      };
      const state = {
        invoice,
        contactOptions: [
          {
            name: 'Cameron, James',
            id: '1',
          },
          {
            name: 'Kev',
            id: '2',
          },
        ],
      };

      const expected = {
        ...invoice,
        contactName: 'Cameron, James',
      };

      const actual = getCreateOrUpdateInvoicePayload(state);

      expect(actual).toEqual(expected);
    });
  });
  describe('getLoadAddedAccountUrlParams', () => {
    const state = {
      businessId: 'batman',
    };

    it('gets businessId and retruns it with accountId', () => {
      const actual = getLoadAddedAccountUrlParams(state, 'accountId');

      expect(actual).toEqual({
        accountId: 'accountId', businessId: 'batman',
      });
    });
  });
});
