import { createSelector } from 'reselect';

export const getStartPayRun = state => state.startPayRun;

export const getCurrentEditingPayRun = createSelector(
  getStartPayRun,
  startPayRun => startPayRun.currentEditingPayRun,
);

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
