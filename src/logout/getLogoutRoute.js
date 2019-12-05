import LogoutModule from './LogoutModule';

const getLogoutRoute = () => {
  const routes = [
    {
      name: 'logout',
      path: '/',
      module: new LogoutModule(),
      documentTitle: 'Log out',
    },
  ];

  return routes;
};

export default getLogoutRoute;
