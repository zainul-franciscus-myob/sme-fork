import {
  getActiveStepNumber,
  getCurrentStep,
  getStepperSteps,
} from '../OnboardingSelectors';
import OnboardingSteps from '../OnboardingSteps';

describe('OnboardingSelectors', () => {
  describe('getCurrentStep', () => {
    it('should return current step', () => {
      const currentStep = OnboardingSteps.AUTHORISE_MYOB;
      const state = {
        currentStep,
      };

      const actual = getCurrentStep(state);
      expect(actual).toEqual(currentStep);
    });
  });

  describe('getActiveStepNumber', () => {
    it('should return active step number', () => {
      const currentStep = OnboardingSteps.DONE;
      const state = {
        currentStep,
      };

      const actual = getActiveStepNumber(state);
      // "Done is the 3rd Step"
      expect(actual).toEqual('3');
    });
  });

  describe('getStepperSteps', () => {
    it('should return steps with correct type attribute', () => {
      const currentStep = OnboardingSteps.AUTHORISE_MYOB;
      const state = {
        currentStep,
      };

      const expected = [
        {
          id: OnboardingSteps.OVERVIEW,
          number: '1',
          title: 'Overview',
          type: 'complete',
        },
        {
          id: OnboardingSteps.AUTHORISE_MYOB,
          number: '2',
          title: 'Authorise MYOB',
          type: 'incomplete',
        },
        {
          id: OnboardingSteps.DONE,
          number: '3',
          title: 'Done!',
          type: 'incomplete',
        },
      ];

      const actual = getStepperSteps(state);
      expect(actual).toEqual(expected);
    });
  });
});
