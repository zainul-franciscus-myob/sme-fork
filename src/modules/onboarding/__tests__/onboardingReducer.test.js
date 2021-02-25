import { SET_ONBOARDING_DETAILS } from '../OnboardingIntents';
import onboardingReducer from '../onboardingReducer';

describe('onboardingReducer', () => {
  describe('SET_ONBOARDING_DETAILS', () => {
    it('sets onboarding details correctly', () => {
      const onboardingDetails = {
        businessName: 'Test Business',
        businessRoles: [
          { id: 'Accountant', title: 'Accountant' },
          { id: 'Business owner', title: 'Business owner' },
        ],
        industries: [
          { id: 'Accommodation', title: 'Accommodation' },
          {
            id: 'Accounting and tax services',
            title: 'Accounting and tax services',
          },
        ],
      };
      const action = {
        intent: SET_ONBOARDING_DETAILS,
        onboardingDetails,
      };

      const state = {
        industries: [],
        businessName: '',
        businessRoles: [],
      };

      const actual = onboardingReducer(state, action);
      const expectedResult = onboardingDetails;

      expect(actual).toEqual(expectedResult);
    });
  });
});
