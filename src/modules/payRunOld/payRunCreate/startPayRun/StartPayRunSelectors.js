import { createSelector } from 'reselect';

export const getStartPayRun = state => state.startPayRun;

export const getLoadEmployeePaysRequestContent = state => ({
  ...state.startPayRun.currentEditingPayRun,
  unprocessedTimesheetLines: state.unprocessedTimesheetLines,
});

export const getRegularPayCycleOptions = state => (
  state.startPayRun.regularPayCycleOptions || []
);
export const isThereExistingPayRun = state => (state.startPayRun.draftPayRun);

export const getDraftPayRun = createSelector(
  getStartPayRun,
  startPayRun => startPayRun.draftPayRun,
);

export const getPayPeriodStart = createSelector(
  getDraftPayRun,
  draftPayRun => draftPayRun.payPeriodStart,
);

export const getPayPeriodEnd = createSelector(
  getDraftPayRun,
  draftPayRun => draftPayRun.payPeriodEnd,
);
export const getDateOfPayment = createSelector(
  getDraftPayRun,
  draftPayRun => draftPayRun.paymentDate,
);

export const getIsTableLoading = state => state.startPayRun.isTableLoading;

export const getTimesheets = state => state.timesheets;
export const getLoadTimesheetsParams = state => ({
  paymentDate: state.startPayRun.currentEditingPayRun.paymentDate,
  payPeriodStart: state.startPayRun.currentEditingPayRun.payPeriodStart,
  payPeriodEnd: state.startPayRun.currentEditingPayRun.payPeriodEnd,
  paymentFrequency: state.startPayRun.currentEditingPayRun.paymentFrequency,
});

export const getShowStpValidationErrorModal = state => (
  state.startPayRun.showStpValidationErrorModal
);

export const getIsTimesheetUsed = state => state.startPayRun.isTimesheetUsed;
export const getTimesheetRequiredFieldsFilled = (state) => {
  const params = getLoadTimesheetsParams(state);
  return Boolean(
    params.paymentFrequency
    && params.paymentDate
    && params.payPeriodStart
    && params.payPeriodEnd,
  );
};
