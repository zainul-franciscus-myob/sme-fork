import QuoteLayout from '../QuoteLayout';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';

export const calculatePartialQuoteLineAmounts = (state, action) => {
  const { layout } = state.quote;

  if (layout === QuoteLayout.ITEM_AND_SERVICE) {
    return {
      ...state,
      quote: {
        ...state.quote,
        lines: state.quote.lines.map((line, index) => (
          action.index === index
            ? buildLineWithCalculatedAmounts(line, action.key)
            : line
        )),
      },
    };
  }

  return state;
};

const shouldCalculateUnitPriceWithTaxInclusiveSwitch = (line, isSwitchingTaxInclusive) => (
  isSwitchingTaxInclusive
    && Number(line.units) !== 0
    && Number(line.discount) !== 100
);

export const setQuoteCalculatedLines = (state, { lines, totals, isSwitchingTaxInclusive }) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      const { amount } = lines[index];

      if (shouldCalculateUnitPriceWithTaxInclusiveSwitch(line, isSwitchingTaxInclusive)) {
        const units = Number(line.units);
        const discount = Number(line.discount);
        const calculatedUnitPrice = calculateUnitPrice(units, amount, discount);

        return {
          ...line,
          amount: amount.valueOf(),
          unitPrice: calculatedUnitPrice,
        };
      }

      if (isSwitchingTaxInclusive) {
        return {
          ...line,
          amount: amount.valueOf(),
        };
      }

      return line;
    }),
  },
  totals: {
    ...state.totals,
    subTotal: formatCurrency(totals.subTotal.valueOf()),
    totalTax: formatCurrency(totals.totalTax.valueOf()),
    totalAmount: formatCurrency(totals.totalAmount.valueOf()),
  },
});
