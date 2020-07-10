import getIsExemptionEnabled from '../getIsExemptionEnabled';

describe('isExemptionEnabled', () => {
  const configuration = [
    {
      calculationBasisType: 'PercentOfPayrollCategory',
      enabledPayItemIds: ['2', '3'],
    },
  ];

  it('returns true for PercentOfPayrollCategory, when PayItemId is not 2 or 3', () => {
    const calculationBasisType = 'PercentOfPayrollCategory';
    const calculationBasisPayItemId = '6';

    const result = getIsExemptionEnabled(
      calculationBasisType,
      calculationBasisPayItemId,
      configuration
    );

    expect(result).toEqual(false);
  });

  it('returns false for PercentOfPayrollCategory, when PayItemId is 2 or 3', () => {
    const calculationBasisType = 'PercentOfPayrollCategory';
    const calculationBasisPayItemId = '2';

    const result = getIsExemptionEnabled(
      calculationBasisType,
      calculationBasisPayItemId,
      configuration
    );

    expect(result).toEqual(true);
  });

  it('returns false if calculationBasisType is not found in the configuration', () => {
    const calculationBasisType = 'NotAvailable';
    const calculationBasisPayItemId = '10';

    const result = getIsExemptionEnabled(
      calculationBasisType,
      calculationBasisPayItemId,
      configuration
    );

    expect(result).toEqual(false);
  });
});
