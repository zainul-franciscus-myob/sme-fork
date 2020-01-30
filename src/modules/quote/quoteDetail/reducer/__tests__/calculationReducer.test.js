import Decimal from 'decimal.js';

import {
  CALCULATE_LINE_AMOUNTS,
  SET_QUOTE_CALCULATED_LINES,
} from '../../../QuoteIntents';
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
              discount: '',
              unitPrice: '50.00',
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
              amount: '100',
              displayAmount: '100.00',
              unitPrice: '50',
              units: '2',
              discount: '',
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
                discount: '',
                unitPrice: '50.00',
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
                amount: '100',
                discount: '',
                displayAmount: '100.00',
                displayDiscount: '0.00',
                unitPrice: '50.00',
                units: '2',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate amount correctly when update unitPirce', () => {
        const state = {
          quote: {
            layout: 'itemAndService',
            lines: [
              {
                units: '2',
                discount: '',
                unitPrice: '50.00',
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
                amount: '100',
                discount: '',
                displayAmount: '100.00',
                displayDiscount: '0.00',
                unitPrice: '50.00',
                units: '2',
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
                discount: '50',
                unitPrice: '100.00',
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
                amount: '50',
                discount: '50',
                displayAmount: '50.00',
                displayDiscount: '50.00',
                unitPrice: '100.00',
                units: '1',
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
                discount: '',
                unitPrice: '0',
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
                amount: '100',
                discount: '',
                displayAmount: '100.00',
                displayDiscount: '',
                unitPrice: '50',
                units: '2',
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
                discount: '',
                unitPrice: '200',
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
                amount: '100',
                discount: '50',
                displayAmount: '100.00',
                displayDiscount: '50.00',
                unitPrice: '200',
                units: '1',
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
                discount: '50',
                unitPrice: '100',
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
                amount: '100',
                discount: '',
                displayAmount: '100.00',
                displayDiscount: '',
                unitPrice: '100',
                units: '',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });
    });

    describe('service layout', () => {
      it('should format amount correctly', () => {
        const state = {
          quote: {
            layout: 'service',
            lines: [
              {
                amount: '10',
                displayAmount: '0.00',
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
            layout: 'service',
            lines: [
              {
                amount: '10',
                displayAmount: '10.00',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });
    });
  });
});
