import { addDays, addMonths, getDaysInMonth, subDays } from 'date-fns';

import {
  SET_IS_TABLE_LOADING,
  SET_PAY_PERIOD_DETAILS,
  SET_SHOW_STP_VALIDATION_ERROR_MODAL,
  START_NEW_PAY_RUN,
} from '../PayRunIntents';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const getStartPayRunDefaultState = () => ({
  isPayrollSetup: true,
  isTimesheetUsed: false,
  isTableLoading: false,
  showStpValidationErrorModal: false,
  currentEditingPayRun: {
    paymentFrequency: 'Weekly',
    paymentDate: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    regularPayCycleOptions: [],
  },
  startOfFinancialYearDate: '',
});

const calculateWeeklyEndDate = (startDate) => addDays(startDate, 6);

const calculateFortnightlyEndDate = (startDate) => addDays(startDate, 13);

const calculateMonthlyEndDate = (startDate) => {
  const sameDateNextMonth = addMonths(startDate, 1);
  return subDays(sameDateNextMonth, 1);
};

const calculateTwiceAMonthEndDate = (startDate) => {
  const daysInMonth = getDaysInMonth(startDate);

  if (startDate.getDate() <= 15) {
    return addDays(startDate, 14);
  }

  const secondHalfDays = daysInMonth - 16;
  return addDays(startDate, secondHalfDays);
};

export const calculateEndDate = (payCycle, startDateString) => {
  const startDate = new Date(startDateString);

  switch (payCycle) {
    case 'Weekly':
      return formatIsoDate(calculateWeeklyEndDate(startDate));
    case 'Fortnightly':
      return formatIsoDate(calculateFortnightlyEndDate(startDate));
    case 'Monthly':
      return formatIsoDate(calculateMonthlyEndDate(startDate));
    case 'TwiceAMonth':
      return formatIsoDate(calculateTwiceAMonthEndDate(startDate));
    default:
      throw new Error(`Invalid payCycle '${payCycle}'`);
  }
};

const startNewPayRun = (
  state,
  {
    isPayrollSetup,
    newPayRunDetails,
    draftPayRun,
    isTimesheetUsed,
    startOfFinancialYearDate,
  }
) => {
  if (!isPayrollSetup) return { ...state, isPayrollSetup };

  const { paymentFrequency, regularPayCycleOptions } = newPayRunDetails;
  return {
    ...state,
    isTimesheetUsed,
    currentEditingPayRun: {
      ...state.currentEditingPayRun,
      paymentFrequency,
      payPeriodStart: '',
    },
    regularPayCycleOptions,
    draftPayRun,
    startOfFinancialYearDate,
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

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setShowStpValidationErrorModal = (
  state,
  { showStpValidationErrorModal }
) => ({
  ...state,
  showStpValidationErrorModal,
});

export const startPayRunHandlers = {
  [START_NEW_PAY_RUN]: startNewPayRun,
  [SET_PAY_PERIOD_DETAILS]: setPayPeriodDetails,
  [SET_IS_TABLE_LOADING]: setIsTableLoading,
  [SET_SHOW_STP_VALIDATION_ERROR_MODAL]: setShowStpValidationErrorModal,
};
