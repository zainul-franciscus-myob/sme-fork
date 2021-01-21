const insertIf = (condition, ...elements) => {
  return condition ? elements : [];
};

export const tabIds = {
  reports: 'reports',
  terminations: 'terminations',
  finalisation: 'finalisation',
  atoSettings: 'atoSettings',
  jobKeeper: 'jobKeeper',
  gstCalculator: 'gstCalculator',
  jobMaker: 'jobMaker',
};

export const getTabItems = (featureToggles) => {
  const tabs = [
    { id: tabIds.reports, label: 'STP reports' },
    { id: tabIds.terminations, label: 'Employee terminations' },
    { id: tabIds.finalisation, label: 'EOFY finalisation' },
    { id: tabIds.atoSettings, label: 'ATO settings' },
  ];

  return [
    ...tabs,
    ...insertIf(featureToggles.isJobKeeperTabEnabled, {
      id: tabIds.jobKeeper,
      label: 'JobKeeper payments',
    }),
    ...insertIf(featureToggles.isJobKeeperCalculatorEnabled, {
      id: tabIds.gstCalculator,
      label: 'JobKeeper eligibility',
    }),
    ...insertIf(featureToggles.isJobMakerTabEnabled, {
      id: tabIds.jobMaker,
      label: 'JobMaker',
    }),
  ];
};
