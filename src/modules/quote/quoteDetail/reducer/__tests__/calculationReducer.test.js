import Decimal from 'decimal.js';

import { CALCULATE_LINE_AMOUNTS, SET_QUOTE_CALCULATED_LINES } from '../../../QuoteIntents';
import { calculatePartialQuoteLineAmounts, setQuoteCalculatedLines } from '../calculationReducer';

describe('calculationReducer', () => {
  describe('SET_QUOTE_CALCULATED_LINES', () => {
    it('should calculate line total correct', () => {
      const taxCalculations = {
        lines: [
          { taxExclusiveAmount: Decimal(90.91), taxAmount: Decimal(9.09), amount: Decimal(100) },
        ],
        totals: {
          subTotal: Decimal(100),
          totalTax: Decimal(9.09),
          totalAmount: Decimal(100),
        },
      };

      const state = {
        quote: {
          lines: [
            {
              units: '2',
              unitPrice: '50',
              displayUnitPrice: '50.00',
              discount: '',
              displayDiscount: '',
              amount: '0',
              displayAmount: '0.00',
            },
          ],
        },
        totals: {
          subTotal: '0.00',
          totalTax: '0.00',
          totalAmount: '0.00',
        },
      };

      const action = {
        intent: SET_QUOTE_CALCULATED_LINES,
        ...taxCalculations,
      };

      const actual = setQuoteCalculatedLines(state, action);

      const expected = {
        quote: {
          lines: [
            {
              units: '2',
              unitPrice: '50',
              displayUnitPrice: '50.00',
              discount: '',
              displayDiscount: '',
              amount: '100',
              displayAmount: '100.00',
            },
          ],
        },
        totals: {
          subTotal: '100.00',
          totalTax: '9.09',
          totalAmount: '100.00',
        },
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('CALCULATE_LINE_AMOUNTS', () => {
    describe('itemAndService layout', () => {
      it('should calculate amount correctly when update units', () => {
        const state = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '2',
                unitPrice: '50',
                displayUnitPrice: '50.00',
                discount: '',
                displayDiscount: '',
                amount: '0',
                displayAmount: '0.00',
              },
            ],
          },
        };

        const action = {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'units',
          index: 0,
        };

        const actual = calculatePartialQuoteLineAmounts(state, action);

        const expected = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '2',
                unitPrice: '50',
                displayUnitPrice: '50.00',
                discount: '0',
                displayDiscount: '0.00',
                amount: '100',
                displayAmount: '100.00',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate amount correctly when update unitPrice', () => {
        const state = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '2',
                unitPrice: '50',
                displayUnitPrice: '50.00',
                discount: '',
                displayDiscount: '',
                amount: '0',
                displayAmount: '0.00',
              },
            ],
          },
        };

        const action = {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'unitPrice',
          index: 0,
        };

        const actual = calculatePartialQuoteLineAmounts(state, action);

        const expected = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '2',
                unitPrice: '50',
                displayUnitPrice: '50.00',
                discount: '0',
                displayDiscount: '0.00',
                amount: '100',
                displayAmount: '100.00',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate amount correctly when update discount', () => {
        const state = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '1',
                unitPrice: '100',
                displayUnitPrice: '100.00',
                discount: '50',
                displayDiscount: '50.00',
                amount: '0',
                displayAmount: '0.00',
              },
            ],
          },
        };

        const action = {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'discount',
          index: 0,
        };

        const actual = calculatePartialQuoteLineAmounts(state, action);

        const expected = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '1',
                unitPrice: '100',
                displayUnitPrice: '100.00',
                discount: '50',
                displayDiscount: '50.00',
                amount: '50',
                displayAmount: '50.00',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate unitPrice correctly when update amount and unitPrice is 0 and units is not 0', () => {
        const state = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '2',
                unitPrice: '0',
                displayUnitPrice: '0.00',
                discount: '',
                displayDiscount: '',
                amount: '100',
                displayAmount: '100.00',
              },
            ],
          },
        };

        const action = {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'amount',
          index: 0,
        };

        const actual = calculatePartialQuoteLineAmounts(state, action);

        const expected = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '2',
                unitPrice: '50',
                displayUnitPrice: '50.00',
                discount: '0',
                displayDiscount: '0.00',
                amount: '100',
                displayAmount: '100.00',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate discount when update amount and units is not 0', () => {
        const state = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '1',
                unitPrice: '200',
                displayUnitPrice: '200.00',
                discount: '',
                displayDiscount: '',
                amount: '100',
                displayAmount: '100.00',
              },
            ],
          },
        };

        const action = {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'amount',
          index: 0,
        };

        const actual = calculatePartialQuoteLineAmounts(state, action);

        const expected = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '1',
                unitPrice: '200',
                displayUnitPrice: '200.00',
                discount: '50',
                displayDiscount: '50.00',
                amount: '100',
                displayAmount: '100.00',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should remove discount when update amount and units is 0', () => {
        const state = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '',
                unitPrice: '100',
                displayUnitPrice: '100.00',
                discount: '50',
                displayDiscount: '50.00',
                amount: '100',
                displayAmount: '100.00',
              },
            ],
          },
        };

        const action = {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'amount',
          index: 0,
        };

        const actual = calculatePartialQuoteLineAmounts(state, action);

        const expected = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '0',
                unitPrice: '100',
                displayUnitPrice: '100.00',
                discount: '0',
                displayDiscount: '0.00',
                amount: '100',
                displayAmount: '100.00',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });
    });

    describe('service layout', () => {
      it('should not alter current state', () => {
        const state = {
          quote: {
            layout: 'service',
            lines: [
              {
                amount: '10',
                displayAmount: '10.00',
              },
            ],
          },
        };

        const action = {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'amount',
          index: 0,
        };

        const actual = calculatePartialQuoteLineAmounts(state, action);

        expect(actual).toEqual(state);
      });
    });
  });
});
