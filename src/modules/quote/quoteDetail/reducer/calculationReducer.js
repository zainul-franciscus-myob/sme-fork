import Decimal from 'decimal.js';

import { DEFAULT_DISCOUNT } from './getDefaultState';
import QuoteLayout from '../QuoteLayout';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import formatNumberWithDecimalScaleRange from '../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

export const formatUnitPrice = value => formatNumberWithDecimalScaleRange(value, 2, 6);

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
    units: units.toString(),
    unitPrice: unitPrice.toString(),
    displayUnitPrice: formatUnitPrice(unitPrice),
    discount: discount.toString(),
    displayDiscount: formatAmount(discount),
    amount: amount.toString(),
    displayAmount: formatAmount(amount),
  };

  if (amountOnly(key, line.units, line.unitPrice, line.discount)) {
    return updatedLine;
  }

  if (shouldRemoveDiscount(key, units)) {
    return {
      ...updatedLine,
      discount: DEFAULT_DISCOUNT,
      displayDiscount: formatAmount(DEFAULT_DISCOUNT),
    };
  }

  if (shouldCalculateUnitPrice(key, unitPrice)) {
    const updatedUnitPrice = calculateUnitPrice(units, amount);

    return {
      ...updatedLine,
      discount: DEFAULT_DISCOUNT,
      displayDiscount: formatAmount(DEFAULT_DISCOUNT),
      unitPrice: updatedUnitPrice,
      displayUnitPrice: formatUnitPrice(updatedUnitPrice),
    };
  }

  if (shouldCalculateAmount(key)) {
    const calculatedAmount = calculateAmount(units, unitPrice, discount);

    return {
      ...updatedLine,
      amount: calculatedAmount,
      displayAmount: formatAmount(calculatedAmount),
    };
  }

  if (shouldCalculateDiscount(key, unitPrice)) {
    const calculatedDiscount = calculateDiscount(units, unitPrice, amount);

    return {
      ...updatedLine,
      discount: calculatedDiscount,
      displayDiscount: formatAmount(calculatedDiscount),
    };
  }

  return updatedLine;
};

const mapKey = (key) => {
  switch (key) {
    case 'amount':
    case 'displayAmount':
      return 'amount';
    case 'discount':
    case 'displayDiscount':
      return 'discount';
    case 'unitPrice':
    case 'displayUnitPrice':
      return 'unitPrice';
    default:
      return key;
  }
};

export const calculatePartialQuoteLineAmounts = (state, action) => {
  const { layout } = state.quote;

  if (layout === QuoteLayout.ITEM_AND_SERVICE) {
    const key = mapKey(action.key);

    return {
      ...state,
      quote: {
        ...state.quote,
        lines: state.quote.lines.map((line, index) => (
          action.index === index
            ? buildItemServiceLine(line, key)
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
        displayAmount: formatAmount(amount.valueOf()),
        unitPrice: updatedUnitPrice,
        displayUnitPrice: formatUnitPrice(updatedUnitPrice),
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
