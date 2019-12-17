import RouteName from '../../router/RouteName';
import UserDetailModule from './userDetail/UserDetailModule';
import UserListModule from './userList/UserListModule';

const getUserRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.USER_LIST,
      path: '/:region/:businessId/user/',
      module: new UserListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Users',
    },
    {
      name: RouteName.USER_DETAIL,
      path: '/:region/:businessId/user/:userId',
      module: new UserDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'User',
    },
  ];

  return routes;
};

export default getUserRoutes;
