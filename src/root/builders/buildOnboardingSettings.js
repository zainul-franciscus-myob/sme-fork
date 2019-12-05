const buildOnboardingSettings = ({ businessName, industry, businessRole }) => (
  [
    {
      data: {
        sampleValue: businessName,
      },
      key: 'businessName',
      source: 'sme-web',
      userId: null,
    },
    {
      data: {
        sampleValue: industry,
      },
      key: 'industry',
      source: 'sme-web',
      userId: null,
    },
    {
      data: {
        sampleValue: businessRole,
      },
      key: 'role',
      source: 'sme-web',
    },
    {
      data: {
        onboardingCompleted: '1',
      },
      key: 'onboardingComplete',
      source: 'sme-web',
    },
  ]
);

export default buildOnboardingSettings;
