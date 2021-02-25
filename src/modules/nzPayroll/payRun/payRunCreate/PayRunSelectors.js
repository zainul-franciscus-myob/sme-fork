import { createSelector } from 'reselect';

import formatDate from '../../../../common/valueFormatters/formatDate/formatDate';
import formatSlashDate from '../../../../common/valueFormatters/formatDate/formatSlashDate';

export const getLoadingState = (state) => state.loadingState;
export const getBusinessId = (state) => state.businessId;
const getStep = (state) => state.step;
export const getStepKey = createSelector(getStep, (step) => step.key);
export const getStepIndex = createSelector(getStep, (step) => step.index);

const getStartPayRun = (state) => state.startPayRun;
const getCurrentEditingPayRun = createSelector(
  getStartPayRun,
  (startPayRun) => startPayRun.currentEditingPayRun
);

const getUnformattedPaymentDate = createSelector(
  getCurrentEditingPayRun,
  (currentEditingPayRun) => currentEditingPayRun.paymentDate
);

const getPaymentFrequency = createSelector(
  getCurrentEditingPayRun,
  (currentEditingPayRun) => currentEditingPayRun.paymentFrequency
);
const getPaymentDate = createSelector(
  getUnformattedPaymentDate,
  (unformattedPaymentDate) =>
    formatDate(new Date(unformattedPaymentDate), 'iii dd/MM/yyyy')
);
const getPayPeriodStart = createSelector(
  getCurrentEditingPayRun,
  (currentEditingPayRun) =>
    formatDate(new Date(currentEditingPayRun.payPeriodStart), 'iii dd/MM/yyyy')
);
const getPayPeriodEnd = createSelector(
  getCurrentEditingPayRun,
  (currentEditingPayRun) =>
    formatDate(new Date(currentEditingPayRun.payPeriodEnd), 'iii dd/MM/yyyy')
);
const getTotalTakeHomePay = (state) => state.totalTakeHomePay;

export const getEmployeeHeader = createSelector(
  getPaymentFrequency,
  getPaymentDate,
  getPayPeriodStart,
  getPayPeriodEnd,
  getTotalTakeHomePay,
  (
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
    totalTakeHomePay
  ) => ({
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
    totalTakeHomePay,
  })
);

export const getPayOnDate = createSelector(
  getUnformattedPaymentDate,
  (unformattedPaymentDate) => formatSlashDate(new Date(unformattedPaymentDate))
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
    title: 'Pay run summary',
    type: 'incomplete',
  },
  {
    number: '5',
    title: 'Done!',
    type: 'incomplete',
  },
];

const isStepCompleted = (stepIndex, activeStepIndex) =>
  stepIndex < activeStepIndex;
const completeTheStep = (step) => ({ ...step, type: 'complete' });

export const getStepperSteps = (state) => {
  const activeStepIndex = getStepIndex(state);

  return initialStepperSteps.map((step, index) =>
    isStepCompleted(index, activeStepIndex) ? completeTheStep(step) : step
  );
};

export const getStepNumber = createSelector(getStepIndex, (index) =>
  String(index + 1)
);

export const isPayrunStarted = (state) =>
  getStepNumber(state) > 1 &&
  getStepNumber(state) < initialStepperSteps.length - 1;

export const getRegion = (state) => state.region;

export const getRedirectUrl = (state) => state.redirectUrl;

export const getIsSubmitting = (state) => state.isSubmitting;

export const getDashboardUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/dashboard`
);

export const getDraftPayRunId = (state) => state.draftPayRunId;

export const getPreviousStepModalIsOpen = (state) =>
  state.previousStepModalIsOpen;

export const getDiscardModalIsOpen = (state) => state.discardModalIsOpen;

export const getAlert = (state) => state.alert;

export const isNavigationToSelf = (state) =>
  window.location.href.endsWith(state.redirectUrl);

export const getIsBusinessOnboarded = (state) =>
  state.payDayOnboardedStatus.isBusinessOnboarded;

export const getIsUserOnboarded = (state) =>
  state.payDayOnboardedStatus.isUserOnboarded &&
  state.payDayOnboardedStatus.isUserSessionValid;

export const getRecordPayRunIRFileModal = (state) =>
  state.recordPayRunIRFileModal;

export const displayRecordPayRunIRFileModal = createSelector(
  getIsBusinessOnboarded,
  getRecordPayRunIRFileModal,
  (isBusinessOnboarded, isRecordPayRunIRFileModal) =>
    isBusinessOnboarded && isRecordPayRunIRFileModal
);

export const getIsBusinessAndUserOnboarded = createSelector(
  getIsBusinessOnboarded,
  getIsUserOnboarded,
  (isBusinessOnboarded, isUserOnboarded) =>
    isBusinessOnboarded && isUserOnboarded
);
