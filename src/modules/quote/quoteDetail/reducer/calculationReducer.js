import QuoteLayout from '../QuoteLayout';
import QuoteLineType from '../QuoteLineType';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';

export const getIsCalculableLine = line => [
  QuoteLineType.SERVICE, QuoteLineType.ITEM,
].includes(line.type);

export const calculatePartialQuoteLineAmounts = (state, action) => {
  const { layout } = state.quote;

  if (layout === QuoteLayout.ITEM_AND_SERVICE) {
    return {
      ...state,
      quote: {
        ...state.quote,
        lines: state.quote.lines.map((line, index) => (
          action.index === index && getIsCalculableLine(line)
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

export const setQuoteCalculatedLines = (state, {
  lines: calculatedLines, totals: calculatedTotals, isSwitchingTaxInclusive,
}) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      if (!getIsCalculableLine(line)) {
        return line;
      }

      const { amount } = calculatedLines[index];

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
    subTotal: formatCurrency(calculatedTotals.subTotal.valueOf()),
    totalTax: formatCurrency(calculatedTotals.totalTax.valueOf()),
    totalAmount: formatCurrency(calculatedTotals.totalAmount.valueOf()),
  },
});
