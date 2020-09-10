import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getErrorRoutes = () => [
  {
    name: RouteName.ERROR,
    path: '/:region/:businessId/error',
    loadModule: () => import('./ErrorModule'),
    documentTitle: 'Error',
  },
];
export default getErrorRoutes;
