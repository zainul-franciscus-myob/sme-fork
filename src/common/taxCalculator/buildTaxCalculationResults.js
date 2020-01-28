import Decimal from 'decimal.js';

const calculateTotalTax = lines => lines.reduce(
  (totalTax, line) => totalTax.plus(line.taxAmount), Decimal(0),
);

const calculateTotalAmount = lines => lines.reduce(
  (totalAmount, line) => totalAmount.plus(line.taxExclusiveAmount).plus(line.taxAmount),
  Decimal(0),
);

const calculateTotals = (isTaxInclusive, lines) => {
  const totalTax = calculateTotalTax(lines);
  const totalAmount = calculateTotalAmount(lines);
  const subTotal = isTaxInclusive ? totalAmount : totalAmount.minus(totalTax);

  return {
    totalTax,
    totalAmount,
    subTotal,
  };
};

const getAmount = (isTaxInclusive, amount, taxAmount) => {
  if (isTaxInclusive) {
    return amount.add(taxAmount);
  }
  return amount;
};

const buildTaxCalculationResults = ({ isTaxInclusive, taxCalculations }) => {
  const lines = taxCalculations.Lines.map(({ Amount, TaxTransaction = {} }) => ({
    taxExclusiveAmount: Amount,
    taxAmount: TaxTransaction.EffectiveTaxAmount || Decimal(0),
    amount: getAmount(
      isTaxInclusive,
      Amount,
      TaxTransaction.EffectiveTaxAmount || Decimal(0),
    ),
  }));
  const totals = calculateTotals(isTaxInclusive, lines);
  return {
    lines,
    totals,
  };
};


export default buildTaxCalculationResults;
