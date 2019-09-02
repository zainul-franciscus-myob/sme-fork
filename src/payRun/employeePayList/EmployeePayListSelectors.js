import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

import formatAmount from '../../valueFormatters/formatAmount';

const formatDate = date => dateFormat(new Date(date), 'ddd dd/mm/yyyy');

const getPaymentFrequency = state => state.startPayRun.paymentFrequency;
const getPaymentDate = state => formatDate(state.startPayRun.paymentDate);
const getPayPeriodStart = state => formatDate(state.startPayRun.payPeriodStart);
const getPayPeriodEnd = state => formatDate(state.startPayRun.payPeriodEnd);

export const getEmployeeHeader = createSelector(
  getPaymentFrequency,
  getPaymentDate,
  getPayPeriodStart,
  getPayPeriodEnd,
  (paymentFrequency, paymentDate, payPeriodStart, payPeriodEnd) => ({
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
  }),
);

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
