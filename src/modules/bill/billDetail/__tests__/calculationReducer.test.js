import Decimal from 'decimal.js';

import { CALCULATE_LINE_AMOUNTS, GET_TAX_CALCULATIONS } from '../BillIntents';
import {
  calculateLineAmounts,
  getTaxCalculations,
} from '../reducer/calculationReducer';
import BillLayout from '../types/BillLayout';
import BillLineType from '../types/BillLineType';

describe('calculationReducer', () => {
  describe('GET_TAX_CALCULATIONS', () => {
    const baseline = {
      type: BillLineType.ITEM,
      units: '2',
      unitPrice: '45.455',
      discount: '',
      amount: '0',
    };

    const buildState = (partialLine) => ({
      bill: {
        lines: [
          {
            ...baseline,
            ...partialLine,
          },
        ],
        amountPaid: '',
      },
    });

    const action = {
      intent: GET_TAX_CALCULATIONS,
      taxCalculations: {
        lines: [
          {
            taxExclusiveAmount: Decimal(90.91),
            taxAmount: Decimal(9.09),
            amount: Decimal(100),
          },
        ],
      },
      isSwitchingTaxInclusive: true,
    };

    const buildExpect = (partialLine) => ({
      bill: {
        lines: [
          {
            ...baseline,
            ...partialLine,
            taxExclusiveAmount: '90.91',
            taxAmount: '9.09',
            amount: '100',
          },
        ],
        amountPaid: '',
      },
      isPageEdited: true,
      isLineEdited: false,
    });

    it('should calculate unitPrice and update amount', () => {
      const state = buildState();

      const actual = getTaxCalculations(state, action);

      const expected = buildExpect({
        unitPrice: '50',
      });

      expect(actual).toEqual(expected);
    });

    it('should not update unitPrice or amount when not switching tax inclusive toggle', () => {
      const state = buildState();

      const actual = getTaxCalculations(state, {
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

        const actual = getTaxCalculations(state, action);

        const expected = buildExpect({
          ...partialLine,
        });

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('CALCULATE_LINE_AMOUNTS', () => {
    describe('itemAndService layout', () => {
      const buildState = (line) => ({
        bill: {
          layout: BillLayout.ITEM_AND_SERVICE,
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
          type: BillLineType.ITEM,
          units: '2',
          unitPrice: '50',
          discount: '',
          amount: '0',
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
          type: BillLineType.ITEM,
          units: '2',
          unitPrice: '50',
          discount: '',
          amount: '90',
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
          it(`should not calculate discount when ${key} is ${
            value || 'empty'
          }`, () => {
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
          type: BillLineType.ITEM,
          units: '2',
          unitPrice: '',
          discount: '10',
          amount: '90',
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
          it(`should not calculate unitPrice when ${key} is ${
            value || 'empty'
          }`, () => {
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
          bill: {
            layout: BillLayout.SERVICE,
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

        const actual = calculateLineAmounts(state, action);

        expect(actual).toEqual(state);
      });
    });

    describe('incalculable line type', () => {
      it.each([
        [BillLineType.HEADER, ''],
        [BillLineType.SUB_TOTAL, '123.00'],
      ])('should not calculate %s line', (type, amount) => {
        const state = {
          bill: {
            layout: 'service',
            lines: [{ type, amount }],
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
