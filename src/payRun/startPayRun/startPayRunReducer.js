import {
  addDays, getDaysInMonth, subDays, subMonths,
} from 'date-fns';
import dateFormat from 'dateformat';

import { SET_PAY_PERIOD_DETAILS, START_NEW_PAY_RUN } from '../PayRunIntents';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

export const getStartPayRunDefaultState = {
  paymentFrequency: 'Weekly',
  paymentDate: convertToDateString(Date.now()),
  payPeriodStart: '2019-01-01',
  payPeriodEnd: convertToDateString(Date.now()),
  regularPayCycleOptions: [],
};

const calculateStartDate = (payCycle, endDateString) => {
  let startDate;
  const endDate = new Date(endDateString);

  if (payCycle === 'Weekly') {
    startDate = subDays(endDate, 6);
  } else if (payCycle === 'Fortnightly') {
    startDate = subDays(endDate, 13);
  } else if (payCycle === 'Monthly') {
    const dateInLastMonth = subMonths(endDate, 1);
    startDate = addDays(dateInLastMonth, 1);
  } else if (endDate.getDate() <= 15) { // first half for TwiceAMonth
    startDate = subDays(endDate, 14);
  } else { // second half for TwiceAMonth
    const days = getDaysInMonth(endDate);
    startDate = subDays(endDate, Math.round(days / 2) - 1);
  }

  return convertToDateString(startDate);
};

const startNewPayRun = (state, { startPayRun, regularPayCycleOptions }) => ({
  ...state,
  ...startPayRun,
  payPeriodStart: calculateStartDate(startPayRun.paymentFrequency, state.payPeriodEnd),
  regularPayCycleOptions,
});

const setPayPeriodDetails = (state, { key, value }) => {
  let startPayRunPartial;
  if (value === '') {
    startPayRunPartial = {
      [key]: key === 'payPeriodStart'
        ? calculateStartDate(state.paymentFrequency, state.payPeriodEnd)
        : convertToDateString(Date.now()),
    };
  } else if (key === 'paymentFrequency') {
    startPayRunPartial = {
      payPeriodStart: calculateStartDate(value, state.payPeriodEnd),
      [key]: value,
    };
  } else {
    startPayRunPartial = {
      [key]: value,
    };
  }

  return {
    ...state,
    ...startPayRunPartial,
  };
};

export const startPayRunHandlers = {
  [START_NEW_PAY_RUN]: startNewPayRun,
  [SET_PAY_PERIOD_DETAILS]: setPayPeriodDetails,
};
