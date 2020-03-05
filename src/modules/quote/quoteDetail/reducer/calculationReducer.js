import Decimal from 'decimal.js';

import { DEFAULT_DISCOUNT } from './getDefaultState';
import QuoteLayout from '../QuoteLayout';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import formatDisplayAmount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayAmount';
import formatDisplayDiscount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayDiscount';
import formatDisplayUnitPrice from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayUnitPrice';
import formatUnits from '../../../../common/valueFormatters/formatTaxCalculation/formatUnits';

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

const calculateUnitPrice = (units, amount) => Decimal(amount).div(units).valueOf();

const shouldCalculateAmount = key => ['units', 'unitPrice', 'discount'].includes(key);

const shouldCalculateDiscount = (key, unitPrice) => key === 'amount' && unitPrice !== 0;

const shouldCalculateUnitPrice = (key, unitPrice) => key === 'amount' && unitPrice === 0;

const shouldRemoveDiscount = (key, units) => key === 'amount' && units === 0;

const amountOnly = (key, units, unitPrice, discount) => key === 'amount' && !units && !unitPrice && !discount;

const buildItemServiceLine = (line, key) => {
  const units = Number(line.units);
  const unitPrice = Number(line.unitPrice);
  const amount = Number(line.amount);
  const discount = Number(line.discount);

  const updatedLine = {
    ...line,
    units: formatUnits(units),
    unitPrice: String(unitPrice),
    displayUnitPrice: formatDisplayUnitPrice(unitPrice),
    discount: String(discount),
    displayDiscount: formatDisplayDiscount(discount),
    amount: String(amount),
    displayAmount: formatDisplayAmount(amount),
  };

  if (amountOnly(key, line.units, line.unitPrice, line.discount)) {
    return updatedLine;
  }

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

export const calculatePartialQuoteLineAmounts = (state, action) => {
  const { layout } = state.quote;

  if (layout === QuoteLayout.ITEM_AND_SERVICE) {
    return {
      ...state,
      quote: {
        ...state.quote,
        lines: state.quote.lines.map((line, index) => (
          action.index === index
            ? buildItemServiceLine(line, action.key)
            : line
        )),
      },
    };
  }

  return state;
};

const getUnitPrice = (units, amount, discount, currentUnitPrice) => {
  const percent = Number(
    Decimal(1)
      .minus(Decimal(discount).div(100))
      .valueOf(),
  );
  if (percent === 0 || units === 0) {
    return currentUnitPrice;
  }
  const unitPrice = amount
    .div(percent)
    .div(units);

  return unitPrice.valueOf();
};

export const setQuoteCalculatedLines = (state, { lines, totals }) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      const { amount } = lines[index];
      const { unitPrice, units, discount } = line;
      const updatedUnitPrice = getUnitPrice(
        Number(units), amount, Number(discount), unitPrice,
      );

      return {
        ...line,
        amount: amount.valueOf(),
        displayAmount: formatDisplayAmount(amount.valueOf()),
        unitPrice: updatedUnitPrice,
        displayUnitPrice: formatDisplayUnitPrice(updatedUnitPrice),
      };
    }),
  },
  totals: {
    ...state.totals,
    subTotal: formatAmount(totals.subTotal.valueOf()),
    totalTax: formatAmount(totals.totalTax.valueOf()),
    totalAmount: formatAmount(totals.totalAmount.valueOf()),
  },
});
