import { createSelector, createStructuredSelector } from 'reselect';

export const getDeductionPayItemModal = state => state.deductionPayItemModal;

export const getDeductionPayItemModalId = state => state.deductionPayItemModal.id;

export const getAlert = state => state.deductionPayItemModal.alert;

export const getIsLoading = state => state.deductionPayItemModal.isLoading;

export const getIsActionDisabled = state => state.deductionPayItemModal.isSubmitting;

export const getIsDeductionPayItemModalCreating = state => state.deductionPayItemModal.id === 'new';

const getTitle = state => state.deductionPayItemModal.title;

const getCalculationPercentOfId = state => state.deductionPayItemModal
  .deductionPayItem.calculationPercentOfId;

const getEmployees = state => state.deductionPayItemModal.deductionPayItem.employees;

const getExemptions = state => state.deductionPayItemModal
  .deductionPayItem.exemptions;

const getLimitPercentOfId = state => state.deductionPayItemModal.deductionPayItem.limitPercentOfId;

const getCalculationPercentOfOptions = state => state.deductionPayItemModal
  .calculationPercentOfOptions;

const getCalculationDollarPerOptions = state => state.deductionPayItemModal
  .calculationDollarPerOptions;

const getLimitPercentOfOptions = state => state.deductionPayItemModal.limitPercentOfOptions;

export const getModalTitle = createSelector(
  getIsDeductionPayItemModalCreating,
  getTitle,
  (isCreating, title) => (isCreating ? 'Create deduction pay item' : (title || 'Deduction pay item')),
);

export const getDetails = createStructuredSelector({
  name: state => state.deductionPayItemModal.deductionPayItem.name,
  linkedPayableAccountId: state => state.deductionPayItemModal
    .deductionPayItem.linkedPayableAccountId,
  atoReportingCategory: state => state.deductionPayItemModal.deductionPayItem.atoReportingCategory,
  accountOptions: state => state.deductionPayItemModal.accountOptions,
  atoReportCategoryOptions: state => state.deductionPayItemModal.atoReportCategoryOptions,
});

const getSelectedLimitPercentOf = createSelector(
  getLimitPercentOfId,
  getLimitPercentOfOptions,
  (limitPercentOfId, limitPercentOfOptions) => limitPercentOfOptions
    .find(option => option.id === limitPercentOfId) || {},
);

const getSelectedCalcPercentOf = createSelector(
  getCalculationPercentOfId,
  getCalculationPercentOfOptions,
  (calculationPercentOfId, calculationPercentOfOptions) => calculationPercentOfOptions
    .find(option => option.id === calculationPercentOfId) || {},
);

export const getInformation = createStructuredSelector({
  calculationBasis: state => state.deductionPayItemModal.deductionPayItem.calculationBasis,
  calculationPercentage: state => state.deductionPayItemModal
    .deductionPayItem.calculationPercentage,
  selectedCalculationPercentOf: getSelectedCalcPercentOf,
  calculationDollars: state => state.deductionPayItemModal.deductionPayItem.calculationDollars,
  calculationPer: state => state.deductionPayItemModal.deductionPayItem.calculationPer,
  calculationBasisOptions: state => state.deductionPayItemModal.calculationBasisOptions,
  calculationPercentOfOptions: getCalculationPercentOfOptions,
  calculationDollarPerOptions: getCalculationDollarPerOptions,
  limit: state => state.deductionPayItemModal.deductionPayItem.limit,
  limitPercentage: state => state.deductionPayItemModal.deductionPayItem.limitPercentage,
  selectedLimitPercentOf: getSelectedLimitPercentOf,
  limitDollars: state => state.deductionPayItemModal.deductionPayItem.limitDollars,
  limitPer: state => state.deductionPayItemModal.deductionPayItem.limitPer,
  limitOptions: state => state.deductionPayItemModal.limitOptions,
  limitPercentOfOptions: getLimitPercentOfOptions,
  limitDollarPerOptions: state => state.deductionPayItemModal.limitDollarPerOptions,
  isCalculationPercentage: state => state.deductionPayItemModal.deductionPayItem.calculationBasis === 'Percent',
  isCalculationDollar: state => state.deductionPayItemModal.deductionPayItem.calculationBasis === 'FixedDollar',
  isLimitDollar: state => state.deductionPayItemModal.deductionPayItem.limit === 'FixedDollar',
  isLimitPercentage: state => state.deductionPayItemModal.deductionPayItem.limit === 'Percent',
});

export const getFilteredEmployeeOptions = createSelector(
  state => state.deductionPayItemModal.employeeOptions,
  getEmployees,
  (employeeOptions, employees) => employeeOptions.filter(
    ({ id }) => !employees.find((employee => employee.id === id)),
  ),
);

export const getEmployeeAllocations = createStructuredSelector({
  employees: getEmployees,
  employeeOptions: getFilteredEmployeeOptions,
});

export const getFilteredExemptionOptions = createSelector(
  state => state.deductionPayItemModal.exemptionOptions,
  getExemptions,
  (exemptionOptions, exemptions) => exemptionOptions.filter(
    ({ id }) => !exemptions.find(exemption => exemption.id === id),
  ),
);

export const getExemptionAllocations = createStructuredSelector({
  exemptions: getExemptions,
  exemptionOptions: getFilteredExemptionOptions,
});

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

export const getDeductionPayItemModalPayload = (state) => {
  const {
    deductionPayItemModal: {
      deductionPayItem,
      calculationPercentOfOptions,
      limitPercentOfOptions,
    },
  } = state;

  const {
    calculationPercentOfId,
    limitPercentOfId,
  } = deductionPayItem;

  const calculationPercentOfType = (calculationPercentOfOptions
    .find(option => option.id === calculationPercentOfId) || {})
    .itemType;

  const limitPercentOfType = (limitPercentOfOptions
    .find(option => option.id === limitPercentOfId) || {})
    .itemType;

  return {
    ...deductionPayItem,
    calculationPercentOfType,
    limitPercentOfType,
  };
};
