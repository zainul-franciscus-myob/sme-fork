import LogoutModule from './LogoutModule';
import RouteName from '../router/RouteName';

const getLogoutRoute = () => {
  const routes = [
    {
      name: RouteName.LOGOUT,
      path: '/logout/',
      module: new LogoutModule(),
      documentTitle: 'Log out',
    },
  ];

  return routes;
};

export default getLogoutRoute;
