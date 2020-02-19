import { getFetchTaxTableResultRequestContext, getIsOpen, getOnSaveContent } from '../taxTableCalculationModalSelectors';

describe('taxTableCalculationsSelectors', () => {
  describe('getIsOpen', () => {
    it('retrieves the isOpen value', () => {
      const state = {
        isOpen: true,
      };

      const result = getIsOpen(state);

      expect(result).toEqual(true);
    });
  });

  describe('getFetchTaxTableResultRequestContext', () => {
    it('selects all required fields', () => {
      const expected = {
        hasTFN: true,
        residencyStatus: 'WorkingHoliday',
        hasTaxFreeThreshold: true,
        hasSLFSDebt: true,
        medicareLevy: 'Half',
        seniorTaxOffset: 'Single',
        isWithholdingVariation: true,
        isHortiShearer: true,
      };
      const state = {
        some: true,
        other: 'fields',
        ...expected,
      };

      const result = getFetchTaxTableResultRequestContext(state);

      expect(result).toEqual(expected);
    });
  });

  describe('getOnSaveContent', () => {
    it('selects all required fields', () => {
      const state = {
        other: 'fields',
        taxTableId: '2',
        taxTableDescription: 'No Tax Free Threshold',
        withholdingVariation: '0.00',
        isWithholdingVariation: false,
      };

      const result = getOnSaveContent(state);

      expect(result).toEqual({
        taxTableId: '2',
        withholdingVariation: null,
      });
    });

    it('includes withholdingVariation if isWithholdingVariation is true', () => {
      const state = {
        other: 'fields',
        taxTableId: '3',
        taxTableDescription: 'Withholding Variation',
        withholdingVariation: '23.23',
        isWithholdingVariation: true,
      };

      const result = getOnSaveContent(state);

      expect(result).toEqual({
        taxTableId: '3',
        withholdingVariation: '23.23',
      });
    });
  });
});
