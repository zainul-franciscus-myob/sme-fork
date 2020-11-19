import { createSelector } from 'reselect';

import formatAmount from '../../../../../common/valueFormatters/formatAmount';

const getDraftPayRun = (state) => state.draftPayRun;

const getEmployeePayLines = createSelector(
  getDraftPayRun,
  (draftPayRun) => draftPayRun.lines
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

export const isPayLineDirty = createSelector(
  getDraftPayRun,
  (pays) => pays.isPayLineDirty
);

const isWagePayLine = (payLineType) =>
  ['Earnings', 'Wages'].includes(payLineType);
const isTaxPayLine = (payLineType) => ['Taxes'].includes(payLineType);
const isKiwiSaverPayLine = (payLineType) =>
  ['KiwiSaverEmployee', 'KiwiSaverEmployer', 'ESCT', 'Esct'].includes(
    payLineType
  );

const getEmployeeLineByEmployeeId = (state, employeeId) =>
  state.draftPayRun.lines.find((line) => line.employeeId === employeeId);

const getBaseHourlyWagePayItemId = (state) =>
  state.draftPayRun.baseHourlyWagePayItemId;
const getBaseSalaryWagePayItemId = (state) =>
  state.draftPayRun.baseSalaryWagePayItemId;

const SMALLER = -1;
const BIGGER = 1;
const wagePayLineComparator = (a, b, baseWageIds) => {
  if (baseWageIds.includes(b.payItemId)) {
    return BIGGER;
  }
  if (baseWageIds.includes(a.payItemId)) {
    return SMALLER;
  }

  if (a.calculationType === 'Rate' && b.calculationType === 'Amount')
    return SMALLER;
  if (b.calculationType === 'Rate' && a.calculationType === 'Amount')
    return BIGGER;

  return a.name.localeCompare(b.name);
};

export const getWagePayLineEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  getBaseHourlyWagePayItemId,
  getBaseSalaryWagePayItemId,
  (line, baseHourlyWagePayItemId, baseSalaryWagePayItemId) =>
    line.payLines
      .filter((payLine) => isWagePayLine(payLine.type))
      .sort((a, b) =>
        wagePayLineComparator(a, b, [
          baseHourlyWagePayItemId,
          baseSalaryWagePayItemId,
        ])
      )
      .map((payLine) => ({
        ...payLine,
        shouldShowQuantity: payLine.calculationType === 'Rate',
      }))
);

export const getHolidayAndLeaveLineEntries = createSelector(() => {
  return [];
});

export const getTaxPayLineEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payLines
      .filter((payLine) => isTaxPayLine(payLine.type))
      .map((payLine) => ({
        ...payLine,
        shouldShowQuantity: false,
      }))
);

export const getKiwiSaverPayLineEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payLines
      .filter((payLine) => isKiwiSaverPayLine(payLine.type))
      .map((payLine) => ({
        ...payLine,
        shouldShowQuantity: false,
      }))
);

export const getShouldShowWagePayLines = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payLines.some((payLine) => isWagePayLine(payLine.type))
);

export const getShouldShowTaxPayLines = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payLines.some((payLine) => isTaxPayLine(payLine.type))
);

export const getShouldShowKiwiSaverPayLines = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payLines.some((payLine) => isKiwiSaverPayLine(payLine.type))
);

export const getUpdateEmployeePayRequest = ({ state, employeeId }) => {
  return getEmployeeLineByEmployeeId(state, employeeId);
};

export const getUpdateDraftPayRunRequest = createSelector(
  getEmployeePayLines,
  (lines) => ({
    employeePays: lines.map((line) => ({
      id: line.id,
      isSelected: line.isSelected,
    })),
  })
);

export const getEmployeePayId = ({ state, employeeId }) => {
  const employeePay = getEmployeeLineByEmployeeId(state, employeeId);
  return employeePay.id;
};

export const getIsAddHolidaysAndLeaveModalOpen = (state) =>
  state.draftPayRun.isAddHolidaysAndLeaveModalOpen;
