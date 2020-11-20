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

export const getActiveStepNumber = (state) =>
  initialStepperSteps.find((step) => step.id === getCurrentStep(state)).number;
