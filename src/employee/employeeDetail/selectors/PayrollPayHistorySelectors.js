import { createSelector, createStructuredSelector } from 'reselect';
import { format } from 'date-fns';

import {
  getDeductionPayItems as getAllocatedDeductionPayItems,
  getDeductionPayItemOptions,
} from './PayrollDeductionDetailSelectors';
import { getAllocatedLeavePayItems, getLeavePayItemOptions } from './PayrollLeaveDetailSelectors';
import { getAllocatedPayItems as getAllocatedSuperPayItems, getSuperPayItemOptions } from './PayrollSuperSelectors';
import { getTaxPayItems as getAllocatedTaxPayItems, getTaxPayItemOptions } from './PayrollTaxSelectors';
import {
  getWagePayItems as getWagePayItemOptions,
  getAllocatedWagePayItems as getWagePayItems,
} from './PayrollWageSelectors';
import formatNumberWithDecimalScaleRange from '../../../valueFormatters/formatNumberWithDecimalScaleRange';
import payItemTypes from '../payItemTypes';

const financialYear = {
  July: 1,
  August: 2,
  September: 3,
  October: 4,
  November: 5,
  December: 6,
  January: 7,
  February: 8,
  March: 9,
  April: 10,
  May: 11,
  June: 12,
};

const getPayHistoryFormattedHours = amount => (
  formatNumberWithDecimalScaleRange(amount, 2, 2)
);

const getPayHistoryFormattedAmount = amount => (
  formatNumberWithDecimalScaleRange(amount, 2, 3)
);

const getPeriod = state => state.payrollDetails.payHistoryDetails.filterOptions.period;

const getPayHistoryItems = state => state.payrollDetails.payHistoryDetails.payHistoryItems;

const getPayHistoryPeriodOptions = state => state.payHistoryPeriodOptions;

export const getFilterOptions = createStructuredSelector({
  period: getPeriod,
  payHistoryPeriodOptions: getPayHistoryPeriodOptions,
});

export const getMonthFromPeriod = (period) => {
  switch (period) {
    case 'YearToDate':
    case 'Quarter1':
      return 'July';
    case 'Quarter2':
      return 'October';
    case 'Quarter3':
      return 'January';
    case 'Quarter4':
      return 'April';
    default:
      return period;
  }
};

const getFilteredPayHistoryItems = createSelector(
  getPeriod,
  getPayHistoryItems,
  (period, payHistoryItems) => {
    const monthFromPeriod = getMonthFromPeriod(period);

    return payHistoryItems.map(({ id, payItemId, lines = [] }) => {
      const line = lines
        .find(({ month }) => month === monthFromPeriod) || {};
      const { month, activity, total } = line;

      return {
        id, payItemId, month, activity, total,
      };
    });
  },
);

export const getCurrentMonth = () => format(new Date(), 'MMMM');

export const getIsFutureMonth = (currentMonth, selectedMonth) => {
  const current = financialYear[currentMonth];
  const selected = financialYear[selectedMonth];

  return selected > current;
};

const getIsPayHistoryItemsDisabled = createSelector(
  getPeriod,
  (period) => {
    const currentMonth = getCurrentMonth();
    const selectedMonth = getMonthFromPeriod(period);

    return getIsFutureMonth(currentMonth, selectedMonth);
  },
);

export const buildPayHistoryEntry = (payHistoryItem, allocatedPayItem, payItemOption) => {
  if (allocatedPayItem || (payHistoryItem && payHistoryItem.activity)) {
    const { id: payItemId, type: payItemType, name } = payItemOption;
    const { id, total } = payHistoryItem || {};

    return {
      id,
      payItemId,
      payItemType,
      name,
      hours: total || getPayHistoryFormattedHours(0),
      amount: total || getPayHistoryFormattedAmount(0),
      isHours: payItemType === payItemTypes.entitlement,
      isAmount: payItemType !== payItemTypes.entitlement,
    };
  }

  return undefined;
};

export const buildPayHistoryEntries = (payHistoryItems, allocatedPayItems, payItemOptions) => (
  payItemOptions
    .reduce((accumulator, payItemOption) => {
      const { id } = payItemOption;
      const payHistoryItem = payHistoryItems.find(({ payItemId }) => payItemId === id);
      const allocatedPayItem = allocatedPayItems.find(({ id: payItemId }) => payItemId === id);

      const entry = buildPayHistoryEntry(payHistoryItem, allocatedPayItem, payItemOption);

      return entry ? [...accumulator, entry] : accumulator;
    }, [])
);

const getWagePayItemEntries = createSelector(
  getFilteredPayHistoryItems,
  getWagePayItems,
  getWagePayItemOptions,
  (payHistoryItems, allocatedPayItems, payItemOptions) => (
    buildPayHistoryEntries(payHistoryItems, allocatedPayItems, payItemOptions)
  ),
);

const getTaxPayItemEntries = createSelector(
  getFilteredPayHistoryItems,
  getAllocatedTaxPayItems,
  getTaxPayItemOptions,
  (payHistoryItems, allocatedPayItems, payItemOptions) => (
    buildPayHistoryEntries(payHistoryItems, allocatedPayItems, payItemOptions)
  ),
);

