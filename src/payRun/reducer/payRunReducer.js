import {
  addDays, getDaysInMonth, subDays, subMonths,
} from 'date-fns';
import dateFormat from 'dateformat';

import {
  NEXT_STEP,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAY_PERIOD_DETAILS,
  START_NEW_PAY_RUN,
} from '../PayRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const getDefaultState = () => ({
  isLoading: false,
  alert: undefined,
  step: 0,
  startPayRun: {
    paymentFrequency: '',
    paymentDate: convertToDateString(Date.now()),
    payPeriodStart: '',
    payPeriodEnd: convertToDateString(Date.now()),
  },
  regularPayCycleOptions: [],
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
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

  return convertToDateString(startDate);
};

const startNewPayRun = (state, { startPayRun, regularPayCycleOptions }) => ({
  ...state,
  startPayRun: {
    ...state.startPayRun,
    ...startPayRun,
    payPeriodStart:
      calculateStartDate(startPayRun.paymentFrequency, state.startPayRun.payPeriodEnd),
  },
  regularPayCycleOptions,
});

const setPayPeriodDetails = (state, { key, value }) => {
  let startPayRunPartial;
  if (value === '') {
    startPayRunPartial = {
      [key]: key === 'payPeriodStart'
        ? calculateStartDate(state.startPayRun.paymentFrequency, state.startPayRun.payPeriodEnd)
        : convertToDateString(Date.now()),
    };
  } else if (key === 'paymentFrequency') {
    startPayRunPartial = {
      payPeriodStart: calculateStartDate(value, state.startPayRun.payPeriodEnd),
      [key]: value,
    };
  } else {
    startPayRunPartial = {
      [key]: value,
    };
  }

  return {
    ...state,
    startPayRun: {
      ...state.startPayRun,
      ...startPayRunPartial,
    },
  };
};

const nextStep = state => ({
  ...state,
  step: state.step + 1,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [NEXT_STEP]: nextStep,
  [START_NEW_PAY_RUN]: startNewPayRun,
  [SET_PAY_PERIOD_DETAILS]: setPayPeriodDetails,
};

const payRunReducer = createReducer(getDefaultState(), handlers);

export default payRunReducer;
