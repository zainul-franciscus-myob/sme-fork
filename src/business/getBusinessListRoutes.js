import BusinessListModule from './businessList/BusinessListModule';
import RouteName from '../router/RouteName';

const getBusinessListRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: RouteName.BUSINESS_LIST,
      path: '/businesses',
      module: new BusinessListModule({ setRootView, integration }),
      documentTitle: 'My businesses',
    },
  ];

  return routes;
};

export default getBusinessListRoutes;
