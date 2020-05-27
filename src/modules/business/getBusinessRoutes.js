import BusinessDetailModule from './businessDetail/businessDetailModule';
import RouteName from '../../router/RouteName';

const getBusinessRoutes = ({
  setRootView, integration, globalCallbacks: { businessDetailsConfirmed }, isToggleOn,
}) => [
  {
    name: RouteName.BUSINESS_DETAIL,
    path: '/:region/:businessId/',
    module: new BusinessDetailModule({
      setRootView,
      integration,
      businessDetailsConfirmed,
      isToggleOn,
    }),
    documentTitle: 'Business details',
  },
];

export default getBusinessRoutes;
