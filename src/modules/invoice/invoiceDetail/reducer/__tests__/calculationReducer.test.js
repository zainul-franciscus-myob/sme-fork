import Decimal from 'decimal.js';

import { CALCULATE_LINE_AMOUNTS, CALCULATE_LINE_TOTALS } from '../../../InvoiceIntents';
import { calculateLineAmounts, calculateLineTotals } from '../calculationReducer';

describe('calculationReducer', () => {
  describe('CALCULATE_LINE_TOTALS', () => {
    const baseline = {
      units: '2',
      unitPrice: '45.455',
      displayUnitPrice: '45.455',
      discount: '',
      displayDiscount: '',
      amount: '0',
      displayAmount: '0.00',
    };

    const buildState = partialLine => ({
      invoice: {
        lines: [{
          ...baseline,
          ...partialLine,
        }],
      },
      totals: {
        subTotal: '0',
        totalTax: '0',
        totalAmount: '0',
      },
    });

    const action = {
      intent: CALCULATE_LINE_TOTALS,
      taxCalculations: {
        lines: [
          { taxExclusiveAmount: Decimal(90.91), taxAmount: Decimal(9.09), amount: Decimal(100) },
        ],
        totals: {
          subTotal: Decimal(100),
          totalTax: Decimal(9.09),
          totalAmount: Decimal(100),
        },
      },
      isSwitchingTaxInclusive: true,
    };

    const buildExpect = partialLine => ({
      invoice: {
        lines: [{
          ...baseline,
          ...partialLine,
        }],
      },
      isPageEdited: true,
      totals: {
        subTotal: '100',
        totalTax: '9.09',
        totalAmount: '100',
      },
    });

    it('should calculate unitPrice and update amount and totals', () => {
      const state = buildState();

      const actual = calculateLineTotals(state, action);

      const expected = buildExpect({
        amount: '100',
        displayAmount: '100.00',
        unitPrice: '50',
        displayUnitPrice: '50.00',
      });

      expect(actual).toEqual(expected);
    });

    it('should not update unitPrice or amount when not switching tax inclusive toggle', () => {
      const state = buildState();

      const actual = calculateLineTotals(state, {
        ...action,
        isSwitchingTaxInclusive: false,
      });

      const expected = buildExpect();

      expect(actual).toEqual(expected);
    });

    [
      { key: 'units', value: '' },
      { key: 'units', value: '0' },
      { key: 'discount', value: '100' },
    ].forEach(({ key, value }) => {
      it(`should only update amount when switching tax inclusive toggle and ${key} is ${value || 'empty'}`, () => {
        const partialLine = { [key]: value };
        const state = buildState(partialLine);

        const actual = calculateLineTotals(state, action);

        const expected = buildExpect({
          ...partialLine,
          amount: '100',
          displayAmount: '100.00',
        });

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('CALCULATE_LINE_AMOUNTS', () => {
    describe('itemAndService layout', () => {
      const buildState = line => ({
        invoice: {
          layout: 'itemAndService',
          lines: [line],
        },
      });

      const buildAction = key => ({
        intent: CALCULATE_LINE_AMOUNTS,
        key,
        index: 0,
      });

      describe('calculate amount', () => {
        const baseline = {
          units: '2',
          unitPrice: '50',
          displayUnitPrice: '50.00',
          discount: '',
          displayDiscount: '',
          amount: '0',
          displayAmount: '0.00',
        };

        ['units', 'unitPrice', 'discount'].forEach((key) => {
          it(`should calculate amount when update ${key}`, () => {
            const state = buildState(baseline);

            const action = buildAction(key);

            const actual = calculateLineAmounts(state, action);

            const expected = buildState({
              ...baseline,
              amount: '100',
              displayAmount: '100.00',
            });

            expect(actual).toEqual(expected);
          });
        });

        it('should not calculate amount when update other field', () => {
          const state = buildState(baseline);

          const action = buildAction('blah');

          const actual = calculateLineAmounts(state, action);

          expect(actual).toEqual(state);
        });

        ['units', 'unitPrice'].forEach((key) => {
          it(`should not calculate amount when ${key} is empty`, () => {
            const state = buildState({
              ...baseline,
              [key]: '',
            });

            const action = buildAction(key);

            const actual = calculateLineAmounts(state, action);

            expect(actual).toEqual(state);
          });
        });
      });

      describe('calculate discount', () => {
        const baseline = {
          units: '2',
          unitPrice: '50',
          displayUnitPrice: '50.00',
          discount: '',
          displayDiscount: '',
          amount: '90',
          displayAmount: '90.00',
        };

        it('should calculate discount when update amount', () => {
          const state = buildState(baseline);

          const action = buildAction('amount');

          const actual = calculateLineAmounts(state, action);

          const expected = buildState({
            ...baseline,
            discount: '10',
            displayDiscount: '10.00',
          });

          expect(actual).toEqual(expected);
        });

        it('should not calculate discount when key is not amount', () => {
          const state = buildState(baseline);

          const action = buildAction('blah');

          const actual = calculateLineAmounts(state, action);

          expect(actual).toEqual(state);
        });

        [
          { key: 'units', value: '' },
          { key: 'units', value: '0' },
          { key: 'amount', value: '' },
        ].forEach(({ key, value }) => {
          it(`should not calculate discount when ${key} is ${value || 'empty'}`, () => {
            const state = buildState({
              ...baseline,
              [key]: value,
            });

            const action = buildAction('amount');

            const actual = calculateLineAmounts(state, action);

            expect(actual).toEqual(state);
          });
        });
      });

      describe('calculate unitPrice', () => {
        const baseline = {
          units: '2',
          unitPrice: '',
          displayUnitPrice: '',
          discount: '10',
          displayDiscount: '10.00',
          amount: '90',
          displayAmount: '90.00',
        };

        it('should calculate unitPrice when update amount', () => {
          const state = buildState(baseline);

          const action = buildAction('amount');

          const actual = calculateLineAmounts(state, action);

          const expected = buildState({
            ...baseline,
            unitPrice: '50',
            displayUnitPrice: '50.00',
          });

          expect(actual).toEqual(expected);
        });

        it('should not calculate unitPrice when key is not amount', () => {
          const state = buildState(baseline);

          const action = buildAction('blah');

          const actual = calculateLineAmounts(state, action);

          expect(actual).toEqual(state);
        });

        [
          { key: 'units', value: '' },
          { key: 'units', value: '0' },
          { key: 'discount', value: '100' },
          { key: 'amount', value: '' },
        ].forEach(({ key, value }) => {
          it(`should not calculate unitPrice when ${key} is ${value || 'empty'}`, () => {
            const state = buildState({
              ...baseline,
              [key]: value,
            });

            const action = buildAction('amount');

            const actual = calculateLineAmounts(state, action);

            expect(actual).toEqual(state);
          });
        });
      });
    });

    describe('service layout', () => {
      it('should not alter current state', () => {
        const state = {
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

        const action = {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'amount',
          index: 0,
        };

        const actual = calculateLineAmounts(state, action);

        expect(actual).toEqual(state);
      });
    });
  });
});
