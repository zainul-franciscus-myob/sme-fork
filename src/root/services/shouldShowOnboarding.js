export const shouldShowOnboarding = (settings) => {
  const hasCompletedSettings = Array.isArray(settings) && settings.filter(setting => Object.keys(setting.data).includes('onboardingComplete'));
  return !Array.isArray(settings) || hasCompletedSettings.length === 0;
};

export default shouldShowOnboarding;
