import { createSelector } from 'reselect';

import formatAmount from '../../valueFormatters/formatAmount';

const getEmployeePayLines = state => state.employeePayList.lines;

export const getFormattedEmployeePayLines = createSelector(
  getEmployeePayLines,
  lines => lines.map(line => ({
    ...line,
    gross: formatAmount(line.gross),
    payg: formatAmount(line.payg),
    deduction: formatAmount(line.deduction),
    netPay: formatAmount(line.netPay),
    super: formatAmount(line.super),
  })),
);

export const getIsAllSelected = state => state.employeePayList.lines.every(line => line.isSelected);
const getIsSomeSelected = state => state.employeePayList.lines.some(line => line.isSelected);

export const getIsPartiallySelected = createSelector(
  getIsAllSelected,
  getIsSomeSelected,
  (isAllSelected, isSomeSelected) => !isAllSelected && isSomeSelected,
);

export const getNumberOfSelected = state => (
  state.employeePayList.lines.filter(line => line.isSelected).length
);

export const getTotals = createSelector(
  getEmployeePayLines,
  (lines) => {
    const calculatedTotals = lines
      .filter(line => line.isSelected)
      .reduce((totals, line) => ({
        gross: totals.gross + line.gross,
        payg: totals.payg + line.payg,
        deduction: totals.deduction + line.deduction,
        netPay: totals.netPay + line.netPay,
        super: totals.super + line.super,
      }), {
        gross: 0,
        payg: 0,
        deduction: 0,
        netPay: 0,
        super: 0,
      });

    return {
      gross: formatAmount(calculatedTotals.gross),
      payg: formatAmount(calculatedTotals.payg),
      deduction: formatAmount(calculatedTotals.deduction),
      netPay: formatAmount(calculatedTotals.netPay),
      super: formatAmount(calculatedTotals.super),
    };
  },
);

export const getEtpCodeCategory = state => state.employeePayList.etp.category;
export const getEtpCode = state => state.employeePayList.etp.code;
export const getIsEtpOpen = state => state.employeePayList.etp.isOpen;
export const getEtpEmployeeId = state => state.employeePayList.etp.employeeId;
export const getIsEtpCodeCategorySelected = createSelector(
  getEtpCodeCategory,
  Boolean,
);
export const getInvalidEtpNames = state => state.employeePayList.invalidEtpNames;

const isEtpPayItem = ({ stpCategory }) => ['ETPTaxableComponent', 'ETPTaxFreeComponent', 'ETPTaxWithholding'].includes(stpCategory);
const isEmptyPayItem = ({ amount }) => Number(amount) === 0;
const isUpdateableEtpCode = ({ etpCode }) => Boolean(etpCode);

const isNonEmptyEtpLine = ({ payItems }) => payItems.some(payItem => (
  isEtpPayItem(payItem) && !isEmptyPayItem(payItem)
));

export const isEtpAlertForLineShown = line => (
  isNonEmptyEtpLine(line) && !isUpdateableEtpCode(line)
);

export const isEtpSelectionForLineShown = line => (
  isUpdateableEtpCode(line) || isNonEmptyEtpLine(line)
);

export const isValidEtp = ({ invalidEtpNames }) => invalidEtpNames.length === 0;

export const formatEtpCode = ({ etpCode }) => (etpCode ? `Code ${etpCode}` : 'None');

export const getValidateEtpContent = createSelector(
  getEmployeePayLines,
  lines => lines.map(({
    employeeId, name, etpCode, payItems,
  }) => ({
    employeeId,
    name,
    etpCode,
    payItems: payItems
      .filter(isEtpPayItem)
      .map(({ payItemId, amount, stpCategory }) => (
        { payItemId, amount, stpCategory }
      )),
  })),
);

export const getIsPayItemLineDirty = state => state.employeePayList.isPayItemLineDirty;

const isWageDeductionTaxPayItem = payItemType => [
  'SalaryWage',
  'HourlyWage',
  'Deduction',
  'SuperannuationDeductionBeforeTax',
  'SuperannuationDeductionAfterTax',
  'Tax',
].includes(payItemType);
const isLeavePayItem = payItemType => payItemType === 'Entitlement';
const isEmployerExpensePayItem = payItemType => ['Expense', 'SuperannuationExpense'].includes(payItemType);

const getEmployeeLineByEmployeeId = (state, employeeId) => state.employeePayList.lines.find(
  line => line.employeeId === employeeId,
);

export const getCombinedPayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  line => line.payItems
    .filter(payItem => isWageDeductionTaxPayItem(payItem.type))
    .map(payItem => ({
      ...payItem,
      shouldShowHours: payItem.type === 'HourlyWage',
    })),
);

export const getLeavePayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  line => line.payItems
    .filter(payItem => isLeavePayItem(payItem.type))
    .map(payItem => ({
      ...payItem,
      shouldShowHours: true,
    })),
);

export const getEmployerExpensePayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (state, props) => state.employeePayList.lines.find(line => line.employeeId === props.employeeId),
  line => line.payItems
    .filter(payItem => isEmployerExpensePayItem(payItem.type))
    .map(payItem => ({
      ...payItem,
      shouldShowHours: false,
    })),
);

export const getShouldShowCombinedPayItemTableRows = () => true;
export const getShouldShowLeavePayItemTableRows = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  line => line.payItems.some(payItem => isLeavePayItem(payItem.type)),
);
export const getShouldShowExpensePayItemTableRows = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  line => line.payItems.some(payItem => isEmployerExpensePayItem(payItem.type)),
);

const getPayItemLineForRecalculatePayload = (payItem) => {
  const { payItemName, isSubmitting, ...restOfPayItem } = payItem;
  return restOfPayItem;
};

export const getRecalculatePayPayload = ({
  state, employeeId, payItemId, key,
}) => {
  const editedField = key;
  const editedEmployeeLine = getEmployeeLineByEmployeeId(state, employeeId);
  const editedPayItem = editedEmployeeLine.payItems.find(
    payItem => payItem.payItemId === payItemId,
  );

  return {
    employeeId,
    paymentFrequency: state.startPayRun.paymentFrequency,
    paymentDate: state.startPayRun.paymentDate,
    payPeriodStart: state.startPayRun.payPeriodStart,
    payPeriodEnd: state.startPayRun.payPeriodEnd,
    payItems: editedEmployeeLine.payItems.map(
      payItem => getPayItemLineForRecalculatePayload(payItem),
    ),
    editedField,
    editedPayItem: getPayItemLineForRecalculatePayload(editedPayItem),
  };
};
