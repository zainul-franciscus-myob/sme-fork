import LogoutModule from './LogoutModule';
import RouteName from '../../router/RouteName';

const getLogoutRoutes = (setRootView, integration) => {
  const routes = [
    {
      name: RouteName.LOGOUT,
      path: '/logout',
      module: new LogoutModule(setRootView, integration),
      documentTitle: 'Logout',
    },
  ];

  return routes;
};

export default getLogoutRoutes;
