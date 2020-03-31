import { getLayout, getLines } from '../selectors/invoiceDetailSelectors';
import InvoiceLayout from '../InvoiceLayout';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';
import formatDisplayAmount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayAmount';
import formatDisplayUnitPrice from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayUnitPrice';

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

        return layout === InvoiceLayout.ITEM_AND_SERVICE
          ? buildLineWithCalculatedAmounts(line, key)
          : line;
      }),
    },
  };
};

const shouldCalculateUnitPriceWithTaxInclusiveSwitch = (line, isSwitchingTaxInclusive) => (
  isSwitchingTaxInclusive
  && Number(line.units) !== 0
  && Number(line.discount) !== 100
);

export const calculateLineTotals = (
  state,
  { taxCalculations: { lines, totals }, isSwitchingTaxInclusive },
) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
      const { amount } = lines[index];

      if (shouldCalculateUnitPriceWithTaxInclusiveSwitch(line, isSwitchingTaxInclusive)) {
        const units = Number(line.units);
        const discount = Number(line.discount);
        const calculatedUnitPrice = calculateUnitPrice(units, amount, discount);

        return {
          ...line,
          amount: amount.valueOf(),
          displayAmount: formatDisplayAmount(amount.valueOf()),
          unitPrice: calculatedUnitPrice,
          displayUnitPrice: formatDisplayUnitPrice(calculatedUnitPrice),
        };
      }

      if (isSwitchingTaxInclusive) {
        return {
          ...line,
          amount: amount.valueOf(),
          displayAmount: formatDisplayAmount(amount.valueOf()),
        };
      }

      return line;
    }),
  },
  totals: {
    ...state.totals,
    subTotal: totals.subTotal.valueOf(),
    totalTax: totals.totalTax.valueOf(),
    totalAmount: totals.totalAmount.valueOf(),
  },
});
