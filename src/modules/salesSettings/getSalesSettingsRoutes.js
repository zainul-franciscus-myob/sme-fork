import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getSalesSettingsRoutes = () => [
  {
    name: RouteName.SALES_SETTINGS,
    path: '/:region/:businessId/salesSettings/',
    allowedParams: ['selectedTab'],
    loadModule: () => import('./salesSettingsDetail/SalesSettingsDetailModule'),
    documentTitle: 'Invoice and quote settings',
  },
];

export default getSalesSettingsRoutes;
