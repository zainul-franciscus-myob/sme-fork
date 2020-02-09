import InvoiceEmailSettingsModule from './salesSettingsDetail/InvoiceEmailSettingsModule';
import RouteName from '../../router/RouteName';
import SalesSettingsDetailModule from './salesSettingsDetail/SalesSettingsDetailModule';

const getSalesSettingsRoutes = ({
  setRootView,
  integration,
  popMessages,
  replaceURLParams,
  globalCallbacks: { updatedEmailSettings },
}) => [
  {
    name: RouteName.SALES_SETTINGS,
    path: '/:region/:businessId/salesSettings/',
    allowedParams: ['selectedTab'],
    module: new SalesSettingsDetailModule({
      setRootView, integration, popMessages, replaceURLParams,
    }),
    documentTitle: 'Invoice and quote settings',
  },
  {
    name: RouteName.INVOICE_EMAIL_SETTINGS,
    path: '/:region/:businessId/invoiceEmailSettings/',
    module: new InvoiceEmailSettingsModule({ setRootView, integration, updatedEmailSettings }),
    documentTitle: 'Set up your invoice email template',
  },
];

export default getSalesSettingsRoutes;
