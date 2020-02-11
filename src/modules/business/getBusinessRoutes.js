import BusinessDetailModule from './businessDetail/businessDetailModule';
import RouteName from '../../router/RouteName';

const getBusinessRoutes = ({
  setRootView, integration, globalCallbacks: { businessDetailsConfirmed },
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
];

export default getBusinessRoutes;
