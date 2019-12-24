export const getStartPayRun = state => state.startPayRun;

export const getNewPayRunDetails = ({ startPayRun: { newPayRunDetails } }) => ({
  paymentFrequency: newPayRunDetails.paymentFrequency,
  paymentDate: newPayRunDetails.paymentDate,
  payPeriodStart: newPayRunDetails.payPeriodStart,
  payPeriodEnd: newPayRunDetails.payPeriodEnd,
});

export const getRegularPayCycleOptions = state => (
  state.startPayRun.newPayRunDetails.regularPayCycleOptions
);
