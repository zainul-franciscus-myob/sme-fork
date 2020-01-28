import Decimal from 'decimal.js';

import {
  getLayout, getLines,
} from '../selectors/invoiceDetailSelectors';
import InvoiceLayout from '../InvoiceLayout';
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
    .times(100)
    .valueOf()
    .valueOf();
};

const calculateUnitPrice = (units, amount) => Decimal(amount).div(units);

const shouldCalculateAmount = key => ['units', 'unitPrice', 'discount'].includes(key);

const shouldCalculateDiscount = (key, unitPrice) => key === 'amount' && unitPrice !== 0;

const shouldCalculateUnitPrice = (key, unitPrice) => key === 'amount' && unitPrice === 0;

const shouldRemoveDiscount = (key, units) => key === 'amount' && units === 0;

const buildItemLine = (line, key) => {
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
      displayDiscount: '0.00',
    };
  }

  if (shouldCalculateUnitPrice(key, unitPrice)) {
    const calculatedUnitPrice = calculateUnitPrice(units, amount).valueOf();
    return {
      ...updatedLine,
      discount: '',
      unitPrice: calculatedUnitPrice,
      displayUnitPrice: formatAmount(calculatedUnitPrice),
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

const buildServiceLine = line => ({
  ...line,
  displayAmount: formatAmount(line.amount),
});

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
        if (layout === InvoiceLayout.ITEM) {
          return buildItemLine(line, key);
        }
        return buildServiceLine(line);
      }),
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

  return unitPrice;
};

export const calculateLineTotals = (state, { taxCalculations: { lines, totals } }) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
      const { amount } = lines[index];
      const { unitPrice, units, discount } = line;
      const calculatedUnitPrice = getUnitPrice(
        Number(units),
        amount,
        Number(discount),
        unitPrice,
      );
      return {
        ...line,
        amount: amount.valueOf(),
        displayAmount: formatAmount(amount.valueOf()),
        unitPrice: calculatedUnitPrice.valueOf(),
        displayUnitPrice: formatAmount(calculatedUnitPrice.valueOf()),
      };
    }),
  },
  totals: {
    ...state.totals,
    subTotal: totals.subTotal.valueOf(),
    totalTax: totals.totalTax.valueOf(),
    totalAmount: totals.totalAmount.valueOf(),
  },
});
