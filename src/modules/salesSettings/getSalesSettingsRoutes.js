import InvoiceEmailSettingsModule from './salesSettingsDetail/InvoiceEmailSettingsModule';
import RouteName from '../../router/RouteName';
import SalesSettingsDetailModule from './salesSettingsDetail/SalesSettingsDetailModule';

const getSalesSettingsRoutes = ({ setRootView, integration, popMessages }) => [
  {
    name: RouteName.SALES_SETTINGS,
    path: '/:region/:businessId/salesSettings/',
    module: new SalesSettingsDetailModule({ setRootView, integration, popMessages }),
    documentTitle: 'Invoice and quote settings',
  },
  {
    name: RouteName.INVOICE_EMAIL_SETTINGS,
    path: '/:region/:businessId/invoiceEmailSettings/',
    module: new InvoiceEmailSettingsModule({ setRootView, integration }),
    documentTitle: 'Set up your invoice email template',
  },
];

export default getSalesSettingsRoutes;