const getDeductionPayItemEntries = createSelector(
  getFilteredPayHistoryItems,
  getAllocatedDeductionPayItems,
  getDeductionPayItemOptions,
  (payHistoryItems, allocatedPayItems, payItemOptions) => (
    buildPayHistoryEntries(payHistoryItems, allocatedPayItems, payItemOptions)
  ),
);

const getSuperPayItemEntries = createSelector(
  getFilteredPayHistoryItems,
  getAllocatedSuperPayItems,
  getSuperPayItemOptions,
  (payHistoryItems, allocatedPayItems, payItemOptions) => (
    buildPayHistoryEntries(payHistoryItems, allocatedPayItems, payItemOptions)
  ),
);

const getLeavePayItemEntries = createSelector(
  getFilteredPayHistoryItems,
  getAllocatedLeavePayItems,
  getLeavePayItemOptions,
  (payHistoryItems, allocatedLeavePayItems, payItemOptions) => {
    const allocatedPayItems = allocatedLeavePayItems.map(({ payItemId: id }) => ({ id }));

    return buildPayHistoryEntries(payHistoryItems, allocatedPayItems, payItemOptions);
  },
);

const getExpensePayItemOptions = state => state.expensePayItemOptions;
const getEmployerExpensePayItemEntries = createSelector(
  getFilteredPayHistoryItems,
  getExpensePayItemOptions,
  (payHistoryItems, payItemOptions) => (
    buildPayHistoryEntries(payHistoryItems, [], payItemOptions)
  ),
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
  getTaxPayItemEntries,
  getDeductionPayItemEntries,
  getSuperDeductionPayItemEntries,
  (wagePayItems, taxPayItems, deductionPayItems, superPayItems) => [
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
  getIsPayHistoryItemsDisabled,
  (entries, disabled) => ({
    entries,
    showTableRows: true,
    disabled,
  }),
);

export const getExpenseTableRows = createSelector(
  getExpensePayItemEntries,
  getIsPayHistoryItemsDisabled,
  (entries, disabled) => ({
    entries,
    showTableRows: entries.length > 0,
    disabled,
  }),
);

export const getLeaveTableRows = createSelector(
  getLeavePayItemEntries,
  getIsPayHistoryItemsDisabled,
  (entries, disabled) => ({
    entries,
    showTableRows: entries.length > 0,
    disabled,
  }),
);

const getNewPayHistoryItemLine = (month, total) => ({ month, total, activity: 0 });

const getNewPayHistoryItem = ({
  payItemId, payItemType, month, total,
}) => ({
  payItemId,
  payItemType,
  lines: [getNewPayHistoryItemLine(month, total)],
});

const getUpdatedPayHistoryItem = (state, { payItemId, month, total }) => {
  const payHistoryItems = getPayHistoryItems(state);

  const foundPayHistoryItem = payHistoryItems
    .find(({ payItemId: payHistoryItemId }) => payHistoryItemId === payItemId);

  if (foundPayHistoryItem) {
    const foundLine = foundPayHistoryItem.lines
      .find(({ month: payHistoryMonth }) => payHistoryMonth === month);

    const lines = foundLine
      ? foundPayHistoryItem.lines.map(line => (
        line.month === month ? { ...line, total } : line))
      : [...foundPayHistoryItem.lines, getNewPayHistoryItemLine(month, total)];

    return {
      ...foundPayHistoryItem,
      lines,
    };
  }

  return undefined;
};

export const getUpdatedPayHistoryItems = (state, { payItemId, payItemType, total }) => {
  const payHistoryItems = getPayHistoryItems(state);
  const period = getPeriod(state);
  const month = getMonthFromPeriod(period);

  const details = {
    payItemId, payItemType, month, total,
  };
  const updatedPayHistoryItem = getUpdatedPayHistoryItem(state, details);

  return updatedPayHistoryItem
    ? payHistoryItems.map(payHistoryItem => (payHistoryItem.payItemId === payItemId
      ? updatedPayHistoryItem : payHistoryItem))
    : [...payHistoryItems, getNewPayHistoryItem(details)];
};

export const getFormattedActivity = ({ key, value }) => {
  switch (key) {
    case 'hours':
      return getPayHistoryFormattedHours(value);
    case 'amount':
      return getPayHistoryFormattedAmount(value);
    default:
      return value;
  }
};

const getPayHistoryItemLinesPayload = lines => lines.reduce((accumulator, line) => {
  const { month, activity, total: strTotal } = line;
  const total = Number(strTotal);
  const adjustment = total - activity;

  return activity || adjustment
    ? [...accumulator, { month, adjustment }]
    : accumulator;
}, []);

export const getPayHistoryDetailsPayload = (state) => {
  const payHistoryItems = getPayHistoryItems(state);

  const updatedPayHistoryItems = payHistoryItems.reduce((accumulator, historyItem) => {
    const {
      id, payItemId, payItemType, lines,
    } = historyItem;

    const updatedLines = getPayHistoryItemLinesPayload(lines);

    return updatedLines.length
      ? [...accumulator, {
        id, payItemId, payItemType, lines: updatedLines,
      }]
      : accumulator;
  }, []);

  return { payHistoryItems: updatedPayHistoryItems };
};
