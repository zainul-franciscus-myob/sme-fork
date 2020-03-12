import Decimal from 'decimal.js';

import { getBillLayout, getLines } from '../selectors/billSelectors';
import BillLayout from '../types/BillLayout';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import formatDisplayAmount
  from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayAmount';
import formatDisplayDiscount
  from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayDiscount';
import formatDisplayUnitPrice
  from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayUnitPrice';

const calculateAmount = (units, unitPrice, discount) => {
  const calculatedDiscount = Decimal(1).minus(Decimal(discount).div(100));
  return Decimal(units)
    .times(unitPrice)
    .times(calculatedDiscount).valueOf();
};

const calculateDiscount = (units, unitPrice, amount) => {
  const totalAmount = Decimal(units).times(unitPrice);
  const decimalAmount = Decimal(amount);
  return Decimal(1)
    .minus(decimalAmount.div(totalAmount))
    .times(100).valueOf();
};

const calculateUnitPrice = (units, amount, discount) => (
  Decimal(amount).div(Decimal(1).minus(Decimal(discount).div(100))).div(units).valueOf()
);

const shouldCalculateAmount = (line, key) => ['units', 'unitPrice', 'discount'].includes(key)
  && line.units !== ''
  && line.unitPrice !== '';

const shouldCalculateDiscount = (line, key) => key === 'amount'
  && Number(line.units) !== 0
  && Number(line.unitPrice) !== 0
  && line.amount !== '';

const shouldCalculateUnitPrice = (line, key) => key === 'amount'
  && Number(line.units) !== 0
  && Number(line.unitPrice) === 0
  && Number(line.discount) !== 100
  && line.amount !== '';

const buildItemServiceLine = (line, key) => {
  const units = Number(line.units);
  const unitPrice = Number(line.unitPrice);
  const discount = Number(line.discount);
  const amount = Number(line.amount);

  if (shouldCalculateAmount(line, key)) {
    const calculatedAmount = calculateAmount(units, unitPrice, discount);

    return {
      ...line,
      amount: calculatedAmount,
      displayAmount: formatDisplayAmount(calculatedAmount),
    };
  }

  if (shouldCalculateDiscount(line, key)) {
    const calculatedDiscount = calculateDiscount(units, unitPrice, amount);

    return {
      ...line,
      discount: calculatedDiscount,
      displayDiscount: formatDisplayDiscount(calculatedDiscount),
    };
  }

  if (shouldCalculateUnitPrice(line, key)) {
    const calculatedUnitPrice = calculateUnitPrice(units, amount, discount);

    return {
      ...line,
      unitPrice: calculatedUnitPrice,
      displayUnitPrice: formatDisplayUnitPrice(calculatedUnitPrice),
    };
  }

  return line;
};

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
          ? buildItemServiceLine(line, key)
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
  const amountDue = calculateAmountDue(totalAmount, Number(amountPaid));

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
      subTotal: formatCurrency(subTotal),
      totalTax: formatCurrency(totalTax),
      totalAmount: formatCurrency(totalAmount),
      amountDue: formatCurrency(amountDue),
    },
  };
};
