
import {
  addDays, addMonths, eachDay, endOfMonth, getDaysInMonth, setDate, startOfMonth,
} from 'date-fns';
import { createSelector } from 'reselect';

import { getExpirationDays, getExpirationTerm, getIssueDate } from './billSelectors';
import formatDate from '../../../valueFormatters/formatDate/formatDate';
import formatSlashDate from '../../../valueFormatters/formatDate/formatSlashDate';

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

export const getPaymentTermsPopoverLabel = state => (
  ['Prepaid', 'CashOnDelivery'].includes(getExpirationTerm(state))
    ? state.expirationTermOptions.find(term => term.value === getExpirationTerm(state)).name
    : getExpiredDate(state));

export const getShowExpiryDaysOptions = state => [
  'OnADayOfTheMonth',
  'InAGivenNumberOfDays',
  'DayOfMonthAfterEOM',
  'NumberOfDaysAfterEOM',
].includes(getExpirationTerm(state));

export const getExpirationTermsLabel = state => ({
  InAGivenNumberOfDays: 'days after the issue date',
  OnADayOfTheMonth: 'of this month',
  NumberOfDaysAfterEOM: 'days after the end of the month',
  DayOfMonthAfterEOM: 'of next month',
}[getExpirationTerm(state)]);

export const getDisplayDaysForMonth = (state) => {
  const currentMonth = new Date();
  const nextMonth = addMonths(currentMonth, 1);
  const month = ['OnADayOfTheMonth', 'DayOfMonthAfterEOM'].includes(getExpirationTerm(state))
    ? currentMonth
    : nextMonth;
  return eachDay(startOfMonth(month), endOfMonth(month)).map((day, index, { length }) => {
    const isLast = index === length - 1;

    return ({
      name: isLast ? 'Last day' : formatDate(day, 'Do'),
      value: formatDate(day, 'D'),
    });
  });
};

export const getShowExpirationDaysAmountInput = state => [
  'InAGivenNumberOfDays',
  'NumberOfDaysAfterEOM',
].includes(getExpirationTerm(state));

export const getDisplayDaysForCurrentMonth = state => getDisplayDaysForMonth(state, new Date());
