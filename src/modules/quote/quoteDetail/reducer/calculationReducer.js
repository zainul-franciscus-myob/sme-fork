import Decimal from 'decimal.js';

import QuoteLayout from '../QuoteLayout';
import formatAmount from '../../../../common/valueFormatters/formatAmount';

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

const buildServiceLine = line => ({
  ...line,
  displayAmount: formatAmount(line.amount),
});

const buildItemServiceLine = (line, key) => {
  if (amountOnly(key, line.units, line.unitPrice, line.discount)) {
    return buildServiceLine(line);
  }

  const units = Number(line.units);
  const unitPrice = Number(line.unitPrice);
  const amount = Number(line.amount);
  const discount = Number(line.discount);

  const updatedLine = {
    ...line,
    displayAmount: formatAmount(line.amount),
    displayDiscount: formatAmount(line.discount),
  };

  if (shouldRemoveDiscount(key, units)) {
    return {
      ...updatedLine,
      discount: '',
      displayDiscount: '',
    };
  }

  if (shouldCalculateUnitPrice(key, unitPrice)) {
    return {
      ...updatedLine,
      discount: '',
      displayDiscount: '',
      unitPrice: calculateUnitPrice(units, amount),
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

export const calculatePartialQuoteLineAmounts = (state, {
  key,
  index,
}) => {
  const { layout } = state.quote;
  const builder = layout === QuoteLayout.ITEM_AND_SERVICE
    ? buildItemServiceLine
    : buildServiceLine;
  const lines = state.quote.lines.map((line, i) => {
    if (index !== i) {
      return line;
    }

    return builder(line, key);
  });

  return {
    ...state,
    quote: {
      ...state.quote,
      lines,
    },
  };
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
      return {
        ...line,
        amount: amount.valueOf(),
        unitPrice: getUnitPrice(
          Number(units),
          amount,
          Number(discount),
          unitPrice,
        ),
        displayAmount: formatAmount(amount.valueOf()),
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
