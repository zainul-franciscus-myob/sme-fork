import OnboardingModule from '../OnboardingModule';

describe('OnboardingModule', () => {
  it('can be instantiated', () => {
    const dispatcher = jest.fn();
    const settingsService = jest.fn();

    const onboardingModule = new OnboardingModule({ dispatcher, settingsService });
    expect(onboardingModule).toBeDefined();
  });
});
