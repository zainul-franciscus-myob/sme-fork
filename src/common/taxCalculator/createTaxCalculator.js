import Decimal from 'decimal.js';

import buildJournalEntry from './buildJournalEntry';
import buildTaxCalculationResults from './buildTaxCalculationResults';
import buildTaxCodesMetadata from './buildTaxCodesMetadata';

const createTaxCalculator = handler => ({
  isTaxInclusive,
  isLineAmountsTaxInclusive,
  lines,
  taxCodes,
}) => {
  const emptyResult = {
    Lines: [],
    EffectiveTaxAmount: Decimal(0),
  };

  const taxCodesMetadata = buildTaxCodesMetadata(taxCodes);

  const taxCalculations = lines.reduce(({
    Lines,
    EffectiveTaxAmount,
  }, currentLine, index) => {
    const lineTaxCode = taxCodesMetadata[currentLine.taxCodeId];
    const lineAmount = Decimal(currentLine.amount || 0);
    if (lineTaxCode) {
      const journalEntry = buildJournalEntry({
        currentLine,
        calculatedLines: Lines,
        effectiveTaxAmount: EffectiveTaxAmount,
      });

      return handler.setTaxLocally(
        !isLineAmountsTaxInclusive,
        journalEntry,
        index,
        lineTaxCode,
        taxCodesMetadata,
        lineAmount,
      );
    }

    return {
      Lines: [
        ...Lines,
        {
          Amount: lineAmount,
          TaxTransaction: {
            EffectiveTaxAmount: new Decimal(0),
          },
        },
      ],
      EffectiveTaxAmount,
    };
  }, emptyResult);

  return buildTaxCalculationResults({
    taxCalculations,
    isTaxInclusive,
  });
};

export default createTaxCalculator;
