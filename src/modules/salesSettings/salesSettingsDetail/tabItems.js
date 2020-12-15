import Region from '../../../common/types/Region';

export const mainTabIds = {
  layoutAndTheme: 'layoutAndTheme',
  templates: 'templates',
  payments: 'payments',
  emailDefaults: 'emailDefaults',
  customerStatements: 'customerStatements',
  reminders: 'reminders',
  eInvoicing: 'eInvoicing',
};

export const mainTabItems = (region, isEInvoicingEnabled) => {
  const items = [
    {
      id: mainTabIds.layoutAndTheme,
      label: 'Layout',
      hasActions: true,
    },
    { id: mainTabIds.templates, label: 'Templates', hasActions: false },
    { id: mainTabIds.payments, label: 'Payments', hasActions: true },
    { id: mainTabIds.emailDefaults, label: 'Email defaults', hasActions: true },
    // { id: mainTabIds.customerStatements, label: 'Customer statements', hasActions:true },
    { id: mainTabIds.reminders, label: 'Reminders', hasActions: false },
  ];

  if (isEInvoicingEnabled && region === Region.au) {
    items.push({
      id: mainTabIds.eInvoicing,
      label: 'e-Invoicing',
      hasActions: false,
    });
  }

  return items;
};
