import BusinessDetailModule from './businessDetail/businessDetailModule';
import RouteName from '../router/RouteName';

const getBusinessRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: RouteName.BUSINESS_DETAIL,
      path: '/:region/:businessId/',
      module: new BusinessDetailModule({ setRootView, integration }),
      documentTitle: 'Business details',
    },
  ];

  return routes;
};

export default getBusinessRoutes;
