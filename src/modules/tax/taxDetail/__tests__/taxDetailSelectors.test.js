import {
  getIsGstReturnShown,
  getLinkedContactLabel,
  getTaxCodeLabel,
  getTaxCollectedAccountLabel,
  getTaxPaidAccountLabel,
  getTaxTypeLabel,
} from '../taxDetailSelectors';

describe('taxDetailSelectors', () => {
  describe('getIsGstReturnShown', () => {
    it('should be true when nz region', () => {
      const state = { region: 'nz' };
      const actual = getIsGstReturnShown(state);

      expect(actual).toEqual(true);
    });
    it('should be false when au region', () => {
      const state = { region: 'au' };
      const actual = getIsGstReturnShown(state);

      expect(actual).toEqual(false);
    });
  });

  describe('getTaxCodeLabel', () => {
    it('GST when nz region', () => {
      const state = { region: 'nz' };
      const expected = 'GST code';
      const actual = getTaxCodeLabel(state);

      expect(actual).toEqual(expected);
    });
    it('Tax when au region', () => {
      const state = { region: 'au' };
      const expected = 'Tax code';
      const actual = getTaxCodeLabel(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTaxTypeLabel', () => {
    it('GST when nz region', () => {
      const state = { region: 'nz' };
      const expected = 'GST type';
      const actual = getTaxTypeLabel(state);

      expect(actual).toEqual(expected);
    });
    it('Tax when au region', () => {
      const state = { region: 'au' };
      const expected = 'Tax type';
      const actual = getTaxTypeLabel(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTaxCollectedAccountLabel', () => {
    it('when isWithholding', () => {
      const state = { isWithholding: true };
      const expected = 'Account for withholding credits';
      const actual = getTaxCollectedAccountLabel(state);

      expect(actual).toEqual(expected);
    });
    it('when not isWithholding', () => {
      const state = { isWithholding: false };
      const expected = 'Linked account for tax collected';
      const actual = getTaxCollectedAccountLabel(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTaxPaidAccountLabel', () => {
    it('when isDutyTax', () => {
      const state = { isDutyTax: true, isWithholding: false };
      const expected = 'Linked account for accrued duty';
      const actual = getTaxPaidAccountLabel(state);

      expect(actual).toEqual(expected);
    });
    it('when isWithholding', () => {
      const state = { isDutyTax: false, isWithholding: true };
      const expected = 'Account for withholdings payable';
      const actual = getTaxPaidAccountLabel(state);

      expect(actual).toEqual(expected);
    });
    it('when not isWithholding not isDutyTax', () => {
      const state = { isDutyTax: false, isWithholding: false };
      const expected = 'Linked account for tax paid';
      const actual = getTaxPaidAccountLabel(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getLinkedContactLabel', () => {
    it('when isDutyTax', () => {
      const state = { isDutyTax: true, isWithholding: false };
      const expected = 'Linked contact for import agent';
      const actual = getLinkedContactLabel(state);

      expect(actual).toEqual(expected);
    });
    it('when not isDutyTax', () => {
      const state = { isDutyTax: false, isWithholding: true };
      const expected = 'Linked contact for tax authority';
      const actual = getLinkedContactLabel(state);

      expect(actual).toEqual(expected);
    });
  });
});
