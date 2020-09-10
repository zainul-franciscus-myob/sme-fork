import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getReportsSubscribeNowRoutes = () => [
  {
    name: RouteName.REPORTS_SUBSCRIBE_NOW,
    path: '/:region/:businessId/reportsSubscribeNow',
    loadModule: () => import('./ReportsSubscribeNowModule'),
    documentTitle: 'Redirecting...',
  },
];

export default getReportsSubscribeNowRoutes;
