import PurchaseSettingsModule from './PurchaseSettingsModule';
import RouteName from '../../router/RouteName';

const getPurchaseSettingsRoutes = ({ integration, setRootView }) => [
  {
    name: RouteName.PURCHASE_SETTINGS,
    path: '/:region/:businessId/purchaseSettings/',
    module: new PurchaseSettingsModule({
      integration,
      setRootView,
    }),
    documentTitle: 'Purchase settings',
  },
];

export default getPurchaseSettingsRoutes;
