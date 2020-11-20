import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { SET_CURRENT_STEP } from '../OnboardingIntents';
import OnboardingSteps from '../OnboardingSteps';
import onboardingReducer from '../OnboardingReducer';

describe('onboardingReducer', () => {
  describe('setCurrentStep', () => {
    it('should set current step', () => {
      const state = {
        currentStep: OnboardingSteps.OVERVIEW,
      };

      const action = {
        intent: SET_CURRENT_STEP,
        currentStep: OnboardingSteps.AUTHORISE_MYOB,
      };

      const result = onboardingReducer(state, action);

      expect(result).toEqual({
        currentStep: OnboardingSteps.AUTHORISE_MYOB,
      });
    });
  });

  describe('setInitialState', () => {
    it('should add business id and region to state from passed in context', () => {
      const state = {
        currentStep: OnboardingSteps.OVERVIEW,
      };

      const context = {
        businessId: 'bizId',
        region: 'nz',
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context,
      };

      const result = onboardingReducer(state, action);

      expect(result).toEqual({ ...state, ...context });
    });
  });

  describe('resetState', () => {
    it('resets state to the default state', () => {
      const state = {
        currentState: OnboardingSteps.DONE,
        region: 'NZ',
        businessId: 'bizId',
        otherData: 'foobar',
      };

      const expectedState = {
        currentStep: OnboardingSteps.OVERVIEW,
      };

      const action = {
        intent: RESET_STATE,
      };

      const result = onboardingReducer(state, action);

      expect(result).toEqual(expectedState);
    });
  });
});
