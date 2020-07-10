import { createSelector, createStructuredSelector } from 'reselect';

import isExemptionEnabled from '../../isExemptionEnabled';

const contributionTypeOptions = {
  employeeAdditional: 'EmployeeAdditional',
  employerAdditional: 'EmployerAdditional',
  productivity: 'Productivity',
  redundancy: 'Redundancy',
  salarySacrifice: 'SalarySacrifice',
  spouse: 'Spouse',
  superGuarantee: 'SuperannuationGuarantee',
};

const contributionDeductionTypes = [
  contributionTypeOptions.employeeAdditional,
  contributionTypeOptions.salarySacrifice,
  contributionTypeOptions.spouse,
];

const contributionExpenseTypes = [
  contributionTypeOptions.employerAdditional,
  contributionTypeOptions.productivity,
  contributionTypeOptions.redundancy,
  contributionTypeOptions.superGuarantee,
];

const atoCategories = {
  notSet: 'NotSet',
  notReportable: 'NotReportable',
  superGuarantee: 'SuperGuarantee',
  superContributions: 'ReportableEmployerSuperContributions',
};

const calculationBasisTypes = {
  userEntered: 'UserEntered',
  percent: 'PercentOfPayrollCategory',
  amount: 'FixedDollar',
};

const limitTypes = {
  noLimit: 'NoLimit',
  percent: 'Percent',
  amount: 'FixedDollar',
};

export const getSuperPayItemModal = (state) => state.superPayItemModal;

export const getSuperPayItemModalId = (state) => state.superPayItemModal.id;

export const getAlert = (state) => state.superPayItemModal.alert;

export const getIsLoading = (state) => state.superPayItemModal.isLoading;

export const getIsSubmitting = (state) => state.superPayItemModal.isSubmitting;

export const getIsSuperPayItemModalCreating = (state) =>
  state.superPayItemModal.id === 'new';

export const getTitle = (state) => state.superPayItemModal.title;

export const getSuperPayItemModalSuperPayItem = (state) =>
  state.superPayItemModal.superPayItem;

const getContributionType = (state) =>
  state.superPayItemModal.superPayItem.contributionType;

const getAtoReportingCategory = (state) =>
  state.superPayItemModal.superPayItem.atoReportingCategory;

const getCalculationBasisType = (state) =>
  state.superPayItemModal.superPayItem.calculationBasisType;

const getCalculationBasisPayItemId = (state) =>
  state.superPayItemModal.superPayItem.calculationBasisPayItemId;

const getLimitPayItemId = (state) =>
  state.superPayItemModal.superPayItem.limitPayItemId;

export const getEmployees = (state) =>
  state.superPayItemModal.superPayItem.employees;

export const getExemptions = (state) =>
  state.superPayItemModal.superPayItem.exemptions;

const getGrossWagesId = (state) => state.superPayItemModal.grossWagesId;

const getAtoReportingCategoryOptions = (state) =>
  state.superPayItemModal.atoReportingCategoryOptions;

const getExemptionPayItemOptions = (state) =>
  state.superPayItemModal.exemptionPayItemOptions;

const getPeriodOptions = (state) => state.superPayItemModal.periodOptions;

export const getModalTitle = createSelector(
  getIsSuperPayItemModalCreating,
  getTitle,
  (isCreating, originalName) =>
    isCreating ? 'Create super pay item' : originalName || 'Super pay item'
);

export const getIsActionDisabled = createSelector(
  getIsSubmitting,
  getIsLoading,
  (isSubmitting, isLoading) => isSubmitting || isLoading
);

const getIsDeduction = createSelector(getContributionType, (contributionType) =>
  contributionDeductionTypes.includes(contributionType)
);

const getIsExpense = createSelector(getContributionType, (contributionType) =>
  contributionExpenseTypes.includes(contributionType)
);

export const getFilteredAtoReportingCategoryOptions = createSelector(
  getContributionType,
  getAtoReportingCategoryOptions,
  (contributionType, atoReportingCategoryOptions) => {
    switch (contributionType) {
      case contributionTypeOptions.employeeAdditional:
      case contributionTypeOptions.redundancy:
      case contributionTypeOptions.spouse:
        return atoReportingCategoryOptions.filter(({ value }) =>
          [atoCategories.notSet, atoCategories.notReportable].includes(value)
        );
      case contributionTypeOptions.superGuarantee:
        return atoReportingCategoryOptions.filter(({ value }) =>
          [atoCategories.notSet, atoCategories.superGuarantee].includes(value)
        );
      case contributionTypeOptions.productivity:
        return atoReportingCategoryOptions.filter(({ value }) =>
          [
            atoCategories.notSet,
            atoCategories.notReportable,
            atoCategories.superGuarantee,
          ].includes(value)
        );
      case contributionTypeOptions.salarySacrifice:
        return atoReportingCategoryOptions.filter(({ value }) =>
          [
            atoCategories.notSet,
            atoCategories.notReportable,
            atoCategories.superContributions,
          ].includes(value)
        );
      default:
        return atoReportingCategoryOptions;
    }
  }
);

