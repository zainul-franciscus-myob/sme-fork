export const getStartPayRun = state => state.startPayRun;
export const getRegularPayCycleOptions = state => (
  state.startPayRun.currentEditingPayRun.regularPayCycleOptions
);
export const isThereExistingPayRun = state => (state.startPayRun.draftPayRun);

// TODO: refactor state.startPayRun - Shohre
export const getPayPeriodStart = state => (state.startPayRun.draftPayRun.payPeriodStart);
export const getPayPeriodEnd = state => (state.startPayRun.draftPayRun.payPeriodEnd);
export const getDateOfPayment = state => (state.startPayRun.draftPayRun.paymentDate);
