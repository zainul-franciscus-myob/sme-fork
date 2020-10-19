import { createSelector } from 'reselect';

import formatAmount from '../../../../../common/valueFormatters/formatAmount';

const getDraftPayRun = (state) => state.draftPayRun;

const getEmployeePayLines = createSelector(
  getDraftPayRun,
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
        gross: totals.gross + Number(line.gross),
        paye: totals.paye + Number(line.paye),
        takeHomePay: totals.takeHomePay + Number(line.takeHomePay),
        kiwiSaver: totals.kiwiSaver + Number(line.kiwiSaver),
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
  getDraftPayRun,
  (pays) => pays.isPayItemLineDirty
);

const isWagePayItem = (payItemType) =>
  ['SalaryWage', 'HourlyWage'].includes(payItemType);
const isTaxPayItem = (payItemType) => ['Tax'].includes(payItemType);
const isKiwiSaverPayItem = (payItemType) =>
  ['KiwiSaverEmployee', 'KiwiSaverEmployers', 'ESCT'].includes(payItemType);

const getEmployeeLineByEmployeeId = (state, employeeId) =>
  state.draftPayRun.lines.find((line) => line.employeeId === employeeId);

const getBaseHourlyWagePayItemId = (state) =>
  state.draftPayRun.baseHourlyWagePayItemId;
const getBaseSalaryWagePayItemId = (state) =>
  state.draftPayRun.baseSalaryWagePayItemId;

const SMALLER = -1;
const BIGGER = 1;
const wagePayItemComparator = (a, b, baseWageIds) => {
  if (baseWageIds.includes(b.payrollCategoryId)) {
    return BIGGER;
  }
  if (baseWageIds.includes(a.payrollCategoryId)) {
    return SMALLER;
  }

  if (
    a.payrollCategoryType === 'HourlyWage' &&
    b.payrollCategoryType === 'SalaryWage'
  )
    return SMALLER;
  if (
    b.payrollCategoryType === 'HourlyWage' &&
    a.payrollCategoryType === 'SalaryWage'
  )
    return BIGGER;

  return a.payrollCategoryName.localeCompare(b.payrollCategoryName);
};

export const getWagePayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  getBaseHourlyWagePayItemId,
  getBaseSalaryWagePayItemId,
  (line, baseHourlyWagePayItemId, baseSalaryWagePayItemId) =>
    line.payItems
      .filter((payItem) => isWagePayItem(payItem.payrollCategoryType))
      .sort((a, b) =>
        wagePayItemComparator(a, b, [
          baseHourlyWagePayItemId,
          baseSalaryWagePayItemId,
        ])
      )
      .map((payItem) => ({
        ...payItem,
        shouldShowQuantity: payItem.payrollCategoryType === 'HourlyWage',
      }))
);

export const getTaxPayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems
      .filter((payItem) => isTaxPayItem(payItem.payrollCategoryType))
      .map((payItem) => ({
        ...payItem,
        shouldShowQuantity: false,
      }))
);

export const getKiwiSaverPayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems
      .filter((payItem) => isKiwiSaverPayItem(payItem.payrollCategoryType))
      .map((payItem) => ({
        ...payItem,
        shouldShowQuantity: false,
      }))
);

export const getShouldShowWagePayItems = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems.some((payItem) => isWagePayItem(payItem.payrollCategoryType))
);

export const getShouldShowTaxPayItems = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems.some((payItem) => isTaxPayItem(payItem.payrollCategoryType))
);

export const getShouldShowKiwiSaverPayItems = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems.some((payItem) =>
      isKiwiSaverPayItem(payItem.payrollCategoryType)
    )
);

export const getUpdateEmployeePayRequest = ({ state, employeeId }) => {
  return getEmployeeLineByEmployeeId(state, employeeId);
};

export const getEmployeePayId = ({ state, employeeId }) => {
  const employeePay = getEmployeeLineByEmployeeId(state, employeeId);
  return employeePay.id;
};
