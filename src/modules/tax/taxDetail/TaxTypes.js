const TaxTypes = {
  Unknown: 'Unknown',
  Consolidated: 'Consolidated',
  ImportDuty: 'Import Duty',
  SalesTax: 'Sales Tax',
  GST_VAT: 'Goods & Services Tax',
  InputTaxed: 'Input Taxed',
  LuxuryCarTax: 'Luxury Car Tax',
  WithholdingsTax: 'Withholdings Tax',
  NoABN_TFN: 'No ABN/TFN',
};

export const hasTaxRate = (taxType) => taxType !== TaxTypes.Consolidated;

export const hasChildrenTaxCodes = (taxType) =>
  taxType === TaxTypes.Consolidated;

export const hasLuxuryCarTaxThreshold = (taxType) =>
  taxType === TaxTypes.LuxuryCarTax;

export const hasLinkedContact = (taxType) =>
  ![TaxTypes.InputTaxed, TaxTypes.Consolidated].includes(taxType);

export const hasTaxCollectedAccount = (taxType) =>
  ![TaxTypes.ImportDuty, TaxTypes.Consolidated, TaxTypes.InputTaxed].includes(
    taxType
  );

export const hasTaxPaidAccount = (taxType) =>
  ![
    TaxTypes.SalesTax,
    TaxTypes.LuxuryCarTax,
    TaxTypes.InputTaxed,
    TaxTypes.Consolidated,
  ].includes(taxType);

export default TaxTypes;
