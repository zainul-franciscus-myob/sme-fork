import RouteName from '../../router/RouteName';

// @FEATURE_TOGGLE: essentials-dashboard-payroll-payrun-widget
/** @type {import('../module-types').RouteConfig} */
const getDashboardRoutes = () => [
  {
    name: RouteName.DASHBOARD,
    path: '/:region/:businessId/dashboard/',
    loadModule: () => import('./DashboardModule'),
    documentTitle: 'Dashboard',
  },
];

export default getDashboardRoutes;
