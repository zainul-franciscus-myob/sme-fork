import {
  getInvoiceDetailOptions,
  getInvoiceDetailTotals,
  getShouldReload,
} from '../invoiceDetailSelectors';

describe('invoiceDetailSelectors', () => {
  const state = {
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
          allocatedAccountId: '123',
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
    region: 'au',
    businessId: 'abc',
    invoiceId: '1',
    areLinesCalculating: false,
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
        note: 'Thank you!',
        contactOptions: [
          { name: 'Cow Feed 1', value: '1' },
          { name: 'Cow Feed 2', value: '2' },
          { name: 'Cow Feed 3', value: '3' },
        ],
        commentOptions: [],
        isCustomerDisabled: true,
        isTaxInclusiveDisabled: false,
        showOnlinePayment: true,
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
});
