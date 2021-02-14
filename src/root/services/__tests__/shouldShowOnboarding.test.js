import onboardingComplete from '../../../integration/data/settings/onboardingComplete';
import setting from '../../../integration/data/settings/setting';
import shouldShowOnboarding from '../../../modules/onboarding/components/shouldShowOnboarding';

describe('shouldShowOnboarding', () => {
  it('is truthy when recieving onboardingComplete', () => {
    expect(shouldShowOnboarding(setting)).toBeTruthy();
  });

  it('is falsey when recieving onboardingComplete', () => {
    expect(shouldShowOnboarding(onboardingComplete)).toBeFalsy();
  });
});
