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
const getLineByIndex = (state, props) => state.quote.lines[props.index];

export const getQuoteLine = createSelector(
  getNewLine,
  getLineByIndex,
  (newLine, line) => {
    if (!line) return newLine;

    const {
      allocatedAccountId,
      taxCodeId,
      ...rest
    } = line;

    return {
      ...rest,
      selectedAccountIndex: rest.accounts.findIndex(account => account.id === allocatedAccountId),
      selectedTaxCodeIndex: rest.taxCodes.findIndex(taxCode => taxCode.id === taxCodeId),
    };
  },
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

const getQuote = state => state.quote;
const getCustomerOptions = state => state.customerOptions;
const getExpirationTermOptions = state => state.expirationTermOptions;
const convertDateToUnixTime = date => new Date(date).getTime().toString();
export const getQuoteOptions = createSelector(
  getQuote,
  getCustomerOptions,
  getExpirationTermOptions,
  getExpiredDate,
  (quote, customerOptions, expirationTermOptions, expiredDate) => {
    const { lines, issueDate, ...quoteWithoutLines } = quote;

    return {
      ...quoteWithoutLines,
      issueDate: convertDateToUnixTime(issueDate),
      expiredDate,
      customerOptions,
      expirationTermOptions,
    };
  },
);
