import Decimal from 'decimal.js';

import { DEFAULT_DISCOUNT, DEFAULT_UNITS } from './getDefaultState';
import { getLayout, getLines } from '../selectors/invoiceDetailSelectors';
import InvoiceLayout from '../InvoiceLayout';
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
    .times(100)
    .valueOf()
    .valueOf();
};

const calculateUnitPrice = (units, amount) => Decimal(amount).div(units);

const shouldPrefillUnits = (key, units) => ['amount', 'discount'].includes(key) && units === '';

const shouldCalculateAmount = (key, unitsStr) => unitsStr !== '' && ['units', 'unitPrice', 'discount'].includes(key);

const shouldCalculateDiscount = (key, unitPrice, units) => key === 'amount' && unitPrice !== 0 && units !== 0;

const shouldCalculateUnitPrice = (key, unitPrice) => key === 'amount' && unitPrice === 0;

const buildItemLine = (line, key) => {
  const unitsStr = shouldPrefillUnits(key, line.units) ? DEFAULT_UNITS : line.units;
  const units = Number(unitsStr);
  const unitPrice = Number(line.unitPrice);
  const amount = unitsStr === '0' ? 0 : Number(line.amount);
  const discount = Number(line.discount);

  const updatedLine = {
    ...line,
    units: formatUnits(units),
    amount: String(amount),
    displayAmount: formatDisplayAmount(amount),
    discount: String(discount),
    displayDiscount: formatDisplayDiscount(discount),
    unitPrice: String(unitPrice),
    displayUnitPrice: formatDisplayUnitPrice(unitPrice),
  };

  if (shouldCalculateUnitPrice(key, unitPrice)) {
    const calculatedUnitPrice = calculateUnitPrice(units, amount).valueOf();
    return {
      ...updatedLine,
      discount: DEFAULT_DISCOUNT,
      displayDiscount: formatDisplayDiscount(DEFAULT_DISCOUNT),
      unitPrice: calculatedUnitPrice,
      displayUnitPrice: formatDisplayUnitPrice(calculatedUnitPrice),
    };
  }

  if (shouldCalculateAmount(key, unitsStr)) {
    const calculatedAmount = calculateAmount(units, unitPrice, discount);
    return {
      ...updatedLine,
      amount: calculatedAmount,
      displayAmount: formatDisplayAmount(calculatedAmount),
    };
  }

  if (shouldCalculateDiscount(key, unitPrice, units)) {
    const calculatedDiscount = calculateDiscount(units, unitPrice, amount);
    return {
      ...updatedLine,
      discount: calculatedDiscount,
      displayDiscount: formatDisplayDiscount(calculatedDiscount),
    };
  }

  return updatedLine;
};

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

        return layout === InvoiceLayout.ITEM_AND_SERVICE
          ? buildItemLine(line, key)
          : line;
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
        displayAmount: formatDisplayAmount(amount.valueOf()),
        unitPrice: calculatedUnitPrice.valueOf(),
        displayUnitPrice: formatDisplayUnitPrice(calculatedUnitPrice.valueOf()),
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
