import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getUserRoutes = () => [
  {
    name: RouteName.USER_LIST,
    path: '/:region/:businessId/user/',
    loadModule: () => import('./userList/UserListModule'),
    documentTitle: 'Users',
  },
  {
    name: RouteName.USER_DETAIL,
    path: '/:region/:businessId/user/:userId',
    loadModule: () => import('./userDetail/UserDetailModule'),
    documentTitle: 'User',
  },
];

export default getUserRoutes;
