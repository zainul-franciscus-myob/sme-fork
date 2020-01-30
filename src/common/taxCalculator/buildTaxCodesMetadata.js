import Decimal from 'decimal.js';

const CodeTypes = {
  Consolidated: 0,
  ImportDuty: 1,
  SalesTax: 2,
  GST_VAT: 3,
  InputTaxed: 4,
  QST: 5,
  LuxuryCarTax: 6,
  WithholdingsTax: 7,
  NoABN_TFN: 8,
};

const RoundingMethods = {
  None: 0,
  RoundDownNearestDollar: 1,
  RoundMoney: 2,
  Truncate: 3,
};

const CalculationMethods = {
  None: 0,
  BasicConsolidated: 1,
  BasicProportional: 2,
  ConsolidatedPostEvent: 3,
  ConsolidatedThreshold: 4,
  ProportionalPostEvent: 5,
  ProportionalThreshold: 6,
};

const buildTaxCodeMetadata = ({
  id,
  displayName,
  codeType,
  rate = 0,
  threshold,
  childrenCalculationCollection = [],
  calculationMethod,
  roundingMethod,
  collectedBehaviour,
  payedBehaviour,
  isWithholding,
  thresholdRate,
  includeInGstReturn,
}) => ({
  Id: id,
  Code: displayName,
  CodeType: CodeTypes[codeType],
  Rate: Decimal(isWithholding ? Math.abs(Number(rate)) : rate),
  Threshold: Decimal(threshold),
  ChildrenCalculationCollection: childrenCalculationCollection.map(
    childTaxCode => buildTaxCodeMetadata(childTaxCode),
  ),
  CalculationMethod: CalculationMethods[calculationMethod],
  RoundingMethod: RoundingMethods[roundingMethod],
  CollectedBehaviour: Number(collectedBehaviour),
  PayedBehaviour: Number(payedBehaviour),
  IsWithholding: isWithholding,
  ThresholdRate: Decimal(thresholdRate),
  IncludeInGstReturn: includeInGstReturn,
});

const buildTaxCodesMetadata = taxCodes => (
  taxCodes.reduce((results, taxCode) => ({
    ...results,
    [taxCode.id]: buildTaxCodeMetadata(taxCode),
  }), {})
);


export default buildTaxCodesMetadata;
