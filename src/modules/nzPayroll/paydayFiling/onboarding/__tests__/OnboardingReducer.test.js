import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import {
  SET_CURRENT_STEP,
  SET_IRD_NUMBER,
  SET_LOADING_STATE,
} from '../OnboardingIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
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
        irdNumber: '123',
        otherData: 'foobar',
        loadingState: LoadingState.LOADING_FAIL,
      };

      const expectedState = {
        currentStep: OnboardingSteps.OVERVIEW,
        businessId: '',
        irdNumber: '',
        loadingState: LoadingState.LOADING_SUCCESS,
        authorisation: '',
      };

      const action = {
        intent: RESET_STATE,
      };

      const result = onboardingReducer(state, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('setIrdNumber', () => {
    it('should set ird number', () => {
      const state = {
        irdNumber: '',
      };

      const action = {
        intent: SET_IRD_NUMBER,
        irdNumber: '123123123',
      };

      const result = onboardingReducer(state, action);

      expect(result).toEqual({
        irdNumber: '123123123',
      });
    });
  });

  describe('setLoadingState', () => {
    it('should set loading state', () => {
      const state = {
        loadingState: LoadingState.LOADING,
      };

      const action = {
        intent: SET_LOADING_STATE,
        loadingState: LoadingState.LOADING_SUCCESS,
      };

      const result = onboardingReducer(state, action);

      expect(result).toEqual({
        loadingState: LoadingState.LOADING_SUCCESS,
      });
    });
  });
});
