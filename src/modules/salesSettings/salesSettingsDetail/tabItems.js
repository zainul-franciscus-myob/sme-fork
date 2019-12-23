export const mainTabIds = {
  layoutAndTheme: 'layoutAndTheme',
  templates: 'templates',
  payments: 'payments',
  emailDefaults: 'emailDefaults',
  customerStatements: 'customerStatements',
  reminders: 'reminders',
};

export const mainTabItems = [
  { id: mainTabIds.layoutAndTheme, label: 'Layout and theme', hasActions: true },
  { id: mainTabIds.templates, label: 'Templates', hasActions: false },
  { id: mainTabIds.payments, label: 'Payments', hasActions: true },
  { id: mainTabIds.emailDefaults, label: 'Email defaults', hasActions: true },
  // { id: mainTabIds.customerStatements, label: 'Customer statements', hasActions:true },
  { id: mainTabIds.reminders, label: 'Reminders', hasActions: false },
];
