import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getLinkUserRoutes = () => [
  {
    name: RouteName.LINK_USER,
    path: '/:region/:businessId/linkUser/',
    allowedParams: ['redirectURL'],
    loadModule: () => import('./LinkUserModule'),
    documentTitle: 'Link user',
  },
];

export default getLinkUserRoutes;
