import { getIsCalculableLine } from '../selectors/QuoteDetailSelectors';
import QuoteLayout from '../QuoteLayout';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';

export const calculatePartialQuoteLineAmounts = (state, action) => {
  const { layout } = state.quote;

  if (layout === QuoteLayout.ITEM_AND_SERVICE) {
    return {
      ...state,
      quote: {
        ...state.quote,
        lines: state.quote.lines.map((line, index) =>
          action.index === index && getIsCalculableLine(line)
            ? buildLineWithCalculatedAmounts(line, action.key)
            : line
        ),
      },
    };
  }

  return state;
};

const shouldCalculateUnitPriceWithTaxInclusiveSwitch = (
  line,
  isSwitchingTaxInclusive
) =>
  isSwitchingTaxInclusive &&
  Number(line.units) !== 0 &&
  Number(line.discount) !== 100;

export const calculateLines = (
  state,
  { taxCalculations: { lines: calculatedLines }, isSwitchingTaxInclusive }
) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
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
