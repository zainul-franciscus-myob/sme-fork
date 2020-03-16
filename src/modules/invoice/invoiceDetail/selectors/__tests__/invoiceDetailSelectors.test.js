import {
  getAccountModalContext,
  getInvoiceDetailOptions,
  getInvoiceDetailTotals,
  getInvoiceLine,
  getLoadInvoiceDetailEmailInvoice,
  getShouldReload,
  getTemplateOptions,
  getUpdatedContactOptions,
} from '../invoiceDetailSelectors';
import InvoiceLayout from '../../InvoiceLayout';

describe('invoiceDetailSelectors', () => {
  const state = {
    isSubmitting: false,
    invoice: {
      id: '1',
      contactId: '3',
      expirationTerm: 'Prepaid',
      expirationDays: 0,
      chargeForLatePayment: 123.12,
      discountForEarlyPayment: 3546.34,
      numberOfDaysForDiscount: 10,
      isAllowOnlinePayments: true,
      amountPaid: '10.00',
      isTaxInclusive: true,
      invoiceNumber: '0000012334563456',
      address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
      issueDate: '2018-11-02',
      purchaseOrderNumber: '123',
      note: 'Thank you!',
      lines: [
        {
          id: '345',
          description: 'Yak shaving - 1/2 an hour',
          accountId: '123',
          amount: '48.50',
          taxCodeId: '124',
          accounts: [
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
          taxCodes: [
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
        },
      ],
    },
    comments: [],
    contactOptions: [
      {
        name: 'Cow Feed 1',
        value: '1',
      },
      {
        name: 'Cow Feed 2',
        value: '2',
      },
      {
        name: 'Cow Feed 3',
        value: '3',
      },
    ],
    expirationTermOptions: [
      {
        value: 'OnADayOfTheMonth',
        name: 'On a day of the month',
      },
      {
        value: 'InAGivenNumberOfDays',
        name: 'In a given no. of days',
      },
      {
        value: 'DayOfMonthAfterEOM',
        name: 'Day of month after EOM',
      },
      {
        value: 'NumberOfDaysAfterEOM',
        name: 'No. of days after EOM',
      },
      {
        value: 'Prepaid',
        name: 'Prepaid',
      },
      {
        value: 'CashOnDelivery',
        name: 'C.O.D.',
      },
    ],
    serviceTemplate: {
      defaultTemplate: 'a',
      templateOptions: [{ name: 'a', label: 'a' }],
    },
    itemTemplate: {
      defaultTemplate: 'b',
      templateOptions: [{ name: 'b', label: 'b' }],
    },
    region: 'au',
    businessId: 'abc',
    invoiceId: '1',
  };

  describe('getInvoiceDetailOptions', () => {
    it('returns correct shape for InvoiceServiceOptions component', () => {
      const expected = {
        invoiceNumber: '0000012334563456',
        purchaseOrderNumber: '123',
        contactId: '3',
        isTaxInclusive: true,
        address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
        issueDate: '2018-11-02',
        expirationTerm: 'Prepaid',
        expirationDays: 0,
        expirationTermOptions: [
          {
            value: 'OnADayOfTheMonth',
            name: 'On a day of the month',
          },
          {
            value: 'InAGivenNumberOfDays',
            name: 'In a given no. of days',
          },
          {
            value: 'DayOfMonthAfterEOM',
            name: 'Day of month after EOM',
          },
          {
            value: 'NumberOfDaysAfterEOM',
            name: 'No. of days after EOM',
          },
          {
            value: 'Prepaid',
            name: 'Prepaid',
          },
          {
            value: 'CashOnDelivery',
            name: 'C.O.D.',
          },
        ],
        contactOptions: [
          { name: 'Cow Feed 1', value: '1' },
          { name: 'Cow Feed 2', value: '2' },
          { name: 'Cow Feed 3', value: '3' },
        ],
        isCustomerDisabled: true,
        isSubmitting: false,
        showOnlinePayment: true,
        taxExclusiveLabel: 'Tax exclusive',
        taxInclusiveLabel: 'Tax inclusive',
      };
      const actual = getInvoiceDetailOptions(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getInvoiceDetailTotals', () => {
    it('should calculate amount due correctly', () => {
      const totals = {
        subTotal: '123.55',
        totalTax: '-4.45',
        totalAmount: '128.00',
      };
      const amountPaid = '10.00';
      const isCreating = false;

      const expected = {
        subTotal: '$123.55',
        totalTax: '-$4.45',
        totalAmount: '$128.00',
        amountPaid: '$10.00',
        amountDue: '$118.00',
        isCreating,
      };

      const actual = getInvoiceDetailTotals.resultFunc(totals, amountPaid, isCreating);

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldReload', () => {
    it.each([
      ['1', '1', false],
      ['new', '1', false],
      ['new', '', true],
    ])('should validate whether the page should reload', (invoiceId, duplicatedInvoiceId, expected) => {
      const actual = getShouldReload({ invoiceId, duplicatedInvoiceId });

      expect(actual).toEqual(expected);
    });
  });

  describe('getLoadInvoiceDetailEmailInvoice', () => {
    it('uses default subject if include invoice number in email is false', () => {
      const emailInvoice = {
        hasEmailReplyDetails: true,
        isEmailMeACopy: false,
        businessName: 'Hot Choccers',
        ccToEmail: ['t-pain@myob.com', 'hamzzz@myob.com'],
        fromEmail: 'tom.xu@myob.com',
        fromName: 'Tom Xu',
        messageBody: "Let's make some hot chocolate!!",
        subject: 'Hot Chocolate is life',
        toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        toName: 'Geoff Speirs',
        includeInvoiceNumberInEmail: false,
        attachments: [],
      };

      const actual = getLoadInvoiceDetailEmailInvoice(emailInvoice, '123');

      expect(actual.subject).toEqual('Hot Chocolate is life');
    });

    it('builds subject with invoice number if include invoice number in email is true', () => {
      const emailInvoice = {
        hasEmailReplyDetails: true,
        isEmailMeACopy: false,
        businessName: 'Hot Choccers',
        ccToEmail: ['t-pain@myob.com', 'hamzzz@myob.com'],
        fromEmail: 'tom.xu@myob.com',
        fromName: 'Tom Xu',
        messageBody: "Let's make some hot chocolate!!",
        subject: 'Hot Chocolate is life',
        toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
        toName: 'Geoff Speirs',
        includeInvoiceNumberInEmail: true,
        attachments: [],
      };

      const actual = getLoadInvoiceDetailEmailInvoice(emailInvoice, '123');

      expect(actual.subject).toEqual('Invoice 123; Hot Chocolate is life');
    });
  });
  describe('getAccountModalContext', () => {
    it('returns region and businesID from state', () => {
      const actual = getAccountModalContext(state);

      expect(actual).toEqual({ region: 'au', businessId: 'abc' });
    });
  });

  describe('getUpdatedContactOptions', () => {
    it('should contain newly added contact option', () => {
      const option1 = { value: '1', name: 'Option 1' };
      const option2 = { value: '2', name: 'Option 2' };
      const expected = [option2, option1];

      const actual = getUpdatedContactOptions({ contactOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });

    it('should contain updated contact option', () => {
      const option1 = { value: '1', name: 'Option 1' };
      const option2 = { value: '1', name: 'Updated option 1' };
      const expected = [option2];

      const actual = getUpdatedContactOptions({ contactOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTemplateOptions', () => {
    it('uses service template options when layout is service', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          layout: InvoiceLayout.SERVICE,
        },
      };

      const actual = getTemplateOptions(modifiedState);

      expect(actual).toEqual([
        { name: 'a', label: 'a' },
      ]);
    });

    it('uses item template options when layout is itemAndService', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          layout: InvoiceLayout.ITEM_AND_SERVICE,
        },
      };

      const actual = getTemplateOptions(modifiedState);

      expect(actual).toEqual([
        { name: 'b', label: 'b' },
      ]);
    });

    it('uses service template options by default', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          layout: undefined,
        },
      };

      const actual = getTemplateOptions(modifiedState);

      expect(actual).toEqual([
        { name: 'a', label: 'a' },
      ]);
    });
  });

  describe('getInvoiceLine', () => {
    describe('returns new line when not found at index', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: [],
        },
        newLine: {
          pingu: '🐧',
        },
      };

      const actual = getInvoiceLine(modifiedState, {
        index: 0,
      });

      expect(actual).toEqual({
        pingu: '🐧',
      });
    });

    describe('returns line at index', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: [
            {
              freddo: '🐸',
            },
          ],
        },
      };

      const actual = getInvoiceLine(modifiedState, {
        index: 0,
      });

      expect(actual).toEqual({
        freddo: '🐸',
      });
    });
  });
});
