import {
  getIsCalculableLine,
  getLayout,
  getLines,
} from '../selectors/RecurringInvoiceSelectors';
import SalesLayout from '../../types/SalesLayout';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';

export const calculateLineAmounts = (state, { key, index }) => {
  const lines = getLines(state);
  const layout = getLayout(state);

  return {
    ...state,
    invoice: {
      ...state.invoice,
      lines: lines.map((line, lineIndex) => {
        if (index !== lineIndex) {
          return line;
        }

        return layout === SalesLayout.ITEM_AND_SERVICE &&
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

export const calculateInvoiceLines = (
  state,
  { taxCalculations: { lines: calculatedLines }, isSwitchingTaxInclusive }
) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
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
