const isExemptionEnabled = (calculationBasis, payItemId, configuration) => {
  const foundCalculationBasisConfig = configuration && configuration.find(
    configItem => configItem.calculationBasisType === calculationBasis,
  );

  return Boolean(foundCalculationBasisConfig)
   && foundCalculationBasisConfig.enabledPayItemIds.includes(payItemId);
};

export default isExemptionEnabled;
