import Decimal from 'decimal.js';

import { DEFAULT_DISCOUNT } from './getDefaultState';
import { getBillLayout, getLines } from '../selectors/billSelectors';
import BillLayout from '../types/BillLayout';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import formatDisplayAmount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayAmount';
import formatDisplayDiscount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayDiscount';
import formatDisplayUnitPrice from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayUnitPrice';
import formatUnits from '../../../../common/valueFormatters/formatTaxCalculation/formatUnits';
import getUnitPrice from '../formatters/getUnitPrice';

const calculateAmount = (units, unitPrice, discount) => {
  const calculatedDiscount = Decimal(1).minus(Decimal(discount).div(100));
  return Decimal(units)
    .times(unitPrice)
    .times(calculatedDiscount)
    .valueOf();
};

const calculateDiscount = (units, unitPrice, amount) => {
  const totalAmount = Decimal(units).times(unitPrice);
  const decimalAmount = Decimal(amount);
  return Decimal(1)
    .minus(decimalAmount.div(totalAmount))
    .times(100)
    .valueOf();
};

const calculateUnitPrice = (units, amount) => Decimal(amount).div(units).valueOf();

const shouldCalculateAmount = key => ['units', 'unitPrice', 'discount'].includes(key);

const shouldCalculateDiscount = (key, unitPrice) => key === 'amount' && unitPrice !== 0;

const shouldCalculateUnitPrice = (key, unitPrice) => key === 'amount' && unitPrice === 0;

const shouldRemoveDiscount = (key, units) => key === 'amount' && units === 0;

const buildItemServiceLine = (line, key) => {
  const units = Number(line.units);
  const unitPrice = Number(line.unitPrice);
  const amount = Number(line.amount);
  const discount = Number(line.discount);

  const updatedLine = {
    ...line,
    units: formatUnits(units),
    amount: amount.toString(),
    displayAmount: formatDisplayAmount(amount),
    discount: discount.toString(),
    displayDiscount: formatDisplayDiscount(discount),
    unitPrice: unitPrice.toString(),
    displayUnitPrice: formatDisplayUnitPrice(unitPrice),
  };

  if (shouldRemoveDiscount(key, units)) {
    return {
      ...updatedLine,
      discount: DEFAULT_DISCOUNT,
      displayDiscount: formatDisplayDiscount(DEFAULT_DISCOUNT),
    };
  }

  if (shouldCalculateUnitPrice(key, unitPrice)) {
    const updatedUnitPrice = calculateUnitPrice(units, amount);
    return {
      ...updatedLine,
      discount: DEFAULT_DISCOUNT,
      displayDiscount: formatDisplayDiscount(DEFAULT_DISCOUNT),
      unitPrice: updatedUnitPrice,
      displayUnitPrice: formatDisplayUnitPrice(updatedUnitPrice),
    };
  }

  if (shouldCalculateAmount(key)) {
    const calculatedAmount = calculateAmount(units, unitPrice, discount);
    return {
      ...updatedLine,
      amount: calculatedAmount,
      displayAmount: formatDisplayAmount(calculatedAmount),
    };
  }

  if (shouldCalculateDiscount(key, unitPrice)) {
    const calculatedDiscount = calculateDiscount(units, unitPrice, amount);
    return {
      ...updatedLine,
      discount: calculatedDiscount,
      displayDiscount: formatDisplayDiscount(calculatedDiscount),
    };
  }

  return updatedLine;
};

const buildServiceLine = line => ({
  ...line,
  displayAmount: formatDisplayAmount(Number(line.amount)),
});

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
          : buildServiceLine(line, key);
      }),
    },
  };
};

const calculateAmountDue = (totalAmount, amountPaid) => Decimal(totalAmount).minus(
  Decimal(amountPaid),
);

export const getTaxCalculations = (state, { taxCalculations: { lines, totals } }) => {
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
        const { unitPrice, units, discount } = line;

        const calculatedUnitPrice = getUnitPrice({
          units: Number(units),
          amount,
          discount: Number(discount),
          currentUnitPrice: Number(unitPrice),
        });

        return {
          ...line,
          amount: amount.valueOf(),
          displayAmount: formatDisplayAmount(amount.valueOf()),
          unitPrice: calculatedUnitPrice.valueOf(),
          displayUnitPrice: formatDisplayUnitPrice(calculatedUnitPrice.valueOf()),
        };
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
