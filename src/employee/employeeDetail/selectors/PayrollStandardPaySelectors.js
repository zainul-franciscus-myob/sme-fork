import { createSelector, createStructuredSelector } from 'reselect';

import {
  getDeductionPayItems as getAllocatedDeductionPayItems,
  getDeductionPayItemOptions,
} from './PayrollDeductionDetailSelectors';
import { getAllocatedLeavePayItems, getLeavePayItemOptions } from './PayrollLeaveDetailSelectors';
import { getAllocatedPayItems as getAllocatedSuperPayItems, getSuperPayItemOptions } from './PayrollSuperSelectors';
import { getTaxPayItems as getAllocatedTaxPayItems, getTaxPayItemOptions } from './PayrollTaxSelectors';
import {
  getHourlyRate,
  getPayPeriodHours,
  getWagePayCycleDisplayName,
  getWagePayItems as getWagePayItemOptions,
  getAllocatedWagePayItems as getWagePayItems,
} from './PayrollWageSelectors';
import { getWage as getWagePayItemModalWage } from './WagePayItemModalSelectors';
import formatNumberWithDecimalScaleRange from '../../../valueFormatters/formatNumberWithDecimalScaleRange';
import payItemTypes from '../payItemTypes';

export const fieldTypes = {
  blank: 'blank',
  calculated: 'calculated',
  input: 'input',
};

export const getStandardPayFormattedHours = amount => (
  formatNumberWithDecimalScaleRange(amount, 2, 3)
);

export const getStandardPayFormattedAmount = amount => (
  formatNumberWithDecimalScaleRange(amount, 2, 2)
);

const getDescription = state => state.payrollDetails.standardPayDetails.description;

export const getStandardPayItems = state => state.payrollDetails.standardPayDetails
  .standardPayItems;

export const getWageAmountRules = state => state.payrollDetails.standardPayDetails.wageAmountRules;

export const getBasePay = createStructuredSelector({
  payCycle: getWagePayCycleDisplayName,
  payPeriodHours: getPayPeriodHours,
  description: getDescription,
});

export const getHoursFieldType = (payItemType, calculationBasis, payBasis) => {
  switch (payItemType) {
    case payItemTypes.entitlement:
      return calculationBasis === 'UserEntered'
        ? fieldTypes.input : fieldTypes.calculated;
    case payItemTypes.wages:
      return payBasis === 'Hourly' ? fieldTypes.input : fieldTypes.blank;
    default:
      return fieldTypes.blank;
  }
};

export const getAmountFieldType = (payItemType, calculationBasis) => {
  switch (payItemType) {
    case payItemTypes.tax:
    case payItemTypes.expense:
      return fieldTypes.calculated;
    case payItemTypes.deduction:
    case payItemTypes.superDeductionBeforeTax:
    case payItemTypes.superDeductionAfterTax:
    case payItemTypes.superExpense:
      return calculationBasis === 'UserEntered'
        ? fieldTypes.input : fieldTypes.calculated;
    case payItemTypes.wages:
      return fieldTypes.input;
    default:
      return fieldTypes.blank;
  }
};

const buildPayItemEntry = (standardPayItems, payItemOptions, allocatedPayItemId) => {
  const { hours, amount, ...rest } = standardPayItems
    .find(({ payItemId: standardPayItemId }) => standardPayItemId === allocatedPayItemId) || {};

  const {
    name, type, calculationBasis, payBasis,
  } = payItemOptions
    .find(({ id: optionPayItemId }) => optionPayItemId === allocatedPayItemId) || {};

  return {
    ...rest,
    payItemId: allocatedPayItemId,
    payItemType: type,
    hours: hours || getStandardPayFormattedHours(0),
    amount: amount || getStandardPayFormattedAmount(0),
    name,
    hourFieldType: getHoursFieldType(type, calculationBasis, payBasis),
    amountFieldType: getAmountFieldType(type, calculationBasis),
  };
};

const getWagePayItemEntries = createSelector(
  getStandardPayItems,
  getWagePayItems,
  getWagePayItemOptions,
  (standardPayItems, allocatedPayItems, payItemOptions) => allocatedPayItems
    .map(({ id: allocatedPayItemId }) => buildPayItemEntry(
      standardPayItems, payItemOptions, allocatedPayItemId,
    )),
);

const getTaxPayItemEntries = createSelector(
  getStandardPayItems,
  getAllocatedTaxPayItems,
  getTaxPayItemOptions,
  (standardPayItems, allocatedPayItems, payItemOptions) => allocatedPayItems
    .map(({ id: allocatedPayItemId }) => buildPayItemEntry(
      standardPayItems, payItemOptions, allocatedPayItemId,
    )),
);

const getDeductionPayItemEntries = createSelector(
  getStandardPayItems,
  getAllocatedDeductionPayItems,
  getDeductionPayItemOptions,
  (standardPayItems, allocatedPayItems, payItemOptions) => allocatedPayItems
    .map(({ id: allocatedPayItemId }) => buildPayItemEntry(
      standardPayItems, payItemOptions, allocatedPayItemId,
    )),
);

const getSuperPayItemEntries = createSelector(
  getStandardPayItems,
  getAllocatedSuperPayItems,
  getSuperPayItemOptions,
  (standardPayItems, allocatedPayItems, payItemOptions) => allocatedPayItems
    .map(({ id: allocatedPayItemId }) => buildPayItemEntry(
      standardPayItems, payItemOptions, allocatedPayItemId,
    )),
);

