import Decimal from 'decimal.js';

const getAmount = (isTaxInclusive, amount, taxAmount) => {
  if (isTaxInclusive) {
    return amount.add(taxAmount);
  }
  return amount;
};

const buildTaxCalculationResults = ({ isTaxInclusive, taxCalculations, buildTotals }) => {
  const lines = taxCalculations.Lines.map(({ Amount, TaxTransaction = {}, IsCredit }) => ({
    taxExclusiveAmount: Amount,
    taxAmount: TaxTransaction.EffectiveTaxAmount || Decimal(0),
    amount: getAmount(
      isTaxInclusive,
      Amount,
      TaxTransaction.EffectiveTaxAmount || Decimal(0),
    ),
    isCredit: IsCredit,
  }));
  const totals = buildTotals({ isTaxInclusive, lines });
  return {
    lines,
    totals,
  };
};


export default buildTaxCalculationResults;