export const getSuperPayItemDetail = createStructuredSelector({
  name: (state) => state.superPayItemModal.superPayItem.name,
  payableAccountId: (state) =>
    state.superPayItemModal.superPayItem.payableAccountId,
  expenseAccountId: (state) =>
    state.superPayItemModal.superPayItem.expenseAccountId,
  atoReportingCategory: (state) =>
    state.superPayItemModal.superPayItem.atoReportingCategory,
  contributionType: (state) =>
    state.superPayItemModal.superPayItem.contributionType,
  contributionTypeOptions: (state) =>
    state.superPayItemModal.contributionTypeOptions,
  expenseAccountOptions: (state) =>
    state.superPayItemModal.expenseAccountOptions,
  payableAccountOptions: (state) =>
    state.superPayItemModal.payableAccountOptions,
  atoReportingCategoryOptions: getFilteredAtoReportingCategoryOptions,
  showExpenseAccounts: getIsExpense,
  isCreating: getIsSuperPayItemModalCreating,
});

export const getSuperPayItemInfo = createStructuredSelector({
  printOnPayAdvice: (state) =>
    state.superPayItemModal.superPayItem.printOnPayAdvice,
  threshold: (state) => state.superPayItemModal.superPayItem.threshold,
});

const getCalculationBasisPayItemOptions = createSelector(
  getIsDeduction,
  (state) => state.superPayItemModal.calculationBasisDeductionPayItemOptions,
  (state) => state.superPayItemModal.calculationBasisExpensePayItemOptions,
  (isDeduction, deductionPayItems, expensePayItems) =>
    isDeduction ? deductionPayItems : expensePayItems
);

export const getCalculationBasis = createStructuredSelector({
  calculationBasisType: getCalculationBasisType,
  calculationBasisPercentage: (state) =>
    state.superPayItemModal.superPayItem.calculationBasisPercentage,
  calculationBasisPayItemId: getCalculationBasisPayItemId,
  calculationBasisAmount: (state) =>
    state.superPayItemModal.superPayItem.calculationBasisAmount,
  calculationBasisPeriod: (state) =>
    state.superPayItemModal.superPayItem.calculationBasisPeriod,
  exclusion: (state) => state.superPayItemModal.superPayItem.exclusion,
  calculationBasisTypeOptions: (state) =>
    state.superPayItemModal.calculationBasisTypeOptions,
  calculationBasisPayItemOptions: getCalculationBasisPayItemOptions,
  periodOptions: getPeriodOptions,
  showPercent: (state) =>
    state.superPayItemModal.superPayItem.calculationBasisType ===
    calculationBasisTypes.percent,
  showAmount: (state) =>
    state.superPayItemModal.superPayItem.calculationBasisType ===
    calculationBasisTypes.amount,
});

const getLimitPayItemOptions = createSelector(
  getIsDeduction,
  (state) => state.superPayItemModal.limitDeductionPayItemOptions,
  (state) => state.superPayItemModal.limitExpensePayItemOptions,
  (isDeduction, deductionPayItems, expensePayItems) =>
    isDeduction ? deductionPayItems : expensePayItems
);

export const getLimit = createStructuredSelector({
  limitType: (state) => state.superPayItemModal.superPayItem.limitType,
  limitPercentage: (state) =>
    state.superPayItemModal.superPayItem.limitPercentage,
  limitPayItemId: (state) =>
    state.superPayItemModal.superPayItem.limitPayItemId,
  limitAmount: (state) => state.superPayItemModal.superPayItem.limitAmount,
  limitPeriod: (state) => state.superPayItemModal.superPayItem.limitPeriod,
  limitTypeOptions: (state) => state.superPayItemModal.limitTypeOptions,
  limitPayItemOptions: getLimitPayItemOptions,
  periodOptions: getPeriodOptions,
  showPercent: (state) =>
    state.superPayItemModal.superPayItem.limitType === limitTypes.percent,
  showAmount: (state) =>
    state.superPayItemModal.superPayItem.limitType === limitTypes.amount,
});

export const getFilteredEmployeeOptions = createSelector(
  (state) => state.superPayItemModal.employeeOptions,
  (state) => state.superPayItemModal.superPayItem.employees,
  (employees, superPayItemEmployees) =>
    employees.filter((employee) => {
      const listedItem = superPayItemEmployees.find(
        (superPayItemEmployee) => superPayItemEmployee.id === employee.id
      );
      return !listedItem;
    })
);

export const getFilteredExemptionOptions = createSelector(
  getExemptionPayItemOptions,
  getExemptions,
  (exemptionOptions, exemptions) =>
    exemptionOptions.filter((option) => {
      const listedItem = exemptions.find(
        (exemption) => exemption.id === option.id
      );
      return !listedItem;
    })
);

const getEnabledExemptionFieldConfiguration = (state) =>
  state.superPayItemModal.enabledExemptionFieldConfiguration;
export const getIsExemptionDisabled = createSelector(
  getCalculationBasisType,
  getCalculationBasisPayItemId,
  getEnabledExemptionFieldConfiguration,
  (calculationBasisType, calculationBasisPayItemId, configuration) =>
    !isExemptionEnabled(
      calculationBasisType,
      calculationBasisPayItemId,
      configuration
    )
);

