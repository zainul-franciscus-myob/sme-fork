import {
  addDays, getDaysInMonth, subDays, subMonths,
} from 'date-fns';

import { SET_PAY_PERIOD_DETAILS, START_NEW_PAY_RUN } from '../PayRunIntents';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const getStartPayRunDefaultState = () => ({
  isPayrollSetup: true,
  currentEditingPayRun: {
    paymentFrequency: 'Weekly',
    paymentDate: formatIsoDate(new Date()),
    payPeriodStart: '2019-01-01',
    payPeriodEnd: formatIsoDate(new Date()),
    regularPayCycleOptions: [],
  },
});

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

  return formatIsoDate(startDate);
};

const startNewPayRun = (state, { isPayrollSetup, newPayRunDetails, draftPayRun }) => {
  if (!isPayrollSetup) return { ...state, isPayrollSetup };

  const { paymentFrequency, regularPayCycleOptions } = newPayRunDetails;
  return {
    ...state,
    currentEditingPayRun: {
      ...state.currentEditingPayRun,
      paymentFrequency,
      payPeriodStart: calculateStartDate(paymentFrequency, state.currentEditingPayRun.payPeriodEnd),
    },
    regularPayCycleOptions,
    draftPayRun,
  };
};

const setPayPeriodDetails = (state, { key, value }) => {
  let startPayRunPartial;
  if (value === '') {
    startPayRunPartial = {
      [key]: key === 'payPeriodStart'
        ? calculateStartDate(
          state.currentEditingPayRun.paymentFrequency, state.currentEditingPayRun.payPeriodEnd,
        )
        : formatIsoDate(new Date()),
    };
  } else if (key === 'paymentFrequency') {
    startPayRunPartial = {
      payPeriodStart: calculateStartDate(value, state.currentEditingPayRun.payPeriodEnd),
      [key]: value,
    };
  } else {
    startPayRunPartial = {
      [key]: value,
    };
  }

  return {
    ...state,
    currentEditingPayRun: {
      ...state.currentEditingPayRun,
      ...startPayRunPartial,
    },
  };
};

export const startPayRunHandlers = {
  [START_NEW_PAY_RUN]: startNewPayRun,
  [SET_PAY_PERIOD_DETAILS]: setPayPeriodDetails,
};
