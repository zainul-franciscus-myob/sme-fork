import { createSelector, createStructuredSelector } from 'reselect';
import { format } from 'date-fns';

import {
  getDeductionPayItems as getAllocatedDeductionPayItems,
  getDeductionPayItemOptions,
} from './PayrollDeductionDetailSelectors';
import {
  getExpensePayItems as getAllocatedExpensePayItems,
  getExpensePayItemOptions,
} from './PayrollExpenseDetailSelectors';
import { getAllocatedLeavePayItems, getLeavePayItemOptions } from './PayrollLeaveDetailSelectors';
import { getAllocatedPayItems as getAllocatedSuperPayItems, getSuperPayItemOptions } from './PayrollSuperSelectors';
import { getTaxPayItems as getAllocatedTaxPayItems, getTaxPayItemOptions } from './PayrollTaxSelectors';
import {
  getWagePayItems as getWagePayItemOptions,
  getAllocatedWagePayItems as getWagePayItems,
} from './PayrollWageSelectors';
import formatNumberWithDecimalScaleRange from '../../../valueFormatters/formatNumberWithDecimalScaleRange';
import payItemTypes from '../payItemTypes';

const groupedMonth = 'group';

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
  formatNumberWithDecimalScaleRange(amount, 2, 3)
);

const getPayHistoryFormattedAmount = amount => (
  formatNumberWithDecimalScaleRange(amount, 2, 2)
);

const getPeriod = state => state.payrollDetails.payHistoryDetails.filterOptions.period;

const getPayHistoryItems = state => state.payrollDetails.payHistoryDetails.payHistoryItems;

const getPayHistoryPeriodOptions = state => state.payHistoryPeriodOptions;

export const getFilterOptions = createStructuredSelector({
  period: getPeriod,
  payHistoryPeriodOptions: getPayHistoryPeriodOptions,
});

const getIsGrouping = period => ['Quarter1', 'Quarter2', 'Quarter3', 'Quarter4', 'YearToDate'].includes(period);

const getMonth = period => (getIsGrouping(period) ? groupedMonth : period);

export const getMonthsInPeriod = (period) => {
  switch (period) {
    case 'Quarter1':
      return ['July', 'August', 'September'];
    case 'Quarter2':
      return ['October', 'November', 'December'];
    case 'Quarter3':
      return ['January', 'February', 'March'];
    case 'Quarter4':
      return ['April', 'May', 'June'];
    case 'YearToDate':
      return [
        'July', 'August', 'September',
        'October', 'November', 'December',
        'January', 'February', 'March',
        'April', 'May', 'June',
      ];
    default:
      return [period];
  }
};

