import RouteName from '../../router/RouteName';
import SalesSettingsDetailModule from './salesSettingsDetail/SalesSettingsDetailModule';

const getSalesSettingsRoutes = ({
  setRootView,
  integration,
  popMessages,
  replaceURLParams,
  globalCallbacks: { addedPaymentDetailsSaved },
  navigateTo,
  featureToggles,
}) => [
  {
    name: RouteName.SALES_SETTINGS,
    path: '/:region/:businessId/salesSettings/',
    allowedParams: ['selectedTab'],
    module: new SalesSettingsDetailModule({
      setRootView,
      integration,
      popMessages,
      replaceURLParams,
      addedPaymentDetailsSaved,
      navigateTo,
      featureToggles,
    }),
    documentTitle: 'Sales settings',
  },
];

export default getSalesSettingsRoutes;
