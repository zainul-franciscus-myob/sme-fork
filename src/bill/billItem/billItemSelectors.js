import {
  addDays, addMonths, endOfMonth, getDaysInMonth, setDate,
} from 'date-fns';
import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

import TaxState from './TaxState';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getSuppliers = state => state.suppliers;
export const getBillNumber = state => state.bill.billNumber;
export const getBillId = state => state.billId;
export const getInvoiceNumber = state => state.bill.invoiceNumber;
export const getSupplierAddress = state => state.bill.address;
export const getSupplierId = state => state.bill.supplierId;
export const getIssueDate = state => state.bill.issueDate;
export const getExpirationTerms = state => state.expirationTerms;
export const getNote = state => state.bill.note;
export const getIsReportable = state => state.bill.isReportable;
export const getIsTaxInclusive = state => (
  state.bill.isTaxInclusive ? TaxState.TaxInclusive : TaxState.TaxExclusive
);
export const getIsAnAmountInput = key => ['units', 'unitPrice', 'discount', 'amount'].includes(key);

export const getAlertMessage = state => state.alertMessage;

export const getBillLinesArray = createSelector(
  state => state.bill.lines.length,
  len => Array(len).fill({}),
);

export const getIsTableEmpty = state => getBillLinesArray(state).length === 0;

export const getItems = state => state.items;
export const getTaxCodes = state => state.taxCodes;

export const getBillLineByIndex = (state, { index }) => (
  state.bill.lines[index] ? state.bill.lines[index] : state.newLine
);

export const getBillPayload = (state) => {
  const selectedSupplier = state.suppliers.find(supplier => supplier.id === state.bill.supplierId);
  const supplierName = selectedSupplier ? `${selectedSupplier.displayName}` : '';
  return {
    ...state.bill,
    supplierName,
  };
};
export const getIsPageEdited = state => state.isPageEdited;
export const getAreLinesCalculating = state => state.areLinesCalculating;
export const getIsSubmitting = state => state.isSubmitting;
export const getModalType = state => state.modalType;
export const getIsCreating = state => state.billId === 'newItem';
export const getNewLineIndex = state => state.bill.lines.length - 1;
export const getTotals = state => state.totals;
export const getExpirationDays = state => (state.bill.expirationDays ? Number(state.bill.expirationDays) : '');
export const getIsLineAmountDirty = state => state.isLineAmountDirty;

export const getExpirationTerm = state => state.bill.expirationTerm;
const getExpiredDateOnADayOfTheMonth = (issueDate, expirationDays) => {
  const date = new Date(issueDate);
  const month = expirationDays < date.getDate() ? addMonths(date, 1) : date;
  const daysInMonth = getDaysInMonth(month);

  if (expirationDays > daysInMonth) {
    return endOfMonth(month);
  }

  return setDate(month, expirationDays);
};

const getExpiredDateInAGivenNumberOfDays = (issueDate, expirationDays) => {
  const date = new Date(issueDate);

  return addDays(date, expirationDays);
};

const getExpiredDateDayOfMonthAfterEOM = (issueDate, expirationDays) => {
  const date = addMonths(new Date(issueDate), 1);
  const daysInMonth = getDaysInMonth(date);

  if (expirationDays > daysInMonth) {
    return endOfMonth(date);
  }
  return setDate(date, expirationDays);
};

const getExpiredDateNumberOfDaysAfterEOM = (issueDate, expirationDays) => {
  const date = endOfMonth(new Date(issueDate));

  return addDays(date, expirationDays);
};

const formatExpiredDate = date => dateFormat(date, 'dd/mm/yyyy');
const calculateDate = (issueDate, expirationTerm, expirationDays) => {
  if (expirationTerm === 'OnADayOfTheMonth') {
    return getExpiredDateOnADayOfTheMonth(issueDate, expirationDays);
  }
  if (expirationTerm === 'InAGivenNumberOfDays') {
    return getExpiredDateInAGivenNumberOfDays(issueDate, expirationDays);
  }
  if (expirationTerm === 'DayOfMonthAfterEOM') {
    return getExpiredDateDayOfMonthAfterEOM(issueDate, expirationDays);
  }
  if (expirationTerm === 'NumberOfDaysAfterEOM') {
    return getExpiredDateNumberOfDaysAfterEOM(issueDate, expirationDays);
  }

  return issueDate;
};

export const getExpiredDate = createSelector(
  getIssueDate,
  getExpirationTerm,
  getExpirationDays,
  (issueDate, expirationTerm, expirationDays) => {
    const calculatedDate = calculateDate(issueDate, expirationTerm, expirationDays);
    return formatExpiredDate(calculatedDate);
  },
);

export const getLinesForItemChange = (state, index, itemId) => ({
  index,
  itemId,
  lines: state.bill.lines,
  isTaxInclusive: state.bill.isTaxInclusive,
});

export const getLinesForCalculation = (state, index, key) => {
  const amountInput = state.bill.lines[index][key];
  const updatedLines = state.bill.lines.map(
    (line, lineIndex) => (lineIndex === index
      ? { ...line, [key]: amountInput }
      : line),
  );

  return {
    index,
    key,
    lines: updatedLines,
    isTaxInclusive: state.bill.isTaxInclusive,
  };
};

export const getLinesAndTaxInclusive = state => ({
  lines: state.bill.lines,
  isTaxInclusive: state.bill.isTaxInclusive,
});

export const getShouldLineSelectItem = (state, { index }) => state.bill.lines.length <= index;
