import { createSelector } from 'reselect';

export const getPayCycleOptions = ({ payCycleOptions }) => payCycleOptions;

export const getBasePayDetails = ({ payrollDetails }) => payrollDetails.wage;

export const getEarningsDetails = ({ payrollDetails: { wage } }) => {
  const calculatedAmount =
    parseFloat(wage.payPeriodHours) * parseFloat(wage.hourlyRate);
  return { ...wage, calculatedAmount };
};

export const getKiwiSaverDetails = (state) => state.payrollDetails?.kiwiSaver;

export const getEsctPercent = createSelector(
  getKiwiSaverDetails,
  (kiwiSaver) => kiwiSaver.employerSuperannuationContributionTax * 100
);
