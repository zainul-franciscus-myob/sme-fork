import {
  addDays, addMonths, endOfMonth, getDaysInMonth, setDate,
} from 'date-fns';
import { createSelector } from 'reselect/lib/index';
import dateFormat from 'dateformat';

import ExpirationTerm from './enums/ExpirationTerm';
import TaxState from './enums/TaxState';

export const getBusinessId = state => state.businessId;

export const getInvoiceId = state => state.invoiceId;

export const getRegion = state => state.region;

const getCustomers = state => state.customers;

const getInvoice = state => state.invoice;

const getExpirationTerms = state => state.expirationTerms;

const getExpirationTerm = state => getInvoice(state).expirationTerm;

const getIssueDate = state => getInvoice(state).issueDate;

const getExpirationDays = state => getInvoice(state).expirationDays;

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
  switch (expirationTerm) {
    case ExpirationTerm.onADayOfTheMonth:
      return getExpiredDateOnADayOfTheMonth(issueDate, expirationDays);

    case ExpirationTerm.inAGivenNumberOfDays:
      return getExpiredDateInAGivenNumberOfDays(issueDate, expirationDays);

    case ExpirationTerm.dayOfMonthAfterEOM:
      return getExpiredDateDayOfMonthAfterEOM(issueDate, expirationDays);

    case ExpirationTerm.numberOfDaysAfterEOM:
      return getExpiredDateNumberOfDaysAfterEOM(issueDate, expirationDays);

    default:
      return issueDate;
  }
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

export const getIsCreating = state => state.invoiceId === 'newItem';

export const areLinesCalculating = state => state.areLinesCalculating;

const getIsSubmitting = state => state.isSubmitting;

export const getTaxInclusiveOption = state => (
  getInvoice(state).isTaxInclusive ? TaxState.taxInclusive : TaxState.taxExclusive
);

const getExpirationDaysForInputField = state => getInvoice(state).expirationDays.toString();

export const getInvoiceOptions = (state) => {
  const { lines, isTaxInclusive, ...restOfInvoice } = getInvoice(state);

  return {
    ...restOfInvoice,
    expiredDate: getExpiredDate(state),
    expirationDays: getExpirationDaysForInputField(state),
    taxInclusiveOption: getTaxInclusiveOption(state),
    customers: getCustomers(state),
    expirationTerms: getExpirationTerms(state),
    isCreating: getIsCreating(state),
    isTaxInclusiveDisabled: areLinesCalculating(state),
  };
};

export const getAreButtonsDisabled = state => areLinesCalculating(state) || getIsSubmitting(state);

export const getModalType = state => state.modalType;

export const getAlertMessage = state => state.alertMessage;

export const getTotals = state => state.totals;

const getInvoiceLinesCount = state => getInvoice(state).lines.length;

export const getInvoiceLinesTableData = createSelector(
  getInvoiceLinesCount,
  length => Array(length).fill({}),
);

const getNewLine = state => state.newLine;

export const getInvoiceLineByIndex = (state, { index }) => {
  const invoiceLine = getInvoice(state).lines[index];
  return invoiceLine || getNewLine(state);
};

export const getTaxCodes = state => state.taxCodes;

export const getAreLinesCalculating = state => state.areLinesCalculating;

export const getItems = state => state.items;

export const getShouldLineSelectItem = (state, { index }) => {
  const lineCount = getInvoice(state).lines.length;
  return lineCount <= index;
};

export const getCustomerId = state => getInvoice(state).customerId;

export const getIsLineAmountDirty = state => state.isLineAmountDirty;

export const getIsTableEmpty = state => getInvoiceLinesCount(state) === 0;

export const getTotalsPayloadForTaxInclusiveChange = (state) => {
  const { lines, isTaxInclusive } = getInvoice(state);
  const { amountPaid } = getTotals(state);

  return {
    lines,
    isTaxInclusive,
    isLineAmountsTaxInclusive: !isTaxInclusive,
    totals: {
      amountPaid,
    },
  };
};

export const getInvoicePayload = (state) => {
  const { amountPaid } = getTotals(state);

  return {
    invoice: {
      ...getInvoice(state),
    },
    totals: {
      amountPaid,
    },
  };
};

export const getIsPageEdited = state => state.isPageEdited;

export const getTotalsPayloadForLineItemChange = ({ state, index, itemId }) => {
  const { lines, isTaxInclusive } = getInvoice(state);
  const { amountPaid } = getTotals(state);

  return {
    index,
    itemId,
    isTaxInclusive,
    lines,
    totals: {
      amountPaid,
    },
  };
};

export const getTotalsPayloadForLineTaxCodeChange = (state) => {
  const { lines, isTaxInclusive } = getInvoice(state);
  const { amountPaid } = getTotals(state);

  return {
    lines,
    isTaxInclusive,
    totals: {
      amountPaid,
    },
  };
};

export const getTotalsPayloadForLineRemoval = getTotalsPayloadForLineTaxCodeChange;

export const getTotalsPayloadForCalculation = (state, index, key) => {
  const amountInput = state.invoice.lines[index][key];
  const updatedLines = state.invoice.lines.map(
    (line, lineIndex) => (lineIndex === index
      ? { ...line, [key]: amountInput }
      : line),
  );
  const { amountPaid } = getTotals(state);

  return {
    index,
    key,
    lines: updatedLines,
    isTaxInclusive: state.invoice.isTaxInclusive,
    totals: {
      amountPaid,
    },
  };
};

export const getNewLineIndex = state => getInvoiceLinesCount(state) - 1;

export const getIsAnAmountLineInput = key => ['units', 'unitPrice', 'discount', 'amount'].includes(key);
