const buildOnboardingSettings = ({ proposedBusinessName, businessRole, industry }) => (
  {
    businessName: proposedBusinessName,
    businessRole,
    industry,
    onboardingComplete: true,
  }
);

export default buildOnboardingSettings;
