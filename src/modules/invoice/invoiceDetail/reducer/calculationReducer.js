import { getLayout, getLines } from '../selectors/invoiceDetailSelectors';
import InvoiceLayout from '../types/InvoiceLayout';
import InvoiceLineType from '../types/InvoiceLineType';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';

export const getIsCalculableLine = line => [
  InvoiceLineType.SERVICE, InvoiceLineType.ITEM,
].includes(line.type);

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

        return layout === InvoiceLayout.ITEM_AND_SERVICE && getIsCalculableLine(line)
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
  {
    taxCalculations: { lines: calculatedLines, totals: calculatedTotals },
    isSwitchingTaxInclusive,
  },
) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
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
    subTotal: calculatedTotals.subTotal.valueOf(),
    totalTax: calculatedTotals.totalTax.valueOf(),
    totalAmount: calculatedTotals.totalAmount.valueOf(),
  },
});
