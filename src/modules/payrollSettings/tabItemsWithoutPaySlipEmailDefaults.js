export const tabIds = {
  general: 'general',
  superFundList: 'superFundList',
  // classification: 'classification', <-- Temporarily hide the Classification tab
  paySlipEmailDefaults: 'paySlipEmailDefaults',
};

export const tabItemsWithoutPaySlipEmailDefaults = [
  { id: tabIds.general, label: 'General payroll information' },
  { id: tabIds.superFundList, label: 'Superannuation funds' },
  // Temporarily hide the Classification tab
  // { id: tabIds.classification, label: 'Employment classification' },
];
