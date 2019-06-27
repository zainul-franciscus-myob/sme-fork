import {
  addDays,
  addMonths,
  endOfMonth,
  getDaysInMonth,
  setDate,
} from 'date-fns';
import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

import TaxState from './TaxState';

export const getBusinessId = state => state.businessId;
export const getQuoteId = state => state.quoteId;
export const getRegion = state => state.region;
export const getCustomers = state => state.customers;
export const getQuoteNumber = state => state.quote.quoteNumber;
export const getPurchaseOrder = state => state.quote.purchaseOrder;
export const getCustomerAddress = state => state.quote.address;
export const getCustomerId = state => state.quote.customerId;
export const getIssueDate = state => state.quote.issueDate;
export const getExpirationTerms = state => state.expirationTerms;
export const getNote = state => state.quote.note;
export const getIsTaxInclusive = state => (
  state.quote.isTaxInclusive ? TaxState.TAX_INCLUSIVE : TaxState.TAX_EXCLUSIVE
);
export const getTotals = state => state.totals;

export const getExpirationDays = state => state.quote.expirationDays;
export const getExpirationTerm = state => state.quote.expirationTerm;

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

export const getEmptyQuoteLines = createSelector(
  state => state.quote.lines.length,
  len => Array(len).fill({}),
);

export const getQuoteLineByIndex = (state, { index }) => (
  state.quote.lines[index] ? state.quote.lines[index] : state.newLine
);

export const getItems = state => state.items;
export const getTaxCodes = state => state.taxCodes;
export const getQuotePayload = state => state.quote;
export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;

export const getIsNewLine = (state, { index }) => state.quote.lines.length <= index;
export const getNewLineIndex = state => state.quote.lines.length - 1;
export const getPayloadForUpdateLineItem = (state, index, itemId) => ({
  index,
  itemId,
  lines: state.quote.lines,
  isTaxInclusive: state.quote.isTaxInclusive,
});

export const getPayloadForRemoveTableRow = state => ({
  lines: state.quote.lines,
  isTaxInclusive: state.quote.isTaxInclusive,
});

export const getPayloadForUpdateLineTaxCode = state => ({
  lines: state.quote.lines,
  isTaxInclusive: state.quote.isTaxInclusive,
});

export const getPayloadForUpdateIsTaxInclusive = (state) => {
  const currentLineIsTaxInclusiveState = !state.quote.isTaxInclusive;
  return {
    lines: state.quote.lines,
    isTaxInclusive: currentLineIsTaxInclusiveState,
  };
};

export const getPayloadForCalculateAmountInputs = (state, index, key) => ({
  index,
  key,
  lines: state.quote.lines,
  isTaxInclusive: state.quote.isTaxInclusive,
});

export const getIsCreating = state => state.quoteId === 'newItem';
export const getIsCalculating = state => state.isCalculating;
export const getIsLineAmountInputDirty = state => state.isLineAmountInputDirty;
export const getIsPageEdited = state => state.isPageEdited;
export const getIsSubmitting = state => state.isSubmitting;
