export const tabIds = {
  reports: 'reports',
  terminations: 'terminations',
  finalisation: 'finalisation',
  atoSettings: 'atoSettings',
  jobKeeperPayments: 'jobKeeper',
};

export const getTabItems = (featureToggles) => (featureToggles.isJobKeeperTabEnabled
  ? [
    { id: tabIds.reports, label: 'STP reports' },
    { id: tabIds.terminations, label: 'Employee terminations' },
    { id: tabIds.finalisation, label: 'EOFY finalisation' },
    { id: tabIds.atoSettings, label: 'ATO settings' },
    { id: tabIds.jobKeeperPayments, label: 'JobKeeper payments' },
  ] : [
    { id: tabIds.reports, label: 'STP reports' },
    { id: tabIds.terminations, label: 'Employee terminations' },
    { id: tabIds.finalisation, label: 'EOFY finalisation' },
    { id: tabIds.atoSettings, label: 'ATO settings' },
  ]);
