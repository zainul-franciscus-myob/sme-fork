import {
  addDays, addMonths, eachDay, endOfMonth, getDaysInMonth, setDate, startOfMonth,
} from 'date-fns';
import { createSelector } from 'reselect';

import formatDate from '../../../valueFormatters/formatDate/formatDate';
import formatSlashDate from '../../../valueFormatters/formatDate/formatSlashDate';

export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getQuoteId = state => state.quoteId;
export const getTotals = state => state.totals;
export const getRegion = state => state.region;
export const getLayout = state => state.layout;
export const getCustomerId = state => state.quote.customerId;
const getNewLine = state => state.newLine;
export const getLineByIndex = (state, props) => state.quote.lines[props.index];

export const getQuoteLine = createSelector(
  getNewLine,
  getLineByIndex,
  (newLine, line) => line || newLine,
);

const getLength = state => state.quote.lines.length;
export const getTableData = createSelector(
  getLength,
  len => Array(len).fill({}),
);

const getIssueDate = state => state.quote.issueDate;
const getExpirationTerm = state => state.quote.expirationTerm;
const getExpirationDays = state => Number(state.quote.expirationDays);
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

export const getIsCreating = createSelector(
  getQuoteId,
  quoteId => quoteId === 'newService',
);
export const getShouldReload = state => state.quoteId === 'newService' && !state.duplicatedQuoteId;

const getQuote = state => state.quote;
const getCustomerOptions = state => state.customerOptions;
const getExpirationTerms = state => state.expirationTerms;
const getComments = state => state.comments;

const getShowExpiryDaysOptions = createSelector(
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

const getExpirationTermsLabel = createSelector(
  getExpirationTerm,
  expirationTerm => ({
    InAGivenNumberOfDays: 'days after the issue date',
    OnADayOfTheMonth: 'of this month',
    NumberOfDaysAfterEOM: 'days after the end of the month',
    DayOfMonthAfterEOM: 'of next month',
  }[expirationTerm]),
);

const getDisplayDaysForMonth = createSelector(
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

const getShowExpirationDaysAmountInput = createSelector(
  getExpirationTerm,
  expirationTerm => (
    [
      'InAGivenNumberOfDays',
      'NumberOfDaysAfterEOM',
    ].includes(expirationTerm)
  ),
);

const getPopoverLabel = createSelector(
  getExpirationTerm,
  getExpirationTerms,
  getExpiredDate,
  (expirationTerm, expirationTerms, expiredDate) => (
    ['Prepaid', 'CashOnDelivery'].includes(expirationTerm)
      ? expirationTerms.find(term => term.value === expirationTerm).name
      : expiredDate),
);

const gettaxInclusive = state => (state.quote.taxInclusive ? 'Tax inclusive' : 'Tax exclusive');

const getCustomerLink = createSelector(
  getRegion,
  getBusinessId,
  getCustomerId,
  (region, businessId, customerId) => `/#/${region}/${businessId}/contact/${customerId}`,
);

export const getQuoteOptions = createSelector(
  getQuote,
  getCustomerOptions,
  getExpirationTerms,
  getIsCreating,
  getComments,
  getShowExpiryDaysOptions,
  getExpirationTermsLabel,
  getDisplayDaysForMonth,
  getShowExpirationDaysAmountInput,
  getPopoverLabel,
  gettaxInclusive,
  getCustomerLink,
  (
    quote, customerOptions, expirationTerms, isCreating,
    comments, showExpiryDaysOptions, expirationTermsLabel, displayDaysForMonth,
    showExpirationDaysAmountInput, popoverLabel, taxInclusive,
    customerLink,
  ) => {
    const { lines, issueDate, ...quoteWithoutLines } = quote;

    return {
      ...quoteWithoutLines,
      issueDate,
      customerOptions,
      expirationTerms,
      isCreating,
      comments,
      showExpiryDaysOptions,
      expirationTermsLabel,
      displayDaysForMonth,
      showExpirationDaysAmountInput,
      popoverLabel,
      taxInclusive,
      customerLink,
    };
  },
);

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getCalculatedTotalsPayload = createSelector(
  getQuote,
  quote => ({
    taxInclusive: quote.taxInclusive,
    lines: quote.lines.map(({ allocatedAccountId, amount, taxCodeId }) => ({
      allocatedAccountId, amount, taxCodeId,
    })),
  }),
);

export const isPageEdited = state => state.isPageEdited;
export const getModalType = state => state.modalType;

const getServiceQuoteLinesForPayload = lines => lines.map((line) => {
  const { accounts, taxCodes, ...rest } = line;
  return rest;
});

export const getQuotePayload = createSelector(
  getQuote,
  quote => ({
    ...quote,
    lines: getServiceQuoteLinesForPayload(quote.lines),
  }),
);

export const getAlert = state => state.alert;
export const getIsActionsDisabled = state => state.isSubmitting;

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);

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
  (region, businessId, quoteId) => `/#/${region}/${businessId}/invoice/newService?quoteId=${quoteId}`,
);

export const getCreateNewServiceQuoteURL = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/quote/newService`,
);

export const getCreateDuplicateQuoteURL = createSelector(
  getRegion,
  getBusinessId,
  getQuoteId,
  (region, businessId, quoteId) => `/#/${region}/${businessId}/quote/newService?duplicatedQuoteId=${quoteId}`,
);
