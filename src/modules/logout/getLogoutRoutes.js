import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getLogoutRoutes = () => [
  {
    name: RouteName.LOGOUT,
    path: '/logout',
    loadModule: () => import('./LogoutModule'),
    documentTitle: 'Logout',
  },
];

export default getLogoutRoutes;
