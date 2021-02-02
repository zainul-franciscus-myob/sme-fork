export const tabIds = {
  eiSubmissions: 'eiSubmissions',
  irdSettings: 'irdSettings',
};

export const getTabItems = () => [
  { id: tabIds.eiSubmissions, label: 'Employment information submissions' },
  { id: tabIds.irdSettings, label: 'Inland revenue settings' },
];
