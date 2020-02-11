import InvoiceBusinessSettingsModule from './businessSettings/InvoiceBusinessSettingsModule';
import InvoiceEmailSettingsModule from './emailSettings/InvoiceEmailSettingsModule';
import InvoiceLogoModule from './logoSettings/InvoiceLogoModule';
import InvoicePaymentSettingsModule from './paymentSettings/InvoicePaymentSettingsModule';
import RouteName from '../../router/RouteName';

const getTemplateBuilderRoutes = ({
  setRootView,
  integration,
  pushMessage,
  popMessages,
  globalCallbacks: {
    setupBusinessDetails, addedPaymentDetails, uploadedLogo, updatedEmailSettings,
  },
}) => [
  {
    name: RouteName.INVOICE_BUSINESS_SETTINGS,
    path: '/:region/:businessId/invoiceBusinessSettings',
    module: new InvoiceBusinessSettingsModule({
      setRootView, integration, setupBusinessDetails,
    }),
    documentTitle: 'Invoice business details',
  },
  {
    name: RouteName.INVOICE_LOGO_SETTINGS,
    path: '/:region/:businessId/invoiceLogoSettings/',
    module: new InvoiceLogoModule({
      integration, setRootView, pushMessage, uploadedLogo,
    }),
    documentTitle: 'Upload your logo',
  },
  {
    name: RouteName.INVOICE_PAYMENT_SETTINGS,
    path: '/:region/:businessId/invoicePaymentSettings/',
    module: new InvoicePaymentSettingsModule({
      setRootView, integration, popMessages, addedPaymentDetails,
    }),
    documentTitle: 'Add invoice payment details',
  },
  {
    name: RouteName.INVOICE_EMAIL_SETTINGS,
    path: '/:region/:businessId/invoiceEmailSettings/',
    module: new InvoiceEmailSettingsModule({
      setRootView, integration, updatedEmailSettings,
    }),
    documentTitle: 'Set up your invoice email template',
  },
];

export default getTemplateBuilderRoutes;
