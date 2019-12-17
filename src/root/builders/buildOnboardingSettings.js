const buildOnboardingSettings = ({ industry, businessRole }) => (
  [
    {
      data: { industry },
      key: 'industry',
      region: 'au',
      source: 'sme-web',
      userId: null,
    },
    {
      data: { businessRole },
      key: 'role',
      region: 'au',
      source: 'sme-web',
    },
    {
      data: { onboardingComplete: 1 },
      key: 'onboardingComplete',
      region: 'au',
      source: 'sme-web',
      userId: null,
    },
  ]
);

export default buildOnboardingSettings;
