import BusinessDetailModule from './businessDetail/businessDetailModule';
import InvoiceBusinessSettingsModule from './businessDetail/InvoiceBusinessSettingsModule';
import RouteName from '../../router/RouteName';

const getBusinessRoutes = ({
  setRootView, integration, globalCallbacks: { businessDetailsConfirmed, setupBusinessDetails },
}) => [
  {
    name: RouteName.BUSINESS_DETAIL,
    path: '/:region/:businessId/',
    module: new BusinessDetailModule({
      setRootView,
      integration,
      businessDetailsConfirmed,
    }),
    documentTitle: 'Business details',
  },
  {
    name: RouteName.INVOICE_BUSINESS_SETTINGS,
    path: '/:region/:businessId/invoiceBusinessSettings',
    module: new InvoiceBusinessSettingsModule({ setRootView, integration, setupBusinessDetails }),
    documentTitle: 'Invoice business details',
  },
];

export default getBusinessRoutes;