export const getSuperPayItemModalFormattedAmount = (value) =>
  String((Number(value) || 0).toFixed(2));

export const getSuperPayItemModalFormattedPercentage = (value) => {
  const number = Number(value) || 0;
  const decimalPlaceCount = value.includes('.')
    ? value.split('.')[1].length
    : 0;

  const formattedNumber = decimalPlaceCount <= 2 ? number.toFixed(2) : number;

  return String(formattedNumber);
};

const getUpdatedAtoReportingCategory = (state) => {
  const atoReportingCategory = getAtoReportingCategory(state);
  const filteredAtoReportingCategories = getFilteredAtoReportingCategoryOptions(
    state
  );

  return filteredAtoReportingCategories.find(
    (category) => category.value === atoReportingCategory
  )
    ? atoReportingCategory
    : atoCategories.notSet;
};

const getUpdatedBasisPayItemId = (payItems, payItemId) =>
  payItems.find((payItem) => payItem.id === payItemId) ? payItemId : '';

const getUpdatedCalculationBasisPayItemId = (state) => {
  const payItems = getCalculationBasisPayItemOptions(state);
  const payItemId = getCalculationBasisPayItemId(state);

  return getUpdatedBasisPayItemId(payItems, payItemId);
};

const getUpdatedLimitPayItemId = (state) => {
  const payItems = getLimitPayItemOptions(state);
  const payItemId = getLimitPayItemId(state);

  return getUpdatedBasisPayItemId(payItems, payItemId);
};

export const getUpdatedSuperPayItemModal = (state) => ({
  atoReportingCategory: getUpdatedAtoReportingCategory(state),
  calculationBasisPayItemId: getUpdatedCalculationBasisPayItemId(state),
  limitPayItemId: getUpdatedLimitPayItemId(state),
});

const getUpdatedBasisForSave = ({
  isPercent,
  isAmount,
  percentage,
  payItemId,
  amount,
  period,
  grossWagesId,
  payItems,
}) => {
  const selectedPayItem = payItems.find((item) => item.id === payItemId) || {};
  const grossWagesItem =
    payItems.find((item) => item.id === grossWagesId) || {};

  return {
    percentage: isPercent ? percentage : '0.00',
    payItemId: (isPercent ? selectedPayItem.id : grossWagesItem.id) || '',
    payItemType:
      (isPercent ? selectedPayItem.mappedType : grossWagesItem.mappedType) ||
      '',
    amount: isAmount ? amount : '0.00',
    period: isAmount ? period : 'PayPeriod',
  };
};

const getUpdatedCalculationBasisForSave = (state) => {
  const grossWagesId = getGrossWagesId(state);
  const payItems = getCalculationBasisPayItemOptions(state);
  const superPayItem = getSuperPayItemModalSuperPayItem(state);
  const {
    calculationBasisType,
    calculationBasisPercentage: percentage,
    calculationBasisPayItemId: payItemId,
    calculationBasisAmount: amount,
    calculationBasisPeriod: period,
  } = superPayItem;

  const isPercent = calculationBasisType === calculationBasisTypes.percent;
  const isAmount = calculationBasisType === calculationBasisTypes.amount;

  return getUpdatedBasisForSave({
    isPercent,
    isAmount,
    percentage,
    payItemId,
    amount,
    period,
    grossWagesId,
    payItems,
  });
};

const getUpdatedLimitForSave = (state) => {
  const grossWagesId = getGrossWagesId(state);
  const payItems = getLimitPayItemOptions(state);
  const superPayItem = getSuperPayItemModalSuperPayItem(state);
  const {
    limitType,
    limitPercentage: percentage,
    limitPayItemId: payItemId,
    limitAmount: amount,
    limitPeriod: period,
  } = superPayItem;

  const isPercent = limitType === limitTypes.percent;
  const isAmount = limitType === limitTypes.amount;

  return getUpdatedBasisForSave({
    isPercent,
    isAmount,
    percentage,
    payItemId,
    amount,
    period,
    grossWagesId,
    payItems,
  });
};

export const getUpdatedSuperPayItemModalForSave = (state) => {
  const {
    percentage: calculationBasisPercentage,
    payItemId: calculationBasisPayItemId,
    payItemType: calculationBasisPayItemType,
    amount: calculationBasisAmount,
    period: calculationBasisPeriod,
  } = getUpdatedCalculationBasisForSave(state);

  const {
    percentage: limitPercentage,
    payItemId: limitPayItemId,
    payItemType: limitPayItemType,
    amount: limitAmount,
    period: limitPeriod,
  } = getUpdatedLimitForSave(state);

  return {
    calculationBasisPercentage,
    calculationBasisPayItemId,
    calculationBasisPayItemType,
    calculationBasisAmount,
    calculationBasisPeriod,
    limitPercentage,
    limitPayItemId,
    limitPayItemType,
    limitAmount,
    limitPeriod,
  };
};
