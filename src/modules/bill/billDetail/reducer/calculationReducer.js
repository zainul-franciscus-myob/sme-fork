import Decimal from 'decimal.js';

import { getBillLayout, getLines } from '../selectors/billSelectors';
import BillLayout from '../types/BillLayout';
import BillLineType from '../types/BillLineType';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';

export const getIsCalculableLine = line => [
  BillLineType.SERVICE, BillLineType.ITEM,
].includes(line.type);

export const calculateLineAmounts = (state, { key, index }) => {
  const lines = getLines(state);
  const layout = getBillLayout(state);

  return {
    ...state,
    bill: {
      ...state.bill,
      lines: lines.map((line, lineIndex) => {
        if (index !== lineIndex) {
          return line;
        }

        return layout === BillLayout.ITEM_AND_SERVICE && getIsCalculableLine(line)
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

export const calculateAmountDue = (totalAmount, amountPaid) => Decimal(totalAmount).minus(
  Decimal(amountPaid),
);

export const getTaxCalculations = (
  state,
  {
    taxCalculations: { lines: calculatedLines, totals: calculatedTotals },
    isSwitchingTaxInclusive,
  },
) => {
  const { amountPaid } = state.bill;
  const subTotal = calculatedTotals.subTotal.valueOf();
  const totalTax = calculatedTotals.totalTax.valueOf();
  const totalAmount = calculatedTotals.totalAmount.valueOf();
  const amountDue = calculateAmountDue(totalAmount, Number(amountPaid)).valueOf();

  return {
    ...state,
    isPageEdited: true,
    isLineEdited: false,
    bill: {
      ...state.bill,
      lines: state.bill.lines.map((line, index) => {
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
      subTotal,
      totalTax,
      totalAmount,
      amountDue,
    },
  };
};
