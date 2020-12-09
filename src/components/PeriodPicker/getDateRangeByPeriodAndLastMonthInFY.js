import {
  addMonths,
  endOfMonth,
  getYear,
  isAfter,
  isBefore,
  startOfMonth,
  subMonths,
  subYears,
} from 'date-fns';

import Periods from './Periods';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

const AU_LAST_MONTH_IN_FINANCIAL_YEAR = 6;

const getMonthWithZeroIndex = (month) => month - 1;

const getCurrentDateRange = (date) => ({
  dateFrom: date,
  dateTo: date,
});

const getCurrentMonthDateRange = (date) => ({
  dateFrom: startOfMonth(date),
  dateTo: endOfMonth(date),
});

const getLastMonth = (date) => ({
  dateFrom: startOfMonth(subMonths(date, 1)),
  dateTo: endOfMonth(subMonths(date, 1)),
});

const getLastThreeMonths = (date) => ({
  dateFrom: subMonths(date, 3),
  dateTo: date,
});

const getFinancialYear = (date, lastMonthInFinancialYear) => {
  const year = getYear(date);
  const month = getMonthWithZeroIndex(lastMonthInFinancialYear);
  const financialYearDate = endOfMonth(new Date(year, month));
  const financialYearStart = isAfter(date, financialYearDate) ? year : year - 1;
  return {
    dateFrom: startOfMonth(addMonths(new Date(financialYearStart, month), 1)),
    dateTo: endOfMonth(new Date(financialYearStart + 1, month)),
  };
};

const getLastFinancialYear = (date, lastMonthInFinancialYear) =>
  getFinancialYear(subYears(date, 1), lastMonthInFinancialYear);

const getQuarterEndDate = (quarterStartDate) =>
  endOfMonth(addMonths(quarterStartDate, 2));

const getNextQuarterStartDate = (quarterStartDate) =>
  startOfMonth(addMonths(quarterStartDate, 3));

const getFinancialQuarter = (date, lastMonthInFinancialYear) => {
  const { dateFrom: Q1StartDate } = getFinancialYear(
    date,
    lastMonthInFinancialYear
  );

  const Q2StartDate = getNextQuarterStartDate(Q1StartDate);
  const Q3StartDate = getNextQuarterStartDate(Q2StartDate);
  const Q4StartDate = getNextQuarterStartDate(Q3StartDate);

  if (isBefore(date, Q2StartDate)) {
    return { dateFrom: Q1StartDate, dateTo: getQuarterEndDate(Q1StartDate) };
  }

  if (isBefore(date, Q3StartDate)) {
    return { dateFrom: Q2StartDate, dateTo: getQuarterEndDate(Q2StartDate) };
  }

  if (isBefore(date, Q4StartDate)) {
    return { dateFrom: Q3StartDate, dateTo: getQuarterEndDate(Q3StartDate) };
  }

  return { dateFrom: Q4StartDate, dateTo: getQuarterEndDate(Q4StartDate) };
};

const getLastFinancialQuarter = (date, lastMonthInFinancialYear) =>
  getFinancialQuarter(subMonths(date, 3), lastMonthInFinancialYear);

const handlers = {
  [Periods.thisDay]: getCurrentDateRange,
  [Periods.thisMonth]: getCurrentMonthDateRange,
  [Periods.thisFinancialQuarter]: getFinancialQuarter,
  [Periods.thisFinancialYear]: getFinancialYear,
  [Periods.lastFinancialQuarter]: getLastFinancialQuarter,
  [Periods.lastFinancialYear]: getLastFinancialYear,
  [Periods.lastMonth]: getLastMonth,
  [Periods.lastThreeMonths]: getLastThreeMonths,
};

const getDateRangeByPeriodAndLastMonthInFY = (
  lastMonthInFinancialYear = AU_LAST_MONTH_IN_FINANCIAL_YEAR,
  date,
  period
) => {
  const { dateFrom, dateTo } = handlers[period](date, lastMonthInFinancialYear);
  return {
    period,
    dateFrom: formatIsoDate(dateFrom),
    dateTo: formatIsoDate(dateTo),
  };
};

export default getDateRangeByPeriodAndLastMonthInFY;
