import Decimal from 'decimal.js';

const calculateTotalTax = (lines) =>
  lines.reduce(
    (totalTax, line) => totalTax.plus(line.taxAmount || Decimal(0)),
    Decimal(0)
  );

const calculateTotalAmount = (lines) =>
  lines.reduce(
    (totalAmount, line) =>
      totalAmount
        .plus(line.taxExclusiveAmount || Decimal(0))
        .plus(line.taxAmount || Decimal(0)),
    Decimal(0)
  );

const calculateLineTotals = ({ isTaxInclusive, lines }) => {
  const totalTax = calculateTotalTax(lines);
  const totalAmount = calculateTotalAmount(lines);
  const subTotal = isTaxInclusive ? totalAmount : totalAmount.minus(totalTax);
  return {
    totalTax,
    totalAmount,
    subTotal,
  };
};

export default calculateLineTotals;
