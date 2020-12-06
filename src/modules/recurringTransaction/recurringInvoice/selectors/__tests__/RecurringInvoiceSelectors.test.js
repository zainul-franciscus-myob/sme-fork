import {
  getAccountModalContext,
  getInvoiceLine,
  getIsLinesSupported,
  getIsReadOnly,
  getLayoutDisplayName,
  getReadOnlyMessage,
  getRecurringInvoiceOptions,
  getRecurringTransactionListUrl,
  getTotals,
} from '../RecurringInvoiceSelectors';
import SalesLayout from '../../../types/SalesLayout';
import SalesLineType from '../../../types/SalesLineType';

describe('recurringInvoiceSelectors', () => {
  const state = {
    isSubmitting: false,
    invoice: {
      id: '1',
      customerId: '3',
      chargeForLatePayment: 123.12,
      discountForEarlyPayment: 3546.34,
      numberOfDaysForDiscount: 10,
      isAllowOnlinePayments: true,
      isTaxInclusive: true,
      address:
        'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
      note: 'Thank you!',
      taxExclusiveFreightAmount: '9.09',
      freightTaxAmount: '0.91',
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
    commentOptions: [],
    region: 'au',
    businessId: 'abc',
    recurringTransactionId: '1',
  };

  describe('getRecurringInvoiceOptions', () => {
    it('returns correct shape for InvoiceServiceOptions component', () => {
      const expected = {
        customerId: '3',
        isTaxInclusive: true,
        address:
          'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
        isSubmitting: false,
        taxExclusiveLabel: 'Tax exclusive',
        taxInclusiveLabel: 'Tax inclusive',
        isReadOnly: true,
        shouldShowAbn: '3',
        shouldShowOnlinePayment: true,
      };
      const actual = getRecurringInvoiceOptions(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTotals', () => {
    it('calculate totals when no lines', () => {
      const actual = getTotals({
        ...state,
        invoice: {
          ...state.invoice,
          lines: [],
        },
      });

      expect(actual).toEqual({
        subTotal: '0',
        totalTax: '0.91',
        totalAmount: '10',
      });
    });

    it('calculate totals with lines amount', () => {
      const actual = getTotals({
        ...state,
        invoice: {
          ...state.invoice,
          lines: [
            {
              type: SalesLineType.SERVICE,
              taxExclusiveAmount: '9.99',
              taxAmount: '0.01',
            },
            {
              type: SalesLineType.SUB_TOTAL,
              taxExclusiveAmount: '99',
              taxAmount: '1',
            },
          ],
        },
      });

      expect(actual).toEqual({
        subTotal: '10',
        totalTax: '0.92',
        totalAmount: '20',
      });
    });
  });

  describe('getAccountModalContext', () => {
    it('returns region and businesID from state', () => {
      const actual = getAccountModalContext(state);

      expect(actual).toEqual({ region: 'au', businessId: 'abc' });
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

    describe('returns subtitle line', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: [
            {
              type: SalesLineType.SUB_TOTAL,
              description: 'Description',
              amount: '10',
            },
          ],
        },
      };

      const actual = getInvoiceLine(modifiedState, { index: 0 });

      expect(actual).toEqual({
        type: SalesLineType.SUB_TOTAL,
        description: 'Subtotal',
        amount: '10',
      });
    });
  });

  describe('getIsLinesSupported', () => {
    it.each([
      [SalesLineType.SERVICE, true],
      [SalesLineType.ITEM, true],
      [SalesLineType.HEADER, false],
      [SalesLineType.SUB_TOTAL, false],
    ])(
      'validate whether invoice with %s line type are supported',
      (type, expected) => {
        const lines = [
          { type: SalesLineType.SERVICE },
          { type: SalesLineType.ITEM },
          { type },
        ];

        const actual = getIsLinesSupported.resultFunc(lines);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getIsReadOnly', () => {
    it.each([
      [SalesLayout.SERVICE, false],
      [SalesLayout.ITEM_AND_SERVICE, false],
      [SalesLayout.PROFESSIONAL, true],
      [SalesLayout.TIME_BILLING, true],
      [SalesLayout.MISCELLANEOUS, true],
      ['N/A', true],
    ])('%s layout', (layout, expected) => {
      const actual = getIsReadOnly({
        invoice: { layout, lines: [] },
      });

      expect(actual).toEqual(expected);
    });

    it.each([
      [SalesLineType.SERVICE, false],
      [SalesLineType.ITEM, false],
      [SalesLineType.HEADER, true],
      [SalesLineType.SUB_TOTAL, true],
      ['N/A', true],
    ])('have %s line type', (type, expected) => {
      const actual = getIsReadOnly({
        invoice: {
          layout: SalesLayout.ITEM_AND_SERVICE,
          lines: [
            { type: SalesLineType.SERVICE },
            { type: SalesLineType.ITEM },
            { type },
          ],
        },
      });

      expect(actual).toEqual(expected);
    });

    it('should be readonly when invoice has freight amount', () => {
      const actual = getIsReadOnly({
        invoice: {
          layout: SalesLayout.ITEM_AND_SERVICE,
          lines: [],
          taxExclusiveFreightAmount: '10',
        },
      });

      expect(actual).toBe(true);
    });
  });

  describe('getReadOnlyMessage', () => {
    it.each([
      [
        false,
        'Blah',
        false,
        "This invoice is read only because the Blah layout isn't supported in the browser. Switch to AccountRight desktop to edit this invoice.",
      ],
      [
        true,
        '',
        false,
        'This invoice is read only because it contains unsupported features. Switch to AccountRight desktop to edit this invoice.',
      ],
      [
        true,
        '',
        true,
        "This invoice is read only because freight isn't supported in the browser. Switch to AccountRight desktop to edit this invoice.",
      ],
    ])(
      'isLayoutSupported %s, layout %s, hasFreightAmount %s',
      (isLayoutSupported, layout, hasFreightAmount, message) => {
        const actual = getReadOnlyMessage.resultFunc(
          isLayoutSupported,
          layout,
          hasFreightAmount
        );

        expect(actual).toEqual(message);
      }
    );
  });

  describe('getLayoutDisplayName', () => {
    it.each([
      [SalesLayout.SERVICE, 'Services'],
      [SalesLayout.ITEM_AND_SERVICE, 'Services and items'],
      [SalesLayout.PROFESSIONAL, 'Professional'],
      [SalesLayout.TIME_BILLING, 'Time billing'],
      [SalesLayout.MISCELLANEOUS, 'Miscellaneous'],
      ['Unknown layout', 'Unknown layout'],
    ])('on %s layout, returns %s', (layout, expected) => {
      const actual = getLayoutDisplayName(layout);

      expect(actual).toEqual(expected);
    });
  });

  describe('getInvoiceListUrl', () => {
    it('returns the correct Url for invoice list page', () => {
      const expected = '/#/au/abc/recurringTransaction';
      const actual = getRecurringTransactionListUrl({
        businessId: 'abc',
        region: 'au',
        recurringTransactionId: '1',
        invoice: {
          layout: 'service',
        },
      });

      expect(expected).toEqual(actual);
    });
  });
});
