import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getTemplateBuilderRoutes = () => [
  {
    name: RouteName.INVOICE_BUSINESS_SETTINGS,
    path: '/:region/:businessId/invoiceBusinessSettings',
    loadModule: () =>
      import('./businessSettings/invoiceBusinessSettingsModule'),
    documentTitle: 'Invoice business details',
  },
  {
    name: RouteName.INVOICE_LOGO_SETTINGS,
    path: '/:region/:businessId/invoiceLogoSettings/',
    loadModule: () => import('./logoSettings/InvoiceLogoModule'),
    documentTitle: 'Upload your logo',
  },
  {
    name: RouteName.INVOICE_PAYMENT_SETTINGS,
    path: '/:region/:businessId/invoicePaymentSettings/',
    loadModule: () => import('./paymentSettings/InvoicePaymentSettingsModule'),
    documentTitle: 'Add invoice payment details',
  },
  {
    name: RouteName.INVOICE_EMAIL_SETTINGS,
    path: '/:region/:businessId/invoiceEmailSettings/',
    loadModule: () => import('./emailSettings/InvoiceEmailSettingsModule'),
    documentTitle: 'Set up your invoice email template',
  },
];

export default getTemplateBuilderRoutes;
