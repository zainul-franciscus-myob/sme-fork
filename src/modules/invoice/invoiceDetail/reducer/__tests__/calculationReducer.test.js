import Decimal from 'decimal.js';

import {
  CALCULATE_LINE_AMOUNTS,
  CALCULATE_LINE_TOTALS,
} from '../../../InvoiceIntents';
import { calculateLineAmounts, calculateLineTotals } from '../calculationReducer';

describe('calculationReducer', () => {
  describe('CALCULATE_LINE_TOTALS', () => {
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
        invoice: {
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
          subTotal: '0',
          totalTax: '0',
          totalAmount: '0',
        },
      };

      const action = {
        intent: CALCULATE_LINE_TOTALS,
        taxCalculations,
      };

      const actual = calculateLineTotals(state, action);

      const expected = {
        isPageEdited: true,
        invoice: {
          lines: [
            {
              amount: '100',
              displayAmount: '100.00',
              displayUnitPrice: '50.00',
              unitPrice: '50',
              units: '2',
              discount: '',
            },
          ],
        },
        totals: {
          subTotal: '100',
          totalTax: '9.09',
          totalAmount: '100',
        },
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('CALCULATE_LINE_AMOUNTS', () => {
    describe('itemAndService layout', () => {
      it('should calculate amount correctly when update units', () => {
        const state = {
          invoice: {
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

        const actual = calculateLineAmounts(state, action);

        const expected = {
          invoice: {
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
          invoice: {
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

        const actual = calculateLineAmounts(state, action);

        const expected = {
          invoice: {
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
          invoice: {
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

        const actual = calculateLineAmounts(state, action);

        const expected = {
          invoice: {
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
          invoice: {
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

        const actual = calculateLineAmounts(state, action);

        const expected = {
          invoice: {
            layout: 'itemAndService',
            lines: [
              {
                amount: '100',
                discount: '',
                displayAmount: '100.00',
                displayDiscount: '0.00',
                displayUnitPrice: '50.00',
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
          invoice: {
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

        const actual = calculateLineAmounts(state, action);

        const expected = {
          invoice: {
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

      [
        {
          name: 'should set unit to 1 when units is empty and updating amount',
          updatedKey: 'amount',
          updatedValue: '100',
          expectedFirstLine: {
            discount: '',
            displayDiscount: '0.00',
            amount: '100',
            displayAmount: '100.00',
            unitPrice: '100',
            displayUnitPrice: '100.00',
            units: '1',
          },
        },
        {
          name: 'should set unit to 1 when units is empty and updating discount',
          updatedKey: 'discount',
          updatedValue: '10',
          expectedFirstLine: {
            discount: '10',
            displayDiscount: '10.00',
            amount: '0',
            displayAmount: '0.00',
            unitPrice: '',
            units: '1',
          },
        },
        {
          name: 'should not change units when units is empty and updating unitPrice',
          updatedKey: 'unitPrice',
          updatedValue: '10',
          expectedFirstLine: {
            discount: '',
            displayDiscount: '0.00',
            amount: '0',
            displayAmount: '0.00',
            unitPrice: '10',
            units: '',
          },
        },
        {
          name: 'should set amount to 0 if units is set to 0',
          initialFirstLine: {
            amount: '100',
            displayAmount: '100.00',
            unitPrice: '100',
            displayUnitPrice: '100.00',
            units: '1',
          },
          updatedKey: 'units',
          updatedValue: '0',
          expectedFirstLine: {
            discount: '',
            displayDiscount: '0.00',
            amount: '0',
            displayAmount: '0.00',
            unitPrice: '100',
            displayUnitPrice: '100.00',
            units: '0',
          },
        },
      ].forEach((test) => {
        it(`${test.name}`, () => {
          const state = {
            invoice: {
              layout: 'itemAndService',
              lines: [
                {
                  units: '',
                  discount: '',
                  unitPrice: '',
                  amount: '',
                  ...test.initialFirstLine,
                  [test.updatedKey]: test.updatedValue,
                },
              ],
            },
          };

          const action = {
            intent: CALCULATE_LINE_AMOUNTS,
            key: test.updatedKey,
            index: 0,
          };

          const actual = calculateLineAmounts(state, action);

          const expected = {
            invoice: {
              layout: 'itemAndService',
              lines: [
                test.expectedFirstLine,
              ],
            },
          };

          expect(actual).toEqual(expected);
        });
      });
    });

    describe('service layout', () => {
      it('should format amount correctly', () => {
        const state = {
          invoice: {
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

        const actual = calculateLineAmounts(state, action);

        const expected = {
          invoice: {
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
