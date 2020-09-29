import PurchaseSettingsModule from './PurchaseSettingsModule';
import RouteName from '../../router/RouteName';

const getPurchaseSettingsRoutes = ({ integration, setRootView }) => [
  {
    name: RouteName.PURCHASE_SETTINGS,
    path: '/:region/:businessId/purchasesSettings/',
    module: new PurchaseSettingsModule({
      integration,
      setRootView,
    }),
    documentTitle: 'Purchases settings',
  },
];

export default getPurchaseSettingsRoutes;
