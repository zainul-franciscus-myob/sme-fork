import EOFYFinalisationEnabled from '../../../common/featureToggles/EOFYFinalisationEnabled';

export const tabIds = {
  reports: 'reports',
  terminations: 'terminations',
  finalisation: 'finalisation',
  atoSettings: 'atoSettings',
};

export const getTabItems = () => (EOFYFinalisationEnabled
  ? [
    { id: tabIds.reports, label: 'STP reports' },
    { id: tabIds.terminations, label: 'Employee terminations' },
    { id: tabIds.finalisation, label: 'EOFY finalisation' },
    { id: tabIds.atoSettings, label: 'ATO settings' },
  ] : [
    { id: tabIds.reports, label: 'STP reports' },
    { id: tabIds.terminations, label: 'Employee terminations' },
    { id: tabIds.atoSettings, label: 'ATO settings' },
  ]);
