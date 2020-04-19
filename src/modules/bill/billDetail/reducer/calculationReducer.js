import Decimal from 'decimal.js';

import { getBillLayout, getLines } from '../selectors/billSelectors';
import BillLayout from '../types/BillLayout';
import buildLineWithCalculatedAmounts from '../../../../common/itemAndServiceLayout/buildLineWithCalculatedAmounts';
import calculateUnitPrice from '../../../../common/itemAndServiceLayout/calculateUnitPrice';

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

        return layout === BillLayout.ITEM_AND_SERVICE
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

const calculateAmountDue = (totalAmount, amountPaid) => Decimal(totalAmount).minus(
  Decimal(amountPaid),
);

export const getTaxCalculations = (
  state,
  { taxCalculations: { lines, totals }, isSwitchingTaxInclusive },
) => {
  const { amountPaid } = state.bill;
  const subTotal = totals.subTotal.valueOf();
  const totalTax = totals.totalTax.valueOf();
  const totalAmount = totals.totalAmount.valueOf();
  const amountDue = calculateAmountDue(totalAmount, Number(amountPaid)).valueOf();

  return {
    ...state,
    isPageEdited: true,
    isLineEdited: false,
    bill: {
      ...state.bill,
      lines: state.bill.lines.map((line, index) => {
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
      subTotal,
      totalTax,
      totalAmount,
      amountDue,
    },
  };
};
