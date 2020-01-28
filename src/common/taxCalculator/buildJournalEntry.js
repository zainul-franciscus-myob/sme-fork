import Decimal from 'decimal.js';

const buildJournalEntry = ({
  calculatedLines,
  currentLine,
  effectiveTaxAmount,
}) => {
  const amount = Decimal(currentLine.amount || 0);
  const units = Number(currentLine.units || 1);
  const { lineTypeId } = currentLine;
  const line = {
    Amount: amount,
    UnitCount: units,
    LineType: Number(lineTypeId),
    AmountForeign: null,
  };
  return {
    Lines: [
      ...calculatedLines,
      line,
    ],
    EffectiveTaxAmount: effectiveTaxAmount,
  };
};

export default buildJournalEntry;
