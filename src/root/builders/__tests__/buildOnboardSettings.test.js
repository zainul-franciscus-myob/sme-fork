import buildOnboardingSettings from '../buildOnboardingSettings';

describe('buildOnboardingSettings', () => {
  it('builds settings from the parameters supplied', () => {
    const businessName = 'Sample name';
    const businessRole = 'Student';
    const industry = 'Agriculture and farming';

    const result = buildOnboardingSettings({
      businessName,
      businessRole,
      industry,
    });

    expect(result).toEqual({
      businessName,
      businessRole,
      industry,
      onboardingComplete: true,
    });
  });
});
