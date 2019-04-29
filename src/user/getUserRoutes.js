import UserDetailModule from './userDetail/UserDetailModule';
import UserListModule from './userList/UserListModule';

const getUserRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: 'userList',
      path: '/',
      module: new UserListModule({
        integration, setRootView, popMessages,
      }),
    },
    {
      name: 'userDetail',
      path: '/:userId',
      module: new UserDetailModule({ integration, setRootView, pushMessage }),
    },
  ];

  return routes;
};

export default getUserRoutes;
