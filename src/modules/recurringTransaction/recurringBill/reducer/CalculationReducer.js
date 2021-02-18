import {
  getIsCalculableLine,
  getLines,
  getRecurringBillLayout,
} from '../selectors/RecurringBillSelectors';
import PurchaseLayout from '../types/PurchaseLayout';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';

export const calculateBillLineAmounts = (state, { key, index }) => {
  const lines = getLines(state);
  const layout = getRecurringBillLayout(state);

  return {
    ...state,
    bill: {
      ...state.bill,
      lines: lines.map((line, lineIndex) => {
        if (index !== lineIndex) {
          return line;
        }

        return layout === PurchaseLayout.ITEM_AND_SERVICE &&
          getIsCalculableLine(line)
          ? buildLineWithCalculatedAmounts(line, key)
          : line;
      }),
    },
  };
};

const shouldCalculateUnitPriceWithTaxInclusiveSwitch = (
  line,
  isSwitchingTaxInclusive
) =>
  isSwitchingTaxInclusive &&
  Number(line.units) !== 0 &&
  Number(line.discount) !== 100;

export const getTaxCalculations = (
  state,
  { taxCalculations: { lines: calculatedLines }, isSwitchingTaxInclusive }
) => ({
  ...state,
  isPageEdited: true,
  isLineEdited: false,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map((line, index) => {
      if (!getIsCalculableLine(line)) {
        return line;
      }

      const { amount, taxExclusiveAmount, taxAmount } = calculatedLines[index];

      const updatedLine = {
        ...line,
        amount: amount.valueOf(),
        taxExclusiveAmount: taxExclusiveAmount.valueOf(),
        taxAmount: taxAmount.valueOf(),
      };

      if (
        shouldCalculateUnitPriceWithTaxInclusiveSwitch(
          line,
          isSwitchingTaxInclusive
        )
      ) {
        const units = Number(line.units);
        const discount = Number(line.discount);
        const calculatedUnitPrice = calculateUnitPrice(units, amount, discount);

        return {
          ...updatedLine,
          unitPrice: calculatedUnitPrice,
        };
      }

      return updatedLine;
    }),
  },
});
