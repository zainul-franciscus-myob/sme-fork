import {
  addDays,
  addMonths,
  eachDay,
  endOfMonth,
  getDaysInMonth,
  setDate,
  startOfMonth,
} from 'date-fns';
import { createSelector } from 'reselect';

import TaxState from './TaxState';
import formatDate from '../../../valueFormatters/formatDate/formatDate';
import formatSlashDate from '../../../valueFormatters/formatDate/formatSlashDate';

export const getBusinessId = state => state.businessId;
export const getQuoteId = state => state.quoteId;
export const getRegion = state => state.region;
export const getLayout = state => state.layout;
export const getOpenExportPdfQueryParam = state => state.openExportPdf;
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
    return formatSlashDate(new Date(calculatedDate));
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
export const getAlert = state => state.alert;
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
export const getShouldReload = state => state.quoteId === 'newItem' && !state.duplicatedQuoteId;
export const getIsCalculating = state => state.isCalculating;
export const getIsLineAmountInputDirty = state => state.isLineAmountInputDirty;
export const getIsPageEdited = state => state.isPageEdited;
export const getIsSubmitting = state => state.isSubmitting;
export const getComments = state => state.comments;

export const getShowExpiryDaysOptions = createSelector(
  getExpirationTerm,
  expirationTerm => (
    [
      'OnADayOfTheMonth',
      'InAGivenNumberOfDays',
      'DayOfMonthAfterEOM',
      'NumberOfDaysAfterEOM',
    ].includes(expirationTerm)
  ),
);

export const getExpirationTermsLabel = createSelector(
  getExpirationTerm,
  expirationTerm => ({
    InAGivenNumberOfDays: 'days after the issue date',
    OnADayOfTheMonth: 'of this month',
    NumberOfDaysAfterEOM: 'days after the end of the month',
    DayOfMonthAfterEOM: 'of next month',
  }[expirationTerm]),
);

export const getDisplayDaysForMonth = createSelector(
  getExpirationTerm,
  (expirationTerm) => {
    const currentMonth = new Date();
    const nextMonth = addMonths(currentMonth, 1);
    const month = ['OnADayOfTheMonth', 'DayOfMonthAfterEOM'].includes(expirationTerm)
      ? currentMonth
      : nextMonth;

    return eachDay(startOfMonth(month), endOfMonth(month)).map(day => ({
      name: formatDate(day, 'Do'),
      value: formatDate(day, 'D'),
    }));
  },
);

export const getShowExpirationDaysAmountInput = createSelector(
  getExpirationTerm,
  expirationTerm => (
    [
      'InAGivenNumberOfDays',
      'NumberOfDaysAfterEOM',
    ].includes(expirationTerm)
  ),
);

export const getPopoverLabel = createSelector(
  getExpirationTerm,
  getExpirationTerms,
  getExpiredDate,
  (expirationTerm, expirationTerms, expiredDate) => (
    ['Prepaid', 'CashOnDelivery'].includes(expirationTerm)
      ? expirationTerms.find(term => term.value === expirationTerm).name
      : expiredDate),
);

export const getCustomerLink = createSelector(
  getRegion,
  getBusinessId,
  getCustomerId,
  (region, businessId, customerId) => `/#/${region}/${businessId}/contact/${customerId}`,
);

export const getCustomerName = state => state.quote.customerName;

export const getPageTitle = state => state.pageTitle;

export const getTotalAmount = createSelector(
  getTotals,
  ({ totalAmount }) => totalAmount,
);

export const getQuoteListURL = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/quote`,
);

export const getCreateInvoiceFromQuoteURL = createSelector(
  getRegion,
  getBusinessId,
  getQuoteId,
  (region, businessId, quoteId) => `/#/${region}/${businessId}/invoice/new?quoteId=${quoteId}`,
);

export const getCreateNewItemQuoteURL = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/quote/newItem`,
);

export const getCreateDuplicateQuoteURL = createSelector(
  getRegion,
  getBusinessId,
  getQuoteId,
  (region, businessId, quoteId) => `/#/${region}/${businessId}/quote/newItem?duplicatedQuoteId=${quoteId}`,
);

export const getQuoteReadWithExportPdfModalUrl = (state) => {
  const region = getRegion(state);
  const businessId = getBusinessId(state);
  const quoteId = getQuoteId(state);

  return `/#/${region}/${businessId}/quote/${quoteId}?openExportPdf=true`;
};

export const getRouteUrlParams = state => ({
  openExportPdf: getOpenExportPdfQueryParam(state),
});

export const getExportPdfTemplateOptions = state => state.exportPdf.templateOptions;
export const getExportPdfTemplate = state => state.exportPdf.template;

export const getExportPdfQuoteUrlParams = state => ({
  businessId: getBusinessId(state),
  quoteId: getQuoteId(state),
});

export const getExportPdfQuoteParams = state => ({
  formName: getExportPdfTemplate(state),
});

export const getShouldSaveAndExportPdf = (state) => {
  const isCreating = getIsCreating(state);
  const isPageEdited = getIsPageEdited(state);

  return isCreating || isPageEdited;
};

export const getShouldOpenExportPdfModal = (state) => {
  const isCreating = getIsCreating(state);
  const openExportPdf = getOpenExportPdfQueryParam(state);

  return !isCreating && openExportPdf === 'true';
};
