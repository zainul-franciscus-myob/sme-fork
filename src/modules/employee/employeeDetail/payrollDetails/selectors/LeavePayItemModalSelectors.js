import { createSelector, createStructuredSelector } from 'reselect';

import isExemptionEnabled from '../../isExemptionEnabled';

export const getLeavePayItemModal = state => state.leavePayItemModal;

export const getAlert = state => state.leavePayItemModal.alert;
export const getIsLoading = state => state.leavePayItemModal.isLoading;
export const getIsSubmitting = state => state.leavePayItemModal.isSubmitting;
export const getIsActionDisabled = createSelector(
  getIsSubmitting,
  getIsLoading,
  (isSubmitting, isLoading) => isSubmitting || isLoading,
);

export const getLeavePayItemId = state => state.leavePayItemModal.leavePayItemId;
export const getIsLeavePayItemModalCreating = state => (
  state.leavePayItemModal.leavePayItemId === 'new'
);

export const getName = state => state.leavePayItemModal.leavePayItem.name;
const getTitle = state => state.leavePayItemModal.leavePayItem.title;
export const getModalTitle = createSelector(
  getIsLeavePayItemModalCreating,
  getTitle,
  (isCreating, originalName) => (
    isCreating ? 'Create leave pay item' : (originalName || 'Leave pay item')
  ),
);
export const getPrintOnPaySlip = state => state.leavePayItemModal.leavePayItem.printOnPaySlip;
export const getCarryRemainingLeave = state => (
  state.leavePayItemModal.leavePayItem.carryRemainingLeave
);

export const getLeavePayItemEmployees = state => (
  state.leavePayItemModal.leavePayItem.selectedEmployees
);
export const getSelectedExemptions = state => (
  state.leavePayItemModal.leavePayItem.selectedExemptions
);
export const getSelectedLinkedWages = state => (
  state.leavePayItemModal.leavePayItem.selectedLinkedWages
);

const getCalculationBasisType = state => state.leavePayItemModal.leavePayItem.calculationBasisType;
const getCalculationBasisPayItemId = state => (
  state.leavePayItemModal.leavePayItem.calculationBasisPayItemId
);
const getEnabledExemptionFieldConfiguration = state => (
  state.leavePayItemModal.enabledExemptionFieldConfiguration
);
export const getEnableExemptions = createSelector(
  getCalculationBasisType,
  getCalculationBasisPayItemId,
  getEnabledExemptionFieldConfiguration,
  (type, payItemId, configuration) => isExemptionEnabled(
    type, payItemId, configuration,
  ),
);

export const getFilteredEmployees = createSelector(
  state => state.leavePayItemModal.employees,
  state => state.leavePayItemModal.leavePayItem.selectedEmployees,
  (employees, selectedEmployees) => employees.filter(employee => !selectedEmployees.find(
    selectedEmployee => selectedEmployee.id === employee.id,
  )),
);

export const getFilteredExemptions = createSelector(
  state => state.leavePayItemModal.exemptionOptions,
  state => state.leavePayItemModal.leavePayItem.selectedExemptions,
  (
    exemptionOptions,
    selectedExemptions,
  ) => exemptionOptions.filter(exemption => !selectedExemptions.find(
    selectedExemption => selectedExemption.id === exemption.id,
  )),
);

export const getFilteredLinkedWages = createSelector(
  state => state.leavePayItemModal.linkedWagesOptions,
  state => state.leavePayItemModal.leavePayItem.selectedLinkedWages,
  (
    linkedWagesOptions,
    selectedLinkedWages,
  ) => linkedWagesOptions.filter(linkedWages => !selectedLinkedWages.find(
    selectedLinkWage => selectedLinkWage.id === linkedWages.id,
  )),
);

export const getCalculationBasis = createStructuredSelector({
  calculationBasisType: getCalculationBasisType,
  calculationBasisPercentage: state => (
    state.leavePayItemModal.leavePayItem.calculationBasisPercentage
  ),
  calculationBasisPayItemId: getCalculationBasisPayItemId,
  calculationBasisAmount: state => state.leavePayItemModal.leavePayItem.calculationBasisAmount,
  calculationBasisPeriod: state => state.leavePayItemModal.leavePayItem.calculationBasisPeriod,
  calculationBasisTypes: state => state.leavePayItemModal.calculationBasisTypes,
  calculationBasisPercentOfOptions: state => (
    state.leavePayItemModal.calculationBasisPercentOfOptions
  ),
  payPeriods: state => state.leavePayItemModal.payPeriods,
  showPercentage: state => state.leavePayItemModal.leavePayItem.calculationBasisType === 'PercentOfPayrollCategory',
  showAmount: state => state.leavePayItemModal.leavePayItem.calculationBasisType === 'FixedHours',
});

export const getLeavePayItemPayload = (state) => {
  const calculationBasisPayItem = state.leavePayItemModal.calculationBasisPercentOfOptions.find(
    ({ id }) => id === state.leavePayItemModal.leavePayItem.calculationBasisPayItemId,
  ) || {};

  return {
    name: state.leavePayItemModal.leavePayItem.name,
    printOnPaySlip: state.leavePayItemModal.leavePayItem.printOnPaySlip,
    carryRemainingLeave: state.leavePayItemModal.leavePayItem.carryRemainingLeave,
    calculationBasisType: state.leavePayItemModal.leavePayItem.calculationBasisType,
    calculationBasisPercentage: state.leavePayItemModal.leavePayItem.calculationBasisPercentage,
    calculationBasisPayItemId: state.leavePayItemModal.leavePayItem.calculationBasisPayItemId,
    calculationBasisPayItemType: calculationBasisPayItem.mappedType,
    calculationBasisAmount: state.leavePayItemModal.leavePayItem.calculationBasisAmount,
    calculationBasisPeriod: state.leavePayItemModal.leavePayItem.calculationBasisPeriod,
    selectedExemptions: state.leavePayItemModal.leavePayItem.selectedExemptions,
    selectedEmployees: state.leavePayItemModal.leavePayItem.selectedEmployees.map(({ id }) => id),
    selectedLinkedWages: (
      state.leavePayItemModal.leavePayItem.selectedLinkedWages.map(({ id }) => id)
    ),
  };
};
