import { shouldShowOnboarding } from '../shouldShowOnboarding';
import onboardingComplete from '../../../integration/data/settings/onboardingComplete';
import setting from '../../../integration/data/settings/setting';

describe('shouldShowOnboarding', () => {
  describe('on-boarding NOT completed', () => {
    it('allows onboarding to be shown', () => {
      expect(shouldShowOnboarding([setting])).toBeTruthy();
    });
  });

  describe('on-boarding completed', () => {
    it('does NOT allow onboarding to be shown', () => {
      expect(shouldShowOnboarding([onboardingComplete])).toBeFalsy();
    });
  });
});
