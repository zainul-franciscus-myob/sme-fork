import { createSelector } from 'reselect';

import getIsExemptionEnabled from '../getIsExemptionEnabled';

export const getModalType = (state) => state.modalType;
export const getAlertMessage = (state) => state.alertMessage;
export const getIsModalShown = (state) => Boolean(getModalType(state));
export const getIsAlertShown = (state) => Boolean(getAlertMessage(state));
export const getLoadingState = (state) => state.loadingState;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsCreating = (state) => state.expensePayItemId === 'new';

export const getBusinessId = (state) => state.businessId;
export const getExpensePayItemId = (state) => state.expensePayItemId;
export const getRegion = (state) => state.region;
export const getName = (state) => state.name;
export const getOriginalName = (state) => state.originalName;
export const getLinkedExpenseAccountOptions = (state) =>
  state.linkedExpenseAccountOptions;
export const getLinkedPayablesAccountOptions = (state) =>
  state.linkedPayablesAccountOptions;
export const getLinkedExpenseAccountId = (state) =>
  state.linkedExpenseAccountId;
export const getLinkedPayablesAccountId = (state) =>
  state.linkedPayablesAccountId;
export const getIsPrintOnPaySlip = (state) => state.isPrintOnPaySlip;
export const getCalculationBasis = (state) => state.calculationBasis;
export const getCalculationBasisPercentage = (state) =>
  state.calculationBasisPercentage;
export const getCalculationBasisPayItemId = (state) =>
  state.calculationBasisPayItemId;
export const getCalculationBasisAmount = (state) =>
  state.calculationBasisAmount;
export const getCalculationBasisPeriod = (state) =>
  state.calculationBasisPeriod;
export const getCalculationBasisPayItemOptions = (state) =>
  state.calculationBasisPayItemOptions;
export const getLimit = (state) => state.limit;
export const getLimitPercentage = (state) => state.limitPercentage;
export const getLimitPayItemId = (state) => state.limitPayItemId;
export const getLimitAmount = (state) => state.limitAmount;
export const getLimitPeriod = (state) => state.limitPeriod;
export const getLimitPayItemOptions = (state) => state.limitPayItemOptions;
export const getPeriodOptions = (state) => state.periodOptions;
export const getThreshold = (state) => state.threshold;
export const getAllocatedEmployees = (state) => state.allocatedEmployees;
export const getEmployeeOptions = createSelector(
  (state) => state.employeeOptions,
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
export const getExemptionPayItems = (state) => state.exemptionPayItems;
export const getExemptionPayItemOptions = createSelector(
  (state) => state.exemptionPayItemOptions,
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
export const getCreateExpensePayItemUrlParams = (state) => ({
  businessId: getBusinessId(state),
});

const getPayItemMappedType = (payItems, payItemId) =>
  payItems.find((payItem) => payItem.id === payItemId).mappedType;

export const getSaveExpensePayItemContent = (state) => ({
  name: state.name,
  linkedExpenseAccountId: state.linkedExpenseAccountId,
  linkedPayablesAccountId: state.linkedPayablesAccountId,
  isPrintOnPaySlip: state.isPrintOnPaySlip,
  calculationBasis: state.calculationBasis,
  calculationBasisPercentage: state.calculationBasisPercentage,
  calculationBasisPayItemId: state.calculationBasisPayItemId,
  calculationBasisPayItemMappedType: getPayItemMappedType(
    state.calculationBasisPayItemOptions,
    state.calculationBasisPayItemId
  ),
  calculationBasisAmount: state.calculationBasisAmount,
  calculationBasisPeriod: state.calculationBasisPeriod,
  limit: state.limit,
  limitPercentage: state.limitPercentage,
  limitPayItemId: state.limitPayItemId,
  limitPayItemMappedType: getPayItemMappedType(
    state.limitPayItemOptions,
    state.limitPayItemId
  ),
  limitAmount: state.limitAmount,
  limitPeriod: state.limitPeriod,
  threshold: state.threshold,
  allocatedEmployees: state.allocatedEmployees.map((employee) => ({
    id: employee.id,
  })),
  exemptionPayItems: state.exemptionPayItems.map((payItem) => ({
    id: payItem.id,
    mappedType: payItem.mappedType,
  })),
});
export const getUpdateExpensePayItemUrlParams = (state) => ({
  businessId: getBusinessId(state),
  expensePayItemId: getExpensePayItemId(state),
});

const getCalculationBasisType = (state) => state.calculationBasis;

const getEnabledExemptionConfiguration = (state) =>
  state.enabledExemptionFieldConfiguration;

export const getIsExemptionDisabled = createSelector(
  getCalculationBasisType,
  getCalculationBasisPayItemId,
  getEnabledExemptionConfiguration,
  (calculationBasisType, calculationBasisPayItemId, configuration) =>
    !getIsExemptionEnabled(
      calculationBasisType,
      calculationBasisPayItemId,
      configuration
    )
);
