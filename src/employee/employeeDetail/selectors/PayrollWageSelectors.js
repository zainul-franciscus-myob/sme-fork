import { createSelector, createStructuredSelector } from 'reselect';

export const getWagePayItems = state => state.wagePayItems;

export const getAllocatedWagePayItems = state => state.payrollDetails.wage.allocatedWagePayItems;

export const getFilteredWagePayItemOptions = createSelector(
  getWagePayItems,
  getAllocatedWagePayItems,
  (wagePayItems, allocatedWagePayItems) => wagePayItems
    .filter(wagePayItemOption => (
      !allocatedWagePayItems.some(wagePayItem => wagePayItem.id === wagePayItemOption.id)
    )),
);

const getIsSelectedPayBasisSalary = state => state.payrollDetails.wage.selectedPayBasis === 'Salary';

export const getBaseSalaryWagePayItemId = state => state.baseSalaryWagePayItemId;

export const getBaseHourlyWagePayItemId = state => state.baseHourlyWagePayItemId;

const isPayItemRemovable = ({ id }, isSelectedPayBasisSalary, baseSalaryWagePayItemId,
  baseHourlyWagePayItemId) => {
  const isSelectedPayBasisHourly = !isSelectedPayBasisSalary;
  return (isSelectedPayBasisSalary && id !== baseSalaryWagePayItemId)
    || (isSelectedPayBasisHourly && id !== baseHourlyWagePayItemId);
};

const baseHourlyTooltipText = 'All Base hourly employees must be linked to the Base hourly wage pay item';
const baseSalaryTooltipText = 'All salaried employees must be linked to the Base salary wage pay item';

const getPayItemTooltip = ({ id }, baseSalaryWagePayItemId, baseHourlyWagePayItemId) => {
  switch (id) {
    case baseSalaryWagePayItemId: return baseSalaryTooltipText;
    case baseHourlyWagePayItemId: return baseHourlyTooltipText;
    default: return '';
  }
};

export const getSelectedWagePayItems = createSelector(
  getWagePayItems,
  getAllocatedWagePayItems,
  getIsSelectedPayBasisSalary,
  getBaseSalaryWagePayItemId,
  getBaseHourlyWagePayItemId,
  (wagePayItems, allocatedWagePayItems, isSelectedPayBasisSalary, baseSalaryWagePayItemId,
    baseHourlyWagePayItemId) => wagePayItems
    .filter(wagePayItemOption => (allocatedWagePayItems
      .some(wagePayItem => wagePayItem.id === wagePayItemOption.id)
    ))
    .map(item => ({
      ...item,
      tooltipText: getPayItemTooltip(item, baseSalaryWagePayItemId, baseHourlyWagePayItemId),
      isRemovable: isPayItemRemovable(item, isSelectedPayBasisSalary, baseSalaryWagePayItemId,
        baseHourlyWagePayItemId),
    })),
);

const getSelectedPayCycle = state => state.payrollDetails.wage.selectedPayCycle;
export const getPayPeriodHours = state => state.payrollDetails.wage.payPeriodHours;
const getWagePayCycleOptions = state => state.wagePayCycleOptions;
export const getHourlyRate = state => state.payrollDetails.wage.hourlyRate;

export const getWageDetails = createStructuredSelector({
  selectedPayBasis: state => state.payrollDetails.wage.selectedPayBasis,
  isSelectedPayBasisSalary: getIsSelectedPayBasisSalary,
  annualSalary: state => state.payrollDetails.wage.annualSalary,
  hourlyRate: getHourlyRate,
  selectedPayCycle: getSelectedPayCycle,
  payPeriodHours: getPayPeriodHours,
  wageExpenseAccounts: state => state.wageExpenseAccounts,
  selectedWageExpenseAccount: state => state.payrollDetails.wage.selectedWageExpenseAccount,
  wagePayCycleOptions: getWagePayCycleOptions,
  wagePayBasisOptions: state => state.wagePayBasisOptions,
});

export const getWagePayCycleDisplayName = createSelector(
  getSelectedPayCycle,
  getWagePayCycleOptions,
  (selectedPayCycle, wagePayCycleOptions) => {
    const selected = wagePayCycleOptions.find(option => option.id === selectedPayCycle) || {};
    return selected.displayName;
  },
);
