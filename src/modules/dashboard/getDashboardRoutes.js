import DashboardModule from './DashboardModule';
import RouteName from '../../router/RouteName';

// @FEATURE_TOGGLE: essentials-dashboard-payroll-payrun-widget
const getDashboardRoutes = ({
  globalCallbacks,
  integration,
  setRootView,
  navigateTo,
  constructPath,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.DASHBOARD,
      path: '/:region/:businessId/dashboard/',
      module: new DashboardModule({
        integration,
        setRootView,
        navigateTo,
        globalCallbacks,
        constructPath,
        featureToggles,
      }),
      documentTitle: 'Dashboard',
    },
  ];

  return routes;
};

export default getDashboardRoutes;
