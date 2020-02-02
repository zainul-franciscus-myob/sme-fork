import buildOnboardingSettings from '../buildOnboardingSettings';

describe('buildOnboardingSettings', () => {
  it('builds settings from the parameters supplied', () => {
    const businessRole = 'Student';
    const industry = 'Agriculture and farming';

    const result = buildOnboardingSettings({
      businessRole,
      industry,
    });

    expect(result).toEqual({
      businessRole,
      industry,
      onboardingComplete: true,
    });
  });
});
