export const getIsOpen = state => state.isOpen;
export const getSelectedResidencyStatus = state => state.selectedResidencyStatus;
export const getResidencyStatusOptions = state => state.residencyStatusOptions;
export const getHasTaxFreeThreshold = state => state.hasTaxFreeThreshold;
export const getHasSLFDebt = state => state.hasSLFDebt;
export const getIsHortiShearer = state => state.isHortiShearer;
export const getIsWithholdingVariation = state => state.isWithholdingVariation;
export const getSelectedSeniorTaxOffset = state => state.selectedSeniorTaxOffset;
export const getSeniorTaxOffsetOptions = state => state.seniorTaxOffsetOptions;
export const getSelectedMedicareLevy = state => state.selectedMedicareLevy;
export const getMedicareLevyOptions = state => state.medicareLevyOptions;
export const getWithholdingVariation = state => state.withholdingVariation;
export const getIsLoading = state => state.isLoading;
export const getBusinessId = state => state.businessId;
export const getTaxTableDescription = state => state.taxTableDescription;
export const getTaxTableId = state => state.taxTableId;

export const getOnSaveContent = state => ({
  taxTableId: getTaxTableId(state),
  withholdingVariation: state.isWithholdingVariation ? getWithholdingVariation(state) : null,
});

export const getFetchTaxTableResultRequestContext = state => ({
  hasTFN: state.hasTFN,
  residencyStatus: state.residencyStatus,
  hasTaxFreeThreshold: state.hasTaxFreeThreshold,
  hasSLFSDebt: state.hasSLFSDebt,
  medicareLevy: state.medicareLevy,
  seniorTaxOffset: state.seniorTaxOffset,
  isWithholdingVariation: state.isWithholdingVariation,
  isHortiShearer: state.isHortiShearer,
});
