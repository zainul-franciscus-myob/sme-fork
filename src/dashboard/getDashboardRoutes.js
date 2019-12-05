import DashboardModule from './DashboardModule';

const getDashboardRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'dashboard',
      path: '/',
      module: new DashboardModule({ integration, setRootView }),
      documentTitle: 'Dashboard',
    },
  ];

  return routes;
};

export default getDashboardRoutes;
