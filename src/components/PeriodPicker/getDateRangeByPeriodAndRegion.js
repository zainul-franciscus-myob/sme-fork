import {
  addMonths,
  endOfMonth,
  getYear,
  isAfter,
  isBefore,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';

import Periods from './Periods';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

const getCurrentDateRange = date => ({
  dateFrom: date,
  dateTo: date,
});

const getCurrentMonthDateRange = date => ({
  dateFrom: startOfMonth(date),
  dateTo: endOfMonth(date),
});

const isBetweenJanAndMar = date => isBefore(date, startOfDay(new Date(getYear(date), 3, 1)));

const isBeforeJuly = date => isBefore(date, startOfDay(new Date(getYear(date), 6, 1)));

const isBeforeOct = date => isBefore(date, startOfDay(new Date(getYear(date), 9, 1)));

const getFinancialQuarterFrom = (date) => {
  const year = getYear(date);
  if (isBetweenJanAndMar(date)) {
    return new Date(year, 0, 1);
  }
  if (isBeforeJuly(date)) {
    return new Date(year, 3, 1);
  }
  if (isBeforeOct(date)) {
    return new Date(year, 6, 1);
  }
  return new Date(year, 9, 1);
};

const getFinancialQuarter = (date) => {
  const dateFrom = getFinancialQuarterFrom(date);
  return {
    dateFrom,
    dateTo: subDays(addMonths(dateFrom, 3), 1),
  };
};

const getLastFinancialQuaterFrom = (date) => {
  const year = getYear(date);
  if (isBetweenJanAndMar(date)) {
    return new Date(year, 9, 1);
  }
  if (isBeforeJuly(date)) {
    return new Date(year, 0, 1);
  }
  if (isBeforeOct(date)) {
    return new Date(year, 3, 1);
  }
  return new Date(year, 6, 1);
};

const getLastFinancialQuarter = (date) => {
  const dateFrom = getLastFinancialQuaterFrom(date);
  return {
    dateFrom,
    dateTo: subDays(addMonths(dateFrom, 3), 1),
  };
};

const getFinancialYearAU = (date) => {
  const year = getYear(date);
  const financialYearDate = new Date(year, 5, 30);
  const financialYearStart = isAfter(date, financialYearDate) ? year : year - 1;
  return ({
    dateFrom: new Date(financialYearStart, 6, 1),
    dateTo: new Date(financialYearStart + 1, 5, 30),
  });
};

const getFinancialYearNZ = (date) => {
  const year = getYear(date);
  const financialYearDate = new Date(year, 2, 31);
  const financialYearStart = isAfter(date, financialYearDate) ? year : year - 1;
  return ({
    dateFrom: new Date(financialYearStart, 3, 1),
    dateTo: new Date(financialYearStart + 1, 2, 31),
  });
};

const getFinancialYear = (date, region) => (
  region === 'nz' ? getFinancialYearNZ(date) : getFinancialYearAU(date)
);

const getLastFinancialYear = (date, region) => (
  region === 'nz' ? getFinancialYearNZ(subYears(date, 1)) : getFinancialYearAU(subYears(date, 1))
);

const getLastMonth = date => (
  {
    dateFrom: startOfMonth(subMonths(date, 1)),
    dateTo: endOfMonth(subMonths(date, 1)),
  }
);

const handlers = {
  [Periods.thisDay]: getCurrentDateRange,
  [Periods.thisMonth]: getCurrentMonthDateRange,
  [Periods.thisFinancialQuarter]: getFinancialQuarter,
  [Periods.thisFinancialYear]: getFinancialYear,
  [Periods.lastFinancialQuarter]: getLastFinancialQuarter,
  [Periods.lastFinancialYear]: getLastFinancialYear,
  [Periods.lastMonth]: getLastMonth,
};

const getDateRangeByPeriodAndRegion = (region, date, period) => {
  const { dateFrom, dateTo } = handlers[period](date, region);
  return {
    period,
    dateFrom: formatIsoDate(dateFrom),
    dateTo: formatIsoDate(dateTo),
  };
};

export default getDateRangeByPeriodAndRegion;
