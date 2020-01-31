import Decimal from 'decimal.js';

const calculateTotalTax = lines => lines.reduce(
  (totalTax, line) => (line.isCredit
    ? totalTax.minus(line.taxAmount)
    : totalTax.plus(line.taxAmount)),
  Decimal(0),
);

const isCreditLine = line => line.isCredit;

const isDebitLine = line => !line.isCredit;

const calculateTotalAmountByType = filterByType => lines => (
  lines
    .filter(line => filterByType(line))
    .reduce((sum, line) => sum.plus(line.amount), Decimal(0))
);

const calculateTotalCredit = calculateTotalAmountByType(isCreditLine);

const calculateTotalDebit = calculateTotalAmountByType(isDebitLine);

const calculateCreditDebitTotals = ({ lines }) => {
  const totalTax = calculateTotalTax(lines);
  const totalDebit = calculateTotalDebit(lines);
  const totalCredit = calculateTotalCredit(lines);
  const totalOutOfBalance = totalCredit.minus(totalDebit).abs();
  return {
    totalTax,
    totalDebit,
    totalCredit,
    totalOutOfBalance,
  };
};

export default calculateCreditDebitTotals;
