import LogoutModule from './LogoutModule';

const getLogoutRoute = () => {
  const routes = [
    {
      name: 'logout',
      path: '/',
      module: new LogoutModule(),
    },
  ];

  return routes;
};

export default getLogoutRoute;