const getLeavePayItemEntries = createSelector(
  getStandardPayItems,
  getAllocatedLeavePayItems,
  getLeavePayItemOptions,
  (standardPayItems, allocatedPayItems, payItemOptions) => allocatedPayItems
    .map(({ payItemId: allocatedPayItemId }) => buildPayItemEntry(
      standardPayItems, payItemOptions, allocatedPayItemId,
    )),
);

const getExpensePayItemOptions = state => state.expensePayItemOptions;
const getEmployerExpensePayItemEntries = createSelector(
  getStandardPayItems,
  getExpensePayItemOptions,
  (standardPayItems, payItemOptions) => standardPayItems
    .filter(({ payItemId }) => payItemOptions.find(({ id }) => id === payItemId))
    .map(({ payItemId: allocatedPayItemId }) => buildPayItemEntry(
      standardPayItems, payItemOptions, allocatedPayItemId,
    )),
);

const getSuperDeductionPayItemEntries = createSelector(
  getSuperPayItemEntries,
  entries => entries
    .filter(({ payItemType }) => (
      payItemType === payItemTypes.superDeductionBeforeTax
      || payItemType === payItemTypes.superDeductionAfterTax
    )),
);

const getSuperExpensePayItemEntries = createSelector(
  getSuperPayItemEntries,
  entries => entries
    .filter(({ payItemType }) => payItemType === payItemTypes.superExpense),
);

const getCombinedPayItemEntries = createSelector(
  getWagePayItemEntries,
  getDeductionPayItemEntries,
  getSuperDeductionPayItemEntries,
  getTaxPayItemEntries,
  (wagePayItems, deductionPayItems, superPayItems, taxPayItems) => [
    ...wagePayItems,
    ...taxPayItems,
    ...deductionPayItems,
    ...superPayItems,
  ],
);

const getExpensePayItemEntries = createSelector(
  getEmployerExpensePayItemEntries,
  getSuperExpensePayItemEntries,
  (employerExpensePayItems, superPayItems) => [
    ...employerExpensePayItems,
    ...superPayItems,
  ],
);

export const getCombinedTableRows = createSelector(
  getCombinedPayItemEntries,
  entries => ({
    entries,
    showTableRows: true,
  }),
);

export const getExpenseTableRows = createSelector(
  getExpensePayItemEntries,
  entries => ({
    entries,
    showTableRows: entries.length > 0,
  }),
);

export const getLeaveTableRows = createSelector(
  getLeavePayItemEntries,
  entries => ({
    entries,
    showTableRows: entries.length > 0,
  }),
);
export const getStandardPayItemByPayItemId = (state, payItemId) => {
  const standardPayItems = getStandardPayItems(state);

  return standardPayItems
    .find(({ payItemId: standardPayItemId }) => payItemId === standardPayItemId);
};

export const getStandardPayItemListToApplyRule = createSelector(
  getWagePayItemEntries,
  wagePayItems => wagePayItems
    .filter(({ hours }) => hours !== getStandardPayFormattedHours(0)),
);

export const getIsAmountRuleApplied = (state, { payItemId, payItemType, value }) => {
  if (payItemType !== payItemTypes.wages) {
    return false;
  }

  const { appliedHours } = getStandardPayItemByPayItemId(state, payItemId) || {};

  return appliedHours !== value;
};

export const getStandardPayWageAmountRuleById = (state, id) => {
  const rules = getWageAmountRules(state);

  return rules[id];
};

export const getStandardPayWageAmountRuleFromModal = createSelector(
  getWagePayItemModalWage,
  ({ payRate, payRateMultiplier, fixedHourlyPayRate: fixedHourlyRate }) => ({
    payRate, payRateMultiplier, fixedHourlyRate,
  }),
);

export const calculateWagePayItemAmount = ({
  payRate, payRateMultiplier, fixedHourlyRate, hours, hourlyRate,
}) => {
  if (payRate === 'RegularRate') {
    return hours * hourlyRate * payRateMultiplier;
  }

  if (payRate === 'FixedRate') {
    return hours * fixedHourlyRate;
  }

  return 0;
};

export const getCalculatedWagePayItemAmount = (state, payItemId, wagePayItem) => {
  const { hours: standardPayHours } = getStandardPayItemByPayItemId(state, payItemId) || {};
  const wageDetailsHourlyRate = getHourlyRate(state);

  const hours = Number(standardPayHours || 0);
  const hourlyRate = Number(wageDetailsHourlyRate || 0);

  const amount = calculateWagePayItemAmount({ ...wagePayItem, hours, hourlyRate });

  return getStandardPayFormattedAmount(amount);
};

export const getStandardPayDetailsPayload = createSelector(
  getDescription,
  getWagePayItemEntries,
  getDeductionPayItemEntries,
  getSuperPayItemEntries,
  getTaxPayItemEntries,
  getLeavePayItemEntries,
  getEmployerExpensePayItemEntries,
  (
    description,
    wagePayItems, deductionPayItems, superPayItems, taxPayItems,
    leavePayItems, employerExpensePayItems,
  ) => {
    const standardPayItems = [
      ...wagePayItems, ...deductionPayItems, ...superPayItems, ...taxPayItems,
      ...leavePayItems, ...employerExpensePayItems,
    ].map(({
      id, payItemId, payItemType, hours, amount,
    }) => ({
      id, payItemId, payItemType, hours, amount,
    }));

    return {
      description,
      standardPayItems,
    };
  },
);
