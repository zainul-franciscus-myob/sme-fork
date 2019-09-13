import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

export const getIsLoading = state => state.isLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getBusinessId = state => state.businessId;
export const getAlert = state => state.alert;
export const getStep = state => state.step;
export const getModal = state => state.modal;
export const getIsFirstStep = state => state.step === 0;

const formatDate = date => dateFormat(new Date(date), 'ddd dd/mm/yyyy');

const getPaymentFrequency = state => state.startPayRun.paymentFrequency;
const getPaymentDate = state => formatDate(state.startPayRun.paymentDate);
const getPayPeriodStart = state => formatDate(state.startPayRun.payPeriodStart);
const getPayPeriodEnd = state => formatDate(state.startPayRun.payPeriodEnd);

export const getEmployeeHeader = createSelector(
  getPaymentFrequency,
  getPaymentDate,
  getPayPeriodStart,
  getPayPeriodEnd,
  (paymentFrequency, paymentDate, payPeriodStart, payPeriodEnd) => ({
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
  }),
);
