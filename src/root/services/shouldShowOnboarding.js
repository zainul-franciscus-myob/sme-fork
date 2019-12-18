export const shouldShowOnboarding = settings => !Array.isArray(settings)
  || !settings.some(setting => setting.key === 'onboardingComplete'
    && setting.data
    && setting.data.onboardingComplete);

export default shouldShowOnboarding;
