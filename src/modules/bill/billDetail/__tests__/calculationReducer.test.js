import Decimal from 'decimal.js';

import { CALCULATE_LINE_AMOUNTS, GET_TAX_CALCULATIONS } from '../BillIntents';
import { calculateLineAmounts, getTaxCalculations } from '../reducer/calculationReducer';
import BillLayout from '../types/BillLayout';

describe('calculationReducer', () => {
  describe('GET_TAX_CALCULATIONS', () => {
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
        bill: {
          lines: [
            {
              units: '2',
              discount: '',
              unitPrice: '50.00',
              amount: '0',
              displayAmount: '0.00',
            },
          ],
          amountPaid: '',
        },
        totals: {
          subTotal: '0',
          totalTax: '0',
          totalAmount: '0',
          amountDue: '0',
        },
      };

      const action = {
        intent: GET_TAX_CALCULATIONS,
        taxCalculations,
      };

      const actual = getTaxCalculations(state, action);

      const expected = {
        isPageEdited: true,
        isLineEdited: false,
        bill: {
          amountPaid: '',
          lines: [
            {
              amount: '100',
              displayAmount: '100.00',
              unitPrice: '50',
              displayUnitPrice: '50.00',
              units: '2',
              discount: '',
            },
          ],
        },
        totals: {
          subTotal: '$100.00',
          totalTax: '$9.09',
          totalAmount: '$100.00',
          amountDue: '$100.00',
        },
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('CALCULATE_LINE_AMOUNTS', () => {
    describe('item layout', () => {
      it('should calculate amount correctly when update units', () => {
        const state = {
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
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
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
            lines: [
              {
                amount: '100',
                displayAmount: '100.00',
                discount: '0',
                displayDiscount: '0.00',
                unitPrice: '50',
                displayUnitPrice: '50.00',
                units: '2',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate amount correctly when update unitPirce', () => {
        const state = {
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
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
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
            lines: [
              {
                amount: '100',
                displayAmount: '100.00',
                discount: '0',
                displayDiscount: '0.00',
                unitPrice: '50',
                displayUnitPrice: '50.00',
                units: '2',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate amount correctly when update discount', () => {
        const state = {
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
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
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
            lines: [
              {
                amount: '50',
                displayAmount: '50.00',
                discount: '50',
                displayDiscount: '50.00',
                unitPrice: '100',
                displayUnitPrice: '100.00',
                units: '1',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate unitPrice correctly when update amount and unitPrice is 0 and units is not 0', () => {
        const state = {
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
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
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
            lines: [
              {
                amount: '100',
                displayAmount: '100.00',
                discount: '0',
                displayDiscount: '0.00',
                unitPrice: '50',
                displayUnitPrice: '50.00',
                units: '2',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should calculate discount when update amount and units is not 0', () => {
        const state = {
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
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
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
            lines: [
              {
                amount: '100',
                displayAmount: '100.00',
                discount: '50',
                displayDiscount: '50.00',
                unitPrice: '200',
                displayUnitPrice: '200.00',
                units: '1',
              },
            ],
          },
        };

        expect(actual).toEqual(expected);
      });

      it('should remove discount when update amount and units is 0', () => {
        const state = {
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
            lines: [
              {
                units: '0',
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

        const actual = calculateLineAmounts(state, action);

        const expected = {
          layout: BillLayout.ITEM_AND_SERVICE,
          bill: {
            lines: [
              {
                amount: '100',
                displayAmount: '100.00',
                discount: '0',
                displayDiscount: '0.00',
                unitPrice: '100',
                displayUnitPrice: '100.00',
                units: '0',
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
          layout: BillLayout.SERVICE,
          bill: {
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
          layout: BillLayout.SERVICE,
          bill: {
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
