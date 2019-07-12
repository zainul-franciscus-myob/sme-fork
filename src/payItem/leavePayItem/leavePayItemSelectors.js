import { createSelector, createStructuredSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getAlert = state => state.alert;
export const getIsLoading = state => state.isLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getIsPageEdited = state => state.isPageEdited;
export const getModalType = state => state.modalType;
export const getLeavePayItemId = state => state.leavePayItemId;
export const getIsCreating = state => state.leavePayItemId === 'new';

export const getName = state => state.leavePayItem.name;
export const getTitle = state => state.leavePayItem.title;
export const getPrintOnPaySlip = state => state.leavePayItem.printOnPaySlip;
export const getCarryRemainingLeave = state => state.leavePayItem.carryRemainingLeave;

export const getLeavePayItemEmployees = state => state.leavePayItem.selectedEmployees;
export const getSelectedExemptions = state => state.leavePayItem.selectedExemptions;
export const getSelectedLinkedWages = state => state.leavePayItem.selectedLinkedWages;

export const getShowExemptions = state => state.leavePayItem.calculationBasisType !== 'UserEntered';

export const getFilteredEmployees = createSelector(
  state => state.employees,
  state => state.leavePayItem.selectedEmployees,
  (employees, selectedEmployees) => employees.filter(employee => !selectedEmployees.find(
    selectedEmployee => selectedEmployee.id === employee.id,
  )),
);

export const getFilteredExemptions = createSelector(
  state => state.exemptionOptions,
  state => state.leavePayItem.selectedExemptions,
  (
    exemptionOptions,
    selectedExemptions,
  ) => exemptionOptions.filter(exemption => !selectedExemptions.find(
    selectedExemption => selectedExemption.id === exemption.id,
  )),
);

export const getFilteredLinkedWages = createSelector(
  state => state.linkedWagesOptions,
  state => state.leavePayItem.selectedLinkedWages,
  (
    linkedWagesOptions,
    selectedLinkedWages,
  ) => linkedWagesOptions.filter(linkedWages => !selectedLinkedWages.find(
    selectedLinkWage => selectedLinkWage.id === linkedWages.id,
  )),
);

export const getCalculationBasis = createStructuredSelector({
  calculationBasisType: state => state.leavePayItem.calculationBasisType,
  calculationBasisPercentage: state => state.leavePayItem.calculationBasisPercentage,
  calculationBasisPayItemId: state => state.leavePayItem.calculationBasisPayItemId,
  calculationBasisAmount: state => state.leavePayItem.calculationBasisAmount,
  calculationBasisPeriod: state => state.leavePayItem.calculationBasisPeriod,
  calculationBasisTypes: state => state.calculationBasisTypes,
  calculationBasisPercentOfOptions: state => state.calculationBasisPercentOfOptions,
  payPeriods: state => state.payPeriods,
  showPercentage: state => state.leavePayItem.calculationBasisType === 'Percent',
  showAmount: state => state.leavePayItem.calculationBasisType === 'FixedHour',
});

export const getLeavePayItemPayload = (state) => {
  const calculationBasisPayItem = state.calculationBasisPercentOfOptions.find(
    ({ id }) => id === state.leavePayItem.calculationBasisPayItemId,
  ) || {};

  return {
    name: state.leavePayItem.name,
    printOnPaySlip: state.leavePayItem.printOnPaySlip,
    carryRemainingLeave: state.leavePayItem.carryRemainingLeave,
    calculationBasisType: state.leavePayItem.calculationBasisType,
    calculationBasisPercentage: state.leavePayItem.calculationBasisPercentage,
    calculationBasisPayItemId: state.leavePayItem.calculationBasisPayItemId,
    calculationBasisPayItemType: calculationBasisPayItem.mappedType,
    calculationBasisAmount: state.leavePayItem.calculationBasisAmount,
    calculationBasisPeriod: state.leavePayItem.calculationBasisPeriod,
    selectedExemptions: getShowExemptions(state) ? state.leavePayItem.selectedExemptions : [],
    selectedEmployees: state.leavePayItem.selectedEmployees.map(({ id }) => id),
    selectedLinkedWages: state.leavePayItem.selectedLinkedWages.map(({ id }) => id),
  };
};
