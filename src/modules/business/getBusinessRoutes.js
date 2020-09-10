import BusinessDetailModule from './businessDetail/businessDetailModule';
import RouteName from '../../router/RouteName';

const getBusinessRoutes = ({
  setRootView,
  integration,
  globalCallbacks: { businessDetailsConfirmed },
  isToggleOn,
  navigateTo,
  loadGlobalBusinessDetails,
}) => [
  {
    name: RouteName.BUSINESS_DETAIL,
    path: '/:region/:businessId/',
    module: new BusinessDetailModule({
      setRootView,
      integration,
      businessDetailsConfirmed,
      isToggleOn,
      navigateTo,
      loadGlobalBusinessDetails,
    }),
    documentTitle: 'Business details',
  },
];

export default getBusinessRoutes;
