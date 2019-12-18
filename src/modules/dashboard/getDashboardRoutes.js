import DashboardModule from './DashboardModule';
import RouteName from '../../router/RouteName';

const getDashboardRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.DASHBOARD,
      path: '/:region/:businessId/dashboard/',
      module: new DashboardModule({ integration, setRootView }),
      documentTitle: 'Dashboard',
    },
  ];

  return routes;
};

export default getDashboardRoutes;
