import Decimal from 'decimal.js';

import { getLayout, getLines } from '../selectors/invoiceDetailSelectors';
import InvoiceLayout from '../InvoiceLayout';
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

const buildItemLine = (line, key) => {
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

const shouldCalculateUnitPriceWithTaxInclusiveSwitch = (line, isSwitchingTaxInclusive) => (
  isSwitchingTaxInclusive
  && Number(line.units) !== 0
  && Number(line.discount) !== 100
);

export const calculateLineTotals = (
  state,
  { taxCalculations: { lines, totals }, isSwitchingTaxInclusive },
) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
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
    subTotal: totals.subTotal.valueOf(),
    totalTax: totals.totalTax.valueOf(),
    totalAmount: totals.totalAmount.valueOf(),
  },
});
