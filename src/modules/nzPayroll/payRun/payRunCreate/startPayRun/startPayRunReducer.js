import { addDays, addMonths, subDays } from 'date-fns';

import { SET_PAY_PERIOD_DETAILS, START_NEW_PAY_RUN } from '../PayRunIntents';
import formatIsoDate from '../../../../../common/valueFormatters/formatDate/formatIsoDate';

export const getStartPayRunDefaultState = () => ({
  currentEditingPayRun: {
    paymentFrequency: 'Weekly',
    paymentDate: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    regularPayCycleOptions: [],
  },
});

const calculateWeeklyEndDate = (startDate) => addDays(startDate, 6);

const calculateFortnightlyEndDate = (startDate) => addDays(startDate, 13);

const calculateMonthlyEndDate = (startDate) => {
  const sameDateNextMonth = addMonths(startDate, 1);
  return subDays(sameDateNextMonth, 1);
};

const calculateFourWeeklyEndDate = (startDate) => addDays(startDate, 27);

export const calculateEndDate = (payCycle, startDateString) => {
  const startDate = new Date(startDateString);

  switch (payCycle) {
    case 'Weekly':
      return formatIsoDate(calculateWeeklyEndDate(startDate));
    case 'Fortnightly':
      return formatIsoDate(calculateFortnightlyEndDate(startDate));
    case 'Monthly':
      return formatIsoDate(calculateMonthlyEndDate(startDate));
    case 'FourWeekly':
      return formatIsoDate(calculateFourWeeklyEndDate(startDate));
    default:
      throw new Error(`Invalid payCycle '${payCycle}'`);
  }
};

const startNewPayRun = (state, { newPayRunDetails }) => {
  const { paymentFrequency, regularPayCycleOptions } = newPayRunDetails;
  return {
    ...state,
    currentEditingPayRun: {
      ...state.currentEditingPayRun,
      paymentFrequency,
      payPeriodStart: '',
    },
    regularPayCycleOptions,
  };
};

const setPayPeriodDetails = (state, { key, value }) => {
  let startPayRunPartial;
  if (key === 'payPeriodStart') {
    const payPeriodEnd = calculateEndDate(
      state.currentEditingPayRun.paymentFrequency,
      value
    );
    startPayRunPartial = {
      [key]: value,
      payPeriodEnd,
      paymentDate: formatIsoDate(addDays(new Date(payPeriodEnd), 1)),
    };
  } else if (key === 'paymentFrequency') {
    startPayRunPartial = {
      payPeriodStart: '',
      payPeriodEnd: '',
      paymentDate: '',
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
