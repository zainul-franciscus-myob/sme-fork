const buildOnboardingSettings = ({ businessName, industry, businessRole }) => (
  [
    {
      data: { businessName },
      key: 'businessName',
      source: 'sme-web',
      userId: null,
      region: 'au',
    },
    {
      data: { industry },
      key: 'industry',
      source: 'sme-web',
      userId: null,
      region: 'au',
    },
    {
      data: { businessRole },
      key: 'role',
      source: 'sme-web',
      region: 'au',
    },
    {
      data: { onboardingComplete: 1 },
      key: 'onboardingComplete',
      source: 'sme-web',
      region: 'au',
    },
  ]
);

export default buildOnboardingSettings;
