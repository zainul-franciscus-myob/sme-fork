import { createSelector } from 'reselect';

import formatDate from '../../common/valueFormatters/formatDate/formatDate';
import formatSlashDate from '../../common/valueFormatters/formatDate/formatSlashDate';

export const getIsLoading = state => state.isLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getBusinessId = state => state.businessId;
export const getAlert = state => state.alert;
export const getStep = state => state.step;
export const getPreviousStepModalIsOpen = state => state.previousStepModalIsOpen;
export const getIsFirstStep = state => state.step === 0;

const getPaymentFrequency = state => state.startPayRun.paymentFrequency;
const getPaymentDate = state => formatDate(new Date(state.startPayRun.paymentDate), 'ddd DD/MM/YYYY');
const getPayPeriodStart = state => formatDate(new Date(state.startPayRun.payPeriodStart), 'ddd DD/MM/YYYY');
const getPayPeriodEnd = state => formatDate(new Date(state.startPayRun.payPeriodEnd), 'ddd DD/MM/YYYY');
const getTotalNetPay = state => state.totalNetPay;

export const getEmployeeHeader = createSelector(
  getPaymentFrequency,
  getPaymentDate,
  getPayPeriodStart,
  getPayPeriodEnd,
  getTotalNetPay,
  (paymentFrequency, paymentDate, payPeriodStart, payPeriodEnd, totalNetPay) => ({
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
    totalNetPay,
  }),
);

export const getPayOnDate = state => (formatSlashDate(new Date(state.startPayRun.paymentDate)));

const initialStepperSteps = [
  {
    number: '1',
    title: 'Select pay period',
    type: 'incomplete',
  },
  {
    number: '2',
    title: 'Calculate pays',
    type: 'incomplete',
  },
  {
    number: '3',
    title: 'Record and report',
    type: 'incomplete',
  },
  {
    number: '4',
    title: 'Prepare pay slips',
    type: 'incomplete',
  },
  {
    number: '5',
    title: 'Done!',
    type: 'incomplete',
  },
];

const isStepCompleted = (stepIndex, activeStepIndex) => (stepIndex < activeStepIndex);
const completeTheStep = step => ({ ...step, type: 'complete' });

export const getPayRunListUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/payRun`;
};

export const getElectronicPaymentsCreateUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/electronicPayments?paymentType=PayEmployees`;
};

export const getStepperSteps = (state) => {
  const activeStepIndex = getStep(state);

  return initialStepperSteps.map(
    (step, index) => (isStepCompleted(index, activeStepIndex)
      ? completeTheStep(step)
      : step),
  );
};

export const getStepNumber = state => (String(state.step + 1));
