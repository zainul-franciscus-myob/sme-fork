import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getFileUnavailableRoutes = () => [
  {
    name: RouteName.FILE_UNAVAILABLE,
    path: '/:region/:businessId/unavailable/',
    loadModule: () => import('./FileUnavailableModule'),
    documentTitle: 'Business unavailable',
  },
];

export default getFileUnavailableRoutes;
