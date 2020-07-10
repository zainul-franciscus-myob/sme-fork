import calculateAmount from './calculateAmount';
import calculateDiscount from './calculateDiscount';
import calculateUnitPrice from './calculateUnitPrice';
import formatDisplayAmount from '../valueFormatters/formatTaxCalculation/formatDisplayAmount';
import formatDisplayDiscount from '../valueFormatters/formatTaxCalculation/formatDisplayDiscount';
import formatDisplayUnitPrice from '../valueFormatters/formatTaxCalculation/formatDisplayUnitPrice';

const shouldCalculateAmount = (line, key) =>
  ['units', 'unitPrice', 'discount'].includes(key) &&
  line.units !== '' &&
  line.unitPrice !== '';

const shouldCalculateDiscount = (line, key) =>
  key === 'amount' &&
  Number(line.units) !== 0 &&
  Number(line.unitPrice) !== 0 &&
  line.amount !== '';

const shouldCalculateUnitPrice = (line, key) =>
  key === 'amount' &&
  Number(line.units) !== 0 &&
  Number(line.unitPrice) === 0 &&
  Number(line.discount) !== 100 &&
  line.amount !== '';

const buildLineWithCalculatedAmounts = (line, key) => {
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

export default buildLineWithCalculatedAmounts;
