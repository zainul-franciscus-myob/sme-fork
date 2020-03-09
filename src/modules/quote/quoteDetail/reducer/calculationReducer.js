import Decimal from 'decimal.js';

import QuoteLayout from '../QuoteLayout';
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

const shouldCalculateUnitPriceWithTaxInclusiveSwitch = (line, isSwitchingTaxInclusive) => (
  isSwitchingTaxInclusive
    && Number(line.units) !== 0
    && Number(line.discount) !== 100
);

export const setQuoteCalculatedLines = (state, { lines, totals, isSwitchingTaxInclusive }) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      if (shouldCalculateUnitPriceWithTaxInclusiveSwitch(line, isSwitchingTaxInclusive)) {
        const { amount } = lines[index];
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

      return line;
    }),
  },
  totals: {
    ...state.totals,
    subTotal: formatCurrency(totals.subTotal.valueOf()),
    totalTax: formatCurrency(totals.totalTax.valueOf()),
    totalAmount: formatCurrency(totals.totalAmount.valueOf()),
  },
});
