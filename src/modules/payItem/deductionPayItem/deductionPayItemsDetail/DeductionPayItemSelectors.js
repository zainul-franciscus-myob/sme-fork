import { createSelector, createStructuredSelector } from 'reselect';

export const getDetails = state => state.details;

export const getRegion = state => state.region;

export const getIsCreating = state => state.payItemId === 'new';

export const getIsLoading = state => state.isLoading;

export const getPayItemId = state => state.payItemId;

export const getIsSubmitting = state => state.isSubmitting;

export const getTitle = state => state.title;

export const getModalType = state => state.modalType;

export const getIsPageEdited = state => state.isPageEdited;

export const getBusinessId = state => state.businessId;

export const getIsCalculationPercentage = state => state.information.calculationBasis === 'Percent';
export const getIsCalculationDollar = state => state.information.calculationBasis === 'FixedDollar';

export const getIsLimitDollar = state => state.information.limit === 'FixedDollar';
export const getIsLimitPercentage = state => state.information.limit === 'Percent';

export const getAlert = state => state.alert;

const getInformation = state => state.information;

const getSelectedCalcPercentOfOption = (
  { information: { calculationPercentOfId, calculationPercentOfOptions } },
) => calculationPercentOfOptions
  .find(option => option.id === calculationPercentOfId) || {};

const getSelectedLimitPercentOfOption = (
  { information: { limitPercentOfId, limitPercentOfOptions } },
) => limitPercentOfOptions
  .find(option => option.id === limitPercentOfId) || {};

export const getInformationViewData = createSelector(
  getInformation,
  getSelectedCalcPercentOfOption,
  getSelectedLimitPercentOfOption,
  getIsCalculationPercentage,
  getIsCalculationDollar,
  getIsLimitDollar,
  getIsLimitPercentage,
  (
    information,
    selectedCalculationPercentOfOption,
    selectedLimitPercentOfOption,
    isCalculationPercentage,
    isCalculationDollar,
    isLimitDollar,
    isLimitPercentage,
  ) => ({
    ...information,
    selectedCalculationPercentOfOption,
    selectedLimitPercentOfOption,
    isCalculationPercentage,
    isCalculationDollar,
    isLimitDollar,
    isLimitPercentage,
  }),
);

const getSelectedEmployees = state => state.employeeAllocations.selectedEmployees;
const getFilteredListOfEmployees = createSelector(
  state => state.employeeAllocations.employees,
  getSelectedEmployees,
  (employees, selectedEmployees) => employees.filter(
    ({ id }) => !selectedEmployees.find((employee => employee.id === id)),
  ),
);

export const getEmployeeAllocations = createStructuredSelector({
  selectedEmployees: getSelectedEmployees,
  filteredListOfEmployees: getFilteredListOfEmployees,
});

const getSelectedExemptions = state => state.exemptionAllocations.selectedExemptions;
const getFilteredListOfExemptions = createSelector(
  state => state.exemptionAllocations.exemptions,
  getSelectedExemptions,
  (exemptions, selectedExemptions) => exemptions.filter(
    ({ id }) => !selectedExemptions.find(exemption => exemption.id === id),
  ),
);

export const getExemptionAllocations = createStructuredSelector({
  selectedExemptions: getSelectedExemptions,
  filteredListOfExemptions: getFilteredListOfExemptions,
});

export const getSaveDeductionPayItemPayload = state => ({
  name: state.details.name,
  linkedPayableAccountId: state.details.linkedPayableAccountId,
  atoReportingCategory: state.details.atoReportingCategory,
  calculationBasis: state.information.calculationBasis,
  calculationPercentage: state.information.calculationPercentage,
  calculationPercentOfId: state.information.calculationPercentOfId,
  calculationPercentOfType: state.information.calculationPercentOfOptions.find(
    option => option.id === state.information.calculationPercentOfId,
  ).itemType,
  calculationDollars: state.information.calculationDollars,
  calculationPer: state.information.calculationPer,
  limit: state.information.limit,
  limitPercentage: state.information.limitPercentage,
  limitPercentOfId: state.information.limitPercentOfId,
  limitPercentOfType: state.information.limitPercentOfOptions.find(
    option => option.id === state.information.limitPercentOfId,
  ).itemType,
  limitDollars: state.information.limitDollars,
  limitPer: state.information.limitPer,
  selectedEmployees: state.employeeAllocations.selectedEmployees,
  selectedExemptions: state.exemptionAllocations.selectedExemptions,
});
