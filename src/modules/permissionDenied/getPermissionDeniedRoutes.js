import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getPermissionDeniedRoutes = () => [
  {
    name: RouteName.PERMISSION_DENIED,
    path: '/:region/:businessId/permissionDenied/',
    loadModule: () => import('./PermissionDeniedModule'),
    documentTitle: 'Permission denied',
  },
];

export default getPermissionDeniedRoutes;
