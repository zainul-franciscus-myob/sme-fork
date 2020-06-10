import {
  calculateAmountDue,
  getAccountModalContext,
  getConversionMonthYear,
  getInvoiceDetailOptions,
  getInvoiceDetailTotals,
  getInvoiceLine,
  getIsBeforeConversionDate,
  getIsLinesSupported,
  getIsReadOnly,
  getLayoutDisplayName,
  getReadOnlyMessage,
  getTemplateOptions,
  getTotals,
  getUpdatedCustomerOptions,
} from '../invoiceDetailSelectors';
import InvoiceLayout from '../../types/InvoiceLayout';
import InvoiceLineType from '../../types/InvoiceLineType';

describe('invoiceDetailSelectors', () => {
  const state = {
    isSubmitting: false,
    invoice: {
      id: '1',
      customerId: '3',
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
    comments: [],
    customerOptions: [
      {
        name: 'Cow Feed 1',
        id: '1',
      },
      {
        name: 'Cow Feed 2',
        id: '2',
      },
      {
        name: 'Cow Feed 3',
        id: '3',
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
    template: {
      defaultTemplate: 'a',
      templateOptions: [{ name: 'a', label: 'a' }],
    },
    region: 'au',
    businessId: 'abc',
    invoiceId: '1',
    conversionDate: '2015-01-01',
  };

  describe('getInvoiceDetailOptions', () => {
    it('returns correct shape for InvoiceServiceOptions component', () => {
      const expected = {
        invoiceNumber: '0000012334563456',
        purchaseOrderNumber: '123',
        customerId: '3',
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
        customerOptions: [
          { name: 'Cow Feed 1', id: '1' },
          { name: 'Cow Feed 2', id: '2' },
          { name: 'Cow Feed 3', id: '3' },
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

  describe('getTotals', () => {
    it('calculate totals with just freight amount when no lines', () => {
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

    it('calculate totals with both freight amount and lines amount', () => {
      const actual = getTotals({
        ...state,
        invoice: {
          ...state.invoice,
          lines: [
            { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '9.99', taxAmount: '0.01' },
            { type: InvoiceLineType.SUB_TOTAL, taxExclusiveAmount: '99', taxAmount: '1' },
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

  describe('getInvoiceDetailTotals', () => {
    const taxCodeOptions = [
      {
        id: '2',
        displayName: 'GST',
      },
    ];
    const totals = {
      subTotal: '123.55',
      totalTax: '-4.45',
      totalAmount: '128',
    };
    const isCreating = false;
    const noAmountPaid = '';
    const noFreightInfo = {
      taxExclusiveFreightAmount: '0',
      freightTaxAmount: '0',
      freightTaxCodeId: '0',
      isTaxInclusive: true,
    };

    it('should calculate amount due correctly', () => {
      const amountPaid = '10';

      const expected = {
        subTotal: '123.55',
        freightAmount: '0',
        totalTax: '-4.45',
        totalAmount: '128',
        amountPaid: '10',
        amountDue: '118',
        showFreight: false,
        isCreating,
      };

      const actual = getInvoiceDetailTotals.resultFunc(
        totals, amountPaid, isCreating, noFreightInfo, taxCodeOptions, false,
      );

      expect(actual).toEqual(expected);
    });

    it('should set amount paid to 0 if it is empty', () => {
      const expected = {
        subTotal: '123.55',
        freightAmount: '0',
        totalTax: '-4.45',
        totalAmount: '128',
        amountPaid: '0.00',
        amountDue: '128',
        showFreight: false,
        isCreating,
      };

      const actual = getInvoiceDetailTotals.resultFunc(
        totals, noAmountPaid, isCreating, noFreightInfo, taxCodeOptions, false,
      );

      expect(actual).toEqual(expected);
    });

    it('should set freight amount when tax inclusive', () => {
      const freightInfo = {
        taxExclusiveFreightAmount: '9.09',
        freightTaxAmount: '0.91',
        freightTaxCodeId: '2',
        isTaxInclusive: true,
      };

      const expected = {
        subTotal: '123.55',
        totalTax: '-4.45',
        freightAmount: '10',
        totalAmount: '128',
        amountPaid: '0.00',
        amountDue: '128',
        showFreight: true,
        freightTaxCode: 'GST',
        isCreating,
      };

      const actual = getInvoiceDetailTotals.resultFunc(
        totals, noAmountPaid, isCreating, freightInfo, taxCodeOptions, true,
      );

      expect(actual).toEqual(expected);
    });

    it('should set freight amount when tax exclusive', () => {
      const freightInfo = {
        taxExclusiveFreightAmount: '9.09',
        freightTaxAmount: '0.91',
        freightTaxCodeId: '2',
        isTaxInclusive: false,
      };

      const expected = {
        subTotal: '123.55',
        totalTax: '-4.45',
        freightAmount: '9.09',
        totalAmount: '128',
        amountPaid: '0.00',
        amountDue: '128',
        showFreight: true,
        freightTaxCode: 'GST',
        isCreating,
      };

      const actual = getInvoiceDetailTotals.resultFunc(
        totals, noAmountPaid, isCreating, freightInfo, taxCodeOptions, true,
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('calculateAmountDue', () => {
    it('calculate amount correctly', () => {
      const actual = calculateAmountDue('1.23', '1.11');

      expect(actual).toEqual('0.12');
    });

    it('returns totalAmount when paid is empty', () => {
      const actual = calculateAmountDue('1.23', '');

      expect(actual).toEqual('1.23');
    });
  });

  describe('getAccountModalContext', () => {
    it('returns region and businesID from state', () => {
      const actual = getAccountModalContext(state);

      expect(actual).toEqual({ region: 'au', businessId: 'abc' });
    });
  });

  describe('getUpdatedCustomerOptions', () => {
    it('should contain newly added customer option', () => {
      const option1 = { id: '1', name: 'Option 1' };
      const option2 = { id: '2', name: 'Option 2' };
      const expected = [option2, option1];

      const actual = getUpdatedCustomerOptions({ customerOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });

    it('should contain updated customer option', () => {
      const option1 = { id: '1', name: 'Option 1' };
      const option2 = { id: '1', name: 'Updated option 1' };
      const expected = [option2];

      const actual = getUpdatedCustomerOptions({ customerOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTemplateOptions', () => {
    it('uses template options when layout is service', () => {
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

    describe('returns subtitle line', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: [{ type: InvoiceLineType.SUB_TOTAL, description: 'Description', amount: '10' }],
        },
      };

      const actual = getInvoiceLine(modifiedState, { index: 0 });

      expect(actual).toEqual({ type: InvoiceLineType.SUB_TOTAL, description: 'Subtotal', amount: '10' });
    });
  });

  describe('getIsLinesSupported', () => {
    it.each([
      [InvoiceLineType.SERVICE, true],
      [InvoiceLineType.ITEM, true],
      [InvoiceLineType.HEADER, false],
      [InvoiceLineType.SUB_TOTAL, false],
    ])('validate whether invoice with %s line type are supported', (type, expected) => {
      const lines = [
        { type: InvoiceLineType.SERVICE },
        { type: InvoiceLineType.ITEM },
        { type },
      ];

      const actual = getIsLinesSupported.resultFunc(lines);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsReadOnly', () => {
    it.each([
      [InvoiceLayout.SERVICE, false],
      [InvoiceLayout.ITEM_AND_SERVICE, false],
      [InvoiceLayout.PROFESSIONAL, true],
      [InvoiceLayout.TIME_BILLING, true],
      [InvoiceLayout.MISCELLANEOUS, true],
      ['N/A', true],
    ])('%s layout', (layout, expected) => {
      const actual = getIsReadOnly({ invoice: { layout, lines: [] } });

      expect(actual).toEqual(expected);
    });

    it.each([
      [InvoiceLineType.SERVICE, false],
      [InvoiceLineType.ITEM, false],
      [InvoiceLineType.HEADER, true],
      [InvoiceLineType.SUB_TOTAL, true],
      ['N/A', true],
    ])('have %s line type', (type, expected) => {
      const actual = getIsReadOnly({
        invoice: {
          layout: InvoiceLayout.ITEM_AND_SERVICE,
          lines: [
            { type: InvoiceLineType.SERVICE },
            { type: InvoiceLineType.ITEM },
            { type },
          ],
        },
      });

      expect(actual).toEqual(expected);
    });

    it('should be readonly when invoice has freight amount', () => {
      const actual = getIsReadOnly({
        invoice: {
          layout: InvoiceLayout.ITEM_AND_SERVICE,
          lines: [],
          taxExclusiveFreightAmount: '10',
        },
      });

      expect(actual).toBe(true);
    });
  });

  describe('getReadOnlyMessage', () => {
    it.each([
      [false, 'Blah', false, 'This invoice is read only because the Blah layout isn\'t supported in the browser. Switch to AccountRight desktop to edit this invoice.'],
      [true, '', false, 'This invoice is read only because it contains unsupported features. Switch to AccountRight desktop to edit this invoice.'],
      [true, '', true, 'This invoice is read only because freight isn\'t supported in the browser. Switch to AccountRight desktop to edit this invoice'],
    ])('isLayoutSupported %s, layout %s, hasFreightAmount %s', (isLayoutSupported, layout, hasFreightAmount, message) => {
      const actual = getReadOnlyMessage.resultFunc(isLayoutSupported, layout, hasFreightAmount);

      expect(actual)
        .toEqual(message);
    });
  });

  describe('getIsBeforeConversionDate', () => {
    it('should return true if selectedDate is before conversion date', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          issueDate: '2013-03-05',
        },
        conversionDate: '2014-07-01',
      };

      const actual = getIsBeforeConversionDate(modifiedState);

      expect(actual).toBeTruthy();
    });

    it('should return false if selectedDate is after conversion date', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          issueDate: '2018-03-05',
        },
        conversionDate: '2014-07-01',
      };

      const actual = getIsBeforeConversionDate(modifiedState, '2014-08-01');

      expect(actual).toBeFalsy();
    });

    it('should return false if selectedDate is the same as conversion date', () => {
      const modifiedState = {
        ...state,
        conversionDate: '2014-07-01',
      };

      const actual = getIsBeforeConversionDate(modifiedState, '2014-07-01');

      expect(actual).toBeFalsy();
    });
  });

  describe('getConversionMonthYear', () => {
    [
      { value: '2013-08-01', expected: 'August 2013' },
      { value: '2013-01-01', expected: 'January 2013' },
      { value: '2013-07-01', expected: 'July 2013' },
      { value: '2013-12-01', expected: 'December 2013' },
    ].forEach(test => {
      it('should format correctly', () => {
        const modifiedState = {
          ...state,
          conversionDate: test.value,
        };
        const actual = getConversionMonthYear(modifiedState);

        expect(actual).toEqual(test.expected);
      });
    });
  });

  describe('getLayoutDisplayName', () => {
    it.each([
      [InvoiceLayout.SERVICE, 'Services'],
      [InvoiceLayout.ITEM_AND_SERVICE, 'Services and items'],
      [InvoiceLayout.PROFESSIONAL, 'Professional'],
      [InvoiceLayout.TIME_BILLING, 'Time billing'],
      [InvoiceLayout.MISCELLANEOUS, 'Miscellaneous'],
      ['Unknown layout', 'Unknown layout'],
    ])('on %s layout, returns %s', (layout, expected) => {
      const actual = getLayoutDisplayName(layout);

      expect(actual).toEqual(expected);
    });
  });
});
