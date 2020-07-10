import { createSelector } from 'reselect';

import formatAmount from '../../../../../common/valueFormatters/formatAmount';

const getEmployeePayList = (state) => state.employeePayList;

const getEmployeePayLines = createSelector(
  getEmployeePayList,
  (pays) => pays.lines
);

export const getFormattedEmployeePayLines = createSelector(
  getEmployeePayLines,
  (lines) =>
    lines.map((line) => ({
      ...line,
      daysPaid: String(line.daysPaid),
      gross: formatAmount(line.gross),
      paye: formatAmount(line.paye),
      takeHomePay: formatAmount(line.takeHomePay),
      kiwiSaver: formatAmount(line.kiwiSaver),
    }))
);

export const getIsAllSelected = createSelector(getEmployeePayLines, (lines) =>
  lines.every((line) => line.isSelected)
);

export const getIsSomeSelected = createSelector(getEmployeePayLines, (lines) =>
  lines.some((line) => line.isSelected)
);

export const getIsPartiallySelected = createSelector(
  getIsAllSelected,
  getIsSomeSelected,
  (isAllSelected, isSomeSelected) => !isAllSelected && isSomeSelected
);

export const getNumberOfSelected = createSelector(
  getEmployeePayLines,
  (lines) => lines.filter((line) => line.isSelected).length
);

export const getTotals = createSelector(getEmployeePayLines, (lines) => {
  const calculatedTotals = lines
    .filter((line) => line.isSelected)
    .reduce(
      (totals, line) => ({
        gross: totals.gross + line.gross,
        paye: totals.paye + line.paye,
        takeHomePay: totals.takeHomePay + line.takeHomePay,
        kiwiSaver: totals.kiwiSaver + line.kiwiSaver,
      }),
      {
        gross: 0,
        paye: 0,
        takeHomePay: 0,
        kiwiSaver: 0,
      }
    );

  return {
    gross: formatAmount(calculatedTotals.gross),
    paye: formatAmount(calculatedTotals.paye),
    takeHomePay: formatAmount(calculatedTotals.takeHomePay),
    kiwiSaver: formatAmount(calculatedTotals.kiwiSaver),
  };
});

export const isPayItemLineDirty = createSelector(
  getEmployeePayList,
  (pays) => pays.isPayItemLineDirty
);

const isWagePayItem = (payItemType) =>
  ['SalaryWage', 'HourlyWage'].includes(payItemType);
const isTaxPayItem = (payItemType) => ['Tax'].includes(payItemType);
const isKiwiSaverPayItem = (payItemType) => ['KiwiSaver'].includes(payItemType);

const getEmployeeLineByEmployeeId = (state, employeeId) =>
  state.employeePayList.lines.find((line) => line.employeeId === employeeId);

const getOriginalEmployeeLineByEmployeeId = (state, employeeId) =>
  state.employeePayList.originalLines.find(
    (line) => line.employeeId === employeeId
  );

const getBaseHourlyWagePayItemId = (state) =>
  state.employeePayList.baseHourlyWagePayItemId;
const getBaseSalaryWagePayItemId = (state) =>
  state.employeePayList.baseSalaryWagePayItemId;

const SMALLER = -1;
const BIGGER = 1;
const wagePayItemComparator = (a, b, baseWageIds) => {
  if (baseWageIds.includes(a.payItemId)) {
    return SMALLER;
  }
  if (baseWageIds.includes(b.payItemId)) {
    return BIGGER;
  }

  if (a.type === 'HourlyWage' && b.type === 'SalaryWage') return SMALLER;
  if (b.type === 'HourlyWage' && a.type === 'SalaryWage') return BIGGER;

  return a.payItemName.localeCompare(b.payItemName);
};

export const getWagePayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  getBaseHourlyWagePayItemId,
  getBaseSalaryWagePayItemId,
  (line, baseHourlyWagePayItemId, baseSalaryWagePayItemId) =>
    line.payItems
      .filter((payItem) => isWagePayItem(payItem.type))
      .sort((a, b) =>
        wagePayItemComparator(a, b, [
          baseHourlyWagePayItemId,
          baseSalaryWagePayItemId,
        ])
      )
      .map((payItem) => ({
        ...payItem,
        shouldShowQuantity: payItem.type === 'HourlyWage',
      }))
);

export const getTaxPayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems
      .filter((payItem) => isTaxPayItem(payItem.type))
      .map((payItem) => ({
        ...payItem,
        shouldShowQuantity: false,
      }))
);

export const getKiwiSaverPayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems
      .filter((payItem) => isKiwiSaverPayItem(payItem.type))
      .map((payItem) => ({
        ...payItem,
        shouldShowQuantity: false,
      }))
);

export const getShouldShowWagePayItems = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payItems.some((payItem) => isWagePayItem(payItem.type))
);

export const getShouldShowTaxPayItems = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payItems.some((payItem) => isTaxPayItem(payItem.type))
);

export const getShouldShowKiwiSaverPayItems = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payItems.some((payItem) => isKiwiSaverPayItem(payItem.type))
);

const getPayItemLineForRecalculatePayload = (payItem) => {
  const { isSubmitting, ...restOfPayItem } = payItem;
  return restOfPayItem;
};

export const getRecalculatePayPayload = ({
  state,
  employeeId,
  payItemId,
  key,
}) => {
  const editedField = key;
  const editedEmployeeLine = getEmployeeLineByEmployeeId(state, employeeId);
  const editedPayItem = editedEmployeeLine.payItems.find(
    (payItem) => payItem.payItemId === payItemId
  );
  const originalEmployeeLine = getOriginalEmployeeLineByEmployeeId(
    state,
    employeeId
  );

  return {
    employeeId,
    paymentFrequency: state.startPayRun.currentEditingPayRun.paymentFrequency,
    paymentDate: state.startPayRun.currentEditingPayRun.paymentDate,
    payPeriodStart: state.startPayRun.currentEditingPayRun.payPeriodStart,
    payPeriodEnd: state.startPayRun.currentEditingPayRun.payPeriodEnd,
    payItems: originalEmployeeLine.payItems.map((payItem) =>
      getPayItemLineForRecalculatePayload(payItem)
    ),
    editedField,
    editedPayItem: getPayItemLineForRecalculatePayload(editedPayItem),
  };
};
