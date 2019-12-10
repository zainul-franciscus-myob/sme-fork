import {
  addMonths, eachDay, endOfMonth, startOfMonth,
} from 'date-fns';

import formatDate from '../../../common/valueFormatters/formatDate/formatDate';

const getDisplayDaysForMonth = (expirationTerm) => {
  const currentMonth = new Date();
  const nextMonth = addMonths(currentMonth, 1);
  const month = ['OnADayOfTheMonth', 'DayOfMonthAfterEOM'].includes(expirationTerm)
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

export default getDisplayDaysForMonth;
