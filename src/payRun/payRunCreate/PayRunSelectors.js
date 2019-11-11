import { createSelector } from 'reselect';

import formatDate from '../../valueFormatters/formatDate/formatDate';

export const getIsLoading = state => state.isLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getBusinessId = state => state.businessId;
export const getAlert = state => state.alert;
export const getStep = state => state.step;
export const getModal = state => state.modal;
export const getIsFirstStep = state => state.step === 0;

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

export const getStepperSteps = (state) => {
  const activeStepIndex = getStep(state);

  return initialStepperSteps.map(
    (step, index) => (isStepCompleted(index, activeStepIndex)
      ? completeTheStep(step)
      : step),
  );
};

export const getStepNumber = state => (String(state.step + 1));
