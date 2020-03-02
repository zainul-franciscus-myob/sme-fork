import isExemptionEnabled from '../isExemptionEnabled';

describe('isExemptionEnabled', () => {
  const configuration = [
    {
      calculationBasisType: 'AnIncludedBasis',
      enabledPayItemIds: ['1'],
    },
  ];

  it('returns false when the basis type is not in the configuration', () => {
    const calculationBasis = 'NotIncluded';
    const payItemId = '1';

    expect(isExemptionEnabled(calculationBasis, payItemId, configuration)).toBe(false);
  });

  it('returns true when the basis type is included in the configuration', () => {
    const calculationBasis = 'AnIncludedBasis';
    const payItemId = '1';

    expect(isExemptionEnabled(calculationBasis, payItemId, configuration)).toBe(true);
  });

  it('returns false when the payItemId is not included in the calculationBasisConfig', () => {
    const calculationBasis = 'AnIncludedBasis';
    const payItemId = '-1';

    expect(isExemptionEnabled(calculationBasis, payItemId, configuration)).toBe(false);
  });

  it('returns false when the configuration is not defined', () => {
    const calculationBasis = 'AnIncludedBasis';
    const payItemId = '1';

    expect(isExemptionEnabled(calculationBasis, payItemId, undefined)).toBe(false);
  });

  it('returns false if no payItemId is passed', () => {
    const calculationBasis = 'AnIncludedBasis';
    const payItemId = null;

    expect(isExemptionEnabled(calculationBasis, payItemId, configuration)).toBe(false);
  });
});
