import TaxTypes, {
  hasChildrenTaxCodes,
  hasLinkedContact,
  hasLuxuryCarTaxThreshold,
  hasTaxCollectedAccount,
  hasTaxPaidAccount,
  hasTaxRate,
} from '../TaxTypes';

describe('taxDetailSelectors', () => {
  describe('hasTaxRate', () => {
    it.each([
      [false, TaxTypes.Consolidated],
      [true, TaxTypes.Unknown],
      [true, TaxTypes.ImportDuty],
      [true, TaxTypes.SalesTax],
      [true, TaxTypes.GST_VAT],
      [true, TaxTypes.InputTaxed],
      [true, TaxTypes.LuxuryCarTax],
      [true, TaxTypes.WithholdingsTax],
      [true, TaxTypes.NoABN_TFN],
    ])('%s if %s', (expected, type) => {
      const actual = hasTaxRate(type);
      expect(actual).toEqual(expected);
    });
  });

  describe('hasChildrenTaxCodes', () => {
    it.each([
      [true, TaxTypes.Consolidated],
      [false, TaxTypes.Unknown],
      [false, TaxTypes.ImportDuty],
      [false, TaxTypes.SalesTax],
      [false, TaxTypes.GST_VAT],
      [false, TaxTypes.InputTaxed],
      [false, TaxTypes.LuxuryCarTax],
      [false, TaxTypes.WithholdingsTax],
      [false, TaxTypes.NoABN_TFN],
    ])('%s if %s', (expected, type) => {
      const actual = hasChildrenTaxCodes(type);
      expect(actual).toEqual(expected);
    });
  });

  describe('hasLuxuryCarTaxThreshold', () => {
    it.each([
      [true, TaxTypes.LuxuryCarTax],
      [false, TaxTypes.Consolidated],
      [false, TaxTypes.Unknown],
      [false, TaxTypes.ImportDuty],
      [false, TaxTypes.SalesTax],
      [false, TaxTypes.GST_VAT],
      [false, TaxTypes.InputTaxed],
      [false, TaxTypes.WithholdingsTax],
      [false, TaxTypes.NoABN_TFN],
    ])('%s if %s', (expected, type) => {
      const actual = hasLuxuryCarTaxThreshold(type);
      expect(actual).toEqual(expected);
    });
  });

  describe('hasTaxCollectedAccount', () => {
    it.each([
      [false, TaxTypes.Consolidated],
      [false, TaxTypes.ImportDuty],
      [false, TaxTypes.InputTaxed],
      [true, TaxTypes.Unknown],
      [true, TaxTypes.SalesTax],
      [true, TaxTypes.GST_VAT],
      [true, TaxTypes.LuxuryCarTax],
      [true, TaxTypes.WithholdingsTax],
      [true, TaxTypes.NoABN_TFN],
    ])('%s if %s', (expected, type) => {
      const actual = hasTaxCollectedAccount(type);
      expect(actual).toEqual(expected);
    });
  });

  describe('hasLinkedContact', () => {
    it.each([
      [false, TaxTypes.Consolidated],
      [false, TaxTypes.InputTaxed],
      [true, TaxTypes.ImportDuty],
      [true, TaxTypes.Unknown],
      [true, TaxTypes.SalesTax],
      [true, TaxTypes.GST_VAT],
      [true, TaxTypes.LuxuryCarTax],
      [true, TaxTypes.WithholdingsTax],
      [true, TaxTypes.NoABN_TFN],
    ])('%s if %s', (expected, type) => {
      const actual = hasLinkedContact(type);
      expect(actual).toEqual(expected);
    });
  });

  describe('hasTaxPaidAccount', () => {
    it.each([
      [false, TaxTypes.Consolidated],
      [false, TaxTypes.InputTaxed],
      [false, TaxTypes.LuxuryCarTax],
      [false, TaxTypes.SalesTax],
      [true, TaxTypes.ImportDuty],
      [true, TaxTypes.Unknown],
      [true, TaxTypes.GST_VAT],
      [true, TaxTypes.WithholdingsTax],
      [true, TaxTypes.NoABN_TFN],
    ])('%s if %s', (expected, type) => {
      const actual = hasTaxPaidAccount(type);
      expect(actual).toEqual(expected);
    });
  });
});
