import {
  addDays, addMonths, endOfMonth, getDaysInMonth, setDate,
} from 'date-fns';
import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getQuoteId = state => state.quoteId;
export const getTotals = state => state.totals;
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

export const getIsCreating = createSelector(
  getQuoteId,
  quoteId => quoteId === 'newService',
);

const getQuote = state => state.quote;
const getCustomerOptions = state => state.customerOptions;
const getExpirationTermOptions = state => state.expirationTermOptions;
export const getQuoteOptions = createSelector(
  getQuote,
  getCustomerOptions,
  getExpirationTermOptions,
  getExpiredDate,
  getIsCreating,
  (quote, customerOptions, expirationTermOptions, expiredDate, isCreating) => {
    const { lines, issueDate, ...quoteWithoutLines } = quote;

    return {
      ...quoteWithoutLines,
      issueDate,
      expiredDate,
      customerOptions,
      expirationTermOptions,
      isCreating,
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
export const getRegion = state => state.region;
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

export const getAlertMessage = state => state.alertMessage;
export const getIsActionsDisabled = state => state.isSubmitting;
export const getCustomerId = state => state.quote.customerId;

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);
