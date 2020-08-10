import { createSelector } from 'reselect';

const getWage = ({ payrollDetails }) => payrollDetails?.wage || {};

export const getSelectedPayBasis = createSelector(
  getWage,
  ({ selectedPayBasis }) => selectedPayBasis
);
export const getHourlyRate = createSelector(
  getWage,
  ({ hourlyRate }) => hourlyRate
);
export const getSelectedPayCycle = createSelector(
  getWage,
  ({ selectedPayCycle }) => selectedPayCycle
);
export const getPayPeriodHours = createSelector(
  getWage,
  ({ payPeriodHours }) => payPeriodHours
);

export const getPayCycleOptions = (state) => state.payCycleOptions;
