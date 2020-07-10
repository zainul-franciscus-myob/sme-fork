import { createSelector } from 'reselect';

import isExemptionEnabled from '../../isExemptionEnabled';

export const getExpensePayItemModal = (state) => state.expensePayItemModal;

export const getExpensePayItemModalId = (state) =>
  getExpensePayItemModal(state).id;

export const getIsExpensePayItemModalCreating = (state) =>
  getExpensePayItemModal(state).id === 'new';

const getTitle = (state) => getExpensePayItemModal(state).title;

export const getModalTitle = createSelector(
  getIsExpensePayItemModalCreating,
  getTitle,
  (isCreating, title) =>
    isCreating ? 'Create expense pay item' : title || 'Expense pay item'
);

export const getAlert = (state) => getExpensePayItemModal(state).alert;

export const getIsLoading = (state) => getExpensePayItemModal(state).isLoading;

export const getIsActionDisabled = (state) =>
  getExpensePayItemModal(state).isSubmitting;

export const getName = (state) => getExpensePayItemModal(state).name;

export const getLinkedExpenseAccountOptions = (state) =>
  getExpensePayItemModal(state).linkedExpenseAccountOptions;

export const getLinkedPayablesAccountOptions = (state) =>
  getExpensePayItemModal(state).linkedPayablesAccountOptions;

export const getLinkedExpenseAccountId = (state) =>
  getExpensePayItemModal(state).linkedExpenseAccountId;

export const getLinkedPayablesAccountId = (state) =>
  getExpensePayItemModal(state).linkedPayablesAccountId;

export const getIsPrintOnPaySlip = (state) =>
  getExpensePayItemModal(state).isPrintOnPaySlip;

export const getThreshold = (state) => getExpensePayItemModal(state).threshold;

export const getCalculationBasis = (state) =>
  getExpensePayItemModal(state).calculationBasis;

export const getCalculationBasisPercentage = (state) =>
  getExpensePayItemModal(state).calculationBasisPercentage;

export const getCalculationBasisPayItemId = (state) =>
  getExpensePayItemModal(state).calculationBasisPayItemId;

export const getCalculationBasisAmount = (state) =>
  getExpensePayItemModal(state).calculationBasisAmount;

export const getCalculationBasisPeriod = (state) =>
  getExpensePayItemModal(state).calculationBasisPeriod;

export const getCalculationBasisPayItemOptions = (state) =>
  getExpensePayItemModal(state).calculationBasisPayItemOptions;

export const getPeriodOptions = (state) =>
  getExpensePayItemModal(state).periodOptions;

export const getLimit = (state) => getExpensePayItemModal(state).limit;

export const getLimitPercentage = (state) =>
  getExpensePayItemModal(state).limitPercentage;

export const getLimitPayItemId = (state) =>
  getExpensePayItemModal(state).limitPayItemId;

export const getLimitAmount = (state) =>
  getExpensePayItemModal(state).limitAmount;

export const getLimitPeriod = (state) =>
  getExpensePayItemModal(state).limitPeriod;

export const getLimitPayItemOptions = (state) =>
  getExpensePayItemModal(state).limitPayItemOptions;

export const getAllocatedEmployees = (state) =>
  getExpensePayItemModal(state).allocatedEmployees;

export const getEmployeeOptions = (state) =>
  getExpensePayItemModal(state).employeeOptions;

export const getUnallocatedEmployeeOptions = createSelector(
  (state) => getExpensePayItemModal(state).employeeOptions,
  getAllocatedEmployees,
  (employeeOptions, allocatedEmployees) =>
    employeeOptions.reduce((accumulator, employee) => {
      const found = allocatedEmployees.find(
        (allocatedEmployee) => allocatedEmployee.id === employee.id
      );

      if (found) {
        return accumulator;
      }

      return [...accumulator, employee];
    }, [])
);

export const getEnabledExemptionFieldConfiguration = (state) =>
  getExpensePayItemModal(state).enabledExemptionFieldConfiguration;

export const getIsExemptionEnabled = createSelector(
  getCalculationBasis,
  getCalculationBasisPayItemId,
  getEnabledExemptionFieldConfiguration,
  (calculationBasis, payItemId, configuration) =>
    isExemptionEnabled(calculationBasis, payItemId, configuration)
);

export const getExemptionPayItems = (state) =>
  getExpensePayItemModal(state).exemptionPayItems;

export const getExemptionPayItemOptions = (state) =>
  getExpensePayItemModal(state).exemptionPayItemOptions;

export const getUnaddedExemptionPayItemOptions = createSelector(
  (state) => getExpensePayItemModal(state).exemptionPayItemOptions,
  getExemptionPayItems,
  (exemptionPayItemOptions, exemptionPayItems) =>
    exemptionPayItemOptions.reduce((accumulator, exemption) => {
      const found = exemptionPayItems.find(
        (selectedExemption) => selectedExemption.id === exemption.id
      );

      if (found) {
        return accumulator;
      }

      return [...accumulator, exemption];
    }, [])
);

export const getIsSubmitting = (state) =>
  getExpensePayItemModal(state).isSubmitting;

export const getIsCreating = (state) =>
  getExpensePayItemModal(state).expensePayItemId === 'new';

const getPayItemMappedType = (payItems, payItemId) =>
  payItems.find((payItem) => payItem.id === payItemId).mappedType;

export const getSaveExpensePayItemModalPayload = (state) => {
  const {
    name,
    linkedExpenseAccountId,
    linkedPayablesAccountId,
    isPrintOnPaySlip,
    calculationBasis,
    calculationBasisPercentage,
    calculationBasisPayItemId,
    calculationBasisAmount,
    calculationBasisPeriod,
    limit,
    limitPercentage,
    limitPayItemId,
    limitAmount,
    limitPeriod,
    threshold,
  } = getExpensePayItemModal(state);

  return {
    name,
    linkedExpenseAccountId,
    linkedPayablesAccountId,
    isPrintOnPaySlip,
    calculationBasis,
    calculationBasisPercentage,
    calculationBasisPayItemId,
    calculationBasisPayItemMappedType: getPayItemMappedType(
      getExpensePayItemModal(state).calculationBasisPayItemOptions,
      getExpensePayItemModal(state).calculationBasisPayItemId
    ),
    calculationBasisAmount,
    calculationBasisPeriod,
    limit,
    limitPercentage,
    limitPayItemId,
    limitPayItemMappedType: getPayItemMappedType(
      getExpensePayItemModal(state).limitPayItemOptions,
      getExpensePayItemModal(state).limitPayItemId
    ),
    limitAmount,
    limitPeriod,
    threshold,
    allocatedEmployees: getAllocatedEmployees(state).map((employee) => ({
      id: employee.id,
    })),
    exemptionPayItems: getExemptionPayItems(state).map((payItem) => ({
      id: payItem.id,
      mappedType: payItem.mappedType,
    })),
  };
};
