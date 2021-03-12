export const mainTabIds = {
  templates: 'templates',
  emailDefaults: 'emailDefaults',
};

export const mainTabItems = () => {
  return [
    { id: mainTabIds.templates, label: 'Templates', hasActions: false },
    { id: mainTabIds.emailDefaults, label: 'Email defaults', hasActions: true },
  ];
};
