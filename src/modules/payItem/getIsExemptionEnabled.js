const getIsExemptionEnabled = (
  calculationBasisType,
  calculationBasisPayItemId,
  configuration
) => {
  const exemptionConfiguration = configuration.filter(
    (e) => e.calculationBasisType === calculationBasisType
  );

  if (!exemptionConfiguration.length) return false;

  return exemptionConfiguration[0].enabledPayItemIds.includes(
    calculationBasisPayItemId
  );
};

export default getIsExemptionEnabled;
