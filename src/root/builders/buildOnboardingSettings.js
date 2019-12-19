const buildOnboardingSettings = ({ businessName, businessRole, industry }) => (
  {
    businessName,
    businessRole,
    industry,
    onboardingComplete: true,
  }
);

export default buildOnboardingSettings;
