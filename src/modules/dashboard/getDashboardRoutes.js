import DashboardModule from './DashboardModule';
import RouteName from '../../router/RouteName';

// @FEATURE_TOGGLE: essentials-dashboard-payroll-payrun-widget
const getDashboardRoutes = ({
  integration,
  setRootView,
  navigateTo,
  isToggleOn,
}) => {
  const routes = [
    {
      name: RouteName.DASHBOARD,
      path: '/:region/:businessId/dashboard/',
      module: new DashboardModule({
        integration,
        setRootView,
        navigateTo,
        isToggleOn,
      }),
      documentTitle: 'Dashboard',
    },
  ];

  return routes;
};

export default getDashboardRoutes;
