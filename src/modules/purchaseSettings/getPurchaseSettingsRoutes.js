import PurchaseSettingsModule from './PurchaseSettingsModule';
import RouteName from '../../router/RouteName';

const getPurchaseSettingsRoutes = ({
  integration,
  setRootView,
  navigateTo,
  featureToggles,
}) => [
  {
    name: RouteName.PURCHASE_SETTINGS,
    path: '/:region/:businessId/purchasesSettings/',
    module: new PurchaseSettingsModule({
      integration,
      setRootView,
      navigateTo,
      featureToggles,
    }),
    documentTitle: 'Purchases settings',
  },
];

export default getPurchaseSettingsRoutes;
