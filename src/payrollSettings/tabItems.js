export const tabIds = {
  general: 'general',
  superFundList: 'superFundList',
  // classification: 'classification', <-- Temporarily hide the Classification tab
  paySlips: 'paySlips',
};

export const tabItems = [
  { id: tabIds.general, label: 'General payroll information' },
  { id: tabIds.superFundList, label: 'Superannuation funds' },
  // Temporarily hide the Classification tab
  // { id: tabIds.classification, label: 'Employment classification' },
];
