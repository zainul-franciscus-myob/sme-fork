import { createSelector, createStructuredSelector } from 'reselect';

const contributionTypes = {
  employeeAdditional: 'EmployeeAdditional',
  employerAdditional: 'EmployerAdditional',
  productivity: 'Productivity',
  redundancy: 'Redundancy',
  salarySacrifice: 'SalarySacrifice',
  spouse: 'Spouse',
  superGuarantee: 'SuperannuationGuarantee',
};

const contributionDeductionTypes = [
  contributionTypes.employeeAdditional,
  contributionTypes.salarySacrifice,
  contributionTypes.spouse,
];

const contributionExpenseTypes = [
  contributionTypes.employerAdditional,
  contributionTypes.productivity,
  contributionTypes.redundancy,
  contributionTypes.superGuarantee,
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

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getAlert = state => state.alert;

export const getIsLoading = state => state.isLoading;

export const getIsSubmitting = state => state.isSubmitting;

export const getIsPageEdited = state => state.isPageEdited;

export const getModalType = state => state.modalType;

export const getIsCreating = state => state.superPayItemId === 'new';

export const getSuperPayItemId = state => state.superPayItemId;

export const getSuperPayItemOriginalName = state => state.originalSuperPayItem.name;

const getGrossWagesId = state => state.settings.grossWagesId;

export const getSuperPayItem = state => state.superPayItem;

const getContributionType = state => state.superPayItem.contributionType;

const getAtoReportingCategory = state => state.superPayItem.atoReportingCategory;

const getCalculationBasisType = state => state.superPayItem.calculationBasisType;

const getCalculationBasisPayItemId = state => state.superPayItem.calculationBasisPayItemId;

const getLimitPayItemId = state => state.superPayItem.limitPayItemId;

export const getSuperPayItemEmployees = state => state.superPayItem.employees;

export const getSuperPayItemExemptions = state => state.superPayItem.exemptions;

const getAtoReportingCategories = state => state.atoReportingCategories;

const getPeriods = state => state.periods;

const getIsDeduction = createSelector(
  getContributionType,
  contributionType => contributionDeductionTypes.includes(contributionType),
);

const getIsExpense = createSelector(
  getContributionType,
  contributionType => contributionExpenseTypes.includes(contributionType),
);

export const getFilteredAtoReportingCategories = createSelector(
  getContributionType,
  getAtoReportingCategories,
  (contributionType, atoReportingCategories) => {
    switch (contributionType) {
      case contributionTypes.employeeAdditional:
      case contributionTypes.redundancy:
      case contributionTypes.spouse:
        return atoReportingCategories.filter(({ value }) => (
          [atoCategories.notSet, atoCategories.notReportable].includes(value)
        ));
      case contributionTypes.superGuarantee:
        return atoReportingCategories.filter(({ value }) => (
          [atoCategories.notSet, atoCategories.superGuarantee]
            .includes(value)
        ));
      case contributionTypes.productivity:
        return atoReportingCategories.filter(({ value }) => (
          [atoCategories.notSet, atoCategories.notReportable, atoCategories.superGuarantee]
            .includes(value)
        ));
      case contributionTypes.salarySacrifice:
        return atoReportingCategories.filter(({ value }) => (
          [atoCategories.notSet, atoCategories.notReportable, atoCategories.superContributions]
            .includes(value)
        ));
      default:
        return atoReportingCategories;
    }
  },
);

export const getSuperPayItemDetail = createStructuredSelector({
  name: state => state.superPayItem.name,
  payableAccountId: state => state.superPayItem.payableAccountId,
  expenseAccountId: state => state.superPayItem.expenseAccountId,
  atoReportingCategory: state => state.superPayItem.atoReportingCategory,
  contributionType: state => state.superPayItem.contributionType,
  contributionTypes: state => state.contributionTypes,
  expenseAccounts: state => state.expenseAccounts,
  payableAccounts: state => state.payableAccounts,
  atoReportingCategories: getFilteredAtoReportingCategories,
  showExpenseAccounts: getIsExpense,
  isCreating: getIsCreating,
});

export const getSuperPayItemInfo = createStructuredSelector({
  printOnPayAdvice: state => state.superPayItem.printOnPayAdvice,
  threshold: state => state.superPayItem.threshold,
});

const getCalculationBasisPayItems = createSelector(
  getIsDeduction,
  state => state.calculationBasisDeductionPayItems,
  state => state.calculationBasisExpensePayItems,
  (isDeduction, deductionPayItems, expensePayItems) => (
    isDeduction ? deductionPayItems : expensePayItems
  ),
);

export const getCalculationBasis = createStructuredSelector({
  calculationBasisType: getCalculationBasisType,
  calculationBasisPercentage: state => state.superPayItem.calculationBasisPercentage,
  calculationBasisPayItemId: getCalculationBasisPayItemId,
  calculationBasisAmount: state => state.superPayItem.calculationBasisAmount,
  calculationBasisPeriod: state => state.superPayItem.calculationBasisPeriod,
  exclusion: state => state.superPayItem.exclusion,
  calculationBasisTypes: state => state.calculationBasisTypes,
  calculationBasisPayItems: getCalculationBasisPayItems,
  periods: getPeriods,
  showPercent: state => state.superPayItem.calculationBasisType === calculationBasisTypes.percent,
  showAmount: state => state.superPayItem.calculationBasisType === calculationBasisTypes.amount,
});

const getLimitPayItems = createSelector(
  getIsDeduction,
  state => state.limitDeductionPayItems,
  state => state.limitExpensePayItems,
  (isDeduction, deductionPayItems, expensePayItems) => (
    isDeduction ? deductionPayItems : expensePayItems),
);

export const getLimit = createStructuredSelector({
  limitType: state => state.superPayItem.limitType,
  limitPercentage: state => state.superPayItem.limitPercentage,
  limitPayItemId: state => state.superPayItem.limitPayItemId,
  limitAmount: state => state.superPayItem.limitAmount,
  limitPeriod: state => state.superPayItem.limitPeriod,
  limitTypes: state => state.limitTypes,
  limitPayItems: getLimitPayItems,
  periods: getPeriods,
  showPercent: state => state.superPayItem.limitType === limitTypes.percent,
  showAmount: state => state.superPayItem.limitType === limitTypes.amount,
});

export const getFilteredEmployees = createSelector(
  state => state.employees,
  state => state.superPayItem.employees,
  (employees, superPayItemEmployees) => employees.filter((employee) => {
    const listedItem = superPayItemEmployees
      .find(superPayItemEmployee => superPayItemEmployee.id === employee.value);
    return !listedItem;
  }),
);

export const getFilteredExemptions = createSelector(
  state => state.exemptionPayItems,
  state => state.superPayItem.exemptions,
  (exemptions, superPayItemExemptions) => exemptions.filter((exemption) => {
    const listedItem = superPayItemExemptions
      .find(superPayItemExemption => superPayItemExemption.id === exemption.id);
    return !listedItem;
  }),
);

export const getIsExemptionDisabled = createSelector(
  getCalculationBasisType,
  getCalculationBasisPayItemId,
  getGrossWagesId,
  state => state.settings.federalWagesId,
  (calculationBasisType, calculationBasisPayItemId, grossWagesId, federalWagesId) => !(
    calculationBasisType === calculationBasisTypes.percent && (
      calculationBasisPayItemId === grossWagesId || calculationBasisPayItemId === federalWagesId
    )),
);

export const getFormattedAmount = value => String((Number(value) || 0).toFixed(2));

export const getFormattedPercentage = (value) => {
  const number = Number(value) || 0;
  const decimalPlaceCount = value.includes('.')
    ? value.split('.')[1].length
    : 0;

  const formattedNumber = decimalPlaceCount <= 2
    ? number.toFixed(2)
    : number;

  return String(formattedNumber);
};

const getUpdatedAtoReportingCategory = (state) => {
  const atoReportingCategory = getAtoReportingCategory(state);
  const filteredAtoReportingCategories = getFilteredAtoReportingCategories(state);

  return filteredAtoReportingCategories.find(category => category.value === atoReportingCategory)
    ? atoReportingCategory
    : atoCategories.notSet;
};

const getUpdatedBasisPayItemId = (payItems, payItemId) => (payItems.find(payItem => payItem.id === payItemId) ? payItemId : '');

const getUpdatedCalculationBasisPayItemId = (state) => {
  const payItems = getCalculationBasisPayItems(state);
  const payItemId = getCalculationBasisPayItemId(state);

  return getUpdatedBasisPayItemId(payItems, payItemId);
};

const getUpdatedLimitPayItemId = (state) => {
  const payItems = getLimitPayItems(state);
  const payItemId = getLimitPayItemId(state);

  return getUpdatedBasisPayItemId(payItems, payItemId);
};

export const getUpdatedSuperPayItem = state => ({
  atoReportingCategory: getUpdatedAtoReportingCategory(state),
  calculationBasisPayItemId: getUpdatedCalculationBasisPayItemId(state),
  limitPayItemId: getUpdatedLimitPayItemId(state),
});

const getUpdatedBasisForSave = ({
  isPercent, isAmount, percentage, payItemId, amount, period, grossWagesId, payItems,
}) => {
  const selectedPayItem = payItems.find(item => item.id === payItemId) || {};
  const grossWagesItem = payItems.find(item => item.id === grossWagesId) || {};

  return ({
    percentage: isPercent ? percentage : '0.00',
    payItemId: (isPercent ? selectedPayItem.id : grossWagesItem.id) || '',
    payItemType: (isPercent ? selectedPayItem.mappedType : grossWagesItem.mappedType) || '',
    amount: isAmount ? amount : '0.00',
    period: isAmount ? period : 'PayPeriod',
  });
};

const getUpdatedCalculationBasisForSave = (state) => {
  const grossWagesId = getGrossWagesId(state);
  const payItems = getCalculationBasisPayItems(state);
  const superPayItem = getSuperPayItem(state);
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
    isPercent, isAmount, percentage, payItemId, amount, period, grossWagesId, payItems,
  });
};

const getUpdatedLimitForSave = (state) => {
  const grossWagesId = getGrossWagesId(state);
  const payItems = getLimitPayItems(state);
  const superPayItem = getSuperPayItem(state);
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
    isPercent, isAmount, percentage, payItemId, amount, period, grossWagesId, payItems,
  });
};

export const getUpdatedSuperPayItemForSave = (state) => {
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
