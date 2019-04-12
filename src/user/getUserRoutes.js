import UserListModule from './userList.js/UserListModule';

const getUserRoutes = ({
  integration, setRootView, popMessages,
}) => {
  const routes = [
    {
      name: 'userList',
      path: '/',
      module: new UserListModule({
        integration, setRootView, popMessages,
      }),
    },
  ];

  return routes;
};

export default getUserRoutes;
