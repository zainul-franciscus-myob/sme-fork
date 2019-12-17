import { shouldShowOnboarding } from '../shouldShowOnboarding';
import onboardingComplete from '../../../integration/data/settings/onboardingComplete';
import setting from '../../../integration/data/settings/setting';

describe('shouldShowOnboarding', () => {
  describe('on-boarding NOT completed', () => {
    it('does not show onboarding', () => {
      expect(shouldShowOnboarding([setting])).toBeFalsy();
    });
  });

  describe('on-boarding completed', () => {
    it('does NOT allow onboarding to be shown', () => {
      expect(shouldShowOnboarding([onboardingComplete])).toBeFalsy();
    });
  });
});
