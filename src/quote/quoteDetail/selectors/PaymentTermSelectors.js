import {
  addDays, addMonths, eachDay, endOfMonth, getDaysInMonth, setDate, startOfMonth,
} from 'date-fns';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  getExpirationDays, getExpirationTerm, getExpirationTermOptions, getIssueDate,
} from './QuoteDetailSelectors';
import formatDate from '../../../common/valueFormatters/formatDate/formatDate';
import formatSlashDate from '../../../common/valueFormatters/formatDate/formatSlashDate';

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

const getExpirationTermLabel = createSelector(
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

const getPaymentTermsPopoverLabel = createSelector(
  getExpirationTerm,
  getExpirationTermOptions,
  getExpiredDate,
  (expirationTerm, expirationTermOptions, expiredDate) => (
    ['Prepaid', 'CashOnDelivery'].includes(expirationTerm)
      ? expirationTermOptions.find(term => term.value === expirationTerm).name
      : expiredDate),
);

export const getQuoteDetailOptionsPaymentTerms = createStructuredSelector({
  expirationDays: getExpirationDays,
  expirationTerm: getExpirationTerm,
  expirationTermOptions: getExpirationTermOptions,
  expirationTermLabel: getExpirationTermLabel,
  paymentTermsPopoverLabel: getPaymentTermsPopoverLabel,
  displayDaysForMonth: getDisplayDaysForMonth,
  showExpirationDaysAmountInput: getShowExpirationDaysAmountInput,
  showExpiryDaysOptions: getShowExpiryDaysOptions,
});
