import Decimal from 'decimal.js';

import { CALCULATE_LINES, CALCULATE_LINE_AMOUNTS } from '../../../QuoteIntents';
import {
  calculateLines,
  calculatePartialQuoteLineAmounts,
} from '../calculationReducer';
import QuoteLineType from '../../QuoteLineType';

describe('calculationReducer', () => {
  describe('CALCULATE_LINES', () => {
    const baseline = {
      type: 'item',
      units: '2',
      unitPrice: '45.455',
      discount: '',
      amount: '100',
      taxExclusiveAmount: '90.91',
      taxAmount: '9.09',
    };

    const buildState = (partialLine) => ({
      quote: {
        lines: [
          { type: QuoteLineType.HEADER, lineTypeId: -1 },
          { ...baseline, ...partialLine },
          { type: QuoteLineType.SUB_TOTAL, lineTypeId: -1, amount: '100.00' },
        ],
      },
    });

    const action = {
      intent: CALCULATE_LINES,
      taxCalculations: {
        lines: [
          { taxExclusiveAmount: 0, taxAmount: 0, amount: 0 },
          {
            taxExclusiveAmount: Decimal(90.91),
            taxAmount: Decimal(9.09),
            amount: Decimal(100),
          },
          { taxExclusiveAmount: 100, taxAmount: 0, amount: 100 },
        ],
      },
      isSwitchingTaxInclusive: true,
    };

    const buildExpect = (partialLine) => ({
      quote: {
        lines: [
          { type: QuoteLineType.HEADER, lineTypeId: -1 },
          { ...baseline, ...partialLine },
          { type: QuoteLineType.SUB_TOTAL, lineTypeId: -1, amount: '100.00' },
        ],
      },
      isPageEdited: true,
    });

    it('should calculate unitPrice and update amount', () => {
      const state = buildState();

      const actual = calculateLines(state, action);

      const expected = buildExpect({
        amount: '100',
        unitPrice: '50',
      });

      expect(actual).toEqual(expected);
    });

    it('should not update unitPrice or amount when not switching tax inclusive toggle', () => {
      const state = buildState();

      const actual = calculateLines(state, {
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
      it(`should only update amount when switching tax inclusive toggle and ${key} is ${
        value || 'empty'
      }`, () => {
        const partialLine = { [key]: value };
        const state = buildState(partialLine);

        const actual = calculateLines(state, action);

        const expected = buildExpect({
          ...partialLine,
          amount: '100',
        });

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('CALCULATE_LINE_AMOUNTS', () => {
    describe('itemAndService layout', () => {
      const buildState = (line) => ({
        quote: {
          layout: 'itemAndService',
          lines: [line],
        },
      });

      const buildAction = (key) => ({
        intent: CALCULATE_LINE_AMOUNTS,
        key,
        index: 0,
      });

      describe('calculate amount', () => {
        const baseline = {
          type: 'item',
          units: '2',
          unitPrice: '50',
          discount: '',
          amount: '0',
        };

        ['units', 'unitPrice', 'discount'].forEach((key) => {
          it(`should calculate amount when update ${key}`, () => {
            const state = buildState(baseline);

            const action = buildAction(key);

            const actual = calculatePartialQuoteLineAmounts(state, action);

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

          const actual = calculatePartialQuoteLineAmounts(state, action);

          expect(actual).toEqual(state);
        });

        ['units', 'unitPrice'].forEach((key) => {
          it(`should not calculate amount when ${key} is empty`, () => {
            const state = buildState({
              ...baseline,
              [key]: '',
            });

            const action = buildAction(key);

            const actual = calculatePartialQuoteLineAmounts(state, action);

            expect(actual).toEqual(state);
          });
        });
      });

      describe('calculate discount', () => {
        const baseline = {
          type: 'item',
          units: '2',
          unitPrice: '50',
          discount: '',
          amount: '90',
        };

        it('should calculate discount when update amount', () => {
          const state = buildState(baseline);

          const action = buildAction('amount');

          const actual = calculatePartialQuoteLineAmounts(state, action);

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

          const actual = calculatePartialQuoteLineAmounts(state, action);

          expect(actual).toEqual(state);
        });

        [
          { key: 'units', value: '' },
          { key: 'units', value: '0' },
          { key: 'amount', value: '' },
        ].forEach(({ key, value }) => {
          it(`should not calculate discount when ${key} is ${
            value || 'empty'
          }`, () => {
            const state = buildState({
              ...baseline,
              [key]: value,
            });

            const action = buildAction('amount');

            const actual = calculatePartialQuoteLineAmounts(state, action);

            expect(actual).toEqual(state);
          });
        });
      });

      describe('calculate unitPrice', () => {
        const baseline = {
          type: 'item',
          units: '2',
          unitPrice: '',
          discount: '10',
          amount: '90',
        };

        it('should calculate unitPrice when update amount', () => {
          const state = buildState(baseline);

          const action = buildAction('amount');

          const actual = calculatePartialQuoteLineAmounts(state, action);

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

          const actual = calculatePartialQuoteLineAmounts(state, action);

          expect(actual).toEqual(state);
        });

        [
          { key: 'units', value: '' },
          { key: 'units', value: '0' },
          { key: 'discount', value: '100' },
          { key: 'amount', value: '' },
        ].forEach(({ key, value }) => {
          it(`should not calculate unitPrice when ${key} is ${
            value || 'empty'
          }`, () => {
            const state = buildState({
              ...baseline,
              [key]: value,
            });

            const action = buildAction('amount');

            const actual = calculatePartialQuoteLineAmounts(state, action);

            expect(actual).toEqual(state);
          });
        });
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