export const getAssignedMonthForPeriod = (period) => {
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
    const month = getMonth(period);

    return payHistoryItems.map(({ id, payItemId, lines = [] }) => {
      const line = lines
        .find(({ month: payHistoryMonth }) => payHistoryMonth === month) || {};
      const { activity, total } = line;

      return {
        id, payItemId, activity, total,
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
    const selectedMonth = getAssignedMonthForPeriod(period);

    return getIsFutureMonth(currentMonth, selectedMonth);
  },
);

const getFormatTotalByPayItemType = (payItemType, amount) => (
  payItemType === payItemTypes.entitlement
    ? getPayHistoryFormattedHours(amount)
    : getPayHistoryFormattedAmount(amount)
);

const canBuildPayHistoryEntry = (payHistoryItem, allocatedPayItem, payItemOption) => {
  const { type } = payItemOption;
  const hasPayHistoryItem = payHistoryItem && (
    payHistoryItem.activity || payHistoryItem.total !== getFormatTotalByPayItemType(type, 0)
  );

  return allocatedPayItem || hasPayHistoryItem;
};

export const buildPayHistoryEntry = (payHistoryItem, allocatedPayItem, payItemOption) => {
  if (canBuildPayHistoryEntry(payHistoryItem, allocatedPayItem, payItemOption)) {
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

const getEmployerExpensePayItemEntries = createSelector(
  getFilteredPayHistoryItems,
  getAllocatedExpensePayItems,
  getExpensePayItemOptions,
  (payHistoryItems, allocatedPayItems, payItemOptions) => (
    buildPayHistoryEntries(payHistoryItems, allocatedPayItems, payItemOptions)
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
  const month = getMonth(period);

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

const getPayHistoryItemLineByMonth = ({ lines }, month) => (
  lines.find(({ month: payHistoryItemMonth }) => payHistoryItemMonth === month)
);

const getGroupedPayHistoryItems = (period, payHistoryItems) => {
  const monthsInPeriod = getMonthsInPeriod(period);

  return payHistoryItems.map((payHistoryItem) => {
    const { payItemType, lines = [] } = payHistoryItem;

    const filteredLines = lines
      .filter(({ month: standardPayMonth }) => monthsInPeriod.includes(standardPayMonth)) || {};

    const sum = filteredLines.reduce((acc, { activity, total }) => ({
      activity: acc.activity + activity,
      total: acc.total + Number(total || 0),
    }), { activity: 0, total: 0 });

    const { activity, total } = sum;

    return {
      ...payHistoryItem,
      lines: [
        ...lines,
        { month: groupedMonth, activity, total: getFormatTotalByPayItemType(payItemType, total) },
      ],
    };
  });
};

const getUngroupedPayHistoryItems = (period, payHistoryItems) => {
  // When user unselect a quarterly or yearly (group) period,
  // update the lines inside the period and remove the group line.
  //
  // Any change made to total amount of the grouping, the change
  // should only be apply to the first month of the period.
  // For example, 1st Quarter consists of July, August, September
  // with following values.
  // |---------------------|
  // | period      | total |
  // |-------------|-------|
  // | July        | 1000  |
  // | August      | 1000  |
  // | September   | 1000  |
  // |---------------------|
  // When user select period 1st Quarter, the grouping show
  // the sum of the months in 1st Quarter
  // |---------------------|
  // | period      | total |
  // |-------------|-------|
  // | 1st Quarter | 3000  |
  // |---------------------|
  // User changes the total value to 3300. When the user change
  // the period option. The change to total value should be apply to
  // the first month of the 1st Quarter which is July
  // |---------------------|
  // | period      | total |
  // |-------------|-------|
  // | July        | 1300  |
  // | August      | 1000  |
  // | September   | 1000  |
  // |---------------------|

  const assignedMonth = getAssignedMonthForPeriod(period);
  const monthsInPeriod = getMonthsInPeriod(period);

  return payHistoryItems.map((payHistoryItem) => {
    const { payItemType, lines = [] } = payHistoryItem;

    const { total: groupTotal } = getPayHistoryItemLineByMonth(payHistoryItem, groupedMonth) || {};

    const sumTotalOfOtherMonthsInGroup = lines
      .filter(({ month }) => monthsInPeriod.includes(month) && month !== assignedMonth)
      .reduce((sum, { total }) => sum + Number(total || 0), 0);

    const lineTotal = Number(groupTotal || 0) - sumTotalOfOtherMonthsInGroup;
    const formattedLineTotal = getFormatTotalByPayItemType(payItemType, lineTotal);

    const unGroupedLines = lines.filter(({ month }) => month !== groupedMonth);
    const assignedLine = getPayHistoryItemLineByMonth(payHistoryItem, assignedMonth);

    return {
      ...payHistoryItem,
      lines: assignedLine
        ? unGroupedLines.map(line => (
          line.month === assignedLine.month ? { ...assignedLine, total: formattedLineTotal } : line
        ))
        : [...unGroupedLines, getNewPayHistoryItemLine(assignedMonth, formattedLineTotal)],
    };
  });
};

export const getUpdatedPayHistoryItemsFromFilterOptions = (state, nextPeriod) => {
  const currentPeriod = getPeriod(state);
  const isPreviousGrouping = getIsGrouping(currentPeriod);
  const isNextGrouping = getIsGrouping(nextPeriod);

  const payHistoryItems = getPayHistoryItems(state);
  if (isPreviousGrouping && isNextGrouping) {
    const ungroupedPayHistoryItems = getUngroupedPayHistoryItems(currentPeriod, payHistoryItems);
    return getGroupedPayHistoryItems(nextPeriod, ungroupedPayHistoryItems);
  }

  if (isPreviousGrouping) {
    return getUngroupedPayHistoryItems(currentPeriod, payHistoryItems);
  }

  if (isNextGrouping) {
    return getGroupedPayHistoryItems(nextPeriod, payHistoryItems);
  }

  return payHistoryItems;
};

const getPayHistoryItemLinesPayload = lines => lines.reduce((accumulator, line) => {
  const {
    month, activity, total: strTotal, hasPayHistory,
  } = line;
  const total = Number(strTotal);
  const adjustment = total - activity;

  return hasPayHistory || adjustment
    ? [...accumulator, { month, adjustment }]
    : accumulator;
}, []);

const getUpdatedPayHistoryItemPayload = payHistoryItems => (
  payHistoryItems.reduce((accumulator, historyItem) => {
    const {
      id, payItemId, payItemType, lines,
    } = historyItem;

    const updatedLines = getPayHistoryItemLinesPayload(lines);

    return updatedLines.length
      ? [...accumulator, {
        id, payItemId, payItemType, lines: updatedLines,
      }]
      : accumulator;
  }, [])
);

export const getPayHistoryDetailsPayload = (state) => {
  const payHistoryItems = getPayHistoryItems(state);
  const period = getPeriod(state);

  const updatedPayHistoryItems = getIsGrouping(period)
    ? getUngroupedPayHistoryItems(period, payHistoryItems)
    : payHistoryItems;

  const updatedPayHistoryItemPayLoad = getUpdatedPayHistoryItemPayload(updatedPayHistoryItems);

  return { payHistoryItems: updatedPayHistoryItemPayLoad };
};
