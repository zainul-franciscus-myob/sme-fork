import BusinessSetingsModule from './businessSettings/businessSettingsModule';
import RouteName from '../../router/RouteName';

const getBusinessRoutes = ({
  setRootView,
  integration,
  globalCallbacks: { businessDetailsConfirmed },
  isToggleOn,
  navigateTo,
  loadGlobalBusinessDetails,
  replaceURLParams,
}) => [
  {
    name: RouteName.BUSINESS_SETTINGS,
    path: '/:region/:businessId/',
    allowedParams: ['selectedTab'],
    module: new BusinessSetingsModule({
      setRootView,
      integration,
      businessDetailsConfirmed,
      isToggleOn,
      navigateTo,
      loadGlobalBusinessDetails,
      replaceURLParams,
    }),
    documentTitle: 'Business settings',
  },
];

export default getBusinessRoutes;
