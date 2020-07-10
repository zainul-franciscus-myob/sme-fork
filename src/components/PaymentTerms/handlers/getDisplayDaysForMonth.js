import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from 'date-fns';

import formatDate from '../../../common/valueFormatters/formatDate/formatDate';

const getDisplayDaysForMonth = (expirationTerm) => {
  const currentMonth = new Date();
  const nextMonth = addMonths(currentMonth, 1);
  const month = ['OnADayOfTheMonth', 'DayOfMonthAfterEOM'].includes(
    expirationTerm
  )
    ? currentMonth
    : nextMonth;

  const monthInterval = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  return monthInterval.map((day, index, { length }) => {
    const isLast = index === length - 1;

    return {
      name: isLast ? 'Last day' : formatDate(day, 'do'),
      value: formatDate(day, 'd'),
    };
  });
};

export default getDisplayDaysForMonth;
