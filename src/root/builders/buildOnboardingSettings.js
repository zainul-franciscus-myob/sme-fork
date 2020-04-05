const buildOnboardingSettings = ({
  proposedBusinessName, businessRole, industry, region,
}) => (
  {
    businessName: proposedBusinessName,
    businessRole,
    industry,
    onboardingComplete: true,
    ...region && { region },
  }
);

export default buildOnboardingSettings;
