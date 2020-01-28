import Decimal from 'decimal.js';

const CodeTypes = {
  Consolidated: 0,
  ImportDuty: 1,
  SalesTax: 2,
  GST_VAT: 3,
  InputTaxed: 4,
  LuxuryCarTax: 5,
  WithholdingsTax: 6,
  NoABN_TFN: 7,
};

const buildTaxCodesMetadata = taxCodes => (
  taxCodes.reduce((results, {
    id,
    displayName,
    codeType,
    rate,
    threshold,
    childrenCalculationCollection,
    calculationMethod,
    roundingMethod,
    collectedBehaviour,
    payedBehaviour,
    isWithholding,
    thresholdRate,
    includeInGstReturn,
  }) => ({
    ...results,
    [id]: {
      Id: id,
      Code: displayName,
      CodeType: CodeTypes[codeType],
      Rate: Decimal(rate),
      Threshold: Decimal(threshold),
      ChildrenCalculationCollection: childrenCalculationCollection,
      CalculationMethod: calculationMethod,
      RoundingMethod: roundingMethod,
      CollectedBehaviour: Number(collectedBehaviour),
      PayedBehaviour: Number(payedBehaviour),
      IsWithholding: isWithholding,
      ThresholdRate: Decimal(thresholdRate),
      IncludeInGstReturn: includeInGstReturn,
    },
  }), {})
);


export default buildTaxCodesMetadata;
