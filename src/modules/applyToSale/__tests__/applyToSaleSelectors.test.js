import {
  getCreateApplyToSalePayload,
  getInvoices,
  getIsBeforeStartOfFinancialYear,
  getTotalAmountApplied,
} from '../applyToSaleSelectors';

describe('applyToSaleSelectors', () => {
  describe('getInvoices', () => {
    it('generates invoice url', () => {
      const state = {
        region: 'au',
        businessId: 'bizId',
        invoices: [
          {
            invoiceId: 'invId',
          },
        ],
      };

      const actual = getInvoices(state);

      expect(actual[0].link).toEqual('/#/au/bizId/invoice/invId');
    });

    [
      {
        status: 'Open',
        labelColour: 'light-grey',
      },
      {
        status: 'Closed',
        labelColour: 'green',
      },
    ].forEach((test) => {
      it(`returns ${test.labelColour} colour for ${test.status} status`, () => {
        const state = {
          invoices: [
            {
              status: test.status,
            },
          ],
        };

        const actual = getInvoices(state);

        expect(actual[0].labelColour).toEqual(test.labelColour);
      });
    });

    it('calculates balance due and formats it', () => {
      const state = {
        invoices: [
          {
            totalAmount: '2000.00',
            discount: '50.00',
          },
        ],
      };

      const actual = getInvoices(state);

      expect(actual[0].balanceDue).toEqual('1,950.00');
    });

    it('formats totalAmount', () => {
      const state = {
        invoices: [
          {
            totalAmount: '2000.00',
            discount: '0.00',
          },
        ],
      };

      const actual = getInvoices(state);

      expect(actual[0].totalAmount).toEqual('2,000.00');
    });
  });

  describe('getTotalAmountApplied', () => {
    it('sums all applied invoice amounts and adds currency symbol', () => {
      const state = {
        invoices: [
          {
            amountApplied: '23.15',
          },
          {
            amountApplied: '10.00',
          },
        ],
      };

      const actual = getTotalAmountApplied(state);

      expect(actual).toEqual('$33.15');
    });
  });

  describe('getCreateApplyToSalePayload', () => {
    const state = {
      customerReturnId: 'a',
      description: 'b',
      date: 'c',
      reference: 'd',
      originalReferenceId: 'e',
      invoices: [
        {
          invoiceId: '1i',
          amountApplied: '1.00',
          discount: '2.00',
        },
        {
          invoiceId: '2i',
          amountApplied: '3.00',
          discount: '4.00',
        },
      ],
    };

    it('gets request for create', () => {
      const actual = getCreateApplyToSalePayload(state);

      const expected = {
        customerReturnId: 'a',
        description: 'b',
        date: 'c',
        reference: 'd',
        invoices: [
          {
            invoiceId: '1i',
            amountApplied: '1.00',
            discount: '2.00',
          },
          {
            invoiceId: '2i',
            amountApplied: '3.00',
            discount: '4.00',
          },
        ],
      };

      expect(actual).toEqual(expected);
    });

    it('filters out invoices with 0 amount applied', () => {
      const modifiedState = {
        ...state,
        invoices: state.invoices.map((invoice) => ({
          ...invoice,
          amountApplied: '0.00',
        })),
      };

      const actual = getCreateApplyToSalePayload(modifiedState);

      expect(actual.invoices).toEqual([]);
    });

    it('reference is empty string when current value equals original reference id', () => {
      const modifiedState = {
        ...state,
        reference: 'p',
        originalReferenceId: 'p',
      };

      const actual = getCreateApplyToSalePayload(modifiedState);

      expect(actual.reference).toEqual('');
    });
  });

  describe('getIsBeforeStartOfFinancialYear', () => {
    it.each([
      ['2014-07-01', '2010-01-01', true],
      ['2014-07-01', '2014-06-30', true],
      ['2014-07-01', '2014-07-01', false],
      ['2014-07-01', '2014-07-02', false],
      ['2014-07-01', '2015-01-01', false],
    ])(
      'when start of financial year date is %s and issue date is %s, should return %s',
      (startOfFinancialYearDate, date, expected) => {
        const state = {
          date,
          startOfFinancialYearDate,
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      }
    );
  });
});
