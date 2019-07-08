import {
  getCreateApplyToSalePayload,
  getInvoices,
  getTableViewType,
  getTotalAmountApplied,
} from '../applyToSaleSelectors';
import TableViewType from '../TableViewType';

describe('applyToSaleSelectors', () => {
  describe('getInvoices', () => {
    it('formats amounts', () => {
      const state = {
        invoices: [
          {
            totalAmount: 100,
          },
        ],
      };

      const actual = getInvoices(state);

      expect(actual[0].totalAmount).toEqual('100.00');
    });

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
        status: 'Unpaid',
        labelColour: 'light-grey',
      },
      {
        status: 'Paid',
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

    it('calculates and formats balance due', () => {
      const state = {
        invoices: [
          {
            totalAmount: 100,
            discount: 50,
          },
        ],
      };

      const actual = getInvoices(state);

      expect(actual[0].balanceDue).toEqual('50.00');
    });

    it('shows display value for discount and amountApplied', () => {
      const state = {
        invoices: [{
          displayDiscount: 'a',
          displayAmountApplied: 'b',
        }],
      };

      const actual = getInvoices(state);

      expect(actual[0].displayDiscount).toEqual('a');
      expect(actual[0].displayAmountApplied).toEqual('b');
    });
  });

  describe('getTotalAmountApplied', () => {
    it('sums all applied invoice amounts and formats result', () => {
      const state = {
        invoices: [
          {
            amountApplied: 23.15,
          },
          {
            amountApplied: 10,
          },
        ],
      };

      const actual = getTotalAmountApplied(state);

      expect(actual).toEqual('$33.15');
    });
  });

  describe('getTableViewType', () => {
    const state = {
      invoices: [{}, {}],
      isTableLoading: false,
    };

    it('returns EMPTY when invoices is empty', () => {
      const testState = {
        ...state,
        invoices: [],
      };

      const actual = getTableViewType(testState);

      expect(actual).toEqual(TableViewType.EMPTY);
    });

    it('returns SPINNER when table is loading', () => {
      const testState = {
        ...state,
        isTableLoading: true,
      };

      const actual = getTableViewType(testState);

      expect(actual).toEqual(TableViewType.SPINNER);
    });

    it('returns TABLE when there are invoices', () => {
      const actual = getTableViewType(state);

      expect(actual).toEqual(TableViewType.TABLE);
    });
  });

  describe('getCreateApplyToSalePayload', () => {
    it('gets request for create', () => {
      const state = {
        customerReturnId: 'a',
        description: 'b',
        date: 'c',
        reference: 'd',
        invoices: [
          {
            invoiceId: '1i',
            amountApplied: 1,
            discount: 2,
          },
          {
            invoiceId: '2i',
            amountApplied: 3,
            discount: 4,
          },
        ],
      };

      const actual = getCreateApplyToSalePayload(state);

      const expected = {
        customerReturnId: 'a',
        description: 'b',
        date: 'c',
        reference: 'd',
        invoices: [
          {
            invoiceId: '1i',
            amountApplied: 1,
            discount: 2,
          },
          {
            invoiceId: '2i',
            amountApplied: 3,
            discount: 4,
          },
        ],
      };

      expect(actual).toEqual(expected);
    });

    it('filters out invoices with 0 amount applied', () => {
      const state = {
        customerReturnId: 'a',
        description: 'b',
        date: 'c',
        reference: 'd',
        invoices: [
          {
            invoiceId: '1i',
            amountApplied: 0,
            discount: 2,
          },
          {
            invoiceId: '2i',
            amountApplied: 3,
            discount: 4,
          },
        ],
      };

      const actual = getCreateApplyToSalePayload(state);

      const expected = {
        customerReturnId: 'a',
        description: 'b',
        date: 'c',
        reference: 'd',
        invoices: [
          {
            invoiceId: '2i',
            amountApplied: 3,
            discount: 4,
          },
        ],
      };

      expect(actual).toEqual(expected);
    });
  });
});
