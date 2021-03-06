import Steps from './OnboardingSteps';

const initialStepperSteps = [
  {
    id: Steps.OVERVIEW,
    number: '1',
    title: 'Overview',
    type: 'incomplete',
  },
  {
    id: Steps.AUTHORISE_MYOB,
    number: '2',
    title: 'Authorise MYOB',
    type: 'incomplete',
  },
  {
    id: Steps.DONE,
    number: '3',
    title: 'Done!',
    type: 'incomplete',
  },
];

export const getCurrentStep = (state) => state.currentStep;

const isStepCompleted = (stepIndex, activeStepIndex) =>
  stepIndex < activeStepIndex;

const completeTheStep = (step) => ({ ...step, type: 'complete' });

export const getStepperSteps = (state) => {
  const activeStepIndex = initialStepperSteps.findIndex(
    (step) => step.id === getCurrentStep(state)
  );

  return initialStepperSteps.map((step, index) =>
    isStepCompleted(index, activeStepIndex) ? completeTheStep(step) : step
  );
};

export const getBusinessId = (state) => state.businessId;

export const getBusinessDetailsUrl = (state) => {
  const businessId = getBusinessId(state);
  return `/#/nz/${businessId}?selectedTab=businessDetails`;
};

export const getPaydayFilingUrl = (state) => {
  const businessId = getBusinessId(state);
  return `/#/nz/${businessId}/paydayFiling`;
};

export const getOnSuccessCallbackUrl = (state) => {
  const paydayFilingUrl = getPaydayFilingUrl(state);
  const successUrl = window.location.origin.concat(
    `${paydayFilingUrl}/onboarding?authorisation=complete`
  );
  return btoa(successUrl);
};

export const isIrdAuthorisationComplete = (state) => {
  const authFragment = state.authorisation.split('complete#');
  return authFragment.length > 1 && authFragment[1].length > 0;
};

export const getActiveStepNumber = (state) =>
  initialStepperSteps.find((step) => step.id === getCurrentStep(state)).number;

export const getAlert = (state) => state.alert;

export const getIrdNumber = (state) => state.irdNumber;

export const getLoadingState = (state) => state.loadingState;

export const getCreateNzEmployeeUrl = (state) => {
  const businessId = getBusinessId(state);
  return `/#/nz/${businessId}/employee/new`;
};

export const getCreateNzPayRunUrl = (state) => {
  const businessId = getBusinessId(state);
  return `/#/nz/${businessId}/payRun/new`;
};
